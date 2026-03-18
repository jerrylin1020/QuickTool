/* =====================================================
   QuickTool — Main Application
   =====================================================
   To add a new tool:
   1. Add an entry to the TOOLS array below.
   2. Add a render function: renderMyTool() => HTML string
   3. Add an init function: initMyTool() — attaches event listeners
   ===================================================== */

// =====================
// Tool Definitions
// =====================
const TOOLS = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    icon: '{ }',
    category: 'Data',
    desc: 'Format, validate and minify JSON',
    render: renderJsonFormatter,
    init: initJsonFormatter,
  },
  {
    id: 'string-joiner',
    name: 'String Joiner',
    icon: '🔗',
    category: 'Text',
    desc: 'Join multiple strings with a custom delimiter',
    render: renderStringJoiner,
    init: initStringJoiner,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    icon: 'Aa',
    category: 'Text',
    desc: 'Convert text between different cases',
    render: renderCaseConverter,
    init: initCaseConverter,
  },
  {
    id: 'url-codec',
    name: 'URL Encoder / Decoder',
    icon: '🌐',
    category: 'Encode',
    desc: 'Encode or decode URL components',
    render: renderUrlCodec,
    init: initUrlCodec,
  },
  {
    id: 'base64-codec',
    name: 'Base64 Encoder / Decoder',
    icon: '🔐',
    category: 'Encode',
    desc: 'Encode or decode Base64 strings',
    render: renderBase64Codec,
    init: initBase64Codec,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    icon: '#',
    category: 'Encode',
    desc: 'Generate MD5 / SHA hashes (client-side)',
    render: renderHashGenerator,
    init: initHashGenerator,
  },
  {
    id: 'diff-checker',
    name: 'Text Diff',
    icon: '±',
    category: 'Text',
    desc: 'Compare two texts and highlight differences',
    render: renderDiffChecker,
    init: initDiffChecker,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    icon: '📝',
    category: 'Text',
    desc: 'Count words, characters, lines and more',
    render: renderWordCounter,
    init: initWordCounter,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    icon: '🔎',
    category: 'Text',
    desc: 'Test and debug regular expressions live',
    render: renderRegexTester,
    init: initRegexTester,
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    icon: '🎨',
    category: 'Design',
    desc: 'Convert HEX ↔ RGB ↔ HSL',
    render: renderColorConverter,
    init: initColorConverter,
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    icon: '🕐',
    category: 'Data',
    desc: 'Convert Unix timestamps to human-readable dates',
    render: renderTimestampConverter,
    init: initTimestampConverter,
  },
  {
    id: 'number-base',
    name: 'Number Base Converter',
    icon: '🔢',
    category: 'Data',
    desc: 'Convert between binary, octal, decimal, hex',
    render: renderNumberBase,
    init: initNumberBase,
  },
  {
    id: 'list-compare',
    name: 'List Comparator',
    icon: '⚖️',
    category: 'Data',
    desc: 'Compare two lists — find common, unique, and different items',
    render: renderListCompare,
    init: initListCompare,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    icon: '🔑',
    category: 'Security',
    desc: 'Decode and inspect JWT tokens (header, payload, signature)',
    render: renderJwtDecoder,
    init: initJwtDecoder,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    icon: '🆔',
    category: 'Generator',
    desc: 'Generate UUIDs v4 in bulk',
    render: renderUuidGenerator,
    init: initUuidGenerator,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    icon: '🔒',
    category: 'Generator',
    desc: 'Generate secure random passwords',
    render: renderPasswordGenerator,
    init: initPasswordGenerator,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    icon: '📄',
    category: 'Generator',
    desc: 'Generate placeholder lorem ipsum text',
    render: renderLoremIpsum,
    init: initLoremIpsum,
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    icon: '▦',
    category: 'Generator',
    desc: 'Generate QR codes from any text or URL',
    render: renderQrGenerator,
    init: initQrGenerator,
  },
  {
    id: 'line-sorter',
    name: 'Line Sorter',
    icon: '↕',
    category: 'Text',
    desc: 'Sort, deduplicate, reverse or shuffle lines',
    render: renderLineSorter,
    init: initLineSorter,
  },
  {
    id: 'html-entity',
    name: 'HTML Entity Codec',
    icon: '&',
    category: 'Encode',
    desc: 'Encode and decode HTML entities',
    render: renderHtmlEntity,
    init: initHtmlEntity,
  },
  {
    id: 'text-escape',
    name: 'Text Escape / Unescape',
    icon: '\\',
    category: 'Text',
    desc: 'Escape or unescape JSON strings, newlines, special chars',
    render: renderTextEscape,
    init: initTextEscape,
  },
  {
    id: 'csv-json',
    name: 'CSV ↔ JSON',
    icon: '⇄',
    category: 'Data',
    desc: 'Convert between CSV and JSON formats',
    render: renderCsvJson,
    init: initCsvJson,
  },
  {
    id: 'yaml-json',
    name: 'YAML ↔ JSON',
    icon: '⇄',
    category: 'Data',
    desc: 'Convert between YAML and JSON formats',
    render: renderYamlJson,
    init: initYamlJson,
  },
  {
    id: 'cron-parser',
    name: 'Cron Parser',
    icon: '⏱',
    category: 'Data',
    desc: 'Explain cron expressions in plain language',
    render: renderCronParser,
    init: initCronParser,
  },
  {
    id: 'image-preview',
    name: 'Bulk Image Preview',
    icon: '🖼',
    category: 'Media',
    desc: 'Preview images from a URL template + variable list',
    render: renderImagePreview,
    init: initImagePreview,
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    icon: '🗄',
    category: 'Data',
    desc: 'Format and minify SQL — supports MySQL, PostgreSQL, SQLite and more',
    render: renderSqlFormatter,
    init: initSqlFormatter,
  },
  {
    id: 'fake-data',
    name: 'Fake Data Generator',
    icon: '🎲',
    category: 'Generator',
    desc: 'Generate realistic fake data — names, emails, addresses and more',
    render: renderFakeData,
    init: initFakeData,
  },
  {
    id: 'json-to-class',
    name: 'JSON to Class',
    icon: '{ }',
    category: 'Data',
    desc: 'Convert JSON to typed class/interface — C#, TypeScript, Python, Java, Go, Kotlin',
    render: renderJsonToClass,
    init: initJsonToClass,
  },
  {
    id: 'sql-join-builder',
    name: 'SQL Join Builder',
    icon: '⋈',
    category: 'Data',
    desc: 'Paste SQL schemas, draw column relations visually, generate JOIN queries',
    render: renderSqlJoinBuilder,
    init: initSqlJoinBuilder,
  },
];

// =====================
// App State
// =====================
let currentToolId = null;

// =====================
// Pin State
// =====================
let pinnedIds = new Set(JSON.parse(localStorage.getItem('qt-pinned') || '[]'));

function savePinned() {
  localStorage.setItem('qt-pinned', JSON.stringify([...pinnedIds]));
}

function togglePin(id, e) {
  e.stopPropagation();
  if (pinnedIds.has(id)) {
    pinnedIds.delete(id);
  } else {
    pinnedIds.add(id);
  }
  savePinned();
  buildNav();
  buildPinnedBar();
}

function buildPinnedBar() {
  const bar    = document.getElementById('pinnedBar');
  const inner  = document.getElementById('pinnedBarInner');
  const pinned = TOOLS.filter(t => pinnedIds.has(t.id));

  if (pinned.length === 0) {
    bar.classList.add('hidden');
    return;
  }

  bar.classList.remove('hidden');
  inner.innerHTML = pinned.map(t => `
    <button class="pinned-chip" data-tool-id="${t.id}">
      <span class="pinned-chip-icon">${t.icon}</span>
      <span class="pinned-chip-name">${t.name}</span>
      <span class="pinned-chip-unpin" data-unpin-id="${t.id}" title="Unpin">✕</span>
    </button>
  `).join('');

  inner.querySelectorAll('.pinned-chip').forEach(chip => {
    chip.addEventListener('click', e => {
      const unpinBtn = e.target.closest('[data-unpin-id]');
      if (unpinBtn) {
        pinnedIds.delete(unpinBtn.dataset.unpinId);
        savePinned();
        buildNav();
        buildPinnedBar();
      } else {
        openTool(chip.dataset.toolId);
      }
    });
  });
}

// =====================
// Bootstrap
// =====================
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildGrid();
  buildPinnedBar();
  setupSearch();
  setupTheme();
  setupSidebar();

  document.getElementById('backBtn').addEventListener('click', showHome);
  document.getElementById('logoHome').addEventListener('click', showHome);
});

// =====================
// Navigation
// =====================
function buildNav() {
  const nav = document.getElementById('toolNav');
  const categories = {};
  TOOLS.forEach(t => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  nav.innerHTML = '';
  Object.entries(categories).forEach(([cat, tools]) => {
    const label = document.createElement('div');
    label.className = 'category-label';
    label.textContent = cat;
    nav.appendChild(label);

    tools.forEach(tool => {
      const isPinned = pinnedIds.has(tool.id);
      const btn = document.createElement('button');
      btn.className = 'nav-item' + (isPinned ? ' pinned' : '');
      btn.dataset.toolId = tool.id;
      btn.innerHTML = `
        <span class="nav-icon">${tool.icon}</span>
        <span class="tool-label">${tool.name}</span>
        <span class="pin-btn" title="${isPinned ? 'Unpin' : 'Pin to header'}">${isPinned ? '📌' : '📌'}</span>
      `;
      btn.addEventListener('click', () => openTool(tool.id));
      btn.querySelector('.pin-btn').addEventListener('click', e => togglePin(tool.id, e));
      nav.appendChild(btn);
    });
  });
}

function buildGrid() {
  const grid = document.getElementById('toolGrid');
  grid.innerHTML = TOOLS.map(t => `
    <div class="tool-card" data-tool-id="${t.id}">
      <div class="tool-card-icon">${t.icon}</div>
      <div class="tool-card-name">${t.name}</div>
      <div class="tool-card-desc">${t.desc}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.toolId));
  });
}

function openTool(id) {
  const tool = TOOLS.find(t => t.id === id);
  if (!tool) return;

  currentToolId = id;

  document.getElementById('toolTitle').textContent = `${tool.icon}  ${tool.name}`;
  document.getElementById('toolDesc').textContent = tool.desc;
  const toolBody = document.getElementById('toolBody');
  toolBody.style.maxWidth = '';  // reset any per-tool override
  toolBody.innerHTML = tool.render();

  document.getElementById('welcomeScreen').classList.add('hidden');
  document.getElementById('toolView').classList.remove('hidden');

  // Highlight active nav item
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.toolId === id);
  });

  tool.init();
  restoreToolState(id);
  setupToolStateAutoSave(id);
}

function showHome() {
  currentToolId = null;
  document.getElementById('welcomeScreen').classList.remove('hidden');
  document.getElementById('toolView').classList.add('hidden');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
}

// =====================
// Tool State Persistence
// =====================
const STATE_PREFIX = 'qt-state-';
// Elements whose values we skip restoring (outputs / read-only)
const SKIP_IDS = new Set();

function getToolStateKey(id) { return STATE_PREFIX + id; }

function saveToolState(id) {
  const body = document.getElementById('toolBody');
  if (!body) return;
  const state = {};
  body.querySelectorAll('input[id], textarea[id], select[id]').forEach(el => {
    if (el.readOnly || el.disabled) return;
    state[el.id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  localStorage.setItem(getToolStateKey(id), JSON.stringify(state));
}

function restoreToolState(id) {
  const raw = localStorage.getItem(getToolStateKey(id));
  if (!raw) return;
  let state;
  try { state = JSON.parse(raw); } catch { return; }

  const body = document.getElementById('toolBody');
  if (!body) return;

  Object.entries(state).forEach(([elId, val]) => {
    const el = document.getElementById(elId);
    if (!el || el.readOnly || el.disabled) return;
    if (el.type === 'checkbox') {
      el.checked = val;
    } else {
      el.value = val;
    }
    // Dispatch input event so tools react (e.g. live preview tools)
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

function setupToolStateAutoSave(id) {
  const body = document.getElementById('toolBody');
  if (!body) return;
  // Debounced save — avoids excessive writes while typing
  let timer;
  body.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => saveToolState(id), 400);
  });
  body.addEventListener('change', () => saveToolState(id));
}

// =====================
// Search
// =====================
function setupSearch() {
  const input = document.getElementById('toolSearch');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.nav-item').forEach(el => {
      const label = el.querySelector('.tool-label');
      if (!label) return;
      const match = label.textContent.toLowerCase().includes(q);
      el.style.display = match ? '' : 'none';
    });
    // Also hide category labels when all children hidden
    document.querySelectorAll('.category-label').forEach(cat => {
      let next = cat.nextElementSibling;
      let allHidden = true;
      while (next && !next.classList.contains('category-label')) {
        if (next.style.display !== 'none') { allHidden = false; break; }
        next = next.nextElementSibling;
      }
      cat.style.display = allHidden ? 'none' : '';
    });
  });
}

// =====================
// Theme
// =====================
function setupTheme() {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('qt-theme') || 'light';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('qt-theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// =====================
// Sidebar toggle
// =====================
function setupSidebar() {
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
}

// =====================
// Utility helpers
// =====================

// Safe copy registry — avoids embedding arbitrary text in HTML onclick attributes
const _copyRegistry = new Map();
let _copyIdCounter = 0;
function registerCopy(text) {
  const id = 'cp_' + (_copyIdCounter++);
  _copyRegistry.set(id, text);
  return id;
}
function copyFromRegistry(id) {
  const text = _copyRegistry.get(id);
  if (text !== undefined) copyToClipboard(text);
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showCopyFeedback())
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (_) {
    showCopyFeedback('Copy failed — please copy manually');
  }
  document.body.removeChild(ta);
}

function showCopyFeedback(msg = 'Copied to clipboard!') {
  let el = document.querySelector('.copy-feedback');
  if (!el) {
    el = document.createElement('div');
    el.className = 'copy-feedback';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// =====================
// 1. JSON Formatter
// =====================
function renderJsonFormatter() {
  return `
    <div class="card">
      <div class="row">
        <div style="flex:1">
          <label class="field-label">Input JSON</label>
          <textarea class="mono" id="jf-input" rows="12" placeholder='Paste your JSON here...'></textarea>
        </div>
      </div>
      <div class="btn-group" style="margin-bottom:12px">
        <button class="btn" id="jf-format">Format ✨</button>
        <button class="btn btn-ghost" id="jf-minify">Minify</button>
        <button class="btn btn-ghost" id="jf-validate">Validate</button>
        <button class="btn btn-ghost" id="jf-clear">Clear</button>
        <select id="jf-indent" style="width:auto">
          <option value="2">2 spaces</option>
          <option value="4">4 spaces</option>
          <option value="tab">Tab</option>
        </select>
      </div>
      <div id="jf-status"></div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="jf-output" rows="14" readonly placeholder="Formatted JSON will appear here..."></textarea>
        <button class="btn btn-sm" id="jf-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initJsonFormatter() {
  const input = document.getElementById('jf-input');
  const output = document.getElementById('jf-output');
  const statusEl = document.getElementById('jf-status');
  const indentSel = document.getElementById('jf-indent');

  function getIndent() {
    const v = indentSel.value;
    return v === 'tab' ? '\t' : parseInt(v);
  }

  function setStatus(type, msg) {
    statusEl.innerHTML = `<div class="status-bar ${type}">${msg}</div>`;
  }

  document.getElementById('jf-format').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value.trim());
      output.value = JSON.stringify(parsed, null, getIndent());
      setStatus('success', '✓ Valid JSON — formatted successfully');
    } catch (e) {
      setStatus('error', '✗ Invalid JSON: ' + e.message);
    }
  });

  document.getElementById('jf-minify').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value.trim());
      output.value = JSON.stringify(parsed);
      setStatus('success', '✓ Minified');
    } catch (e) {
      setStatus('error', '✗ Invalid JSON: ' + e.message);
    }
  });

  document.getElementById('jf-validate').addEventListener('click', () => {
    try {
      JSON.parse(input.value.trim());
      setStatus('success', '✓ Valid JSON');
    } catch (e) {
      setStatus('error', '✗ ' + e.message);
    }
  });

  document.getElementById('jf-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('jf-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });

  // Auto-format on paste
  input.addEventListener('paste', () => {
    setTimeout(() => {
      try {
        const parsed = JSON.parse(input.value.trim());
        output.value = JSON.stringify(parsed, null, getIndent());
        setStatus('success', '✓ Auto-formatted on paste');
      } catch (_) { /* silent */ }
    }, 50);
  });
}

