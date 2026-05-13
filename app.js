// ============================================================
// app.js — 56-Day Prep Tracker — Main Application Logic
// ============================================================
// Sections:
//   1. State Management
//   2. Local Storage Helpers
//   3. Auth / Login
//   4. Progress Loading & Init
//   5. Sidebar Rendering
//   6. Day View Rendering
//   7. Checkbox Toggle Handlers
//   8. Problem Notes (inline panel)
//   9. All Problems Tab
//  10. DSA Notes Tab
//  11. Header / Stats

// ─── Markdown Editor Builder ─────────────────────────────────
// Returns a DOM element: tabbed Write / Preview editor.
// onChange(value) called whenever the textarea content changes.
function buildMarkdownEditor({ value = '', placeholder = 'Write notes in markdown…', rows = 5, onChange } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'md-editor';

  // Tab bar
  const tabBar = document.createElement('div');
  tabBar.className = 'md-tab-bar';
  tabBar.innerHTML = `
    <button class="md-tab active" data-tab="write">Write</button>
    <button class="md-tab" data-tab="preview">Preview</button>
    <span class="md-hint">Markdown supported</span>
  `;

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'md-toolbar';
  toolbar.innerHTML = `
    <button data-action="bold"    title="Bold (**text**)"         class="md-tool"><strong>B</strong></button>
    <button data-action="italic"  title="Italic (*text*)"         class="md-tool"><em>I</em></button>
    <button data-action="code"    title="Inline code (\`code\`)"  class="md-tool"><code>&lt;/&gt;</code></button>
    <button data-action="block"   title="Code block"              class="md-tool">&#96;&#96;&#96;</button>
    <button data-action="ul"      title="Bullet list"             class="md-tool">• List</button>
    <button data-action="heading" title="Heading"                 class="md-tool">H</button>
    <button data-action="bold"    title="Separator" class="md-tool-sep"></button>
    <button data-action="quote"   title="Blockquote"             class="md-tool">&gt; Quote</button>
  `;

  // Textarea (write pane)
  const ta = document.createElement('textarea');
  ta.className = 'md-textarea';
  ta.placeholder = placeholder;
  ta.value = value;
  ta.rows = rows;
  ta.spellcheck = true;

  // Auto-resize
  const autoResize = () => {
    ta.style.height = 'auto';
    ta.style.height = Math.max(ta.scrollHeight, rows * 22) + 'px';
  };
  ta.addEventListener('input', () => { autoResize(); if (onChange) onChange(ta.value); });
  setTimeout(autoResize, 0);

  // Preview pane
  const preview = document.createElement('div');
  preview.className = 'md-preview hidden';

  // Tab switching
  tabBar.querySelectorAll('.md-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabBar.querySelectorAll('.md-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (tab === 'write') {
        ta.classList.remove('hidden');
        toolbar.classList.remove('hidden');
        preview.classList.add('hidden');
        ta.focus();
      } else {
        ta.classList.add('hidden');
        toolbar.classList.add('hidden');
        preview.classList.remove('hidden');
        preview.innerHTML = renderMarkdown(ta.value) || '<p class="md-empty">Nothing written yet.</p>';
      }
    });
  });

  // Toolbar actions
  toolbar.querySelectorAll('.md-tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.dataset.action;
      const start = ta.selectionStart;
      const end   = ta.selectionEnd;
      const sel   = ta.value.slice(start, end);
      const before = ta.value.slice(0, start);
      const after  = ta.value.slice(end);
      let insert = '', cursorOffset = 0;

      switch (action) {
        case 'bold':    insert = `**${sel || 'bold text'}**`;      cursorOffset = sel ? insert.length : 2; break;
        case 'italic':  insert = `*${sel || 'italic text'}*`;      cursorOffset = sel ? insert.length : 1; break;
        case 'code':    insert = `\`${sel || 'code'}\``;           cursorOffset = sel ? insert.length : 1; break;
        case 'block':   insert = `\`\`\`java\n${sel || '// code here'}\n\`\`\``; cursorOffset = 8; break;
        case 'ul':      insert = `\n- ${sel || 'item'}\n`;         cursorOffset = 3; break;
        case 'heading': insert = `\n## ${sel || 'Heading'}\n`;     cursorOffset = 4; break;
        case 'quote':   insert = `\n> ${sel || 'quote'}\n`;        cursorOffset = 3; break;
        default: return;
      }

      ta.value = before + insert + after;
      ta.selectionStart = ta.selectionEnd = start + (sel ? insert.length : cursorOffset);
      ta.focus();
      autoResize();
      if (onChange) onChange(ta.value);
    });
  });

  wrap.appendChild(tabBar);
  wrap.appendChild(toolbar);
  wrap.appendChild(ta);
  wrap.appendChild(preview);

  wrap.getValue = () => ta.value;
  wrap.setValue = (v) => { ta.value = v; autoResize(); };

  return wrap;
}
//  12. Save / GitHub Sync
//  13. Utilities
//  14. Bootstrap
// ============================================================

