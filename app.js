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
  LS.remove('pat');
  LS.remove('owner');
  LS.remove('repo');
  APP.pat = APP.owner = APP.repo = APP.progress = APP.sha = null;
  showLogin();
});

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
    };
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
  const sidebar = document.getElementById('sidebar');
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
    const el = document.createElement('label');
    el.className = `checklist-item${isComplete ? ' done' : ''}`;
    el.htmlFor = `chk-${item.id}`;

    const cb = document.createElement('input');
    cb.type    = 'checkbox';
    cb.id      = `chk-${item.id}`;
    cb.checked = isComplete;
    cb.addEventListener('change', () => toggleChecklist(dp, type, item.id, cb.checked, el, card.querySelector('.badge')));
    el.appendChild(cb);

    const span = document.createElement('span');
    span.textContent = item.text;
    el.appendChild(span);

    list.appendChild(el);
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

  const ta = document.createElement('textarea');
  ta.placeholder = 'Add notes for today — key insights, what felt hard, patterns discovered…';
  ta.value = dp.notes || '';
  ta.addEventListener('input', () => {
    dp.notes = ta.value;
    scheduleSave();
  });
  card.appendChild(ta);

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
      <label style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px;">Note</label>
      <textarea id="np-text-${problem.id}" placeholder="Key insight, pattern observation, edge cases…" rows="3">${esc(pNote.noteText || '')}</textarea>
    </div>
    <button class="btn-save-notes" data-id="${problem.id}" data-day="${dayNum}">Save Notes</button>
  `;

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
  const noteText = document.getElementById(`np-text-${problemId}`)?.value.trim() || '';
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
  clearTimeout(APP.saveTimer);
  showSaveStatus('saving');
  APP.saveTimer = setTimeout(() => doSave(), 1200);
}

async function doSave() {
  try {
    const newSha = await saveProgress(APP.owner, APP.repo, APP.pat, APP.progress, APP.sha);
    APP.sha = newSha;
    showSaveStatus('saved');
    setTimeout(() => hideSaveStatus(), 2000);
  } catch (err) {
    hideSaveStatus();
    showToast('Could not save — check your PAT or internet connection');
    console.error('Save error:', err);
  }
}

function showSaveStatus(state) {
  const el = document.getElementById('save-status');
  el.className = `saving ${state}`;
  el.innerHTML = state === 'saving'
    ? `<span style="animation:spin .8s linear infinite;display:inline-block">⟳</span> Saving…`
    : `✓ Saved`;
}
function hideSaveStatus() {
  document.getElementById('save-status').className = '';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
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