// =====================
// 2. String Joiner
// =====================
function renderStringJoiner() {
  return `
    <div class="card">
      <label class="field-label">Enter strings (one per line) <span id="sj-in-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
      <textarea id="sj-input" rows="10" placeholder="apple&#10;banana&#10;cherry"></textarea>
      <div class="row" style="margin-top:12px;align-items:flex-end">
        <div style="flex:1">
          <label class="field-label">Delimiter</label>
          <input type="text" id="sj-delim" value=", " />
        </div>
        <div>
          <label class="field-label">Quick Delimiters</label>
          <div class="btn-group">
            <button class="btn btn-ghost btn-sm sj-preset" data-v=", ">Comma</button>
            <button class="btn btn-ghost btn-sm sj-preset" data-v=" | ">Pipe</button>
            <button class="btn btn-ghost btn-sm sj-preset" data-v=" ">Space</button>
            <button class="btn btn-ghost btn-sm sj-preset" data-v="&#10;">Newline</button>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:8px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="sj-trim" checked /> Trim whitespace from each item
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="sj-empty" /> Remove empty lines
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="sj-quote" /> Wrap items in quotes
        </label>
      </div>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="sj-join">Join</button>
        <button class="btn btn-ghost" id="sj-split">Split back</button>
        <button class="btn btn-ghost" id="sj-clear">Clear</button>
      </div>
      <div id="sj-status"></div>
      <label class="field-label">Result</label>
      <div style="position:relative">
        <textarea id="sj-output" rows="5" class="mono" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="sj-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initStringJoiner() {
  const input = document.getElementById('sj-input');
  const output = document.getElementById('sj-output');
  const delimEl = document.getElementById('sj-delim');
  const trimEl = document.getElementById('sj-trim');
  const emptyEl = document.getElementById('sj-empty');
  const quoteEl = document.getElementById('sj-quote');
  const statusEl = document.getElementById('sj-status');

  function updateSjInCount() {
    const n = input.value.split('\n').filter(l => l.trim() !== '').length;
    document.getElementById('sj-in-count').textContent = n ? `(${n})` : '';
  }
  input.addEventListener('input', updateSjInCount);
  updateSjInCount();

  document.querySelectorAll('.sj-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      delimEl.value = btn.dataset.v;
    });
  });

  document.getElementById('sj-join').addEventListener('click', () => {
    let lines = input.value.split('\n');
    if (trimEl.checked) lines = lines.map(l => l.trim());
    if (emptyEl.checked) lines = lines.filter(l => l !== '');
    if (quoteEl.checked) lines = lines.map(l => `"${l}"`);
    const delim = delimEl.value
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
    output.value = lines.join(delim);
    statusEl.innerHTML = `<div class="status-bar info">Joined ${lines.length} items</div>`;
  });

  document.getElementById('sj-split').addEventListener('click', () => {
    const delim = delimEl.value.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const parts = output.value.split(delim);
    input.value = parts.join('\n');
    statusEl.innerHTML = `<div class="status-bar info">Split into ${parts.length} items</div>`;
  });

  document.getElementById('sj-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('sj-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}

// =====================
// 3. Case Converter
// =====================
function renderCaseConverter() {
  return `
    <div class="card">
      <label class="field-label">Input Text</label>
      <textarea id="cc-input" rows="7" placeholder="Type or paste text here..."></textarea>
      <div class="pill-group" style="margin-top:12px" id="cc-modes">
        <button class="pill active" data-mode="upper">UPPER CASE</button>
        <button class="pill" data-mode="lower">lower case</button>
        <button class="pill" data-mode="title">Title Case</button>
        <button class="pill" data-mode="sentence">Sentence case</button>
        <button class="pill" data-mode="camel">camelCase</button>
        <button class="pill" data-mode="pascal">PascalCase</button>
        <button class="pill" data-mode="snake">snake_case</button>
        <button class="pill" data-mode="kebab">kebab-case</button>
        <button class="pill" data-mode="constant">CONSTANT_CASE</button>
        <button class="pill" data-mode="toggle">tOgGlE</button>
      </div>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="cc-convert">Convert</button>
        <button class="btn btn-ghost" id="cc-clear">Clear</button>
      </div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea id="cc-output" rows="7" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="cc-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initCaseConverter() {
  const input = document.getElementById('cc-input');
  const output = document.getElementById('cc-output');
  let activeMode = 'upper';

  document.querySelectorAll('#cc-modes .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#cc-modes .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeMode = pill.dataset.mode;
    });
  });

  function toWords(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
  }

  function convert(text, mode) {
    switch (mode) {
      case 'upper':    return text.toUpperCase();
      case 'lower':    return text.toLowerCase();
      case 'title':    return text.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
      case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      case 'camel':    { const w = toWords(text.toLowerCase()); return w[0] + w.slice(1).map(s => s[0].toUpperCase() + s.slice(1)).join(''); }
      case 'pascal':   return toWords(text.toLowerCase()).map(s => s[0].toUpperCase() + s.slice(1)).join('');
      case 'snake':    return toWords(text).join('_').toLowerCase();
      case 'kebab':    return toWords(text).join('-').toLowerCase();
      case 'constant': return toWords(text).join('_').toUpperCase();
      case 'toggle':   return [...text].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
      default:         return text;
    }
  }

  document.getElementById('cc-convert').addEventListener('click', () => {
    output.value = convert(input.value, activeMode);
  });

  // Live conversion
  input.addEventListener('input', () => {
    output.value = convert(input.value, activeMode);
  });

  document.getElementById('cc-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
  });

  document.getElementById('cc-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}

// =====================
// 4. URL Encoder / Decoder
// =====================
function renderUrlCodec() {
  return `
    <div class="card">
      <label class="field-label">Input</label>
      <textarea class="mono" id="uc-input" rows="7" placeholder="Enter URL or text to encode/decode..."></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="uc-encode">Encode</button>
        <button class="btn btn-ghost" id="uc-decode">Decode</button>
        <button class="btn btn-ghost" id="uc-clear">Clear</button>
      </div>
      <div id="uc-status"></div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="uc-output" rows="7" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="uc-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initUrlCodec() {
  const input = document.getElementById('uc-input');
  const output = document.getElementById('uc-output');
  const statusEl = document.getElementById('uc-status');

  document.getElementById('uc-encode').addEventListener('click', () => {
    output.value = encodeURIComponent(input.value);
    statusEl.innerHTML = '<div class="status-bar success">✓ Encoded</div>';
  });

  document.getElementById('uc-decode').addEventListener('click', () => {
    try {
      output.value = decodeURIComponent(input.value);
      statusEl.innerHTML = '<div class="status-bar success">✓ Decoded</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('uc-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('uc-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}

// =====================
// 5. Base64 Encoder / Decoder
// =====================
function renderBase64Codec() {
  return `
    <div class="card">
      <label class="field-label">Input</label>
      <textarea class="mono" id="b64-input" rows="7" placeholder="Enter text or Base64 string..."></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="b64-encode">Encode to Base64</button>
        <button class="btn btn-ghost" id="b64-decode">Decode from Base64</button>
        <button class="btn btn-ghost" id="b64-clear">Clear</button>
      </div>
      <div id="b64-status"></div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="b64-output" rows="7" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="b64-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initBase64Codec() {
  const input = document.getElementById('b64-input');
  const output = document.getElementById('b64-output');
  const statusEl = document.getElementById('b64-status');

  document.getElementById('b64-encode').addEventListener('click', () => {
    try {
      output.value = btoa(String.fromCharCode(...new TextEncoder().encode(input.value)));
      statusEl.innerHTML = '<div class="status-bar success">✓ Encoded to Base64</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('b64-decode').addEventListener('click', () => {
    try {
      output.value = new TextDecoder().decode(Uint8Array.from(atob(input.value.trim()), c => c.charCodeAt(0)));
      statusEl.innerHTML = '<div class="status-bar success">✓ Decoded from Base64</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ Invalid Base64: ${e.message}</div>`;
    }
  });

  document.getElementById('b64-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('b64-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}

// =====================
// 6. Hash Generator (SHA-256 via Web Crypto)
// =====================
function renderHashGenerator() {
  return `
    <div class="card">
      <label class="field-label">Input Text</label>
      <textarea id="hg-input" rows="6" placeholder="Type text to hash..."></textarea>
      <div class="row" style="margin-top:12px;align-items:flex-end">
        <div>
          <label class="field-label">Algorithm</label>
          <select id="hg-algo" style="width:auto">
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256" selected>SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>
        <div>
          <label class="field-label">Output format</label>
          <select id="hg-fmt" style="width:auto">
            <option value="hex">HEX</option>
            <option value="base64">Base64</option>
          </select>
        </div>
        <button class="btn" id="hg-hash">Generate Hash</button>
      </div>
      <div id="hg-results" style="margin-top:14px"></div>
    </div>
  `;
}

function initHashGenerator() {
  const input = document.getElementById('hg-input');

  document.getElementById('hg-hash').addEventListener('click', async () => {
    const text = input.value;
    const algo = document.getElementById('hg-algo').value;
    const fmt = document.getElementById('hg-fmt').value;
    const resultsEl = document.getElementById('hg-results');

    if (!text) {
      resultsEl.innerHTML = '<div class="status-bar error">Please enter some text first.</div>';
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      let result;
      if (fmt === 'hex') {
        result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } else {
        result = btoa(String.fromCharCode(...hashArray));
      }

      resultsEl.innerHTML = `
        <label class="field-label">${algo} (${fmt.toUpperCase()})</label>
        <div style="position:relative">
          <input type="text" class="mono" id="hg-output" readonly value="${result}" />
          <button class="btn btn-sm" onclick="copyToClipboard(document.getElementById('hg-output').value)" style="position:absolute;top:50%;right:8px;transform:translateY(-50%)">Copy</button>
        </div>
      `;
    } catch (e) {
      resultsEl.innerHTML = `<div class="status-bar error">✗ Error: ${e.message}</div>`;
    }
  });

  // Auto-hash on input
  input.addEventListener('input', () => {
    if (input.value) document.getElementById('hg-hash').click();
  });
}

// =====================
// 7. Text Diff
// =====================
function renderDiffChecker() {
  return `
    <div class="split-pane">
      <div>
        <label class="field-label">Original</label>
        <textarea id="dc-orig" rows="16" placeholder="Paste original text here..."></textarea>
      </div>
      <div>
        <label class="field-label">Modified</label>
        <textarea id="dc-mod" rows="16" placeholder="Paste modified text here..."></textarea>
      </div>
    </div>
    <div class="btn-group" style="margin:12px 0">
      <button class="btn" id="dc-diff">Compare</button>
      <button class="btn btn-ghost" id="dc-clear">Clear</button>
    </div>
    <div id="dc-result"></div>
  `;
}

function initDiffChecker() {
  function diffLines(a, b) {
    const aLines = a.split('\n');
    const bLines = b.split('\n');
    const result = [];

    // Simple LCS-based diff
    const m = aLines.length, n = bLines.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = m-1; i >= 0; i--) {
      for (let j = n-1; j >= 0; j--) {
        dp[i][j] = aLines[i] === bLines[j] ? dp[i+1][j+1]+1 : Math.max(dp[i+1][j], dp[i][j+1]);
      }
    }

    let i = 0, j = 0;
    while (i < m || j < n) {
      if (i < m && j < n && aLines[i] === bLines[j]) {
        result.push({ type: 'same', line: aLines[i] });
        i++; j++;
      } else if (j < n && (i >= m || dp[i][j+1] >= dp[i+1][j])) {
        result.push({ type: 'add', line: bLines[j] });
        j++;
      } else {
        result.push({ type: 'remove', line: aLines[i] });
        i++;
      }
    }
    return result;
  }

  document.getElementById('dc-diff').addEventListener('click', () => {
    const a = document.getElementById('dc-orig').value;
    const b = document.getElementById('dc-mod').value;
    const diff = diffLines(a, b);
    const resultEl = document.getElementById('dc-result');

    const adds = diff.filter(d => d.type === 'add').length;
    const removes = diff.filter(d => d.type === 'remove').length;

    const html = diff.map(d => {
      const bg = d.type === 'add' ? '#d1fae5' : d.type === 'remove' ? '#fee2e2' : 'transparent';
      const dbg = d.type === 'add' ? '#052e16' : d.type === 'remove' ? '#450a0a' : 'transparent';
      const prefix = d.type === 'add' ? '+ ' : d.type === 'remove' ? '− ' : '  ';
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const finalBg = isDark ? dbg : bg;
      return `<div style="background:${finalBg};padding:2px 8px;font-family:var(--mono);font-size:13px;white-space:pre-wrap;word-break:break-all">${prefix}${escapeHtml(d.line)}</div>`;
    }).join('');

    resultEl.innerHTML = `
      <div class="status-bar info" style="margin-bottom:10px">
        <span style="color:#16a34a;font-weight:700">+${adds} added</span>&nbsp;&nbsp;
        <span style="color:#dc2626;font-weight:700">−${removes} removed</span>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        <div style="overflow:auto;max-height:400px">${html}</div>
      </div>
    `;
  });

  document.getElementById('dc-clear').addEventListener('click', () => {
    document.getElementById('dc-orig').value = '';
    document.getElementById('dc-mod').value = '';
    document.getElementById('dc-result').innerHTML = '';
  });
}

// =====================
// 8. Word Counter
// =====================
function renderWordCounter() {
  return `
    <div class="card">
      <label class="field-label">Text</label>
      <textarea id="wc-input" rows="14" placeholder="Start typing or paste text here..." style="min-height:200px"></textarea>
      <div class="stat-row" style="margin-top:14px" id="wc-stats">
        <div class="stat-chip">Words: <span id="wc-words">0</span></div>
        <div class="stat-chip">Characters: <span id="wc-chars">0</span></div>
        <div class="stat-chip">Characters (no spaces): <span id="wc-chars-ns">0</span></div>
        <div class="stat-chip">Lines: <span id="wc-lines">0</span></div>
        <div class="stat-chip">Sentences: <span id="wc-sentences">0</span></div>
        <div class="stat-chip">Paragraphs: <span id="wc-paras">0</span></div>
        <div class="stat-chip">Read time: <span id="wc-read">0 sec</span></div>
      </div>
    </div>
  `;
}

function initWordCounter() {
  const input = document.getElementById('wc-input');

  function update() {
    const text = input.value;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNS = text.replace(/\s/g, '').length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const sentences = (text.match(/[.!?]+/g) || []).length;
    const paras = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n+/).length;
    const readSec = Math.round((words / 200) * 60);
    const readTime = readSec < 60 ? `${readSec} sec` : `${Math.floor(readSec/60)}m ${readSec%60}s`;

    document.getElementById('wc-words').textContent = words.toLocaleString();
    document.getElementById('wc-chars').textContent = chars.toLocaleString();
    document.getElementById('wc-chars-ns').textContent = charsNS.toLocaleString();
    document.getElementById('wc-lines').textContent = lines.toLocaleString();
    document.getElementById('wc-sentences').textContent = sentences.toLocaleString();
    document.getElementById('wc-paras').textContent = paras.toLocaleString();
    document.getElementById('wc-read').textContent = readTime;
  }

  input.addEventListener('input', update);
  update();
}

// =====================
// 9. Regex Tester
// =====================
function renderRegexTester() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end">
        <div style="flex:1">
          <label class="field-label">Regular Expression</label>
          <input type="text" class="mono" id="rt-pattern" placeholder="Enter regex pattern..." />
        </div>
        <div style="width:80px">
          <label class="field-label">Flags</label>
          <input type="text" class="mono" id="rt-flags" value="gm" placeholder="gmi" style="width:100%" />
        </div>
      </div>
      <div id="rt-regex-status" style="margin-top:6px"></div>
      <label class="field-label" style="margin-top:12px">Test String</label>
      <div id="rt-highlighted" class="mono" style="min-height:120px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:var(--radius-sm);padding:9px 12px;font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all;position:relative;overflow:auto;display:none"></div>
      <textarea class="mono" id="rt-test" rows="7" placeholder="Type test string here..."></textarea>
      <div id="rt-matches" style="margin-top:10px"></div>
    </div>
  `;
}

function initRegexTester() {
  const patEl = document.getElementById('rt-pattern');
  const flagsEl = document.getElementById('rt-flags');
  const testEl = document.getElementById('rt-test');
  const matchesEl = document.getElementById('rt-matches');
  const statusEl = document.getElementById('rt-regex-status');

  function run() {
    const pattern = patEl.value;
    const flags = flagsEl.value.replace(/[^gimsuy]/g, '');
    const text = testEl.value;

    if (!pattern) {
      matchesEl.innerHTML = '';
      statusEl.innerHTML = '';
      return;
    }

    try {
      new RegExp(pattern, flags);
      statusEl.innerHTML = '<div class="status-bar success">✓ Valid regex</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
      matchesEl.innerHTML = '';
      return;
    }

    const matches = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];

    if (matches.length === 0) {
      matchesEl.innerHTML = '<div class="status-bar info">No matches found</div>';
      return;
    }

    // Highlight in text
    let highlighted = '';
    let last = 0;
    matches.forEach(m => {
      const start = m.index;
      const end = start + m[0].length;
      highlighted += escapeHtml(text.slice(last, start));
      highlighted += `<mark style="background:#fbbf24;color:#1c1917;border-radius:3px">${escapeHtml(m[0])}</mark>`;
      last = end;
    });
    highlighted += escapeHtml(text.slice(last));

    matchesEl.innerHTML = `
      <div class="status-bar success" style="margin-bottom:10px">
        ✓ ${matches.length} match${matches.length !== 1 ? 'es' : ''} found
      </div>
      <label class="field-label">Highlighted Matches</label>
      <div class="mono" style="background:var(--input-bg);border:1px solid var(--input-border);border-radius:var(--radius-sm);padding:9px 12px;font-size:13px;line-height:1.8;white-space:pre-wrap;word-break:break-all;margin-bottom:10px">${highlighted}</div>
      <label class="field-label">Match Details</label>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${matches.slice(0, 100).map((m, i) => `
          <div class="card" style="padding:8px 12px;margin:0">
            <span style="color:var(--accent);font-weight:700;font-size:12px">Match ${i+1}</span>
            <span class="mono" style="margin-left:10px;font-size:13px">${escapeHtml(m[0])}</span>
            <span style="color:var(--text-muted);font-size:12px;margin-left:10px">at index ${m.index}</span>
            ${m.length > 1 ? `<div style="margin-top:4px;font-size:12px;color:var(--text-muted)">Groups: ${m.slice(1).map((g,gi) => `<span class="mono">[${gi+1}] ${escapeHtml(g||'undefined')}</span>`).join(', ')}</div>` : ''}
          </div>
        `).join('')}
        ${matches.length > 100 ? `<div class="status-bar info">... and ${matches.length - 100} more matches</div>` : ''}
      </div>
    `;
  }

  patEl.addEventListener('input', run);
  flagsEl.addEventListener('input', run);
  testEl.addEventListener('input', run);
}

// =====================
// 10. Color Converter
// =====================
function renderColorConverter() {
  return `
    <div class="card">
      <div class="row" style="align-items:center;margin-bottom:16px">
        <div>
          <label class="field-label">Color Preview</label>
          <div id="cc2-preview" style="width:80px;height:80px;border-radius:var(--radius);border:2px solid var(--border);background:#7c3aed"></div>
        </div>
        <div style="flex:1">
          <div style="margin-bottom:12px">
            <label class="field-label">HEX</label>
            <input type="text" class="mono" id="cc2-hex" value="#7c3aed" placeholder="#rrggbb" />
          </div>
          <input type="color" id="cc2-picker" value="#7c3aed" style="width:100%;height:36px;border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;padding:2px" />
        </div>
      </div>
      <div class="row">
        <div style="flex:1">
          <label class="field-label">RGB</label>
          <input type="text" class="mono" id="cc2-rgb" placeholder="rgb(r, g, b)" />
        </div>
        <div style="flex:1">
          <label class="field-label">HSL</label>
          <input type="text" class="mono" id="cc2-hsl" placeholder="hsl(h, s%, l%)" />
        </div>
      </div>
      <div class="row" style="margin-top:8px">
        <div style="flex:1">
          <label class="field-label">CSS Variable</label>
          <input type="text" class="mono" id="cc2-css" readonly />
        </div>
      </div>
      <div style="margin-top:16px" id="cc2-swatches">
        <label class="field-label">Shades</label>
        <div id="cc2-shade-row" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"></div>
      </div>
    </div>
  `;
}

function initColorConverter() {
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const n = parseInt(hex, 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max+min)/2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h = ((g-b)/d + (g<b?6:0))/6; break;
        case g: h = ((b-r)/d+2)/6; break;
        case b: h = ((r-g)/d+4)/6; break;
      }
    }
    return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
  }

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h/30) % 12;
    const a = s * Math.min(l, 1-l);
    const f = n => l - a*Math.max(-1, Math.min(k(n)-3, 9-k(n), 1));
    return [Math.round(f(0)*255), Math.round(f(8)*255), Math.round(f(4)*255)];
  }

  function updateAll(r, g, b) {
    const hex = '#' + [r,g,b].map(c => c.toString(16).padStart(2,'0')).join('');
    const [h, s, l] = rgbToHsl(r, g, b);
    document.getElementById('cc2-hex').value = hex;
    document.getElementById('cc2-rgb').value = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('cc2-hsl').value = `hsl(${h}, ${s}%, ${l}%)`;
    document.getElementById('cc2-css').value = `--color: ${hex};`;
    document.getElementById('cc2-preview').style.background = hex;
    document.getElementById('cc2-picker').value = hex;

    // Shades
    const shades = [90, 80, 70, 60, 50, 40, 30, 20];
    const row = document.getElementById('cc2-shade-row');
    row.innerHTML = shades.map(sl => {
      const [sr, sg, sb] = hslToRgb(h, s, sl);
      const shadeHex = '#' + [sr,sg,sb].map(c => c.toString(16).padStart(2,'0')).join('');
      return `<div title="${shadeHex}" style="width:40px;height:40px;border-radius:6px;background:${shadeHex};border:1px solid rgba(0,0,0,0.1);cursor:pointer" onclick="copyToClipboard('${shadeHex}')"></div>`;
    }).join('');
  }

  // Init with default
  const [r,g,b] = hexToRgb('#7c3aed');
  updateAll(r, g, b);

  document.getElementById('cc2-hex').addEventListener('input', e => {
    const val = e.target.value.trim();
    if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
      const [r,g,b] = hexToRgb(val);
      updateAll(r, g, b);
    }
  });

  document.getElementById('cc2-picker').addEventListener('input', e => {
    const [r,g,b] = hexToRgb(e.target.value);
    updateAll(r, g, b);
  });

  document.getElementById('cc2-rgb').addEventListener('change', e => {
    const m = e.target.value.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (m) updateAll(+m[1], +m[2], +m[3]);
  });

  document.getElementById('cc2-hsl').addEventListener('change', e => {
    const m = e.target.value.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/);
    if (m) { const [r,g,b] = hslToRgb(+m[1], +m[2], +m[3]); updateAll(r,g,b); }
  });
}

// =====================
// 11. Timestamp Converter
// =====================
function renderTimestampConverter() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end">
        <div style="flex:1">
          <label class="field-label">Unix Timestamp (seconds or ms)</label>
          <input type="number" class="mono" id="ts-unix" placeholder="e.g. 1700000000" />
        </div>
        <button class="btn" id="ts-now">Use Now</button>
        <button class="btn btn-ghost" id="ts-convert">Convert</button>
      </div>
      <div id="ts-results" style="margin-top:14px"></div>
      <hr style="border:none;border-top:1px solid var(--border);margin:20px 0" />
      <label class="field-label">Human Date → Timestamp</label>
      <div class="row" style="align-items:flex-end">
        <div style="flex:1">
          <input type="text" id="ts-human" placeholder="e.g. 2024-01-15 08:30:00" />
        </div>
        <button class="btn btn-ghost" id="ts-to-unix">→ Unix</button>
      </div>
      <div id="ts-human-result" style="margin-top:10px"></div>
    </div>
  `;
}