// ─── 1. State ───────────────────────────────────────────────
const APP = {
  owner:      null,
  repo:       null,
  pat:        null,
  progress:   null,   // { startDate, days: { "1": {...}, ... } }
  sha:        null,   // current SHA of progress.json
  currentDay: 1,
  activeTab:  'today',
  saveTimer:  null,
  noteDebounceTimers: {},
};

// ─── 2. Local Storage Helpers ────────────────────────────────
const LS = {
  get:    (k)    => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set:    (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  remove: (k)    => localStorage.removeItem(k),
};

// ─── 3. Auth / Login ─────────────────────────────────────────

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pat   = document.getElementById('input-pat').value.trim();
  const owner = document.getElementById('input-owner').value.trim();
  const repo  = document.getElementById('input-repo').value.trim();
  const errEl = document.getElementById('login-error');
  const btn   = document.getElementById('btn-connect');

  errEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Connecting…';

  try {
    const { data, sha } = await loadProgress(owner, repo, pat);
    APP.pat   = pat;
    APP.owner = owner;
    APP.repo  = repo;

    LS.set('pat',   pat);
    LS.set('owner', owner);
    LS.set('repo',  repo);

    if (data) {
      APP.progress = data;
      APP.sha      = sha;
    } else {
      // First time — create progress.json
      APP.progress = buildInitialProgress();
      APP.sha = await saveProgress(owner, repo, pat, APP.progress, null);
    }

    initApp();
    showApp();
  } catch (err) {
    errEl.textContent = `Connection failed: ${err.message}`;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Connect';
  }
});

document.getElementById('btn-logout').addEventListener('click', () => {
  if (APP.dirty && !confirm('You have unsaved changes. Log out anyway?')) return;
  LS.remove('pat');
  LS.remove('owner');
  LS.remove('repo');
  APP.pat = APP.owner = APP.repo = APP.progress = APP.sha = null;
  showLogin();
});

document.getElementById('btn-sync').addEventListener('click', () => doSave());

// ── Hamburger / mobile sidebar ───────────────────────────────
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('sidebar-open');
  document.getElementById('sidebar-overlay').classList.add('hidden');
  document.getElementById('btn-hamburger').setAttribute('aria-expanded', 'false');
}

(function () {
  const btn     = document.getElementById('btn-hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  btn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('sidebar-open');
    overlay.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
  });
  overlay.addEventListener('click', closeSidebar);
  document.getElementById('sidebar-list').addEventListener('click', () => {
    if (window.innerWidth < 768) closeSidebar();
  });
})();

// ── Offline detection ────────────────────────────────────────
(function () {
  const banner = document.getElementById('offline-banner');
  function update() { banner.classList.toggle('hidden', navigator.onLine); }
  window.addEventListener('online',  update);
  window.addEventListener('offline', update);
  update();
})();

// ── Sidebar search ───────────────────────────────────────────
document.getElementById('sidebar-search').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  document.querySelectorAll('.sidebar-day-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = (!q || text.includes(q)) ? '' : 'none';
  });
  // Show/hide week headers if all their days are hidden
  document.querySelectorAll('.sidebar-week').forEach(section => {
    const anyVisible = [...section.querySelectorAll('.sidebar-day-item')]
      .some(el => el.style.display !== 'none');
    section.style.display = anyVisible ? '' : 'none';
  });
});

// ── Keyboard shortcuts ───────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT') return;

  // Ctrl/Cmd + S → sync
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    doSave();
    return;
  }
  // Escape → close any open note panel
  if (e.key === 'Escape') {
    document.querySelectorAll('.problem-notes-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.item-note-panel:not(.hidden)').forEach(p => p.classList.add('hidden'));
    return;
  }
  // Arrow keys → navigate days (only on Today tab)
  if (APP.activeTab !== 'today') return;
  if (e.key === 'ArrowLeft'  && APP.currentDay > 1)  navigateDay(APP.currentDay - 1);
  if (e.key === 'ArrowRight' && APP.currentDay < 56) navigateDay(APP.currentDay + 1);
});

function navigateDay(newDay) {
  document.querySelectorAll('.sidebar-day-item').forEach(el =>
    el.classList.toggle('active', parseInt(el.dataset.day) === newDay)
  );
  const activeEl = document.querySelector(`.sidebar-day-item[data-day="${newDay}"]`);
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
  renderDayView(newDay);
}

// ─── 4. Progress Loading & Init ──────────────────────────────

function buildInitialProgress() {
  return {
    startDate: '2026-05-13',
    days: {
      '1': {
        date:      '2026-05-13',
        completed: {
          dsa:    ['d1-1', 'd1-2', 'd1-3', 'd1-4', 'd1-5'],
          theory: [],
          review: [],
        },
        notes:        '',
        problemNotes: {},
        itemNotes:    {},
      },
    },
  };
}

