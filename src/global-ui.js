// Global navbar tools shared across every page (imported via nav.js, which all
// pages load): dark-mode toggle, global search overlay, and a match-alert bell.
import { groups, fixtures, knockout, flagByName, flagUrl } from './wc-data.js';
import { squads } from './squads-data.js';
import { getTheme, toggleTheme, getFav } from './prefs.js';
import { enableAlerts } from './notify.js';

const enc = (s) => encodeURIComponent(s);
function flagImg(name, cls = 'gs-flag') {
  const code = flagByName[name];
  return code ? `<img class="${cls}" src="${flagUrl(code, 40)}" alt="" loading="lazy" />` : '';
}

// ---------- Search index ----------
function buildIndex() {
  const items = [];
  for (const g of groups) {
    for (const t of g.teams) {
      items.push({ type: 'Team', name: t.name, sub: `Group ${g.id}`, flag: t.name, url: `/teams.html?team=${enc(t.name)}` });
    }
  }
  for (const [team, data] of Object.entries(squads)) {
    for (const p of data.players || []) {
      items.push({ type: 'Player', name: p.n, sub: `${p.p} · ${team}`, flag: team, url: `/squads.html?q=${enc(p.n)}` });
    }
  }
  const addMatch = (m, label) => items.push({
    type: 'Match', name: `${m.t1} v ${m.t2}`, sub: `${label} · ${m.venue}`, flag: '', url: '/fixtures.html',
  });
  fixtures.forEach((m) => addMatch(m, `Group ${m.group}`));
  knockout.forEach((r) => r.matches.forEach((m) => addMatch(m, r.round)));
  return items;
}
let INDEX = null;

function search(q) {
  if (!INDEX) INDEX = buildIndex();
  const needle = q.trim().toLowerCase();
  if (needle.length < 2) return [];
  const out = [];
  for (const it of INDEX) {
    if ((it.name + ' ' + it.sub).toLowerCase().includes(needle)) out.push(it);
    if (out.length >= 24) break;
  }
  // Teams first, then players, then matches.
  const order = { Team: 0, Player: 1, Match: 2 };
  return out.sort((a, b) => order[a.type] - order[b.type]);
}

function renderResults(q) {
  const box = document.getElementById('gs-results');
  if (!box) return;
  const res = search(q);
  if (q.trim().length < 2) {
    box.innerHTML = '<p class="gs-hint">Type at least 2 letters to search teams, players and matches.</p>';
    return;
  }
  if (!res.length) {
    box.innerHTML = `<p class="gs-hint">No results for “${q}”.</p>`;
    return;
  }
  box.innerHTML = res
    .map(
      (r) => `
      <a class="gs-item" href="${r.url}">
        ${r.flag ? flagImg(r.flag) : '<span class="gs-icon">⚽</span>'}
        <span class="gs-text"><span class="gs-name">${r.name}</span><span class="gs-sub">${r.sub}</span></span>
        <span class="gs-type">${r.type}</span>
      </a>`
    )
    .join('');
}

function buildSearchOverlay() {
  if (document.getElementById('gsearch')) return;
  const el = document.createElement('div');
  el.className = 'gsearch';
  el.id = 'gsearch';
  el.hidden = true;
  el.innerHTML = `
    <div class="gs-backdrop" data-gs-close></div>
    <div class="gs-panel" role="dialog" aria-modal="true" aria-label="Search">
      <div class="gs-bar">
        <span class="gs-mag">🔍</span>
        <input id="gs-input" class="gs-input" type="search" placeholder="Search teams, players, matches…" aria-label="Search" autocomplete="off" />
        <button class="gs-close" data-gs-close aria-label="Close search">✕</button>
      </div>
      <div class="gs-results" id="gs-results"></div>
    </div>`;
  document.body.appendChild(el);
  const input = el.querySelector('#gs-input');
  input.addEventListener('input', () => renderResults(input.value));
  el.addEventListener('click', (e) => { if (e.target.hasAttribute('data-gs-close')) closeSearch(); });
  renderResults('');
}
function openSearch() {
  buildSearchOverlay();
  const el = document.getElementById('gsearch');
  el.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('gs-input')?.focus(), 30);
}
function closeSearch() {
  const el = document.getElementById('gsearch');
  if (el) el.hidden = true;
  document.body.style.overflow = '';
}

// ---------- Nav tools ----------
function themeIcon() { return getTheme() === 'dark' ? '☀' : '☾'; }

function injectTools() {
  const navbar = document.getElementById('navbar');
  if (!navbar || navbar.querySelector('.nav-tools')) return;
  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  tools.innerHTML = `
    <button class="nav-tool" id="nav-search" type="button" aria-label="Search">🔍</button>
    <button class="nav-tool" id="nav-bell" type="button" aria-label="Match alerts">🔔</button>
    <button class="nav-tool" id="nav-theme" type="button" aria-label="Toggle dark mode">${themeIcon()}</button>`;
  // Insert before the hamburger toggle if present, else append.
  const toggle = navbar.querySelector('.nav-toggle');
  navbar.insertBefore(tools, toggle || null);

  tools.querySelector('#nav-search').addEventListener('click', openSearch);
  tools.querySelector('#nav-theme').addEventListener('click', (e) => {
    toggleTheme();
    e.currentTarget.textContent = themeIcon();
  });
  tools.querySelector('#nav-bell').addEventListener('click', async () => {
    const fav = getFav();
    if (!fav) {
      alert('Pick your team first — open the Teams page, click a team, and choose “★ Follow”. Then turn on alerts here.');
      return;
    }
    const res = await enableAlerts(fav);
    if (res === 'denied') alert('Notifications are blocked in your browser settings. Tip: the Fixtures page “Add to calendar” works even when this site is closed.');
    else if (res === 'unsupported') alert('Your browser doesn\'t support notifications. Use the Fixtures page “Add to calendar” instead.');
    else if (res === 'ok') alert(`Alerts on for ${fav}. While this tab stays open you'll get a heads-up before their matches. For alerts when the site is closed, use “Add to calendar” on the Fixtures page.`);
  });
}

function init() {
  injectTools();
  // Keyboard: "/" opens search, Esc closes.
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea|select/i.test(e.target.tagName)) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });
  // If a fav exists and permission already granted, (re)schedule this session.
  if (getFav() && 'Notification' in window && Notification.permission === 'granted') {
    enableAlerts(getFav());
  }
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