function initTimestampConverter() {
  function convert(ts) {
    let ms = ts;
    if (String(ts).length <= 10) ms = ts * 1000;
    const d = new Date(ms);
    if (isNaN(d)) return null;
    return {
      utc: d.toUTCString(),
      iso: d.toISOString(),
      local: d.toLocaleString(),
      relative: getRelative(d),
    };
  }

  function getRelative(d) {
    const diff = Date.now() - d.getTime();
    const abs = Math.abs(diff);
    const future = diff < 0;
    const units = [[31536000000,'year'],[2592000000,'month'],[86400000,'day'],[3600000,'hour'],[60000,'minute'],[1000,'second']];
    for (const [ms, label] of units) {
      const n = Math.floor(abs / ms);
      if (n >= 1) return future ? `in ${n} ${label}${n>1?'s':''}` : `${n} ${label}${n>1?'s':''} ago`;
    }
    return 'just now';
  }

  function showResults(info) {
    document.getElementById('ts-results').innerHTML = `
      <div class="stat-row">
        <div class="stat-chip" style="flex:1">UTC<br><span style="font-family:var(--mono)">${info.utc}</span></div>
      </div>
      <div class="stat-row">
        <div class="stat-chip" style="flex:1">ISO 8601<br><span style="font-family:var(--mono)">${info.iso}</span></div>
        <div class="stat-chip" style="flex:1">Local<br><span style="font-family:var(--mono)">${info.local}</span></div>
      </div>
      <div class="stat-row">
        <div class="stat-chip">Relative: <span>${info.relative}</span></div>
      </div>
    `;
  }

  document.getElementById('ts-now').addEventListener('click', () => {
    const now = Math.floor(Date.now() / 1000);
    document.getElementById('ts-unix').value = now;
    const info = convert(now);
    if (info) showResults(info);
  });

  document.getElementById('ts-convert').addEventListener('click', () => {
    const val = parseInt(document.getElementById('ts-unix').value);
    if (isNaN(val)) { document.getElementById('ts-results').innerHTML = '<div class="status-bar error">Enter a valid timestamp</div>'; return; }
    const info = convert(val);
    if (info) showResults(info);
    else document.getElementById('ts-results').innerHTML = '<div class="status-bar error">Invalid timestamp</div>';
  });

  document.getElementById('ts-to-unix').addEventListener('click', () => {
    const val = document.getElementById('ts-human').value;
    const d = new Date(val);
    const el = document.getElementById('ts-human-result');
    if (isNaN(d)) { el.innerHTML = '<div class="status-bar error">Cannot parse date string</div>'; return; }
    el.innerHTML = `
      <div class="stat-row">
        <div class="stat-chip">Seconds: <span class="mono">${Math.floor(d.getTime()/1000)}</span></div>
        <div class="stat-chip">Milliseconds: <span class="mono">${d.getTime()}</span></div>
      </div>
    `;
  });
}

// =====================
// 12. Number Base Converter
// =====================
function renderNumberBase() {
  return `
    <div class="card">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <label class="field-label">Decimal (Base 10)</label>
          <input type="text" class="mono" id="nb-dec" placeholder="255" />
        </div>
        <div>
          <label class="field-label">Binary (Base 2)</label>
          <input type="text" class="mono" id="nb-bin" placeholder="11111111" />
        </div>
        <div>
          <label class="field-label">Octal (Base 8)</label>
          <input type="text" class="mono" id="nb-oct" placeholder="377" />
        </div>
        <div>
          <label class="field-label">Hexadecimal (Base 16)</label>
          <input type="text" class="mono" id="nb-hex" placeholder="FF" />
        </div>
      </div>
      <div id="nb-status" style="margin-top:10px"></div>
    </div>
  `;
}

function initNumberBase() {
  const fields = [
    { id: 'nb-dec', base: 10 },
    { id: 'nb-bin', base: 2 },
    { id: 'nb-oct', base: 8 },
    { id: 'nb-hex', base: 16 },
  ];

  fields.forEach(({ id, base }) => {
    document.getElementById(id).addEventListener('input', e => {
      const val = e.target.value.trim().toUpperCase();
      if (!val) { fields.forEach(f => { if (f.id !== id) document.getElementById(f.id).value = ''; }); return; }

      let dec;
      try {
        dec = parseInt(val, base);
        if (isNaN(dec)) throw new Error('invalid');
      } catch {
        document.getElementById('nb-status').innerHTML = '<div class="status-bar error">Invalid number for this base</div>';
        return;
      }

      document.getElementById('nb-status').innerHTML = '';
      fields.forEach(f => {
        if (f.id !== id) {
          document.getElementById(f.id).value = dec.toString(f.base).toUpperCase();
        }
      });
    });
  });
}

// =====================
// 13. List Comparator
// =====================
function renderListCompare() {
  return `
    <div class="card">
      <div class="split-pane">
        <div>
          <label class="field-label">List A <span id="lc-a-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
          <textarea id="lc-a" rows="12" placeholder="111&#10;2122&#10;3333"></textarea>
        </div>
        <div>
          <label class="field-label">List B <span id="lc-b-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
          <textarea id="lc-b" rows="12" placeholder="2342&#10;111&#10;3333"></textarea>
        </div>
      </div>
      <div class="row" style="margin-top:10px;align-items:center">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="lc-case" /> Case-sensitive
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="lc-trim" checked /> Trim whitespace
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="lc-empty" checked /> Ignore empty lines
        </label>
      </div>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="lc-compare">Compare</button>
        <button class="btn btn-ghost" id="lc-clear">Clear</button>
      </div>
      <div id="lc-results"></div>
    </div>
  `;
}

function initListCompare() {
  function parseList(raw, trim, ignoreEmpty, caseSensitive) {
    let lines = raw.split('\n');
    if (trim) lines = lines.map(l => l.trim());
    if (ignoreEmpty) lines = lines.filter(l => l !== '');
    if (!caseSensitive) lines = lines.map(l => l.toLowerCase());
    return lines;
  }

  function resultBlock(title, color, icon, items, originalMap) {
    if (items.length === 0) return `
      <div class="card" style="margin:0;border-left:3px solid ${color}">
        <div class="card-title" style="color:${color}">${icon} ${title} <span style="font-weight:400;color:var(--text-muted)">(0 items)</span></div>
        <div style="color:var(--text-muted);font-size:13px">None</div>
      </div>`;
    const listHtml = items.map(item => {
      const display = originalMap ? (originalMap.get(item) ?? item) : item;
      return `<div style="font-family:var(--mono);font-size:13px;padding:3px 0;border-bottom:1px solid var(--border)">${escapeHtml(display)}</div>`;
    }).join('');
    return `
      <div class="card" style="margin:0;border-left:3px solid ${color}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="card-title" style="color:${color};margin:0">${icon} ${title} <span style="font-weight:400;color:var(--text-muted)">(${items.length})</span></div>
          <button class="btn btn-ghost btn-sm" onclick="copyFromRegistry('${registerCopy(items.map(i => originalMap ? (originalMap.get(i) ?? i) : i).join('\n'))}')">Copy</button>
        </div>
        <div style="max-height:220px;overflow-y:auto">${listHtml}</div>
      </div>`;
  }

  document.getElementById('lc-compare').addEventListener('click', () => {
    const rawA = document.getElementById('lc-a').value;
    const rawB = document.getElementById('lc-b').value;
    const caseSensitive = document.getElementById('lc-case').checked;
    const trim = document.getElementById('lc-trim').checked;
    const ignoreEmpty = document.getElementById('lc-empty').checked;

    const keyA = parseList(rawA, trim, ignoreEmpty, caseSensitive);
    const keyB = parseList(rawB, trim, ignoreEmpty, caseSensitive);

    // Build original-value maps (key → original display value, first occurrence wins)
    const origA = new Map();
    parseList(rawA, trim, ignoreEmpty, true).forEach((orig) => {
      const key = caseSensitive ? orig : orig.toLowerCase();
      if (!origA.has(key)) origA.set(key, orig);
    });
    const origB = new Map();
    parseList(rawB, trim, ignoreEmpty, true).forEach((orig) => {
      const key = caseSensitive ? orig : orig.toLowerCase();
      if (!origB.has(key)) origB.set(key, orig);
    });

    const setA = new Set(keyA);
    const setB = new Set(keyB);

    const common    = [...setA].filter(x => setB.has(x));
    const onlyInA   = [...setA].filter(x => !setB.has(x));
    const onlyInB   = [...setB].filter(x => !setA.has(x));
    const allUnique = [...new Set([...setA, ...setB])];

    const resultsEl = document.getElementById('lc-results');
    resultsEl.innerHTML = `
      <div class="stat-row" style="margin-bottom:14px">
        <div class="stat-chip">List A: <span>${setA.size}</span></div>
        <div class="stat-chip">List B: <span>${setB.size}</span></div>
        <div class="stat-chip">Common: <span>${common.length}</span></div>
        <div class="stat-chip">Only in A: <span>${onlyInA.length}</span></div>
        <div class="stat-chip">Only in B: <span>${onlyInB.length}</span></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${resultBlock('In Both Lists', '#16a34a', '✓', common, origA)}
        ${resultBlock('Only in A', '#d97706', '◑', onlyInA, origA)}
        ${resultBlock('Only in B', '#7c3aed', '◐', onlyInB, origB)}
        ${resultBlock('All Unique (union)', '#0284c7', '∪', allUnique, origA)}
      </div>
    `;
  });

  document.getElementById('lc-clear').addEventListener('click', () => {
    document.getElementById('lc-a').value = '';
    document.getElementById('lc-b').value = '';
    document.getElementById('lc-results').innerHTML = '';
  });

  function updateLcCounts() {
    ['a', 'b'].forEach(side => {
      const raw = document.getElementById(`lc-${side}`).value;
      const n = raw.split('\n').filter(l => l.trim() !== '').length;
      document.getElementById(`lc-${side}-count`).textContent = n ? `(${n})` : '';
    });
  }

  // Auto-compare on input
  ['lc-a', 'lc-b'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      updateLcCounts();
      if (document.getElementById('lc-a').value || document.getElementById('lc-b').value) {
        document.getElementById('lc-compare').click();
      }
    });
  });
  updateLcCounts();
}

// =====================
// 14. JWT Decoder
// =====================
function renderJwtDecoder() {
  return `
    <div class="card">
      <label class="field-label">JWT Token</label>
      <textarea class="mono" id="jwt-input" rows="5" placeholder="Paste your JWT token here..."></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="jwt-decode">Decode</button>
        <button class="btn btn-ghost" id="jwt-clear">Clear</button>
      </div>
      <div id="jwt-status"></div>
      <div id="jwt-result"></div>
    </div>
  `;
}

function initJwtDecoder() {
  function b64url(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return new TextDecoder().decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));
  }

  function decode() {
    const token = document.getElementById('jwt-input').value.trim();
    const statusEl = document.getElementById('jwt-status');
    const resultEl = document.getElementById('jwt-result');

    if (!token) { resultEl.innerHTML = ''; statusEl.innerHTML = ''; return; }

    const parts = token.split('.');
    if (parts.length !== 3) {
      statusEl.innerHTML = '<div class="status-bar error">✗ Invalid JWT — must have 3 parts separated by dots</div>';
      resultEl.innerHTML = '';
      return;
    }

    try {
      const header  = JSON.parse(b64url(parts[0]));
      const payload = JSON.parse(b64url(parts[1]));
      const sig     = parts[2];

      const now = Math.floor(Date.now() / 1000);
      const expired = payload.exp && payload.exp < now;
      const expStr  = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : '—';
      const iatStr  = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : '—';

      statusEl.innerHTML = expired
        ? '<div class="status-bar error">⚠ Token is EXPIRED</div>'
        : payload.exp
          ? '<div class="status-bar success">✓ Token is valid (not expired)</div>'
          : '<div class="status-bar info">ℹ No expiration claim</div>';

      const block = (title, color, obj) => `
        <div class="card" style="margin:0;border-left:3px solid ${color}">
          <div class="card-title" style="color:${color};margin-bottom:8px">${title}</div>
          <pre style="font-family:var(--mono);font-size:13px;overflow:auto;white-space:pre-wrap;word-break:break-all;margin:0">${escapeHtml(JSON.stringify(obj, null, 2))}</pre>
        </div>`;

      resultEl.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:4px">
          ${block('Header', '#7c3aed', header)}
          ${block('Payload', '#0284c7', payload)}
          <div class="card" style="margin:0;border-left:3px solid #6b7280">
            <div class="card-title" style="color:var(--text-muted);margin-bottom:8px">Signature (raw)</div>
            <div class="mono" style="font-size:12px;word-break:break-all;color:var(--text-muted)">${escapeHtml(sig)}</div>
          </div>
          ${payload.exp || payload.iat ? `
          <div class="stat-row">
            ${payload.iat ? `<div class="stat-chip">Issued at: <span>${iatStr}</span></div>` : ''}
            ${payload.exp ? `<div class="stat-chip">Expires: <span style="color:${expired?'#dc2626':'inherit'}">${expStr}</span></div>` : ''}
          </div>` : ''}
        </div>`;
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ Failed to decode: ${e.message}</div>`;
    }
  }

  document.getElementById('jwt-decode').addEventListener('click', decode);
  document.getElementById('jwt-input').addEventListener('input', decode);
  document.getElementById('jwt-clear').addEventListener('click', () => {
    document.getElementById('jwt-input').value = '';
    document.getElementById('jwt-result').innerHTML = '';
    document.getElementById('jwt-status').innerHTML = '';
  });
}