function getDayProgress(dayNum) {
  const key = String(dayNum);
  if (!APP.progress.days[key]) {
    APP.progress.days[key] = {
      date:         '',
      completed:    { dsa: [], theory: [], review: [] },
      notes:        '',
      problemNotes: {},
      itemNotes:    {},
    };
  }
  if (!APP.progress.days[key].itemNotes) {
    APP.progress.days[key].itemNotes = {};
  }
  return APP.progress.days[key];
}

// Calculate which calendar day we're on (1-indexed, capped at 56)
function calcCurrentDay() {
  const start  = new Date(APP.progress.startDate);
  const today  = new Date();
  // strip time
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return Math.max(1, Math.min(56, diff));
}

function initApp() {
  APP.currentDay = calcCurrentDay();
  renderHeader();
  renderSidebar();
  renderDayView(APP.currentDay);
  renderPatternCards();
}

// ─── 5. Sidebar ─────────────────────────────────────────────

function renderSidebar() {
  const sidebar = document.getElementById('sidebar-list');
  sidebar.innerHTML = '';

  const weeks = {};
  CHECKLIST_DATA.forEach(d => {
    if (!weeks[d.week]) weeks[d.week] = [];
    weeks[d.week].push(d);
  });

  Object.keys(weeks).forEach(wk => {
    const weekEl = document.createElement('div');
    weekEl.className = 'sidebar-week';

    const header = document.createElement('div');
    header.className = 'sidebar-week-header';
    header.textContent = `Week ${wk}`;
    weekEl.appendChild(header);

    weeks[wk].forEach(dayData => {
      const item    = buildSidebarDayItem(dayData);
      weekEl.appendChild(item);
    });

    sidebar.appendChild(weekEl);
  });
}

function buildSidebarDayItem(dayData) {
  const item = document.createElement('div');
  item.className = 'sidebar-day-item';
  item.dataset.day = dayData.day;

  if (dayData.day === APP.currentDay) item.classList.add('today');
  if (dayData.day === APP.currentDay) item.classList.add('active');

  // Progress dot
  const dot = document.createElement('div');
  dot.className = 'day-dot';
  const dp  = getDayProgress(dayData.day);
  const total = dayData.dsa.length;
  const done  = dp.completed.dsa.length;
  if (done > 0 && done < total) dot.classList.add('partial');
  if (done === total && total > 0) dot.classList.add('complete');
  item.appendChild(dot);

  // Label
  const label = document.createElement('div');
  label.className = 'day-label';
  label.textContent = `Day ${dayData.day} · ${dayData.title}`;
  item.appendChild(label);

  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-day-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    APP.activeTab = 'today';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'today'));
    renderDayView(dayData.day);
  });

  return item;
}

function refreshSidebarDot(dayNum) {
  const item = document.querySelector(`.sidebar-day-item[data-day="${dayNum}"]`);
  if (!item) return;
  const dot     = item.querySelector('.day-dot');
  const dayData = CHECKLIST_DATA[dayNum - 1];
  const dp      = getDayProgress(dayNum);
  const done    = dp.completed.dsa.length;
  const total   = dayData.dsa.length;
  dot.className = 'day-dot';
  if (done > 0 && done < total) dot.classList.add('partial');
  if (done === total && total > 0) dot.classList.add('complete');
}

// ─── 6. Day View ─────────────────────────────────────────────

function renderDayView(dayNum) {
  APP.currentDay = dayNum; // track viewed day (not just "current")
  const dayData = CHECKLIST_DATA[dayNum - 1];
  const dp      = getDayProgress(dayNum);

  const container = document.getElementById('day-view');
  container.innerHTML = '';

  // Header
  const headerDiv = document.createElement('div');
  headerDiv.className = 'day-header';

  const dayOfWeek = getDayOfWeek(dayNum);
  const h2 = document.createElement('h2');
  h2.textContent = `Day ${dayNum} — ${dayOfWeek} | ${dayData.title}`;
  headerDiv.appendChild(h2);

  const metaDiv = document.createElement('div');
  metaDiv.className = 'day-meta';
  const dateStr = getDateForDay(dayNum);
  const totalItems = dayData.dsa.length + dayData.theory.length + dayData.review.length;
  const doneItems  = dp.completed.dsa.length + dp.completed.theory.length + dp.completed.review.length;
  metaDiv.innerHTML = `<span>${dateStr}</span><span>${doneItems}/${totalItems} items completed today</span>`;
  headerDiv.appendChild(metaDiv);

  const themeEl = document.createElement('div');
  themeEl.className = 'theme-text';
  themeEl.textContent = dayData.theme;
  headerDiv.appendChild(themeEl);

  container.appendChild(headerDiv);

  // DSA Card
  container.appendChild(buildDSACard(dayData, dp));

  // Theory Card
  container.appendChild(buildChecklistCard('Theory (1.5 hrs)', 'theory', dayData.theory, dp));

  // Review Card
  container.appendChild(buildChecklistCard('Review (0.5 hr)', 'review', dayData.review, dp));

  // Day Notes Card
  container.appendChild(buildDayNotesCard(dayNum, dp));

  // Nav
  container.appendChild(buildDayNav(dayNum));
}

