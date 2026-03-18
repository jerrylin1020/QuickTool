# QuickTool

A zero-dependency, single-page developer utility toolkit built with vanilla HTML/CSS/JS. No build tools, no npm, no framework.

## Tech Stack

- Pure HTML5 + CSS3 + JavaScript (ES6+)
- No package.json, no bundler, no TypeScript
- External CDN: `qrcode.min.js`, `js-yaml@4`
- Deployed via Firebase Hosting

## Commands

No build process — files are served directly as static assets.

```bash
# Local development (any static server works)
npx serve .
# or
python3 -m http.server 8080

# Deploy
firebase deploy
```

## Architecture

All application logic lives in three files:
- [tools.js](tools.js) — main app logic (3800+ lines), all tool definitions
- [style.css](style.css) — all styling with CSS variables
- [index.html](index.html) — single HTML entry point

### Tool System

Tools are defined in the `TOOLS` array ([tools.js:13](tools.js#L13)) with this shape:

```js
{
  id: 'tool-id',
  name: 'Display Name',
  icon: '🔧',
  category: 'CategoryName',
  description: 'Short description',
  render() { return '<html string>' },
  init()    { /* attach event listeners */ }
}
```

**Pattern:** `render()` produces HTML → injected into DOM → `init()` wires up interactivity. Never wire up events in `render()`.

### State Management (localStorage)

| Key | Description |
|-----|-------------|
| `qt-pinned` | Set of pinned tool IDs (shown in header bar) |
| `qt-theme` | `'dark'` or `'light'` |
| `qt-state-{toolId}` | Saved input/textarea/select values per tool |

Tool input state is auto-saved with a 400ms debounce on `input` events.

## Tools Index

| # | ID | Name | Category |
| --- | --- | --- | --- |
| 1 | `json-formatter` | JSON Formatter | Data |
| 2 | `string-joiner` | String Joiner | Text |
| 3 | `case-converter` | Case Converter | Text |
| 4 | `url-codec` | URL Encoder / Decoder | Encode |
| 5 | `base64-codec` | Base64 Encoder / Decoder | Encode |
| 6 | `hash-generator` | Hash Generator | Encode |
| 7 | `diff-checker` | Text Diff | Text |
| 8 | `word-counter` | Word Counter | Text |
| 9 | `regex-tester` | Regex Tester | Text |
| 10 | `color-converter` | Color Converter | Design |
| 11 | `timestamp-converter` | Timestamp Converter | Data |
| 12 | `number-base` | Number Base Converter | Data |
| 13 | `list-compare` | List Comparator | Data |
| 14 | `jwt-decoder` | JWT Decoder | Security |
| 15 | `uuid-generator` | UUID Generator | Generator |
| 16 | `password-generator` | Password Generator | Generator |
| 17 | `lorem-ipsum` | Lorem Ipsum Generator | Generator |
| 18 | `qr-generator` | QR Code Generator | Generator |
| 19 | `line-sorter` | Line Sorter | Text |
| 20 | `html-entity` | HTML Entity Codec | Encode |
| 21 | `text-escape` | Text Escape / Unescape | Text |
| 22 | `csv-json` | CSV ↔ JSON | Data |
| 23 | `yaml-json` | YAML ↔ JSON | Data |
| 24 | `cron-parser` | Cron Parser | Data |
| 25 | `image-preview` | Bulk Image Preview | Media |
| 26 | `sql-formatter` | SQL Formatter | Data |
| 27 | `fake-data` | Fake Data Generator | Generator |
| 28 | `json-to-class` | JSON to Class | Data |
| 29 | `sql-join-builder` | SQL Join Builder | Data |

## Gotchas

- **Copy safety:** Use `registerCopy(text)` + `copyFromRegistry(id)` for copy buttons — never embed user text directly in HTML attributes (XSS risk). The `_copyRegistry` map holds text by UUID.
- **No routing:** Views toggled via `.hidden` CSS class — welcome screen vs. tool panel.
- **Lazy init:** `init()` is called after `render()` output is injected into the DOM. If you call `init()` before injection, `querySelector` returns null.
- **Category headers in nav:** Dynamically shown/hidden based on search filter — handled in the search logic, not per-tool.
- **Live updates:** Tools like diff checker and regex tester dispatch `input` events to trigger dependent computations as user types.
- **SVG overlays:** For tools with visual canvas (e.g. SQL Join Builder), use an absolutely-positioned SVG over a `position:relative` container. Call `getBoundingClientRect()` relative to the canvas container for line coordinates. Redraw on `resize` and after DOM updates (use `setTimeout(redraw, 50)` after `innerHTML` changes).
- **Click-to-connect pattern:** For interactive linking UIs, store `pending` state in a closure variable. First click sets source, second click on a different element completes the connection. Always provide a cancel path (click same element again).