// =====================
// 15. UUID Generator
// =====================
function renderUuidGenerator() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end">
        <div style="width:120px">
          <label class="field-label">Count</label>
          <input type="number" id="uuid-count" value="5" min="1" max="100" />
        </div>
        <div style="width:120px">
          <label class="field-label">Format</label>
          <select id="uuid-fmt">
            <option value="lower">lowercase</option>
            <option value="upper">UPPERCASE</option>
            <option value="nohyphen">No hyphens</option>
          </select>
        </div>
        <button class="btn" id="uuid-gen">Generate</button>
        <button class="btn btn-ghost" id="uuid-copy-all">Copy All</button>
      </div>
      <div style="margin-top:14px;position:relative">
        <textarea class="mono" id="uuid-output" rows="10" readonly placeholder="UUIDs will appear here..."></textarea>
      </div>
    </div>
  `;
}

function initUuidGenerator() {
  function genUuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function generate() {
    const count = Math.min(100, Math.max(1, parseInt(document.getElementById('uuid-count').value) || 1));
    const fmt = document.getElementById('uuid-fmt').value;
    const uuids = Array.from({length: count}, () => {
      let u = genUuid();
      if (fmt === 'upper') u = u.toUpperCase();
      if (fmt === 'nohyphen') u = u.replace(/-/g, '');
      return u;
    });
    document.getElementById('uuid-output').value = uuids.join('\n');
  }

  document.getElementById('uuid-gen').addEventListener('click', generate);
  document.getElementById('uuid-copy-all').addEventListener('click', () => {
    const val = document.getElementById('uuid-output').value;
    if (val) copyToClipboard(val);
  });
  generate();
}

// =====================
// 16. Password Generator
// =====================
function renderPasswordGenerator() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;flex-wrap:wrap">
        <div style="width:120px">
          <label class="field-label">Length</label>
          <input type="number" id="pw-len" value="20" min="4" max="128" />
        </div>
        <div style="width:100px">
          <label class="field-label">Count</label>
          <input type="number" id="pw-count" value="5" min="1" max="50" />
        </div>
      </div>
      <div class="row" style="margin-top:10px;flex-wrap:wrap;gap:14px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="pw-upper" checked /> Uppercase (A-Z)</label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="pw-lower" checked /> Lowercase (a-z)</label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="pw-num" checked /> Numbers (0-9)</label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="pw-sym" checked /> Symbols (!@#...)</label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="pw-ambig" /> Exclude ambiguous (0O1lI)</label>
      </div>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="pw-gen">Generate</button>
        <button class="btn btn-ghost" id="pw-copy-all">Copy All</button>
      </div>
      <div id="pw-status"></div>
      <textarea class="mono" id="pw-output" rows="8" readonly placeholder="Passwords will appear here..."></textarea>
    </div>
  `;
}

function initPasswordGenerator() {
  const UPPER  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER  = 'abcdefghijklmnopqrstuvwxyz';
  const NUM    = '0123456789';
  const SYM    = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const AMBIG  = /[0O1lI]/g;

  function generate() {
    const len   = Math.min(128, Math.max(4, parseInt(document.getElementById('pw-len').value) || 20));
    const count = Math.min(50, Math.max(1, parseInt(document.getElementById('pw-count').value) || 5));
    const useUp  = document.getElementById('pw-upper').checked;
    const useLo  = document.getElementById('pw-lower').checked;
    const useNum = document.getElementById('pw-num').checked;
    const useSym = document.getElementById('pw-sym').checked;
    const noAmb  = document.getElementById('pw-ambig').checked;
    const statusEl = document.getElementById('pw-status');

    let charset = '';
    if (useUp)  charset += UPPER;
    if (useLo)  charset += LOWER;
    if (useNum) charset += NUM;
    if (useSym) charset += SYM;
    if (noAmb)  charset = charset.replace(AMBIG, '');

    if (!charset) {
      statusEl.innerHTML = '<div class="status-bar error">Select at least one character type</div>';
      return;
    }
    statusEl.innerHTML = '';

    const arr = new Uint32Array(len);
    const passwords = Array.from({length: count}, () => {
      crypto.getRandomValues(arr);
      return Array.from(arr, n => charset[n % charset.length]).join('');
    });
    document.getElementById('pw-output').value = passwords.join('\n');
  }

  document.getElementById('pw-gen').addEventListener('click', generate);
  document.getElementById('pw-copy-all').addEventListener('click', () => {
    const val = document.getElementById('pw-output').value;
    if (val) copyToClipboard(val);
  });
  generate();
}

// =====================
// 17. Lorem Ipsum Generator
// =====================
function renderLoremIpsum() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;flex-wrap:wrap">
        <div>
          <label class="field-label">Type</label>
          <select id="li-type">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div style="width:100px">
          <label class="field-label">Count</label>
          <input type="number" id="li-count" value="3" min="1" max="50" />
        </div>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;margin-top:20px">
          <input type="checkbox" id="li-classic" checked /> Start with "Lorem ipsum..."
        </label>
        <button class="btn" id="li-gen">Generate</button>
      </div>
      <div style="margin-top:14px;position:relative">
        <textarea id="li-output" rows="12" readonly placeholder="Lorem ipsum text will appear here..."></textarea>
        <button class="btn btn-sm" id="li-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initLoremIpsum() {
  const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');
  const CLASSIC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  function rnd(n) { return Math.floor(Math.random() * n); }

  function sentence() {
    const len = 8 + rnd(12);
    const words = Array.from({length: len}, () => WORDS[rnd(WORDS.length)]);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  }

  function paragraph() {
    return Array.from({length: 4 + rnd(4)}, () => sentence()).join(' ');
  }

  function generate() {
    const type    = document.getElementById('li-type').value;
    const count   = Math.min(50, Math.max(1, parseInt(document.getElementById('li-count').value) || 3));
    const classic = document.getElementById('li-classic').checked;
    let result = [];

    if (type === 'words') {
      const words = Array.from({length: count}, () => WORDS[rnd(WORDS.length)]);
      result = [words.join(' ')];
    } else if (type === 'sentences') {
      result = Array.from({length: count}, () => sentence());
      if (classic && result.length > 0) result[0] = CLASSIC;
    } else {
      result = Array.from({length: count}, () => paragraph());
      if (classic && result.length > 0) result[0] = CLASSIC + ' ' + result[0].split('. ').slice(1).join('. ');
    }

    document.getElementById('li-output').value = result.join('\n\n');
  }

  document.getElementById('li-gen').addEventListener('click', generate);
  document.getElementById('li-copy').addEventListener('click', () => {
    const val = document.getElementById('li-output').value;
    if (val) copyToClipboard(val);
  });
  generate();
}

// =====================
// 18. QR Code Generator
// =====================
function renderQrGenerator() {
  return `
    <div class="card">
      <label class="field-label">Text or URL</label>
      <textarea id="qr-input" rows="4" placeholder="Enter text or URL to encode..."></textarea>
      <div class="row" style="margin-top:12px;align-items:flex-end">
        <div style="width:130px">
          <label class="field-label">Error Correction</label>
          <select id="qr-ec">
            <option value="L">L (7%)</option>
            <option value="M" selected>M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>
        <div style="width:100px">
          <label class="field-label">Size (px)</label>
          <input type="number" id="qr-size" value="256" min="64" max="1024" step="32" />
        </div>
        <button class="btn" id="qr-gen">Generate</button>
        <button class="btn btn-ghost" id="qr-download">Download PNG</button>
      </div>
      <div id="qr-status" style="margin-top:8px"></div>
      <div id="qr-output" style="margin-top:16px;text-align:center"></div>
    </div>
  `;
}

function initQrGenerator() {
  let canvas = null;

  function generate() {
    const text = document.getElementById('qr-input').value.trim();
    const statusEl = document.getElementById('qr-status');
    const outputEl = document.getElementById('qr-output');
    if (!text) { outputEl.innerHTML = ''; statusEl.innerHTML = ''; return; }

    if (typeof QRCode === 'undefined') {
      statusEl.innerHTML = '<div class="status-bar error">QR library not loaded — check internet connection</div>';
      return;
    }

    const size = Math.min(1024, Math.max(64, parseInt(document.getElementById('qr-size').value) || 256));
    const ec = document.getElementById('qr-ec').value;

    canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, text, { width: size, errorCorrectionLevel: ec, margin: 2 }, err => {
      if (err) {
        statusEl.innerHTML = `<div class="status-bar error">✗ ${err.message}</div>`;
        return;
      }
      statusEl.innerHTML = '<div class="status-bar success">✓ QR code generated</div>';
      outputEl.innerHTML = '';
      canvas.style.borderRadius = 'var(--radius)';
      canvas.style.border = '1px solid var(--border)';
      outputEl.appendChild(canvas);
    });
  }

  document.getElementById('qr-gen').addEventListener('click', generate);
  document.getElementById('qr-input').addEventListener('input', generate);

  document.getElementById('qr-download').addEventListener('click', () => {
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'qrcode.png';
    a.href = canvas.toDataURL();
    a.click();
  });
}

// =====================
// 19. Line Sorter
// =====================
function renderLineSorter() {
  return `
    <div class="card">
      <label class="field-label">Input (one item per line) <span id="ls-in-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
      <textarea id="ls-input" rows="10" placeholder="Paste lines here..."></textarea>
      <div class="row" style="margin-top:12px;align-items:center;flex-wrap:wrap">
        <div class="btn-group">
          <button class="btn" id="ls-asc">A → Z</button>
          <button class="btn btn-ghost" id="ls-desc">Z → A</button>
          <button class="btn btn-ghost" id="ls-reverse">Reverse</button>
          <button class="btn btn-ghost" id="ls-shuffle">Shuffle</button>
          <button class="btn btn-ghost" id="ls-dedup">Deduplicate</button>
        </div>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="ls-case" /> Case-sensitive sort
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="ls-trim" checked /> Trim whitespace
        </label>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="ls-empty" checked /> Remove empty lines
        </label>
      </div>
      <div style="margin-top:12px;position:relative">
        <label class="field-label">Output <span id="ls-out-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
        <textarea id="ls-output" rows="10" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="ls-copy" style="position:absolute;top:24px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initLineSorter() {
  function countLines(text) {
    return text.split('\n').filter(l => l.trim() !== '').length;
  }
  function getLines() {
    let lines = document.getElementById('ls-input').value.split('\n');
    if (document.getElementById('ls-trim').checked) lines = lines.map(l => l.trim());
    if (document.getElementById('ls-empty').checked) lines = lines.filter(l => l !== '');
    return lines;
  }
  function setOutput(lines) {
    const out = document.getElementById('ls-output');
    out.value = lines.join('\n');
    const n = countLines(out.value);
    document.getElementById('ls-out-count').textContent = n ? `(${n})` : '';
  }

  const lsInput = document.getElementById('ls-input');
  lsInput.addEventListener('input', () => {
    const n = countLines(lsInput.value);
    document.getElementById('ls-in-count').textContent = n ? `(${n})` : '';
  });

  document.getElementById('ls-asc').addEventListener('click', () => {
    const cs = document.getElementById('ls-case').checked;
    setOutput(getLines().sort((a, b) => cs ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())));
  });
  document.getElementById('ls-desc').addEventListener('click', () => {
    const cs = document.getElementById('ls-case').checked;
    setOutput(getLines().sort((a, b) => cs ? b.localeCompare(a) : b.toLowerCase().localeCompare(a.toLowerCase())));
  });
  document.getElementById('ls-reverse').addEventListener('click', () => setOutput(getLines().reverse()));
  document.getElementById('ls-shuffle').addEventListener('click', () => {
    const lines = getLines();
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines);
  });
  document.getElementById('ls-dedup').addEventListener('click', () => {
    const cs = document.getElementById('ls-case').checked;
    const seen = new Set();
    setOutput(getLines().filter(l => {
      const key = cs ? l : l.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }));
  });
  document.getElementById('ls-copy').addEventListener('click', () => {
    const val = document.getElementById('ls-output').value;
    if (val) copyToClipboard(val);
  });
}

// =====================
// 20. HTML Entity Codec
// =====================
function renderHtmlEntity() {
  return `
    <div class="card">
      <label class="field-label">Input</label>
      <textarea class="mono" id="he-input" rows="8" placeholder="Enter text or HTML..."></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="he-encode">Encode</button>
        <button class="btn btn-ghost" id="he-decode">Decode</button>
        <button class="btn btn-ghost" id="he-clear">Clear</button>
      </div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="he-output" rows="8" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="he-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initHtmlEntity() {
  const input = document.getElementById('he-input');
  const output = document.getElementById('he-output');

  document.getElementById('he-encode').addEventListener('click', () => {
    const d = document.createElement('div');
    d.textContent = input.value;
    output.value = d.innerHTML;
  });
  document.getElementById('he-decode').addEventListener('click', () => {
    const d = document.createElement('div');
    d.innerHTML = input.value;
    output.value = d.textContent;
  });
  document.getElementById('he-clear').addEventListener('click', () => { input.value = ''; output.value = ''; });
  document.getElementById('he-copy').addEventListener('click', () => { if (output.value) copyToClipboard(output.value); });
}