function buildDSACard(dayData, dp) {
  const done  = dp.completed.dsa.length;
  const total = dayData.dsa.length;

  const card = document.createElement('div');
  card.className = 'section-card';

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `<h3>DSA (2.5 hrs)</h3>`;
  const badge = document.createElement('div');
  badge.className = `badge${done === total ? ' done' : ''}`;
  badge.textContent = `${done}/${total}`;
  header.appendChild(badge);
  card.appendChild(header);

  const list = document.createElement('div');
  list.className = 'problem-list';

  dayData.dsa.forEach(problem => {
    list.appendChild(buildProblemRow(problem, dp, dayData.day));
  });

  card.appendChild(list);
  return card;
}

function buildProblemRow(problem, dp, dayNum) {
  const isComplete = dp.completed.dsa.includes(problem.id);
  const pNote      = dp.problemNotes[problem.id] || {};

  const row = document.createElement('div');
  row.className = `problem-row${isComplete ? ' completed' : ''}`;
  row.id = `row-${problem.id}`;

  // Main row
  const main = document.createElement('div');
  main.className = 'problem-row-main';

  // Checkbox
  const cb = document.createElement('input');
  cb.type    = 'checkbox';
  cb.className = 'problem-checkbox';
  cb.checked = isComplete;
  cb.addEventListener('change', () => toggleDSA(dayNum, problem.id, cb.checked));
  main.appendChild(cb);

  // Number
  const numEl = document.createElement('div');
  numEl.className = 'problem-number';
  numEl.textContent = `#${problem.number}`;
  main.appendChild(numEl);

  // Title + link
  const titleEl = document.createElement('div');
  titleEl.className = 'problem-title';
  titleEl.innerHTML = `<a href="${problem.url}" target="_blank" rel="noopener">${problem.title}</a>`;
  if (problem.note) {
    const noteHint = document.createElement('div');
    noteHint.style.cssText = 'font-size:10px;color:var(--text-muted);margin-top:2px;';
    noteHint.textContent = problem.note;
    titleEl.appendChild(noteHint);
  }
  main.appendChild(titleEl);

  // Difficulty badge
  const diff = document.createElement('div');
  diff.className = `difficulty-badge ${problem.difficulty}`;
  diff.textContent = problem.difficulty;
  main.appendChild(diff);

  // Notes button
  const hasNote = pNote.noteText || pNote.pattern || pNote.timeMin;
  const btnNote = document.createElement('button');
  btnNote.className = `btn-notes${hasNote ? ' has-notes' : ''}`;
  btnNote.textContent = hasNote ? '📝 Notes' : 'Notes';
  btnNote.addEventListener('click', () => toggleNotesPanel(problem.id));
  main.appendChild(btnNote);

  row.appendChild(main);

  // Notes panel
  const panel = buildNotesPanel(problem, dp, dayNum);
  row.appendChild(panel);

  return row;
}

function buildChecklistCard(title, type, items, dp) {
  const done  = items.filter(i => dp.completed[type].includes(i.id)).length;
  const total = items.length;

  const card = document.createElement('div');
  card.className = 'section-card';

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `<h3>${title}</h3>`;
  const badge = document.createElement('div');
  badge.className = `badge${done === total && total > 0 ? ' done' : ''}`;
  badge.textContent = `${done}/${total}`;
  header.appendChild(badge);
  card.appendChild(header);

  const list = document.createElement('div');
  list.className = 'checklist-list';

  items.forEach(item => {
    const isComplete = dp.completed[type].includes(item.id);

    const wrapper = document.createElement('div');
    wrapper.className = 'checklist-item-wrapper';

    const el = document.createElement('div');
    el.className = `checklist-item${isComplete ? ' done' : ''}`;

    const cb = document.createElement('input');
    cb.type    = 'checkbox';
    cb.id      = `chk-${item.id}`;
    cb.checked = isComplete;
    cb.addEventListener('change', () => toggleChecklist(dp, type, item.id, cb.checked, el, card.querySelector('.badge')));

    const labelEl = document.createElement('label');
    labelEl.htmlFor = `chk-${item.id}`;
    labelEl.className = 'checklist-label';
    labelEl.textContent = item.text;

    const noteBtn = document.createElement('button');
    noteBtn.className = 'item-note-btn';
    const savedNote = dp.itemNotes[item.id] || '';
    noteBtn.textContent = savedNote ? '📝' : '+ note';
    noteBtn.title = 'Add notes for this item';

    el.appendChild(cb);
    el.appendChild(labelEl);
    el.appendChild(noteBtn);
    wrapper.appendChild(el);

    // Inline notes panel
    const notePanel = document.createElement('div');
    notePanel.className = 'item-note-panel hidden';

    const mdEditor = buildMarkdownEditor({
      value:       savedNote,
      placeholder: 'Write your notes, key insights, or questions here…',
      rows:        4,
    });
    notePanel.appendChild(mdEditor);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'item-note-save';
    saveBtn.textContent = 'Save note';

    saveBtn.addEventListener('click', () => {
      const val = mdEditor.getValue().trim();
      dp.itemNotes[item.id] = val;
      noteBtn.textContent = val ? '📝' : '+ note';
      notePanel.classList.add('hidden');
      scheduleSave();
    });

    notePanel.appendChild(saveBtn);
    wrapper.appendChild(notePanel);

    noteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      notePanel.classList.toggle('hidden');
      if (!notePanel.classList.contains('hidden')) ta.focus();
    });

    list.appendChild(wrapper);
  });

  card.appendChild(list);
  return card;
}

