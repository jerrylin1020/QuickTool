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
];

// =====================
// App State
// =====================
let currentToolId = null;

// =====================
// Bootstrap
// =====================
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildGrid();
  setupSearch();
  setupTheme();
  setupSidebar();

  document.getElementById('backBtn').addEventListener('click', showHome);
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
      const btn = document.createElement('button');
      btn.className = 'nav-item';
      btn.dataset.toolId = tool.id;
      btn.innerHTML = `<span class="nav-icon">${tool.icon}</span><span class="tool-label">${tool.name}</span>`;
      btn.addEventListener('click', () => openTool(tool.id));
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
  document.getElementById('toolBody').innerHTML = tool.render();

  document.getElementById('welcomeScreen').classList.add('hidden');
  document.getElementById('toolView').classList.remove('hidden');

  // Highlight active nav item
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.toolId === id);
  });

  tool.init();
}

function showHome() {
  currentToolId = null;
  document.getElementById('welcomeScreen').classList.remove('hidden');
  document.getElementById('toolView').classList.add('hidden');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
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
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  showCopyFeedback();
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
      <label class="field-label">Enter strings (one per line)</label>
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
      output.value = btoa(unescape(encodeURIComponent(input.value)));
      statusEl.innerHTML = '<div class="status-bar success">✓ Encoded to Base64</div>';
    } catch (e) {
      statusEl.innerHTML = `<div class="status-bar error">✗ ${e.message}</div>`;
    }
  });

  document.getElementById('b64-decode').addEventListener('click', () => {
    try {
      output.value = decodeURIComponent(escape(atob(input.value.trim())));
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

    let regex;
    try {
      regex = new RegExp(pattern, flags);
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
          <label class="field-label">List A</label>
          <textarea id="lc-a" rows="12" placeholder="111&#10;2122&#10;3333"></textarea>
        </div>
        <div>
          <label class="field-label">List B</label>
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
          <button class="btn btn-ghost btn-sm" onclick="copyToClipboard('${items.map(i => originalMap ? (originalMap.get(i) ?? i) : i).join('\\n').replace(/'/g, "\\'")}')">Copy</button>
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
    parseList(rawA, trim, ignoreEmpty, true).forEach((orig, i) => {
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

  // Auto-compare on input
  ['lc-a', 'lc-b'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      if (document.getElementById('lc-a').value || document.getElementById('lc-b').value) {
        document.getElementById('lc-compare').click();
      }
    });
  });
}