// =====================
// 21. Text Escape / Unescape
// =====================
function renderTextEscape() {
  return `
    <div class="card">
      <label class="field-label">Input</label>
      <textarea class="mono" id="te-input" rows="8" placeholder='e.g. Hello\nWorld\t"quoted"'></textarea>
      <div class="row" style="margin-top:10px;align-items:flex-end">
        <div>
          <label class="field-label">Mode</label>
          <select id="te-mode">
            <option value="json">JSON string</option>
            <option value="regex">Regex</option>
            <option value="newline">Literal newlines ↔ \\n</option>
          </select>
        </div>
        <div class="btn-group">
          <button class="btn" id="te-escape">Escape</button>
          <button class="btn btn-ghost" id="te-unescape">Unescape</button>
          <button class="btn btn-ghost" id="te-clear">Clear</button>
        </div>
      </div>
      <div id="te-status" style="margin-top:8px"></div>
      <label class="field-label" style="margin-top:12px">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="te-output" rows="8" readonly></textarea>
        <button class="btn btn-sm" id="te-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initTextEscape() {
  const input = document.getElementById('te-input');
  const output = document.getElementById('te-output');
  const statusEl = document.getElementById('te-status');

  function run(direction) {
    const mode = document.getElementById('te-mode').value;
    const text = input.value;
    try {
      if (mode === 'json') {
        if (direction === 'escape') {
          output.value = JSON.stringify(text).slice(1, -1);
        } else {
          output.value = JSON.parse('"' + text.replace(/"/g, '\\"') + '"');
        }
      } else if (mode === 'regex') {
        if (direction === 'escape') {
          output.value = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        } else {
          output.value = text.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');
        }
      } else {
        if (direction === 'escape') {
          output.value = text.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
        } else {
          output.value = text.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
        }
      }
      statusEl.innerHTML = '';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  }

  document.getElementById('te-escape').addEventListener('click', () => run('escape'));
  document.getElementById('te-unescape').addEventListener('click', () => run('unescape'));
  document.getElementById('te-clear').addEventListener('click', () => { input.value = ''; output.value = ''; statusEl.innerHTML = ''; });
  document.getElementById('te-copy').addEventListener('click', () => { if (output.value) copyToClipboard(output.value); });
}

// =====================
// 22. CSV ↔ JSON
// =====================
function renderCsvJson() {
  return `
    <div class="card">
      <div class="split-pane">
        <div>
          <label class="field-label">CSV</label>
          <textarea class="mono" id="cj-csv" rows="14" placeholder="name,age,city&#10;Alice,30,Taipei&#10;Bob,25,Tokyo"></textarea>
        </div>
        <div>
          <label class="field-label">JSON</label>
          <textarea class="mono" id="cj-json" rows="14" placeholder='[{"name":"Alice","age":"30",...}]'></textarea>
        </div>
      </div>
      <div class="btn-group" style="margin-top:12px">
        <button class="btn" id="cj-to-json">CSV → JSON</button>
        <button class="btn btn-ghost" id="cj-to-csv">JSON → CSV</button>
        <button class="btn btn-ghost" id="cj-clear">Clear</button>
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="cj-pretty" checked /> Pretty JSON
        </label>
      </div>
      <div id="cj-status" style="margin-top:8px"></div>
    </div>
  `;
}

function initCsvJson() {
  function parseCsv(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    return lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
    });
  }

  function objToCsvRow(obj, headers) {
    return headers.map(h => {
      const v = String(obj[h] ?? '');
      return v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(',');
  }

  const statusEl = document.getElementById('cj-status');

  document.getElementById('cj-to-json').addEventListener('click', () => {
    try {
      const data = parseCsv(document.getElementById('cj-csv').value);
      const pretty = document.getElementById('cj-pretty').checked;
      document.getElementById('cj-json').value = JSON.stringify(data, null, pretty ? 2 : 0);
      statusEl.innerHTML = `<div class="status-bar success">✓ Converted ${data.length} rows to JSON</div>`;
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('cj-to-csv').addEventListener('click', () => {
    try {
      const data = JSON.parse(document.getElementById('cj-json').value);
      if (!Array.isArray(data)) throw new Error('JSON must be an array of objects');
      const headers = [...new Set(data.flatMap(obj => Object.keys(obj)))];
      const rows = [headers.join(','), ...data.map(obj => objToCsvRow(obj, headers))];
      document.getElementById('cj-csv').value = rows.join('\n');
      statusEl.innerHTML = `<div class="status-bar success">✓ Converted ${data.length} rows to CSV</div>`;
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('cj-clear').addEventListener('click', () => {
    document.getElementById('cj-csv').value = '';
    document.getElementById('cj-json').value = '';
    statusEl.innerHTML = '';
  });
}

// =====================
// 23. YAML ↔ JSON
// =====================
function renderYamlJson() {
  return `
    <div class="card">
      <div class="split-pane">
        <div>
          <label class="field-label">YAML</label>
          <textarea class="mono" id="yj-yaml" rows="16" placeholder="name: Alice&#10;age: 30&#10;hobbies:&#10;  - coding&#10;  - reading"></textarea>
        </div>
        <div>
          <label class="field-label">JSON</label>
          <textarea class="mono" id="yj-json" rows="16" placeholder='{"name": "Alice", ...}'></textarea>
        </div>
      </div>
      <div class="btn-group" style="margin-top:12px">
        <button class="btn" id="yj-to-json">YAML → JSON</button>
        <button class="btn btn-ghost" id="yj-to-yaml">JSON → YAML</button>
        <button class="btn btn-ghost" id="yj-clear">Clear</button>
      </div>
      <div id="yj-status" style="margin-top:8px"></div>
    </div>
  `;
}

function initYamlJson() {
  const statusEl = document.getElementById('yj-status');

  document.getElementById('yj-to-json').addEventListener('click', () => {
    try {
      if (typeof jsyaml === 'undefined') throw new Error('YAML library not loaded — check internet connection');
      const obj = jsyaml.load(document.getElementById('yj-yaml').value);
      document.getElementById('yj-json').value = JSON.stringify(obj, null, 2);
      statusEl.innerHTML = '<div class="status-bar success">✓ Converted YAML → JSON</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('yj-to-yaml').addEventListener('click', () => {
    try {
      if (typeof jsyaml === 'undefined') throw new Error('YAML library not loaded — check internet connection');
      const obj = JSON.parse(document.getElementById('yj-json').value);
      document.getElementById('yj-yaml').value = jsyaml.dump(obj, {indent: 2});
      statusEl.innerHTML = '<div class="status-bar success">✓ Converted JSON → YAML</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('yj-clear').addEventListener('click', () => {
    document.getElementById('yj-yaml').value = '';
    document.getElementById('yj-json').value = '';
    statusEl.innerHTML = '';
  });
}

// =====================
// 24. Cron Parser
// =====================
function renderCronParser() {
  return `
    <div class="card">
      <label class="field-label">Cron Expression</label>
      <input type="text" class="mono" id="cp-input" placeholder="e.g.  0 9 * * 1-5" value="0 9 * * 1-5" />
      <div style="margin-top:8px" id="cp-status"></div>
      <div id="cp-result" style="margin-top:14px"></div>
      <div style="margin-top:20px">
        <label class="field-label">Quick Examples</label>
        <div class="pill-group" id="cp-examples">
          <button class="pill cp-ex" data-v="* * * * *">Every minute</button>
          <button class="pill cp-ex" data-v="0 * * * *">Every hour</button>
          <button class="pill cp-ex" data-v="0 9 * * 1-5">Weekdays 9am</button>
          <button class="pill cp-ex" data-v="0 0 * * *">Daily midnight</button>
          <button class="pill cp-ex" data-v="0 0 * * 0">Every Sunday</button>
          <button class="pill cp-ex" data-v="0 0 1 * *">1st of month</button>
          <button class="pill cp-ex" data-v="0 0 1 1 *">Every year</button>
          <button class="pill cp-ex" data-v="*/5 * * * *">Every 5 min</button>
          <button class="pill cp-ex" data-v="30 18 * * 1,3,5">Mon/Wed/Fri 6:30pm</button>
        </div>
      </div>
    </div>
  `;
}

function initCronParser() {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function describeField(val, type) {
    if (val === '*') return `every ${type}`;
    if (val.startsWith('*/')) return `every ${val.slice(2)} ${type}s`;
    if (val.includes('-')) {
      const [a, b] = val.split('-');
      if (type === 'day of week') return `${DAYS[+a]} to ${DAYS[+b]}`;
      if (type === 'month') return `${MONTHS[+a-1]} to ${MONTHS[+b-1]}`;
      return `${type} ${a} to ${b}`;
    }
    if (val.includes(',')) {
      const parts = val.split(',');
      if (type === 'day of week') return parts.map(p => DAYS[+p]).join(', ');
      if (type === 'month') return parts.map(p => MONTHS[+p-1]).join(', ');
      return `${type}s ${parts.join(', ')}`;
    }
    if (type === 'day of week') return DAYS[+val] ?? val;
    if (type === 'month') return MONTHS[+val-1] ?? val;
    return `${type} ${val}`;
  }

  function parse(expr) {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) throw new Error('Must have exactly 5 fields: minute hour day month weekday');
    const [min, hr, dom, mon, dow] = parts;

    const sentences = [];
    sentences.push(`<strong>Minute:</strong> ${describeField(min, 'minute')}`);
    sentences.push(`<strong>Hour:</strong> ${describeField(hr, 'hour')}`);
    sentences.push(`<strong>Day of month:</strong> ${describeField(dom, 'day')}`);
    sentences.push(`<strong>Month:</strong> ${describeField(mon, 'month')}`);
    sentences.push(`<strong>Day of week:</strong> ${describeField(dow, 'day of week')}`);

    // Human summary
    let summary = 'Runs ';
    if (min === '*' && hr === '*') summary += 'every minute';
    else if (min.startsWith('*/')) summary += `every ${min.slice(2)} minutes`;
    else if (hr === '*') summary += `at minute ${min} of every hour`;
    else {
      const h = hr.includes(',') ? hr.split(',').map(h => {
        const n = +h; return `${n % 12 || 12}:${String(+min).padStart(2,'0')} ${n < 12 ? 'AM' : 'PM'}`;
      }).join(' and ') : (() => { const n = +hr; return `${n%12||12}:${String(+min).padStart(2,'0')} ${n<12?'AM':'PM'}`; })();
      summary += `at ${h}`;
    }
    if (dow !== '*') summary += `, on ${describeField(dow, 'day of week')}`;
    if (dom !== '*') summary += `, on day ${dom} of the month`;
    if (mon !== '*') summary += `, in ${describeField(mon, 'month')}`;

    return { sentences, summary };
  }

  function run() {
    const val = document.getElementById('cp-input').value;
    const statusEl = document.getElementById('cp-status');
    const resultEl = document.getElementById('cp-result');
    if (!val.trim()) { resultEl.innerHTML = ''; statusEl.innerHTML = ''; return; }

    try {
      const { sentences, summary } = parse(val);
      statusEl.innerHTML = '<div class="status-bar success">✓ Valid cron expression</div>';
      resultEl.innerHTML = `
        <div class="card" style="margin:0 0 12px;border-left:3px solid var(--accent)">
          <div class="card-title">Plain English</div>
          <div style="font-size:16px;font-weight:600;color:var(--text)">${summary}</div>
        </div>
        <div class="card" style="margin:0">
          <div class="card-title">Field Breakdown</div>
          <div style="display:flex;flex-direction:column;gap:6px;font-size:14px">
            ${sentences.map(s => `<div style="padding:4px 0;border-bottom:1px solid var(--border)">${s}</div>`).join('')}
          </div>
        </div>
      `;
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
      resultEl.innerHTML = '';
    }
  }

  document.getElementById('cp-input').addEventListener('input', run);
  document.querySelectorAll('.cp-ex').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('cp-input').value = btn.dataset.v;
      run();
    });
  });
  run();
}

// =====================
// 25. Bulk Image Preview
// =====================
function renderImagePreview() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;flex-wrap:wrap;gap:12px">
        <div style="flex:1;min-width:260px">
          <label class="field-label">URL Template <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--text-muted)">— use {variable} as placeholder</span></label>
          <input type="text" class="mono" id="ip-template" placeholder="https://example.com/images/{variable}.jpg" />
        </div>
      </div>
      <div class="row" style="margin-top:12px;align-items:flex-end;flex-wrap:wrap;gap:12px">
        <div style="flex:1;min-width:200px">
          <label class="field-label">Variable List (one per line) <span id="ip-list-count" style="font-weight:400;font-size:11px;color:var(--text-muted);text-transform:none;letter-spacing:0;margin-left:4px"></span></label>
          <textarea id="ip-list" rows="6" placeholder="aaa&#10;bbb&#10;ccc"></textarea>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;min-width:160px">
          <div>
            <label class="field-label">Columns</label>
            <select id="ip-cols">
              <option value="2">2</option>
              <option value="3" selected>3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div>
            <label class="field-label">Image size</label>
            <select id="ip-size">
              <option value="100px">Small (100px)</option>
              <option value="160px" selected>Medium (160px)</option>
              <option value="240px">Large (240px)</option>
              <option value="100%">Full width</option>
            </select>
          </div>
        </div>
      </div>
      <div class="btn-group" style="margin:14px 0">
        <button class="btn" id="ip-load">Load Images</button>
        <button class="btn btn-ghost" id="ip-clear">Clear</button>
      </div>
      <div id="ip-status"></div>
      <div id="ip-missing" style="margin-top:12px"></div>
      <div id="ip-grid" style="margin-top:16px"></div>
    </div>
  `;
}