function buildDayNotesCard(dayNum, dp) {
  const card = document.createElement('div');
  card.className = 'section-card day-notes-card';

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = '<h3>Day Notes</h3>';
  card.appendChild(header);

  const editor = buildMarkdownEditor({
    value:       dp.notes || '',
    placeholder: 'Add notes for today — key insights, what felt hard, patterns discovered…\n\n## What I learned\n\n## What was hard\n\n## Tomorrow\'s focus',
    rows:        8,
    onChange:    (val) => { dp.notes = val; scheduleSave(); },
  });
  card.appendChild(editor);

  return card;
}

function buildDayNav(dayNum) {
  const nav = document.createElement('div');
  nav.className = 'day-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'btn-nav';
  prevBtn.textContent = '← Previous Day';
  prevBtn.disabled = dayNum <= 1;
  prevBtn.addEventListener('click', () => {
    const newDay = dayNum - 1;
    document.querySelectorAll('.sidebar-day-item').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.day) === newDay);
    });
    renderDayView(newDay);
  });
  nav.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn-nav';
  nextBtn.textContent = 'Next Day →';
  nextBtn.disabled = dayNum >= 56;
  nextBtn.addEventListener('click', () => {
    const newDay = dayNum + 1;
    document.querySelectorAll('.sidebar-day-item').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.day) === newDay);
    });
    renderDayView(newDay);
  });
  nav.appendChild(nextBtn);

  return nav;
}

// ─── 7. Checkbox Toggle Handlers ─────────────────────────────

function toggleDSA(dayNum, problemId, checked) {
  const dp = getDayProgress(dayNum);
  if (checked) {
    if (!dp.completed.dsa.includes(problemId)) dp.completed.dsa.push(problemId);
  } else {
    dp.completed.dsa = dp.completed.dsa.filter(id => id !== problemId);
  }

  // Update row class
  const row = document.getElementById(`row-${problemId}`);
  if (row) row.classList.toggle('completed', checked);

  // Update DSA card badge
  const dayData   = CHECKLIST_DATA[dayNum - 1];
  const doneCount = dp.completed.dsa.length;
  const dsaBadge  = row?.closest('.section-card')?.querySelector('.badge');
  if (dsaBadge) {
    dsaBadge.textContent = `${doneCount}/${dayData.dsa.length}`;
    dsaBadge.className   = `badge${doneCount === dayData.dsa.length ? ' done' : ''}`;
  }

  updateDayMeta(dayNum, dp, dayData);
  refreshSidebarDot(dayNum);
  updateHeaderStats();
  scheduleSave();
}

function toggleChecklist(dp, type, itemId, checked, labelEl, badgeEl) {
  if (checked) {
    if (!dp.completed[type].includes(itemId)) dp.completed[type].push(itemId);
  } else {
    dp.completed[type] = dp.completed[type].filter(id => id !== itemId);
  }
  labelEl.classList.toggle('done', checked);

  // Re-count badge from actual DOM checkboxes in the card
  if (badgeEl) {
    const card       = badgeEl.closest('.section-card');
    const allCbs     = card.querySelectorAll('.checklist-item input[type=checkbox]');
    const checkedCbs = card.querySelectorAll('.checklist-item input[type=checkbox]:checked');
    const done       = checkedCbs.length;
    const total      = allCbs.length;
    badgeEl.textContent = `${done}/${total}`;
    badgeEl.className   = `badge${done === total && total > 0 ? ' done' : ''}`;
  }

  // Find which dayNum this dp belongs to
  const dayKey = Object.keys(APP.progress.days).find(k => APP.progress.days[k] === dp);
  if (dayKey) {
    const dayNum  = parseInt(dayKey);
    const dayData = CHECKLIST_DATA[dayNum - 1];
    updateDayMeta(dayNum, dp, dayData);
  }

  updateHeaderStats();
  scheduleSave();
}

function updateDayMeta(dayNum, dp, dayData) {
  const metaEl = document.querySelector('.day-header .day-meta');
  if (!metaEl) return;
  const totalItems = dayData.dsa.length + dayData.theory.length + dayData.review.length;
  const doneItems  = dp.completed.dsa.length + dp.completed.theory.length + dp.completed.review.length;
  const dateEl = metaEl.querySelector('span:first-child');
  const cntEl  = metaEl.querySelector('span:last-child');
  if (cntEl) cntEl.textContent = `${doneItems}/${totalItems} items completed today`;
}

// ─── 8. Problem Notes (inline panel) ─────────────────────────

