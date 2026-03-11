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
- [tools.js](tools.js) — main app logic (2700+ lines), all tool definitions
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

## Gotchas

- **Copy safety:** Use `registerCopy(text)` + `copyFromRegistry(id)` for copy buttons — never embed user text directly in HTML attributes (XSS risk). The `_copyRegistry` map holds text by UUID.
- **No routing:** Views toggled via `.hidden` CSS class — welcome screen vs. tool panel.
- **Lazy init:** `init()` is called after `render()` output is injected into the DOM. If you call `init()` before injection, `querySelector` returns null.
- **Category headers in nav:** Dynamically shown/hidden based on search filter — handled in the search logic, not per-tool.
- **Live updates:** Tools like diff checker and regex tester dispatch `input` events to trigger dependent computations as user types.