function initImagePreview() {
  const ipListEl = document.getElementById('ip-list');
  ipListEl.addEventListener('input', () => {
    const n = ipListEl.value.split('\n').filter(l => l.trim() !== '').length;
    document.getElementById('ip-list-count').textContent = n ? `(${n})` : '';
  });

  document.getElementById('ip-load').addEventListener('click', () => {
    const template = document.getElementById('ip-template').value.trim();
    const listRaw  = document.getElementById('ip-list').value.trim();
    const statusEl  = document.getElementById('ip-status');
    const missingEl = document.getElementById('ip-missing');
    const gridEl    = document.getElementById('ip-grid');

    statusEl.innerHTML  = '';
    missingEl.innerHTML = '';
    gridEl.innerHTML    = '';

    if (!template) {
      statusEl.innerHTML = '<div class="status-bar error">Please enter a URL template</div>';
      return;
    }
    const placeholderMatch = template.match(/\{([^}]+)\}/);
    if (!placeholderMatch) {
      statusEl.innerHTML = '<div class="status-bar error">Template must contain a placeholder like <code style="font-family:var(--mono)">{variable}</code> or <code style="font-family:var(--mono)">{id}</code></div>';
      return;
    }
    const escapedPlaceholder = placeholderMatch[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const placeholderRegex = new RegExp(escapedPlaceholder, 'g');
    if (!listRaw) {
      statusEl.innerHTML = '<div class="status-bar error">Please enter at least one variable</div>';
      return;
    }

    const vars = listRaw.split('\n').map(v => v.trim()).filter(v => v !== '');
    if (vars.length === 0) {
      statusEl.innerHTML = '<div class="status-bar error">No valid variables found</div>';
      return;
    }

    const cols   = parseInt(document.getElementById('ip-cols').value) || 3;
    const imgSize = document.getElementById('ip-size').value;

    statusEl.innerHTML = `<div class="status-bar info">Loading ${vars.length} image${vars.length > 1 ? 's' : ''}...</div>`;

    const missing = [];
    let loaded = 0;
    let failed = 0;
    let pendingFetches = 0;

    async function fetchHttpStatus(url) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        const ct  = res.headers.get('content-type') || '';
        let body  = null;
        try {
          if (ct.includes('json')) {
            body = JSON.stringify(await res.json(), null, 2);
          } else if (ct.includes('text/plain')) {
            body = (await res.text()).slice(0, 1000);
          }
        } catch { /* ignore body read errors */ }
        return { status: res.status, statusText: res.statusText, body, err: null };
      } catch {
        return { status: null, statusText: null, body: null, err: 'CORS / network error' };
      }
    }

    function refreshMissingReport() {
      if (missing.length === 0) { missingEl.innerHTML = ''; return; }
      function statusCell(m) {
        if (m.status === null && m.err === null)
          return `<span style="color:#9ca3af">checking…</span>`;
        if (m.status !== null) {
          const c = m.status >= 500 ? '#ef4444' : m.status >= 400 ? '#f97316' : '#6b7280';
          return `<span style="color:${c};font-weight:700">HTTP ${m.status}</span>${m.statusText ? ` <span style="color:${c}">${escapeHtml(m.statusText)}</span>` : ''}`;
        }
        return `<span style="color:#9ca3af">${escapeHtml(m.err || 'unknown')}</span>`;
      }
      const missingVars = missing.map(m => m.variable).join('\n');
      const missingUrls = missing.map(m => m.url).join('\n');
      const rows = missing.map(m => {
        const bodyPreview = m.body
          ? `<pre style="margin:3px 0 0;padding:3px 6px;background:var(--bg);border:1px solid var(--border);border-radius:3px;font-size:10px;max-height:60px;overflow-y:auto;white-space:pre-wrap;word-break:break-all;color:var(--text)">${escapeHtml(m.body)}</pre>`
          : `<span style="color:#6b7280;font-size:11px">—</span>`;
        return `
        <tr>
          <td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;vertical-align:top">${escapeHtml(m.variable)}</td>
          <td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12px;white-space:nowrap;vertical-align:top">${statusCell(m)}</td>
          <td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:11px;vertical-align:top">${bodyPreview}</td>
          <td style="padding:4px 8px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:11px;color:var(--text-muted);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:top" title="${escapeHtml(m.url)}">${escapeHtml(m.url)}</td>
        </tr>`}).join('');
      missingEl.innerHTML = `
        <div class="card" style="margin:0;border-left:3px solid #dc2626">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div class="card-title" style="color:#dc2626;margin:0">✗ Missing Images (${missing.length})</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm" onclick="copyFromRegistry('${registerCopy(missingVars)}')">Copy Variables</button>
              <button class="btn btn-ghost btn-sm" onclick="copyFromRegistry('${registerCopy(missingUrls)}')">Copy URLs</button>
            </div>
          </div>
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse">
              <thead><tr>
                <th style="text-align:left;padding:4px 8px;border-bottom:2px solid var(--border);font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em">Variable</th>
                <th style="text-align:left;padding:4px 8px;border-bottom:2px solid var(--border);font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em">Status</th>
                <th style="text-align:left;padding:4px 8px;border-bottom:2px solid var(--border);font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em">Response Body</th>
                <th style="text-align:left;padding:4px 8px;border-bottom:2px solid var(--border);font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em">URL</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    }

    // Build grid
    gridEl.style.display = 'grid';
    gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridEl.style.gap = '12px';

    vars.forEach(variable => {
      const url = template.replace(placeholderRegex, encodeURIComponent(variable));

      const cell = document.createElement('div');
      cell.style.cssText = 'background:var(--input-bg);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;';

      const imgWrap = document.createElement('div');
      imgWrap.style.cssText = `height:${imgSize};display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f1f1f1;position:relative;`;

      const img = document.createElement('img');
      img.src   = url;
      img.alt   = variable;
      img.title = url;
      img.style.cssText = `max-width:100%;max-height:100%;object-fit:contain;cursor:pointer;transition:transform 0.2s;`;
      img.addEventListener('mouseover', () => { img.style.transform = 'scale(1.05)'; });
      img.addEventListener('mouseout',  () => { img.style.transform = ''; });
      img.addEventListener('click', () => window.open(url, '_blank'));

      const label = document.createElement('div');
      label.style.cssText = 'padding:6px 8px;font-size:12px;font-family:var(--mono);color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-top:1px solid var(--border);';
      label.title = url;
      label.textContent = variable;

      img.addEventListener('load', () => {
        loaded++;
        imgWrap.style.background = 'transparent';
        updateStatus();
      });

      img.addEventListener('error', () => {
        failed++;
        const entry = { variable, url, status: null, statusText: null, err: null };
        missing.push(entry);
        const statusDivId = `ip-cs-${failed}`;
        imgWrap.style.background = 'var(--input-bg)';
        imgWrap.innerHTML = `
          <div style="text-align:center;padding:12px;">
            <div style="font-size:28px;margin-bottom:6px">🚫</div>
            <div style="font-size:11px;font-family:var(--mono);word-break:break-all;color:var(--text-muted)">${escapeHtml(variable)}</div>
            <div id="${statusDivId}" style="font-size:11px;margin-top:6px;font-family:var(--mono);color:#9ca3af">checking...</div>
          </div>`;
        cell.style.borderColor = '#fca5a5';
        label.style.color = '#dc2626';
        updateStatus();

        pendingFetches++;
        fetchHttpStatus(url).then(result => {
          Object.assign(entry, result);
          pendingFetches--;
          const div = document.getElementById(statusDivId);
          if (div) {
            div.style.cssText = 'font-size:11px;margin-top:6px;font-family:var(--mono);text-align:left;width:100%;';
            if (result.status !== null) {
              const c = result.status >= 500 ? '#ef4444' : result.status >= 400 ? '#f97316' : '#6b7280';
              const bodyHtml = result.body
                ? `<pre style="margin:4px 0 0;padding:4px 6px;background:var(--bg);border:1px solid var(--border);border-radius:3px;font-size:10px;max-height:72px;overflow-y:auto;white-space:pre-wrap;word-break:break-all;color:var(--text);text-align:left">${escapeHtml(result.body)}</pre>`
                : '';
              div.innerHTML = `<span style="color:${c};font-weight:700">HTTP ${result.status}${result.statusText ? ` ${result.statusText}` : ''}</span>${bodyHtml}`;
            } else {
              div.innerHTML = `<span style="color:#9ca3af">${escapeHtml(result.err || 'unknown')}</span>`;
            }
          }
          if (loaded + failed >= vars.length) refreshMissingReport();
        });
      });

      imgWrap.appendChild(img);
      cell.appendChild(imgWrap);
      cell.appendChild(label);
      gridEl.appendChild(cell);
    });

    function updateStatus() {
      const done = loaded + failed;
      if (done < vars.length) {
        statusEl.innerHTML = `<div class="status-bar info">Loading… ${done}/${vars.length}</div>`;
        return;
      }
      if (failed === 0) {
        statusEl.innerHTML = `<div class="status-bar success">✓ All ${vars.length} images loaded successfully</div>`;
        missingEl.innerHTML = '';
      } else {
        statusEl.innerHTML = `<div class="status-bar info">✓ ${loaded} loaded &nbsp;|&nbsp; <span style="color:#dc2626;font-weight:700">✗ ${failed} missing — fetching HTTP status…</span></div>`;
        refreshMissingReport();
      }
    }
  });

  document.getElementById('ip-clear').addEventListener('click', () => {
    document.getElementById('ip-template').value = '';
    document.getElementById('ip-list').value = '';
    document.getElementById('ip-status').innerHTML = '';
    document.getElementById('ip-missing').innerHTML = '';
    document.getElementById('ip-grid').innerHTML = '';
  });

  // Allow re-loading on Enter in template field
  document.getElementById('ip-template').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('ip-load').click();
  });
}

// =====================
// 26. SQL Formatter
// =====================
function renderSqlFormatter() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;flex-wrap:wrap;gap:12px">
        <div>
          <label class="field-label">Dialect</label>
          <select id="sf-dialect">
            <option value="sql">Standard SQL</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
            <option value="tsql">T-SQL (SQL Server)</option>
            <option value="plsql">PL/SQL (Oracle)</option>
          </select>
        </div>
        <div>
          <label class="field-label">Indent</label>
          <select id="sf-indent">
            <option value="2">2 spaces</option>
            <option value="4" selected>4 spaces</option>
          </select>
        </div>
        <div>
          <label class="field-label">Keywords</label>
          <select id="sf-case">
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="preserve">preserve</option>
          </select>
        </div>
      </div>
      <label class="field-label" style="margin-top:14px">Input SQL</label>
      <textarea class="mono" id="sf-input" rows="10" placeholder="Paste your SQL here..."></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="sf-format">Format</button>
        <button class="btn btn-ghost" id="sf-minify">Minify</button>
        <button class="btn btn-ghost" id="sf-clear">Clear</button>
      </div>
      <div id="sf-status"></div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="sf-output" rows="12" readonly placeholder="Result will appear here..."></textarea>
        <button class="btn btn-sm" id="sf-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initSqlFormatter() {
  const input    = document.getElementById('sf-input');
  const output   = document.getElementById('sf-output');
  const statusEl = document.getElementById('sf-status');

  function getOptions() {
    return {
      language:            document.getElementById('sf-dialect').value,
      tabWidth:            parseInt(document.getElementById('sf-indent').value),
      keywordCase:         document.getElementById('sf-case').value,
      linesBetweenQueries: 2,
    };
  }

  document.getElementById('sf-format').addEventListener('click', () => {
    if (!input.value.trim()) return;
    if (typeof sqlFormatter === 'undefined') {
      statusEl.innerHTML = '<div class="status-bar error">sql-formatter library not loaded. Check your network connection.</div>';
      return;
    }
    try {
      output.value = sqlFormatter.format(input.value, getOptions());
      statusEl.innerHTML = '';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">${escapeHtml(e.message)}</div>`;
    }
  });

  document.getElementById('sf-minify').addEventListener('click', () => {
    if (!input.value.trim()) return;
    const minified = input.value
      .replace(/--[^\n]*/g, '')        // remove line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
      .replace(/\s+/g, ' ')
      .trim();
    output.value = minified;
    statusEl.innerHTML = '';
  });

  document.getElementById('sf-clear').addEventListener('click', () => {
    input.value  = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('sf-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}

// =====================
// 27. Fake Data Generator
// =====================
function renderFakeData() {
  const fields = [
    ['fullName','Full Name'],['firstName','First Name'],['lastName','Last Name'],
    ['email','Email'],['phone','Phone'],['age','Age'],['dob','Date of Birth'],
    ['address','Street Address'],['city','City'],['country','Country'],
    ['company','Company'],['jobTitle','Job Title'],['username','Username'],
    ['url','URL'],['ip','IP Address'],['uuid','UUID'],
  ];
  const defaultOn = new Set(['fullName','email','phone','city']);
  const pills = fields.map(([v, l]) =>
    `<label class="pill${defaultOn.has(v) ? ' active' : ''}" style="cursor:pointer;user-select:none">` +
    `<input type="checkbox" value="${v}"${defaultOn.has(v) ? ' checked' : ''} style="display:none"> ${l}</label>`
  ).join('');
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;gap:12px;flex-wrap:wrap">
        <div style="width:100px">
          <label class="field-label">Count</label>
          <input type="number" id="fd-count" value="10" min="1" max="500" />
        </div>
        <div>
          <label class="field-label">Format</label>
          <select id="fd-format">
            <option value="json">JSON Array</option>
            <option value="csv">CSV</option>
            <option value="tsv">TSV</option>
          </select>
        </div>
        <div class="btn-group">
          <button class="btn" id="fd-gen">Generate</button>
          <button class="btn btn-ghost" id="fd-copy">Copy</button>
        </div>
      </div>
      <div style="margin-top:12px">
        <label class="field-label">Fields</label>
        <div id="fd-fields" class="pill-group" style="flex-wrap:wrap;gap:6px">${pills}</div>
      </div>
      <div id="fd-status" style="margin-top:8px"></div>
      <label class="field-label" style="margin-top:12px">Output</label>
      <textarea class="mono" id="fd-output" rows="14" readonly placeholder="Generated data will appear here..."></textarea>
    </div>
  `;
}

function initFakeData() {
  const firstNames  = ['Alice','Bob','Charlie','Diana','Edward','Fiona','George','Hannah','Ivan','Julia','Kevin','Laura','Michael','Nina','Oscar','Paula','Quinn','Rachel','Samuel','Tina','Uma','Victor','Wendy','Xavier','Yolanda','Zack','Amy','Brian','Cathy','David','Emma','Frank','Grace','Henry','Iris','Jack','Kate','Liam','Mia','Noah','Olivia','Peter','Rose','Sean','Tara','Vince','Zoe','Chris','Alex','Jordan','Morgan'];
  const lastNames   = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Young','Lee','Walker','Hall','Allen','King','Scott','Green','Baker','Adams','Nelson','Hill','Ramirez','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Morris','Morgan','Reed','Cook','Bailey','Rivera','Cooper','Cox'];
  const domains     = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','proton.me'];
  const streetNames = ['Main','Oak','Maple','Cedar','Pine','Elm','Washington','Lake','Hill','Park','River','Forest','Sunset','Meadow','Highland'];
  const streetTypes = ['St','Ave','Blvd','Ln','Dr','Rd','Ct','Way'];
  const cities      = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose','Austin','Columbus','Charlotte','Indianapolis','Seattle','Denver','Nashville','Portland','Las Vegas','Boston','Memphis','Baltimore','Louisville','Milwaukee'];
  const countries   = ['United States','Canada','United Kingdom','Australia','Germany','France','Japan','Brazil','India','Mexico','Italy','Spain','South Korea','Netherlands','Switzerland'];
  const companyPfx  = ['Alpha','Beta','Nexus','Apex','Vertex','Core','Peak','Prime','Nova','Quantum','Blue','Sky'];
  const companySfx  = ['Tech','Solutions','Systems','Group','Services','Labs','Digital','Global','Networks','Corp'];
  const jobs        = ['Software Engineer','Product Manager','Data Scientist','UX Designer','DevOps Engineer','Marketing Manager','Sales Representative','Business Analyst','Project Manager','QA Engineer','Frontend Developer','Backend Developer','Full Stack Developer','Data Analyst','Systems Architect'];
  const tlds        = ['com','net','org','io','co','dev','app'];
  const fieldLabels = { fullName:'Full Name',firstName:'First Name',lastName:'Last Name',email:'Email',phone:'Phone',age:'Age',dob:'Date of Birth',address:'Street Address',city:'City',country:'Country',company:'Company',jobTitle:'Job Title',username:'Username',url:'URL',ip:'IP Address',uuid:'UUID' };

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  function gen(field, first, last) {
    switch (field) {
      case 'fullName':  return `${first} ${last}`;
      case 'firstName': return first;
      case 'lastName':  return last;
      case 'email':     return `${first.toLowerCase()}.${last.toLowerCase()}${rnd(0,1) ? rnd(1,99) : ''}@${pick(domains)}`;
      case 'phone':     return `+1-${rnd(200,999)}-${rnd(100,999)}-${rnd(1000,9999)}`;
      case 'age':       return rnd(18, 72);
      case 'dob':       return `${rnd(1952,2005)}-${String(rnd(1,12)).padStart(2,'0')}-${String(rnd(1,28)).padStart(2,'0')}`;
      case 'address':   return `${rnd(1,9999)} ${pick(streetNames)} ${pick(streetTypes)}`;
      case 'city':      return pick(cities);
      case 'country':   return pick(countries);
      case 'company':   return `${pick(companyPfx)} ${pick(companySfx)}`;
      case 'jobTitle':  return pick(jobs);
      case 'username':  return `${first.toLowerCase()}${last.toLowerCase().slice(0,4)}${rnd(10,999)}`;
      case 'url':       return `https://www.${first.toLowerCase()}${last.toLowerCase()}.${pick(tlds)}`;
      case 'ip':        return `${rnd(1,254)}.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`;
      case 'uuid':      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                          const r = Math.random() * 16 | 0;
                          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
      default: return '';
    }
  }

  document.querySelectorAll('#fd-fields input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => cb.closest('label').classList.toggle('active', cb.checked));
  });

  document.getElementById('fd-gen').addEventListener('click', () => {
    const selected  = [...document.querySelectorAll('#fd-fields input:checked')].map(i => i.value);
    const statusEl  = document.getElementById('fd-status');
    if (selected.length === 0) {
      statusEl.innerHTML = '<div class="status-bar error">Select at least one field</div>';
      return;
    }
    statusEl.innerHTML = '';
    const count = Math.min(500, Math.max(1, parseInt(document.getElementById('fd-count').value) || 10));
    const fmt   = document.getElementById('fd-format').value;
    const rows  = Array.from({ length: count }, () => {
      const first = pick(firstNames);
      const last  = pick(lastNames);
      const row   = {};
      selected.forEach(f => { row[f] = gen(f, first, last); });
      return row;
    });

    let result;
    if (fmt === 'json') {
      result = JSON.stringify(rows, null, 2);
    } else {
      const sep    = fmt === 'tsv' ? '\t' : ',';
      const header = selected.map(f => fieldLabels[f]).join(sep);
      const lines  = rows.map(row =>
        selected.map(f => {
          const val = String(row[f]);
          if (fmt === 'csv' && (val.includes(',') || val.includes('"') || val.includes('\n')))
            return `"${val.replace(/"/g, '""')}"`;
          return val;
        }).join(sep)
      );
      result = [header, ...lines].join('\n');
    }
    document.getElementById('fd-output').value = result;
  });

  document.getElementById('fd-copy').addEventListener('click', () => {
    const val = document.getElementById('fd-output').value;
    if (val) copyToClipboard(val);
  });
}

// =====================
// 28. JSON to Class
// =====================
function renderJsonToClass() {
  return `
    <div class="card">
      <div class="row" style="align-items:flex-end;gap:12px;flex-wrap:wrap">
        <div>
          <label class="field-label">Target Language</label>
          <select id="j2c-lang">
            <option value="csharp">C#</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python (dataclass)</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="kotlin">Kotlin</option>
          </select>
        </div>
        <div>
          <label class="field-label">Root Class Name</label>
          <input type="text" id="j2c-rootname" value="Root" style="width:140px" />
        </div>
      </div>
      <label class="field-label" style="margin-top:14px">Input JSON</label>
      <textarea class="mono" id="j2c-input" rows="10" placeholder='{"name":"Alice","age":30,"active":true,"address":{"city":"NY","zip":"10001"},"tags":["admin","user"]}'></textarea>
      <div class="btn-group" style="margin:12px 0">
        <button class="btn" id="j2c-convert">Convert</button>
        <button class="btn btn-ghost" id="j2c-clear">Clear</button>
      </div>
      <div id="j2c-status"></div>
      <label class="field-label">Output</label>
      <div style="position:relative">
        <textarea class="mono" id="j2c-output" rows="14" readonly placeholder="Class definition will appear here..."></textarea>
        <button class="btn btn-sm" id="j2c-copy" style="position:absolute;top:8px;right:8px;opacity:0.85">Copy</button>
      </div>
    </div>
  `;
}