function buildNotesPanel(problem, dp, dayNum) {
  const pNote = dp.problemNotes[problem.id] || {};

  const panel = document.createElement('div');
  panel.className = 'problem-notes-panel';
  panel.id = `notes-panel-${problem.id}`;

  panel.innerHTML = `
    <div class="notes-grid">
      <div class="form-field">
        <label>Pattern</label>
        <input type="text" id="np-pattern-${problem.id}" placeholder="e.g. HashMap, Two Pointer…" value="${esc(pNote.pattern || '')}">
      </div>
      <div class="form-field">
        <label>Time (minutes)</label>
        <input type="number" id="np-time-${problem.id}" placeholder="e.g. 18" min="1" max="999" value="${esc(String(pNote.timeMin || ''))}">
      </div>
    </div>
    <div class="form-field" style="margin-bottom:10px">
      <label style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px;">Review</label>
      <div class="review-btns">
        <button class="review-btn${pNote.review === 'clean' ? ' selected' : ''}" data-val="clean">✅ Clean</button>
        <button class="review-btn${pNote.review === 'hint'  ? ' selected' : ''}" data-val="hint">🔁 Needed hint</button>
        <button class="review-btn${pNote.review === 'stuck' ? ' selected' : ''}" data-val="stuck">❌ Couldn't do</button>
      </div>
    </div>
    <div class="notes-textarea-wrap">
      <label style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px;">Note</label>
      <div id="np-editor-${problem.id}"></div>
    </div>
    <button class="btn-save-notes" data-id="${problem.id}" data-day="${dayNum}">Save Notes</button>
  `;

  // Mount markdown editor for the note field
  const editorSlot = panel.querySelector(`#np-editor-${problem.id}`);
  const mdEditor = buildMarkdownEditor({
    value:       pNote.noteText || '',
    placeholder: 'Key insight, pattern, edge cases, approach…\n\n**Approach:**\n\n**Time complexity:**\n\n**Space complexity:**',
    rows:        4,
  });
  editorSlot.appendChild(mdEditor);

  // Review button selection
  panel.querySelectorAll('.review-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      panel.querySelectorAll('.review-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Save button
  panel.querySelector('.btn-save-notes').addEventListener('click', () => {
    saveNotesPanel(problem.id, dayNum, dp);
  });

  return panel;
}

function toggleNotesPanel(problemId) {
  const panel = document.getElementById(`notes-panel-${problemId}`);
  if (!panel) return;
  panel.classList.toggle('open');
}

function saveNotesPanel(problemId, dayNum, dp) {
  const panel    = document.getElementById(`notes-panel-${problemId}`);
  const pattern  = document.getElementById(`np-pattern-${problemId}`)?.value.trim() || '';
  const timeMin  = parseInt(document.getElementById(`np-time-${problemId}`)?.value) || 0;
  const editorEl = document.querySelector(`#np-editor-${problemId} .md-editor`);
  const noteText = editorEl?.getValue?.() || '';
  const selBtn   = panel?.querySelector('.review-btn.selected');
  const review   = selBtn?.dataset.val || '';

  if (!dp.problemNotes) dp.problemNotes = {};
  dp.problemNotes[problemId] = { pattern, timeMin, noteText, review };

  // Update Notes button appearance
  const row     = document.getElementById(`row-${problemId}`);
  const noteBtn = row?.querySelector('.btn-notes');
  if (noteBtn) {
    const hasNote = pattern || timeMin || noteText;
    noteBtn.className = `btn-notes${hasNote ? ' has-notes' : ''}`;
    noteBtn.textContent = hasNote ? '📝 Notes' : 'Notes';
  }

  panel.classList.remove('open');
  scheduleSave();
}

// ─── 9. All Problems Tab ──────────────────────────────────────

function renderAllProblemsTab() {
  const container = document.getElementById('all-problems-view');
  container.innerHTML = '';

  // Collect all solved problems
  const rows = [];
  CHECKLIST_DATA.forEach(dayData => {
    const dp = getDayProgress(dayData.day);
    dayData.dsa.forEach(p => {
      if (dp.completed.dsa.includes(p.id)) {
        const pNote = (dp.problemNotes || {})[p.id] || {};
        rows.push({
          day:        dayData.day,
          dayTitle:   dayData.title,
          id:         p.id,
          number:     p.number,
          title:      p.title,
          url:        p.url,
          difficulty: p.difficulty,
          pattern:    pNote.pattern    || '',
          timeMin:    pNote.timeMin    || '',
          review:     pNote.review     || '',
          noteText:   pNote.noteText   || '',
        });
      }
    });
  });

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'tab-toolbar';
  toolbar.innerHTML = `
    <label>Difficulty:
      <select id="filter-diff">
        <option value="">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </label>
    <label>Pattern:
      <select id="filter-pattern">
        <option value="">All patterns</option>
      </select>
    </label>
    <span style="margin-left:auto;font-size:12px;color:var(--text-secondary);" id="problems-count">${rows.length} solved</span>
  `;
  container.appendChild(toolbar);

  // Populate patterns dropdown
  const patternSel = toolbar.querySelector('#filter-pattern');
  const patterns   = [...new Set(rows.map(r => r.pattern).filter(Boolean))].sort();
  patterns.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p; opt.textContent = p;
    patternSel.appendChild(opt);
  });

  // Table wrapper
  const tableWrap = document.createElement('div');
  tableWrap.className = 'problems-table-wrap';
  tableWrap.id        = 'problems-table-wrap';
  container.appendChild(tableWrap);

  function renderTable(data) {
    tableWrap.innerHTML = '';
    const countEl = toolbar.querySelector('#problems-count');
    countEl.textContent = `${data.length} solved`;

    if (data.length === 0) {
      tableWrap.innerHTML = `<div class="empty-state"><div style="font-size:36px">🔍</div><p>No problems match the filter.</p></div>`;
      return;
    }

    const table = document.createElement('table');
    table.className = 'problems-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Day</th>
          <th>#</th>
          <th>Title</th>
          <th>Difficulty</th>
          <th>Pattern</th>
          <th>Time</th>
          <th>Review</th>
          <th>Notes</th>
        </tr>
      </thead>
    `;
    const tbody = document.createElement('tbody');
    data.forEach(r => {
      const tr = document.createElement('tr');
      const reviewIcon = r.review === 'clean' ? '✅' : r.review === 'hint' ? '🔁' : r.review === 'stuck' ? '❌' : '—';
      tr.innerHTML = `
        <td class="col-day">${r.day}</td>
        <td class="col-num">${r.number}</td>
        <td><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a></td>
        <td><span class="difficulty-badge ${r.difficulty}">${r.difficulty}</span></td>
        <td>${esc(r.pattern) || '<span style="color:var(--text-muted)">—</span>'}</td>
        <td class="col-time">${r.timeMin ? r.timeMin + ' min' : '<span style="color:var(--text-muted)">—</span>'}</td>
        <td class="review-icon">${reviewIcon}</td>
        <td style="max-width:200px;font-size:11px;color:var(--text-secondary)">${esc(r.noteText) || ''}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
  }

  function applyFilters() {
    const diffVal    = document.getElementById('filter-diff')?.value    || '';
    const patternVal = document.getElementById('filter-pattern')?.value || '';
    let filtered = rows;
    if (diffVal)    filtered = filtered.filter(r => r.difficulty === diffVal);
    if (patternVal) filtered = filtered.filter(r => r.pattern    === patternVal);
    renderTable(filtered);
  }

  toolbar.querySelector('#filter-diff').addEventListener('change', applyFilters);
  toolbar.querySelector('#filter-pattern').addEventListener('change', applyFilters);

  if (rows.length === 0) {
    tableWrap.innerHTML = `<div class="empty-state"><div style="font-size:36px">📚</div><p>No problems solved yet. Complete DSA checkboxes to see them here.</p></div>`;
  } else {
    renderTable(rows);
  }
}

