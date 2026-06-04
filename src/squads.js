import './style.css';
import { squads } from './squads-data.js';
import { groups, flagUrl, flagByName, fixtures } from './wc-data.js';
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

const POS_FULL = { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward' };

function posBlock(players, code, label, team) {
  const list = players.filter((p) => p.p === code);
  if (!list.length) return '';
  return `
    <div class="sq-pos">
      <span class="sq-pos-label">${label}</span>
      <ul class="sq-players">
        ${list
          .map(
            (p) =>
              `<li class="sq-player" role="button" tabindex="0" data-player="${p.n.replace(/"/g, '')}" data-pos="${p.p}" data-club="${p.c.replace(/"/g, '')}" data-team="${team.replace(/"/g, '')}"><span class="sq-pname">${p.n}</span><span class="sq-club">${p.c}</span></li>`
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
    ? POS.map(([c, l]) => posBlock(players, c, l, name)).join('')
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

// Pre-fill from a global-search ?q= deep link.
const qParam = new URLSearchParams(location.search).get('q');
if (qParam && search) {
  search.value = qParam;
  applyFilters();
  setTimeout(() => search.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

// ---------- Player profile modal ----------
const mdate = (d) => {
  const [y, mo, da] = d.split('-').map(Number);
  return new Date(Date.UTC(y, mo - 1, da, 12))
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
};
const pmodal = document.createElement('div');
pmodal.className = 'pl-modal';
pmodal.hidden = true;
pmodal.innerHTML = `
  <div class="pl-backdrop" data-pl-close></div>
  <div class="pl-dialog" role="dialog" aria-modal="true">
    <button class="pl-close" data-pl-close aria-label="Close">✕</button>
    <div class="pl-content"></div>
  </div>`;
document.body.appendChild(pmodal);
const plContent = pmodal.querySelector('.pl-content');

function openPlayer(d) {
  const code = flagByName[d.team];
  const flag = code ? `<img class="pl-flag" src="${flagUrl(code, 80)}" alt="" />` : '';
  const ms = fixtures.filter((m) => m.t1 === d.team || m.t2 === d.team);
  const matchesHTML = ms.length
    ? `<div class="pl-matches">${ms
        .map((m) => `<div class="pl-match"><span>${mdate(m.date)}</span><span>${m.t1} v ${m.t2}</span></div>`)
        .join('')}</div>`
    : '';
  plContent.innerHTML = `
    <div class="pl-hero">
      ${flag}
      <div>
        <h2 class="pl-name">${d.player}</h2>
        <p class="pl-sub">${POS_FULL[d.pos] || d.pos} · ${d.team}</p>
      </div>
    </div>
    <div class="pl-rows">
      <div class="pl-row"><span>Position</span><span>${POS_FULL[d.pos] || d.pos}</span></div>
      <div class="pl-row"><span>Club</span><span>${d.club}</span></div>
      <div class="pl-row"><span>National team</span><span>${d.team}</span></div>
    </div>
    ${ms.length ? '<h4 class="pl-h">World Cup 2026 matches</h4>' : ''}
    ${matchesHTML}
    <p class="pl-note">Squad data from ESPN's tracker. Detailed player stats arrive once the tournament begins.</p>`;
  pmodal.hidden = false;
  document.body.style.overflow = 'hidden';
  pmodal.querySelector('.pl-close').focus();
}
function closePlayer() {
  pmodal.hidden = true;
  document.body.style.overflow = '';
}
pmodal.addEventListener('click', (e) => { if (e.target.hasAttribute('data-pl-close')) closePlayer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pmodal.hidden) closePlayer(); });
if (root) {
  const handle = (el) => el && openPlayer(el.dataset);
  root.addEventListener('click', (e) => {
    const li = e.target.closest('.sq-player');
    if (li) { e.preventDefault(); handle(li); }
  });
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const li = e.target.closest('.sq-player');
    if (li) { e.preventDefault(); handle(li); }
  });
}

initCountdown();