function initJsonToClass() {
  const input    = document.getElementById('j2c-input');
  const output   = document.getElementById('j2c-output');
  const statusEl = document.getElementById('j2c-status');

  function toPascalCase(str) {
    return str.replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toUpperCase());
  }
  function toCamelCase(str) {
    return str.replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase());
  }

  function inferType(val, hintName, classes) {
    if (val === null || val === undefined) return { kind: 'null' };
    if (typeof val === 'boolean') return { kind: 'boolean' };
    if (typeof val === 'number')  return Number.isInteger(val) ? { kind: 'int' } : { kind: 'float' };
    if (typeof val === 'string')  return { kind: 'string' };
    if (Array.isArray(val)) {
      if (val.length === 0) return { kind: 'array', itemType: { kind: 'any' } };
      return { kind: 'array', itemType: inferType(val[0], hintName, classes) };
    }
    if (typeof val === 'object') {
      const className = toPascalCase(hintName || 'Object');
      buildClass(val, className, classes);
      return { kind: 'object', className };
    }
    return { kind: 'any' };
  }

  function buildClass(obj, className, classes) {
    if (classes.find(c => c.name === className)) return;
    const entry = { name: className, fields: [] };
    classes.push(entry);
    for (const [key, value] of Object.entries(obj)) {
      entry.fields.push({ key, type: inferType(value, toPascalCase(key), classes), nullable: value === null });
    }
  }

  function genCSharp(classes) {
    function t(type, nullable) {
      if (type.kind === 'null')    return 'object?';
      if (type.kind === 'boolean') return nullable ? 'bool?' : 'bool';
      if (type.kind === 'int')     return nullable ? 'int?' : 'int';
      if (type.kind === 'float')   return nullable ? 'double?' : 'double';
      if (type.kind === 'string')  return 'string';
      if (type.kind === 'array')   return `List<${t(type.itemType, false)}>`;
      if (type.kind === 'object')  return type.className;
      return 'object';
    }
    return classes.map(cls => {
      const props = cls.fields.map(f =>
        `    public ${t(f.type, f.nullable)} ${toPascalCase(f.key)} { get; set; }`
      ).join('\n');
      return `public class ${cls.name}\n{\n${props}\n}`;
    }).join('\n\n');
  }

  function genTypeScript(classes) {
    function t(type, nullable) {
      let base;
      if (type.kind === 'null')    return 'null';
      if (type.kind === 'boolean') base = 'boolean';
      else if (type.kind === 'int' || type.kind === 'float') base = 'number';
      else if (type.kind === 'string') base = 'string';
      else if (type.kind === 'array')  base = `${t(type.itemType, false)}[]`;
      else if (type.kind === 'object') base = type.className;
      else base = 'any';
      return nullable ? `${base} | null` : base;
    }
    return classes.map(cls => {
      const props = cls.fields.map(f => `    ${f.key}${f.nullable ? '?' : ''}: ${t(f.type, f.nullable)};`).join('\n');
      return `interface ${cls.name} {\n${props}\n}`;
    }).join('\n\n');
  }

  function genPython(classes) {
    function t(type, nullable) {
      let base;
      if (type.kind === 'null')    return 'None';
      if (type.kind === 'boolean') base = 'bool';
      else if (type.kind === 'int')    base = 'int';
      else if (type.kind === 'float')  base = 'float';
      else if (type.kind === 'string') base = 'str';
      else if (type.kind === 'array')  base = `List[${t(type.itemType, false)}]`;
      else if (type.kind === 'object') base = type.className;
      else base = 'Any';
      return nullable ? `Optional[${base}]` : base;
    }
    const allFields = classes.flatMap(c => c.fields);
    const typing = [];
    if (allFields.some(f => f.nullable))              typing.push('Optional');
    if (allFields.some(f => f.type.kind === 'array')) typing.push('List');
    if (allFields.some(f => f.type.kind === 'any'))   typing.push('Any');
    const imports = ['from __future__ import annotations', 'from dataclasses import dataclass'];
    if (typing.length) imports.push(`from typing import ${typing.join(', ')}`);
    const classCode = [...classes].reverse().map(cls => {
      const fields = cls.fields.map(f => `    ${toCamelCase(f.key)}: ${t(f.type, f.nullable)}`).join('\n');
      return `@dataclass\nclass ${cls.name}:\n${fields}`;
    }).join('\n\n');
    return imports.join('\n') + '\n\n\n' + classCode;
  }

  function genJava(classes) {
    function t(type, boxed) {
      if (type.kind === 'null')    return 'Object';
      if (type.kind === 'boolean') return boxed ? 'Boolean' : 'boolean';
      if (type.kind === 'int')     return boxed ? 'Integer' : 'int';
      if (type.kind === 'float')   return boxed ? 'Double'  : 'double';
      if (type.kind === 'string')  return 'String';
      if (type.kind === 'array')   return `List<${t(type.itemType, true)}>`;
      if (type.kind === 'object')  return type.className;
      return 'Object';
    }
    const needsList = classes.some(c => c.fields.some(f => f.type.kind === 'array'));
    let out = needsList ? 'import java.util.List;\n\n' : '';
    out += classes.map(cls => {
      const fields  = cls.fields.map(f => `    private ${t(f.type, f.nullable)} ${toCamelCase(f.key)};`).join('\n');
      const methods = cls.fields.map(f => {
        const type  = t(f.type, f.nullable);
        const camel = toCamelCase(f.key);
        const pas   = toPascalCase(f.key);
        return `    public ${type} get${pas}() { return ${camel}; }\n    public void set${pas}(${type} ${camel}) { this.${camel} = ${camel}; }`;
      }).join('\n\n');
      return `public class ${cls.name} {\n${fields}\n\n${methods}\n}`;
    }).join('\n\n');
    return out;
  }

  function genGo(classes) {
    function t(type, ptr) {
      const p = ptr ? '*' : '';
      if (type.kind === 'null')    return 'interface{}';
      if (type.kind === 'boolean') return `${p}bool`;
      if (type.kind === 'int')     return `${p}int`;
      if (type.kind === 'float')   return `${p}float64`;
      if (type.kind === 'string')  return `${p}string`;
      if (type.kind === 'array')   return `[]${t(type.itemType, false)}`;
      if (type.kind === 'object')  return `${p}${type.className}`;
      return 'interface{}';
    }
    return [...classes].reverse().map(cls => {
      const maxKey  = Math.max(...cls.fields.map(f => toPascalCase(f.key).length));
      const maxType = Math.max(...cls.fields.map(f => t(f.type, f.nullable).length));
      const fields  = cls.fields.map(f =>
        `    ${toPascalCase(f.key).padEnd(maxKey)} ${t(f.type, f.nullable).padEnd(maxType)} \`json:"${f.key}"\``
      ).join('\n');
      return `type ${cls.name} struct {\n${fields}\n}`;
    }).join('\n\n');
  }

  function genKotlin(classes) {
    function t(type, nullable) {
      let base;
      if (type.kind === 'null')    return 'Any?';
      if (type.kind === 'boolean') base = 'Boolean';
      else if (type.kind === 'int')    base = 'Int';
      else if (type.kind === 'float')  base = 'Double';
      else if (type.kind === 'string') base = 'String';
      else if (type.kind === 'array')  base = `List<${t(type.itemType, false)}>`;
      else if (type.kind === 'object') base = type.className;
      else base = 'Any';
      return nullable ? `${base}?` : base;
    }
    return [...classes].reverse().map(cls => {
      const params = cls.fields.map(f =>
        `    val ${toCamelCase(f.key)}: ${t(f.type, f.nullable)}${f.nullable ? ' = null' : ''}`
      ).join(',\n');
      return `data class ${cls.name}(\n${params}\n)`;
    }).join('\n\n');
  }

  document.getElementById('j2c-convert').addEventListener('click', () => {
    const raw = input.value.trim();
    if (!raw) return;
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">Invalid JSON: ${escapeHtml(e.message)}</div>`;
      return;
    }
    if (Array.isArray(parsed)) parsed = parsed[0];
    if (typeof parsed !== 'object' || parsed === null) {
      statusEl.innerHTML = '<div class="status-bar error">Input must be a JSON object or array of objects</div>';
      return;
    }
    const rootName = toPascalCase((document.getElementById('j2c-rootname').value.trim() || 'Root').replace(/[^a-zA-Z0-9_]/g, ''));
    const lang     = document.getElementById('j2c-lang').value;
    const classes  = [];
    buildClass(parsed, rootName, classes);
    let code;
    try {
      if (lang === 'csharp')          code = genCSharp(classes);
      else if (lang === 'typescript') code = genTypeScript(classes);
      else if (lang === 'python')     code = genPython(classes);
      else if (lang === 'java')       code = genJava(classes);
      else if (lang === 'go')         code = genGo(classes);
      else if (lang === 'kotlin')     code = genKotlin(classes);
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">${escapeHtml(e.message)}</div>`;
      return;
    }
    output.value = code;
    statusEl.innerHTML = `<div class="status-bar success">✓ Generated ${classes.length} class${classes.length > 1 ? 'es' : ''}</div>`;
  });

  document.getElementById('j2c-clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    statusEl.innerHTML = '';
  });

  document.getElementById('j2c-copy').addEventListener('click', () => {
    if (output.value) copyToClipboard(output.value);
  });
}


// =====================
// 29. SQL Join Builder
// =====================
function renderSqlJoinBuilder() {
  return `
    <style id="sjb-styles">
      .sjb-tab{padding:9px 14px;font-size:12px;font-weight:500;color:var(--text-muted);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.15s;user-select:none;white-space:nowrap}
      .sjb-tab:hover{color:var(--text)}
      .sjb-tab.sjb-active{color:var(--accent);border-bottom-color:var(--accent)}
      .sjb-table-card{position:absolute;background:var(--card-bg,#1e2230);border:1px solid var(--border);border-radius:8px;min-width:200px;max-width:300px;box-shadow:0 4px 20px rgba(0,0,0,0.35);user-select:none;transition:border-color 0.15s}
      .sjb-table-card:hover{border-color:var(--accent)}
      .sjb-field-row{display:flex;align-items:center;gap:6px;padding:5px 10px;font-family:var(--mono);font-size:12px;cursor:crosshair;transition:background 0.1s}
      .sjb-field-row:hover{background:rgba(128,128,128,0.09)}
      .sjb-field-row.sjb-connecting{background:rgba(79,142,247,0.14)}
      .sjb-field-row.sjb-connect-target:hover{background:rgba(62,207,142,0.12)}
      .sjb-dot{width:8px;height:8px;border-radius:50%;border:1.5px solid var(--border);background:var(--bg);flex-shrink:0;transition:all 0.15s}
      .sjb-field-row:hover .sjb-dot{border-color:var(--accent);background:var(--accent);transform:scale(1.3)}
      .sjb-dot.pk{border-color:#f5c542;background:#f5c542}
      .sjb-dot.fk{border-color:#4f8ef7;background:transparent}
      .sjb-badge{font-size:9px;font-weight:600;padding:1px 4px;border-radius:3px}
      .sjb-badge.pk{background:rgba(245,197,66,0.15);color:#f5c542;border:1px solid rgba(245,197,66,0.3)}
      .sjb-badge.fk{background:rgba(79,142,247,0.15);color:#4f8ef7;border:1px solid rgba(79,142,247,0.3)}
      .sjb-badge.nn{background:rgba(224,82,82,0.12);color:#e05252;border:1px solid rgba(224,82,82,0.25)}
      .sjb-badge.uq{background:rgba(78,205,196,0.12);color:#4ecdc4;border:1px solid rgba(78,205,196,0.25)}
      .sjb-rel-item{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:8px 10px;margin-bottom:6px}
      .sjb-code-block{font-family:var(--mono);font-size:11px;line-height:1.65;color:var(--text);background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:10px;white-space:pre-wrap;word-break:break-all;margin-bottom:8px;overflow-x:auto}
      .sjb-copy-btn{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:3px;font-size:10px;cursor:pointer;background:var(--bg);border:1px solid var(--border);color:var(--text-muted);transition:all 0.15s;position:absolute;top:8px;right:8px;z-index:1}
      .sjb-copy-btn:hover{color:var(--text);border-color:var(--accent)}
      .sjb-kw{color:#c792ea}
      .sjb-tb{color:#4ecdc4}
      .sjb-cm{color:var(--text-muted);font-style:italic}
      .sjb-canvas-wrap{position:relative;height:600px;overflow:hidden;background-color:var(--bg);background-image:linear-gradient(rgba(128,128,128,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.07) 1px,transparent 1px);background-size:40px 40px}
    </style>

    <div class="card" id="sjb-input-card">
      <label class="field-label">SQL Schema Input</label>
      <textarea class="mono" id="sjb-input" rows="7" placeholder="Paste any SQL format (supports multiple tables at once):

• SELECT TOP (N) [col],[col] FROM [db].[dbo].[Table]
• CREATE TABLE with full field definitions
• Multiple tables: just paste them all together"></textarea>
      <div class="btn-group" style="margin-top:10px">
        <button class="btn" id="sjb-parse">Parse &amp; Add Tables</button>
        <button class="btn btn-ghost" id="sjb-clear-all">Clear All</button>
      </div>
      <div id="sjb-parse-status" style="margin-top:8px"></div>
    </div>

    <div id="sjb-workspace" style="display:none;margin-top:16px;border:1px solid var(--border);border-radius:8px;overflow:hidden">
      <!-- Canvas — full width -->
      <div class="sjb-canvas-wrap" id="sjb-canvas-wrap">
        <div id="sjb-connect-banner" style="display:none;position:absolute;top:12px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;padding:7px 18px;border-radius:20px;font-size:12px;font-weight:500;z-index:10;white-space:nowrap;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,0.3)">
          Click a field in another table to link — ESC to cancel
        </div>
        <svg id="sjb-svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible"></svg>
        <div id="sjb-tables-canvas" style="position:absolute;inset:0;z-index:2"></div>
      </div>
      <!-- Status bar -->
      <div id="sjb-statusbar" style="display:flex;align-items:center;gap:10px;padding:5px 14px;border-top:1px solid var(--border);font-size:11px;color:var(--text-muted)">
        <span style="width:6px;height:6px;border-radius:50%;background:#3ecf8e;flex-shrink:0;display:inline-block"></span>
        <span id="sjb-status-tables">0 tables</span>
        <span>·</span>
        <span id="sjb-status-rels">0 relations</span>
        <span id="sjb-status-mode" style="margin-left:auto"></span>
      </div>
      <!-- Output panel — full width, below canvas -->
      <div style="border-top:1px solid var(--border)">
        <div style="display:flex;border-bottom:1px solid var(--border);padding:0 6px;margin-bottom:-1px">
          <div class="sjb-tab sjb-active" data-tab="relations">Relations</div>
          <div class="sjb-tab" data-tab="fk">FK Script</div>
          <div class="sjb-tab" data-tab="join">JOIN SQL</div>
        </div>
        <div id="sjb-output-body" style="max-height:320px;overflow-y:auto;padding:12px">
          <div style="text-align:center;padding:32px 12px;color:var(--text-muted);font-size:12px;line-height:1.7">Connect fields between tables<br>to see output here</div>
        </div>
      </div>
    </div>
  `;
}