// ─── 10. DSA Notes Tab ───────────────────────────────────────

function renderPatternCards() {
  const container = document.getElementById('patterns-grid');
  if (!container) return;
  container.innerHTML = '';

  PATTERNS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pattern-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'pattern-card-header';
    cardHeader.innerHTML = `<h3>${p.name}</h3><span class="pattern-toggle">▶</span>`;
    cardHeader.addEventListener('click', () => card.classList.toggle('expanded'));
    card.appendChild(cardHeader);

    const insight = document.createElement('div');
    insight.className = 'pattern-insight';
    insight.textContent = p.insight;
    card.appendChild(insight);

    const body = document.createElement('div');
    body.className = 'pattern-body';

    const pre = document.createElement('pre');
    pre.textContent = p.template;
    body.appendChild(pre);

    if (p.problems?.length) {
      const probWrap = document.createElement('div');
      probWrap.className = 'pattern-problems';
      p.problems.forEach(prob => {
        const tag = document.createElement('div');
        tag.className = 'pattern-problem-tag';
        tag.textContent = prob;
        probWrap.appendChild(tag);
      });
      body.appendChild(probWrap);
    }

    card.appendChild(body);
    container.appendChild(card);
  });
}

// ─── 11. Header / Stats ──────────────────────────────────────

function renderHeader() {
  updateHeaderStats();
}

function updateHeaderStats() {
  // Overall progress
  let totalItems = 0;
  let doneItems  = 0;
  CHECKLIST_DATA.forEach(dayData => {
    const dp    = getDayProgress(dayData.day);
    totalItems += dayData.dsa.length + dayData.theory.length + dayData.review.length;
    doneItems  += dp.completed.dsa.length + dp.completed.theory.length + dp.completed.review.length;
  });
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const today = calcCurrentDay();
  document.getElementById('header-day-info').innerHTML =
    `Day <span>${today}</span> / 56`;
  document.getElementById('header-progress-bar').style.width = `${pct}%`;
  document.getElementById('header-progress-pct').textContent = `${pct}%`;

  // Streak
  const streak = calcStreak(today);
  document.getElementById('header-streak').textContent = `🔥 ${streak}`;
}

