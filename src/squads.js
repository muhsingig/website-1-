import './style.css';
import { squads } from './squads-data.js';
import { groups, flagUrl, flagByName } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

const POS = [
  ['GK', 'Goalkeepers'],
  ['DEF', 'Defenders'],
  ['MID', 'Midfielders'],
  ['FWD', 'Forwards'],
];

function flagImg(name) {
  const code = flagByName[name];
  return code
    ? `<img class="sq-flag" src="${flagUrl(code, 80)}" alt="" width="34" height="25" loading="lazy" />`
    : '';
}

function posBlock(players, code, label) {
  const list = players.filter((p) => p.p === code);
  if (!list.length) return '';
  return `
    <div class="sq-pos">
      <span class="sq-pos-label">${label}</span>
      <ul class="sq-players">
        ${list
          .map(
            (p) => `<li class="sq-player"><span class="sq-pname">${p.n}</span><span class="sq-club">${p.c}</span></li>`
          )
          .join('')}
      </ul>
    </div>`;
}

function teamBlock(name, groupId) {
  const s = squads[name];
  if (!s) return '';
  const players = s.players || [];
  const announced = players.length > 0;
  const haystack = (name + ' ' + players.map((p) => p.n).join(' ')).toLowerCase();
  const countChip = announced
    ? `<span class="sq-count">${players.length}</span>`
    : `<span class="sq-count sq-soon">Soon</span>`;
  const body = announced
    ? POS.map(([c, l]) => posBlock(players, c, l)).join('')
    : `<p class="sq-tba">Final squad to be announced soon.</p>`;
  return `
    <details class="sq-team" data-search="${haystack.replace(/"/g, '')}" data-group="${groupId}">
      <summary class="sq-summary">
        ${flagImg(name)}
        <span class="sq-meta">
          <span class="sq-name">${name}</span>
          <span class="sq-coach">${s.coach ? 'Coach · ' + s.coach : 'Squad pending'}</span>
        </span>
        <span class="sq-grouptag">Group ${groupId}</span>
        ${countChip}
        <span class="sq-chev" aria-hidden="true">▾</span>
      </summary>
      <div class="sq-body">
        ${body}
      </div>
    </details>`;
}

function groupSection(g) {
  return `
    <section class="sq-group" data-group="${g.id}">
      <h2 class="sq-group-title">Group ${g.id}</h2>
      <div class="sq-group-teams">
        ${g.teams.map((t) => teamBlock(t.name, g.id)).join('')}
      </div>
    </section>`;
}

const root = document.getElementById('squads-root');
if (root) {
  root.innerHTML = groups.map(groupSection).join('');
}

// ---------- Group filter chips ----------
const filters = document.getElementById('sq-filters');
let activeGroup = 'all';
if (filters) {
  const chips = ['all', ...groups.map((g) => g.id)];
  filters.innerHTML = chips
    .map(
      (c) =>
        `<button class="sq-chip${c === 'all' ? ' active' : ''}" data-g="${c}">${
          c === 'all' ? 'All' : 'Group ' + c
        }</button>`
    )
    .join('');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.sq-chip');
    if (!btn) return;
    activeGroup = btn.dataset.g;
    filters.querySelectorAll('.sq-chip').forEach((b) => b.classList.toggle('active', b === btn));
    applyFilters();
  });
}

// ---------- Search ----------
const search = document.getElementById('sq-search');
function applyFilters() {
  const q = (search?.value || '').trim().toLowerCase();
  document.querySelectorAll('.sq-group').forEach((sec) => {
    const groupOk = activeGroup === 'all' || sec.dataset.group === activeGroup;
    let anyVisible = false;
    sec.querySelectorAll('.sq-team').forEach((team) => {
      const matchesQ = !q || team.dataset.search.includes(q);
      const visible = groupOk && matchesQ;
      team.style.display = visible ? '' : 'none';
      if (visible) anyVisible = true;
      // auto-open on an active query so matching players are visible
      team.open = !!q && matchesQ;
    });
    sec.style.display = anyVisible ? '' : 'none';
  });
}
if (search) {
  search.addEventListener('input', applyFilters);
}

initCountdown();