function initSqlJoinBuilder() {
  document.getElementById('toolBody').style.maxWidth = 'none';

  let tables    = [];   // {id,name,fullPath,alias,fields:[{name,type,pk,nn,uq,fk}],x,y,color}
  let relations = [];   // {id,fromTable,fromField,toTable,toField}
  let connectMode   = false;
  let connectSource = null;  // {tableName, fieldName}
  let dragging      = null;  // {tableId, t, ox, oy}
  let currentTab    = 'relations';
  let relIdCtr      = 0;

  const COLORS = ['#4f8ef7','#9b71ea','#3ecf8e','#f5a623','#4ecdc4','#e05252','#f5c542','#e879a0'];
  const FIELD_H  = 28;
  const HEADER_H = 40;

  const workspaceEl   = document.getElementById('sjb-workspace');
  const tablesCanvas  = document.getElementById('sjb-tables-canvas');
  const svgEl         = document.getElementById('sjb-svg');
  const canvasWrap    = document.getElementById('sjb-canvas-wrap');
  const connectBanner = document.getElementById('sjb-connect-banner');
  const outputBody    = document.getElementById('sjb-output-body');
  const parseStatus   = document.getElementById('sjb-parse-status');
  const statusTables  = document.getElementById('sjb-status-tables');
  const statusRels    = document.getElementById('sjb-status-rels');
  const statusMode    = document.getElementById('sjb-status-mode');

  // ── PARSER ────────────────────────────────────────────────────────────────

  function cleanName(s) { return (s || '').replace(/[\[\]`"]/g, '').trim(); }

  function guessPK(name) {
    const n = name.toLowerCase();
    return n === 'id' || (n.endsWith('id') && n.length <= 20);
  }

  function generateAlias(tableName, usedAliases) {
    const stripped = tableName.replace(/^tb_?/i, '');
    const words = stripped.match(/[A-Z][a-z0-9]*/g) || [stripped];
    let base = words.map(w => w[0].toLowerCase()).join('') || tableName.slice(0, 2).toLowerCase();
    let alias = base, n = 1;
    while (usedAliases.has(alias)) alias = base + (n++);
    return alias;
  }

  function parseSchemas(rawText) {
    const parsed = [];
    const text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Strategy 1: CREATE TABLE blocks
    const createPositions = [];
    const createRx = /CREATE\s+TABLE\s+/gi;
    let m;
    while ((m = createRx.exec(text)) !== null) createPositions.push(m.index);

    for (let i = 0; i < createPositions.length; i++) {
      const block = text.slice(createPositions[i], createPositions[i + 1] || text.length);
      const nameMatch = block.match(/CREATE\s+TABLE\s+((?:\[?[\w]+\]?\.)*\[?[\w]+\]?)/i);
      if (!nameMatch) continue;
      const fullPath = nameMatch[1];
      const parts = fullPath.split('.');
      const tableName = cleanName(parts[parts.length - 1]);
      const inner = block.match(/\(([^]*)\)/);
      if (!inner) continue;

      const lines = inner[1].split('\n');
      let pkCols = null;
      for (const line of lines) {
        const pk = line.trim().match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i);
        if (pk) pkCols = pk[1].split(',').map(s => cleanName(s));
      }

      const fields = [];
      for (const line of lines) {
        const t = line.trim().replace(/,$/, '');
        if (!t || /^(CONSTRAINT|INDEX|FOREIGN|UNIQUE\s*\(|CHECK\s*\(|PRIMARY\s+KEY\s*\()/i.test(t)) continue;
        const col = t.match(/^(\[?[\w]+\]?)\s+([\w()., ]+?)\s*(?:IDENTITY[^,]*)?((?:NOT\s+NULL|NULL|PRIMARY\s+KEY|UNIQUE|DEFAULT[^,]*)*)/i);
        if (!col) continue;
        const colName = cleanName(col[1]);
        if (/^(CONSTRAINT|INDEX|FOREIGN|CHECK|WITH|ON|GO)$/i.test(colName)) continue;
        const colType = col[2].trim();
        const rest = (col[3] || '').toUpperCase();
        const isPK = /PRIMARY\s+KEY/i.test(t) || (pkCols && pkCols.includes(colName));
        fields.push({ name: colName, type: colType, pk: isPK, nn: isPK || /NOT\s+NULL/.test(rest), uq: /UNIQUE/.test(rest), fk: false });
      }
      if (fields.length) parsed.push({ name: tableName, fullPath, fields });
    }
    if (parsed.length) return parsed;

    // Strategy 2: SELECT [col],[col] FROM [db].[schema].[table]
    const selectChunks = text.split(/(?=\bSELECT\b)/gi).filter(s => /SELECT/i.test(s));
    for (const chunk of selectChunks) {
      const fromMatch = chunk.match(/FROM\s+((?:\[?[\w]+\]?\.){0,3}\[?[\w]+\]?)(?:\s+\w+\s*)?(?:$|\s+(?:WHERE|JOIN|GROUP|ORDER|INNER|LEFT|RIGHT|HAVING|UNION))/i)
        || chunk.match(/FROM\s+((?:\[?[\w]+\]?\.){0,3}\[?[\w]+\]?)/i);
      if (!fromMatch) continue;
      const fullPath = fromMatch[1];
      const tableName = cleanName(fullPath.split('.').pop());
      if (!tableName) continue;

      const colSection = chunk.match(/SELECT\s+(?:TOP\s*\(\d+\)\s*|TOP\s+\d+\s*)?([^]+?)\s+FROM\s/i);
      if (!colSection) continue;

      const fields = [];
      for (const tok of colSection[1].split(',').map(s => s.trim()).filter(Boolean)) {
        if (!tok || tok === '*') continue;
        const cm = tok.match(/(?:[\w]+\.)?(\[?[\w]+\]?)(?:\s+(?:AS\s+)?\[?[\w]+\]?)?$/i);
        if (!cm) continue;
        const colName = cleanName(cm[1]);
        if (!colName || /^(TOP|DISTINCT|ALL)$/i.test(colName)) continue;
        const isPK = guessPK(colName);
        fields.push({ name: colName, type: '', pk: isPK, nn: isPK, uq: false, fk: false });
      }
      if (fields.length && !parsed.find(p => p.name.toLowerCase() === tableName.toLowerCase())) {
        parsed.push({ name: tableName, fullPath, fields });
      }
    }
    if (parsed.length) return parsed;

    // Strategy 3: Plain column list
    const fieldLines = text.split('\n').map(l => l.trim()).filter(l =>
      l && !/^(SELECT|FROM|WHERE|CREATE|ALTER|GO|--)/i.test(l)
    );
    const fields = [];
    for (const line of fieldLines) {
      const mm = line.replace(/,/g, '').match(/^(\[?[\w]+\]?)(?:\s+([\w().,]+))?/);
      if (!mm) continue;
      const colName = cleanName(mm[1]);
      if (!colName || /^(SELECT|FROM|WHERE|JOIN|ON|AS|TOP|DISTINCT)$/i.test(colName)) continue;
      fields.push({ name: colName, type: mm[2] || '', pk: guessPK(colName), nn: false, uq: false, fk: false });
    }
    if (fields.length) return [{ name: 'Table' + (tables.length + 1), fullPath: 'Table' + (tables.length + 1), fields }];
    return [];
  }

  // ── ADD TABLES ────────────────────────────────────────────────────────────

  function addParsedTables(parsed) {
    const usedAliases = new Set(tables.map(t => t.alias));
    parsed.forEach((p, i) => {
      const existing = tables.find(t => t.name === p.name);
      if (existing) { existing.fields = p.fields; existing.fullPath = p.fullPath || existing.fullPath; renderTableCard(existing); return; }
      const idx = tables.length;
      const cols = Math.max(1, Math.ceil(Math.sqrt(parsed.length + tables.length + 1)));
      const alias = generateAlias(p.name, usedAliases);
      usedAliases.add(alias);
      tables.push({
        id: 'sjbt_' + Date.now() + '_' + idx,
        name: p.name, fullPath: p.fullPath,
        alias, fields: p.fields,
        x: 20 + (idx % cols) * 240,
        y: 20 + Math.floor(idx / cols) * 220,
        color: COLORS[idx % COLORS.length]
      });
    });
    workspaceEl.style.display = '';
    tables.forEach(t => renderTableCard(t));
    renderRelations();
    updateStatus();
  }

  // ── RENDER TABLE CARD ─────────────────────────────────────────────────────

  function renderTableCard(t) {
    let card = document.getElementById(t.id);
    if (!card) {
      card = document.createElement('div');
      card.id = t.id;
      card.className = 'sjb-table-card';
      tablesCanvas.appendChild(card);
    }
    card.style.left = t.x + 'px';
    card.style.top  = t.y + 'px';

    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:7px;padding:8px 10px;background:${t.color}18;border-radius:7px 7px 0 0;cursor:grab;border-bottom:1px solid var(--border)" data-drag="${t.id}">
        <div style="width:18px;height:18px;background:linear-gradient(135deg,${t.color},${t.color}88);border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px">⬡</div>
        <span style="font-family:var(--mono);font-size:13px;font-weight:600;color:${t.color};flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${t.name}">${t.name}</span>
        <span style="font-size:10px;color:var(--text-muted);font-family:var(--mono);flex-shrink:0">${t.alias}</span>
        <button data-action="delete-table" data-table-id="${t.id}" style="width:18px;height:18px;background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:15px;line-height:1;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:0" title="Delete table">×</button>
      </div>
      <div style="padding:3px 0">
        ${t.fields.map(f => {
          const isFk = relations.some(r => r.fromTable === t.name && r.fromField === f.name);
          const dotCls = f.pk ? 'sjb-dot pk' : (isFk ? 'sjb-dot fk' : 'sjb-dot');
          return `<div class="sjb-field-row" data-action="connect-field" data-table-name="${t.name}" data-field-name="${f.name}">
            <div class="${dotCls}"></div>
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text)" title="${f.name}">${f.name}</span>
            <div style="display:flex;gap:2px;flex-shrink:0">
              ${f.pk  ? '<span class="sjb-badge pk">PK</span>' : ''}
              ${isFk  ? '<span class="sjb-badge fk">FK</span>' : ''}
              ${f.nn && !f.pk ? '<span class="sjb-badge nn">NN</span>' : ''}
              ${f.uq  ? '<span class="sjb-badge uq">UQ</span>' : ''}
            </div>
            ${f.type ? `<span style="font-size:10px;color:var(--text-muted);margin-left:4px;flex-shrink:0;font-family:var(--mono)">${f.type.slice(0,14)}</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    `;
  }

  // ── DRAG ──────────────────────────────────────────────────────────────────

  tablesCanvas.addEventListener('mousedown', e => {
    const header = e.target.closest('[data-drag]');
    if (!header || e.target.dataset.action === 'delete-table') return;
    const t = tables.find(x => x.id === header.dataset.drag);
    if (!t) return;
    dragging = { tableId: t.id, t, ox: e.clientX - t.x, oy: e.clientY - t.y };
    document.getElementById(t.id).style.zIndex = '100';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging || !document.getElementById('sjb-canvas-wrap')) { dragging = null; return; }
    dragging.t.x = Math.max(0, e.clientX - dragging.ox);
    dragging.t.y = Math.max(0, e.clientY - dragging.oy);
    const card = document.getElementById(dragging.tableId);
    if (card) { card.style.left = dragging.t.x + 'px'; card.style.top = dragging.t.y + 'px'; }
    renderRelations();
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    const card = document.getElementById(dragging.tableId);
    if (card) card.style.zIndex = '';
    dragging = null;
  });

  // ── CONNECT / RELATIONS ───────────────────────────────────────────────────

  tablesCanvas.addEventListener('click', e => {
    const delBtn = e.target.closest('[data-action="delete-table"]');
    if (delBtn) { e.stopPropagation(); deleteTableById(delBtn.dataset.tableId); return; }

    const fieldRow = e.target.closest('[data-action="connect-field"]');
    if (!fieldRow) return;
    const tableName = fieldRow.dataset.tableName;
    const fieldName = fieldRow.dataset.fieldName;

    if (!connectMode) {
      connectMode = true;
      connectSource = { tableName, fieldName };
      connectBanner.style.display = 'block';
      statusMode.textContent = `Linking: ${tableName}.${fieldName}`;
      document.querySelectorAll('#sjb-tables-canvas .sjb-field-row').forEach(r => {
        if (r.dataset.tableName === tableName && r.dataset.fieldName === fieldName) r.classList.add('sjb-connecting');
        else if (r.dataset.tableName !== tableName) r.classList.add('sjb-connect-target');
      });
    } else {
      if (connectSource.tableName === tableName) { cancelConnect(); return; }
      addRelation(connectSource.tableName, connectSource.fieldName, tableName, fieldName);
      cancelConnect();
    }
  });

  function cancelConnect() {
    connectMode = false; connectSource = null;
    connectBanner.style.display = 'none';
    statusMode.textContent = '';
    document.querySelectorAll('#sjb-tables-canvas .sjb-field-row').forEach(r =>
      r.classList.remove('sjb-connecting', 'sjb-connect-target')
    );
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && connectMode) cancelConnect(); });

  function addRelation(fromTable, fromField, toTable, toField) {
    if (relations.some(r => r.fromTable===fromTable && r.fromField===fromField && r.toTable===toTable && r.toField===toField)) return;
    relations.push({ id: 'rel_'+(relIdCtr++), fromTable, fromField, toTable, toField });
    [fromTable, toTable].forEach(n => { const t = tables.find(x=>x.name===n); if(t) renderTableCard(t); });
    renderRelations(); updateOutput(); updateStatus();
  }

  function deleteRelation(relId) {
    const r = relations.find(x => x.id === relId);
    relations = relations.filter(x => x.id !== relId);
    if (r) [r.fromTable, r.toTable].forEach(n => { const t=tables.find(x=>x.name===n); if(t) renderTableCard(t); });
    renderRelations(); updateOutput(); updateStatus();
  }

  function deleteTableById(tableId) {
    const t = tables.find(x => x.id === tableId);
    if (!t) return;
    relations = relations.filter(r => r.fromTable!==t.name && r.toTable!==t.name);
    tables = tables.filter(x => x.id !== tableId);
    document.getElementById(tableId)?.remove();
    renderRelations(); updateOutput(); updateStatus();
  }

  // ── SVG RELATIONS ─────────────────────────────────────────────────────────

  function renderRelations() {
    svgEl.innerHTML = `<defs>
      <marker id="sjb-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#4f8ef7" opacity="0.8"/>
      </marker>
    </defs>`;

    relations.forEach((rel, idx) => {
      const fromT = tables.find(t => t.name === rel.fromTable);
      const toT   = tables.find(t => t.name === rel.toTable);
      if (!fromT || !toT) return;
      const fromCard = document.getElementById(fromT.id);
      const toCard   = document.getElementById(toT.id);
      if (!fromCard || !toCard) return;

      const fiIdx = fromT.fields.findIndex(f => f.name === rel.fromField);
      const tiIdx = toT.fields.findIndex(f => f.name === rel.toField);
      if (fiIdx === -1 || tiIdx === -1) return;

      const y1 = fromT.y + HEADER_H + fiIdx * FIELD_H + FIELD_H / 2;
      const y2 = toT.y   + HEADER_H + tiIdx * FIELD_H + FIELD_H / 2;
      const fromMidX = fromT.x + fromCard.offsetWidth / 2;
      const toMidX   = toT.x   + toCard.offsetWidth   / 2;

      const x1 = fromMidX <= toMidX ? fromT.x + fromCard.offsetWidth : fromT.x;
      const x2 = fromMidX <= toMidX ? toT.x                          : toT.x + toCard.offsetWidth;

      const dx = Math.abs(x2 - x1) * 0.5;
      const pathD = `M ${x1} ${y1} C ${x1+(x1<x2?dx:-dx)} ${y1}, ${x2+(x1<x2?-dx:dx)} ${y2}, ${x2} ${y2}`;
      const color = COLORS[idx % COLORS.length];
      const mx = (x1+x2)/2, my = (y1+y2)/2;
      const labelText = `${rel.fromField} → ${rel.toField}`;
      const lw = Math.min(labelText.length * 6 + 8, 140);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';

      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hit.setAttribute('d', pathD); hit.setAttribute('stroke', 'transparent');
      hit.setAttribute('stroke-width', '14'); hit.setAttribute('fill', 'none');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD); path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1.5'); path.setAttribute('fill', 'none');
      path.setAttribute('stroke-opacity', '0.7'); path.setAttribute('marker-end', 'url(#sjb-arrow)');

      const lbg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      lbg.setAttribute('x', mx-lw/2); lbg.setAttribute('y', my-9);
      lbg.setAttribute('width', lw); lbg.setAttribute('height', 16);
      lbg.setAttribute('rx', '4');
      lbg.setAttribute('style', 'fill:var(--bg)'); lbg.setAttribute('opacity', '0.92');

      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', mx); lbl.setAttribute('y', my+3);
      lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '10');
      lbl.setAttribute('font-family', 'monospace');
      lbl.setAttribute('style', 'fill:var(--text-muted)');
      lbl.textContent = labelText;

      g.appendChild(hit); g.appendChild(path); g.appendChild(lbg); g.appendChild(lbl);
      g.addEventListener('mouseenter', () => { path.setAttribute('stroke-opacity','1'); path.setAttribute('stroke-width','2.5'); });
      g.addEventListener('mouseleave', () => { path.setAttribute('stroke-opacity','0.7'); path.setAttribute('stroke-width','1.5'); });
      g.addEventListener('click', () => {
        if (confirm(`Delete relation: ${rel.fromTable}.${rel.fromField} → ${rel.toTable}.${rel.toField}?`))
          deleteRelation(rel.id);
      });
      svgEl.appendChild(g);
    });
  }

  // ── OUTPUT TABS ───────────────────────────────────────────────────────────

  document.querySelectorAll('#sjb-workspace .sjb-tab').forEach(tab =>
    tab.addEventListener('click', () => {
      currentTab = tab.dataset.tab;
      document.querySelectorAll('#sjb-workspace .sjb-tab').forEach(t => t.classList.toggle('sjb-active', t === tab));
      updateOutput();
    })
  );

  outputBody.addEventListener('click', e => {
    const delBtn = e.target.closest('[data-action="delete-relation"]');
    if (delBtn) deleteRelation(delBtn.dataset.relId);
  });

  function updateOutput() {
    if (!relations.length) {
      outputBody.innerHTML = `<div style="text-align:center;padding:32px 12px;color:var(--text-muted);font-size:12px;line-height:1.7">Connect fields between tables<br>to see output here</div>`;
      return;
    }
    if (currentTab === 'relations') renderRelationsList();
    else if (currentTab === 'fk')   renderFKScript();
    else                             renderJoinScript();
  }

  function renderRelationsList() {
    outputBody.innerHTML = relations.map(r => `
      <div class="sjb-rel-item">
        <div style="font-family:var(--mono);font-size:12px;font-weight:600;color:var(--accent);margin-bottom:3px">${r.fromTable}.${r.fromField} → ${r.toTable}.${r.toField}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px"><b style="color:var(--text)">${r.fromTable}</b> (FK: ${r.fromField}) → <b style="color:var(--text)">${r.toTable}</b> (PK: ${r.toField})</div>
        <button data-action="delete-relation" data-rel-id="${r.id}" style="font-size:11px;color:#e05252;cursor:pointer;background:none;border:none;padding:0">✕ Remove</button>
      </div>
    `).join('');
  }

  function syntaxHL(code) {
    return code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\b(SELECT|FROM|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL OUTER JOIN|ON|WHERE|ALTER TABLE|ADD CONSTRAINT|FOREIGN KEY|REFERENCES|GO|AS|ORDER BY|GROUP BY|NOT NULL|PRIMARY KEY)\b/gi, '<span class="sjb-kw">$&</span>')
      .replace(/(\[[^\]]+\])/g, '<span class="sjb-tb">$1</span>')
      .replace(/(--[^\n]*)/g, '<span class="sjb-cm">$1</span>');
  }

  function renderFKScript() {
    const script = relations.map((r, i) => {
      const fkName = `FK_${r.fromTable}_${r.toTable}_${r.fromField}`;
      return `-- Relation ${i+1}: ${r.fromTable}.${r.fromField} → ${r.toTable}.${r.toField}
ALTER TABLE [dbo].[${r.fromTable}]
  ADD CONSTRAINT [${fkName}]
  FOREIGN KEY ([${r.fromField}])
  REFERENCES [dbo].[${r.toTable}] ([${r.toField}])
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
GO`;
    }).join('\n\n');
    const copyId = registerCopy(script);
    outputBody.innerHTML = `
      <div style="position:relative">
        <button class="sjb-copy-btn" onclick="copyFromRegistry('${copyId}')">⧉ Copy</button>
        <pre class="sjb-code-block">${syntaxHL(script)}</pre>
      </div>`;
  }

  function renderJoinScript() {
    if (!tables.length) return;
    const main = tables[0];
    const added = new Set([main.name]);
    const joinLines = [];
    const queue = [...relations];
    let pass = 0;

    while (queue.length && pass < relations.length * 2) {
      const r = queue.shift();
      const fa = added.has(r.fromTable), ta = added.has(r.toTable);
      if (!fa && !ta) { queue.push(r); pass++; continue; }
      if (fa && ta) continue;
      const [anchorName, newName, anchorCol, newCol] = fa
        ? [r.fromTable, r.toTable, r.fromField, r.toField]
        : [r.toTable,   r.fromTable, r.toField, r.fromField];
      const anchorT = tables.find(t => t.name === anchorName);
      const newT    = tables.find(t => t.name === newName);
      if (!newT) continue;
      joinLines.push(`INNER JOIN ${newT.fullPath} ${newT.alias}\n    ON ${anchorT.alias}.[${anchorCol}] = ${newT.alias}.[${newCol}]`);
      added.add(newName); pass = 0;
    }

    const colLines = tables.filter(t => added.has(t.name))
      .flatMap(t => t.fields.map(f => `    ${t.alias}.[${f.name}]`));
    const firstCol = main.fields[0]?.name || 'id';
    const sql = `SELECT TOP (1000)\n${colLines.join(',\n')}\nFROM ${main.fullPath} ${main.alias}\n${joinLines.join('\n')}\nORDER BY ${main.alias}.[${firstCol}];`;

    const copyId = registerCopy(sql);
    outputBody.innerHTML = `
      <div style="position:relative">
        <button class="sjb-copy-btn" onclick="copyFromRegistry('${copyId}')">⧉ Copy</button>
        <pre class="sjb-code-block">${syntaxHL(sql)}</pre>
      </div>`;
  }

  // ── STATUS & BUTTONS ──────────────────────────────────────────────────────

  function updateStatus() {
    statusTables.textContent = `${tables.length} table${tables.length!==1?'s':''}`;
    statusRels.textContent   = `${relations.length} relation${relations.length!==1?'s':''}`;
  }

  document.getElementById('sjb-parse').addEventListener('click', () => {
    const text = document.getElementById('sjb-input').value.trim();
    if (!text) return;
    const parsed = parseSchemas(text);
    if (!parsed.length) {
      parseStatus.innerHTML = '<div class="status-bar error">Could not parse any tables — try CREATE TABLE or SELECT ... FROM format</div>';
      return;
    }
    addParsedTables(parsed);
    document.getElementById('sjb-input').value = '';
    parseStatus.innerHTML = `<div class="status-bar success">✓ Added ${parsed.length} table${parsed.length!==1?'s':''}</div>`;
  });

  document.getElementById('sjb-clear-all').addEventListener('click', () => {
    if (tables.length && !confirm('Clear all tables and relations?')) return;
    tables = []; relations = [];
    tablesCanvas.innerHTML = '';
    renderRelations(); updateOutput(); updateStatus();
    workspaceEl.style.display = 'none';
    parseStatus.innerHTML = '';
    cancelConnect();
  });
}