function calcStreak(todayDay) {
  let streak = 0;
  for (let d = todayDay; d >= 1; d--) {
    const dp = getDayProgress(d);
    if (dp.completed.dsa.length > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// ─── 12. Save / GitHub Sync ──────────────────────────────────

function scheduleSave() {
  // Mark unsaved changes locally — actual commit happens on manual Sync
  APP.dirty = true;
  showSaveStatus('unsaved');
}

function buildCommitMessage() {
  const day = APP.currentDay;
  const dp  = APP.progress.days[String(day)];
  if (!dp) return `progress: day ${day} updated`;
  const dsaDone    = dp.completed.dsa.length;
  const theoryDone = dp.completed.theory.length;
  const reviewDone = dp.completed.review.length;
  const parts = [];
  if (dsaDone)    parts.push(`${dsaDone} DSA`);
  if (theoryDone) parts.push(`${theoryDone} theory`);
  if (reviewDone) parts.push(`${reviewDone} review`);
  const summary = parts.length ? parts.join(', ') : 'notes';
  return `progress: day ${day} — ${summary}`;
}

async function doSave() {
  if (!APP.pat || !APP.progress) return;
  if (!APP.dirty) { showToast('Nothing new to sync.'); return; }
  const btn = document.getElementById('btn-sync');
  btn.disabled = true;
  btn.textContent = '↑ Syncing…';
  try {
    const msg    = buildCommitMessage();
    const newSha = await saveProgress(APP.owner, APP.repo, APP.pat, APP.progress, APP.sha, msg);
    APP.sha   = newSha;
    APP.dirty = false;
    btn.textContent = '✓ Synced';
    hideSaveStatus();
    updateLastSynced();
    showToast('Progress synced to GitHub', 'success');
    setTimeout(() => { btn.textContent = '↑ Sync'; btn.disabled = false; }, 2000);
  } catch (err) {
    btn.textContent = '↑ Sync';
    btn.disabled = false;
    showToast('Sync failed — check your PAT or internet connection', 'error');
    console.error('Save error:', err);
  }
}

// Auto-sync every 12 hours if there are unsaved changes
setInterval(() => { if (APP.dirty) doSave(); }, 12 * 60 * 60 * 1000);

function showSaveStatus(state) {
  const el = document.getElementById('save-status');
  el.className = `saving ${state}`;
  el.innerHTML = state === 'unsaved' ? '● Unsaved changes' : '';
}
function hideSaveStatus() {
  document.getElementById('save-status').className = '';
  document.getElementById('save-status').innerHTML = '';
}

// ── Toast system (stacking, typed) ──────────────────────────
function showToast(msg, type) {
  type = type || 'info'; // 'success' | 'error' | 'info'
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span class="toast-msg">${esc(msg)}</span><button class="toast-close" aria-label="Dismiss">×</button>`;
  toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
  container.appendChild(toast);
  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => dismissToast(toast), 4000);
}
function dismissToast(toast) {
  toast.classList.remove('show');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

// ── Last-synced timestamp ────────────────────────────────────
function updateLastSynced() {
  const el = document.getElementById('last-synced');
  if (!el) return;
  const now = new Date();
  el.textContent = 'Synced ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  el.title = 'Last synced at ' + now.toLocaleString();
}

// ─── 13. Utilities ───────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getDateForDay(dayNum) {
  const start = new Date(APP.progress.startDate);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + dayNum - 1);
  return start.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getDayOfWeek(dayNum) {
  const days   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const start  = new Date(APP.progress.startDate);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + dayNum - 1);
  return days[start.getDay()];
}

// ─── Tab Switching ───────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    APP.activeTab = tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('day-view').classList.toggle('hidden', tab !== 'today');
    document.getElementById('all-problems-view').classList.toggle('hidden', tab !== 'problems');
    document.getElementById('dsa-notes-view').classList.toggle('hidden', tab !== 'patterns');

    if (tab === 'problems') renderAllProblemsTab();

    // Re-sync sidebar active for today tab
    if (tab === 'today') {
      // keep current day selected
    }
  });
});

// Add CSS spin animation dynamically
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// ─── 14. Bootstrap ───────────────────────────────────────────

(function init() {
  const pat   = LS.get('pat');
  const owner = LS.get('owner');
  const repo  = LS.get('repo');

  if (pat && owner && repo) {
    // Try to load from GitHub on startup
    APP.pat   = pat;
    APP.owner = owner;
    APP.repo  = repo;

    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    loadProgress(owner, repo, pat)
      .then(({ data, sha }) => {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
        if (data) {
          APP.progress = data;
          APP.sha      = sha;
        } else {
          APP.progress = buildInitialProgress();
          return saveProgress(owner, repo, pat, APP.progress, null).then(newSha => {
            APP.sha = newSha;
          });
        }
      })
      .then(() => {
        initApp();
        showApp();
      })
      .catch(err => {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
        console.error('Auto-login failed:', err);
        // Fall back to login screen
        showLogin();
      });
  } else {
    showLogin();
  }
})();
