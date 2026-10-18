// Global navbar tools shared across every page (imported via nav.js, which all
// pages load): dark-mode toggle and global search overlay.
import { groups, fixtures, flagByName, flagUrl } from './wc-data.js';
import { results } from './results-2026.js';
import { squads } from './squads-data.js';
import { getTheme, toggleTheme } from './prefs.js';

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
  // Final scores for every match, keyed the same way as the fixtures list.
  const scoreOf = new Map(results.map((r) => [`${r.home}|${r.away}`, r]));
  const fmt = (r) => `${r.home} ${r.homeScore}–${r.awayScore} ${r.away}${r.pens ? ` (${r.pens} pens)` : r.aet ? ' (a.e.t.)' : ''}`;
  fixtures.forEach((m) => {
    const r = scoreOf.get(`${m.t1}|${m.t2}`);
    items.push({ type: 'Match', name: r ? fmt(r) : `${m.t1} v ${m.t2}`, sub: `Group ${m.group} · ${m.venue}`, flag: '', url: '/fixtures.html' });
  });
  const ROUND = { LAST_32: 'Round of 32', LAST_16: 'Round of 16', QUARTER_FINALS: 'Quarter-final', SEMI_FINALS: 'Semi-final', THIRD_PLACE: 'Third place', FINAL: 'Final' };
  results.filter((r) => r.stage !== 'GROUP_STAGE').forEach((r) => {
    items.push({ type: 'Match', name: fmt(r), sub: ROUND[r.stage], flag: '', url: r.stage === 'FINAL' ? '/champions-2026.html' : '/fixtures.html' });
  });
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
    <button class="nav-tool" id="nav-theme" type="button" aria-label="Toggle dark mode">${themeIcon()}</button>`;
  // Insert before the hamburger toggle if present, else append.
  const toggle = navbar.querySelector('.nav-toggle');
  navbar.insertBefore(tools, toggle || null);

  tools.querySelector('#nav-search').addEventListener('click', openSearch);
  tools.querySelector('#nav-theme').addEventListener('click', (e) => {
    toggleTheme();
    e.currentTarget.textContent = themeIcon();
  });
}

// Add a "My Team" link to the navbar on every page (before PillNav runs).
function injectMyTeamLink() {
  const links = document.querySelector('#navbar .nav-links');
  if (!links || links.querySelector('a[href="/my-team.html"]')) return;
  const a = document.createElement('a');
  a.href = '/my-team.html';
  a.textContent = 'My Team';
  if (location.pathname.replace(/\/$/, '').endsWith('/my-team.html') || location.pathname.endsWith('my-team.html')) {
    a.className = 'active';
  }
  // Keep "Champions" as the first link; My Team sits right after it.
  const champ = links.querySelector('a[href="/champions-2026.html"]');
  links.insertBefore(a, champ ? champ.nextSibling : links.firstChild);
}

function init() {
  injectMyTeamLink();
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
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
