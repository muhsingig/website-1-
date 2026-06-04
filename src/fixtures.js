import './style.css';
import { fixtures, flagByName, flagUrl, knockout } from './wc-data.js';
import { initCountdown } from './countdown.js';
import { downloadTeamICS } from './calendar.js';
import { pairKey, normTeam } from './teamkey.js';
import { onScores, startFeed } from './scores-feed.js';
import './live.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// Short display names (FIFA uses "USA")
const DISPLAY = { 'United States': 'USA' };
const show = (n) => DISPLAY[n] || n;

// Build the kickoff instant from the ET time in the data.
// June/July US Eastern = EDT = UTC-4, so UTC hour = ET hour + 4.
function kickoff(m) {
  const [y, mo, d] = m.date.split('-').map(Number);
  const [hh, mm] = m.time.replace(/\s*ET/i, '').split(':').map(Number);
  return new Date(Date.UTC(y, mo - 1, d, hh + 4, mm || 0));
}

// Local (viewer's timezone) helpers — matches FIFA's "shown in your local time".
const localDateKey = (dt) => dt.toLocaleDateString('en-CA'); // YYYY-MM-DD, sortable
const localDateLabel = (dt) =>
  dt
    .toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .replace(',', '');
const localTime = (dt) => dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

// Flag lookup that also works for provider spellings (e.g. "South Korea").
const FLAG_BY_NORM = {};
for (const [name, code] of Object.entries(flagByName)) FLAG_BY_NORM[normTeam(name)] = code;

function flag(name) {
  const code = flagByName[name] || FLAG_BY_NORM[normTeam(name)];
  return code
    ? `<img class="fx-flag" src="${flagUrl(code, 80)}" alt="" width="34" height="25" loading="lazy" />`
    : '';
}

function matchRow(m) {
  const dt = kickoff(m);
  return `
    <article class="fx-match" data-key="${pairKey(m.t1, m.t2)}" data-home="${m.t1}">
      <div class="fx-teams">
        <span class="fx-team fx-home"><span class="fx-name">${show(m.t1)}</span>${flag(m.t1)}</span>
        <span class="fx-time">${localTime(dt)}</span>
        <span class="fx-team fx-away">${flag(m.t2)}<span class="fx-name">${show(m.t2)}</span></span>
      </div>
      <p class="fx-meta">First Stage&nbsp; ·&nbsp; Group ${m.group}&nbsp; ·&nbsp; ${m.venue} (${m.city})</p>
    </article>`;
}

function dateBlock(label, matches) {
  return `
    <section class="fx-day">
      <div class="fx-day-head">
        <h2 class="fx-date">${label}</h2>
        <a class="fx-viewgroups" href="/standings.html">View groups</a>
      </div>
      <div class="fx-list">
        ${matches.map(matchRow).join('')}
      </div>
    </section>`;
}

// Compute matchday (1–3) per fixture = position of its date within its group's
// sorted unique dates.
const mdayOf = new Map();
{
  const datesByGroup = {};
  for (const m of fixtures) (datesByGroup[m.group] ||= new Set()).add(m.date);
  const sorted = {};
  for (const g in datesByGroup) sorted[g] = [...datesByGroup[g]].sort();
  for (const m of fixtures) mdayOf.set(m, sorted[m.group].indexOf(m.date) + 1);
}

const root = document.getElementById('fixtures-root');

function renderFixtures(list) {
  if (!root) return;
  const byDay = new Map();
  for (const m of list) {
    const dt = kickoff(m);
    const key = localDateKey(dt);
    if (!byDay.has(key)) byDay.set(key, { label: localDateLabel(dt), items: [] });
    byDay.get(key).items.push({ m, dt });
  }
  const days = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  root.innerHTML = days.length
    ? days
        .map(([, day]) => {
          day.items.sort((a, b) => a.dt - b.dt);
          return dateBlock(day.label, day.items.map((x) => x.m));
        })
        .join('')
    : '<p class="fx-empty">No matches match those filters.</p>';
}

// ---------- Fixtures filter (group / team / matchday) ----------
const filterEl = document.getElementById('fx-filter');
if (root && filterEl) {
  const teams = [...new Set(fixtures.flatMap((m) => [m.t1, m.t2]))].sort();
  const groupsList = [...new Set(fixtures.map((m) => m.group))].sort();
  filterEl.innerHTML = `
    <label class="fx-f"><span>Group</span>
      <select id="fxf-group"><option value="">All</option>${groupsList.map((g) => `<option value="${g}">Group ${g}</option>`).join('')}</select>
    </label>
    <label class="fx-f"><span>Team</span>
      <select id="fxf-team"><option value="">All</option>${teams.map((t) => `<option value="${t}">${show(t)}</option>`).join('')}</select>
    </label>
    <label class="fx-f"><span>Matchday</span>
      <select id="fxf-md"><option value="">All</option><option value="1">Matchday 1</option><option value="2">Matchday 2</option><option value="3">Matchday 3</option></select>
    </label>
    <button id="fxf-reset" class="fx-f-reset" type="button">Reset</button>`;

  const gSel = filterEl.querySelector('#fxf-group');
  const tSel = filterEl.querySelector('#fxf-team');
  const mSel = filterEl.querySelector('#fxf-md');

  function apply() {
    const g = gSel.value, t = tSel.value, md = mSel.value;
    const list = fixtures.filter(
      (m) =>
        (!g || m.group === g) &&
        (!t || m.t1 === t || m.t2 === t) &&
        (!md || String(mdayOf.get(m)) === md)
    );
    renderFixtures(list);
  }
  [gSel, tSel, mSel].forEach((s) => s.addEventListener('change', apply));
  filterEl.querySelector('#fxf-reset').addEventListener('click', () => {
    gSel.value = tSel.value = mSel.value = '';
    apply();
  });
  renderFixtures(fixtures);
} else {
  renderFixtures(fixtures);
}

// ---------- Knockout stage ----------
const koDate = (d) => {
  const [y, mo, da] = d.split('-').map(Number);
  return new Date(Date.UTC(y, mo - 1, da, 12))
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
};

function koMatch(m) {
  return `
    <article class="ko-match">
      <span class="ko-num">Match ${m.n}</span>
      <div class="ko-pair">
        <span class="ko-slot">${m.t1}</span>
        <span class="ko-vs">v</span>
        <span class="ko-slot">${m.t2}</span>
      </div>
      <p class="ko-meta">${koDate(m.date)}&nbsp; ·&nbsp; ${m.venue} (${m.city})</p>
    </article>`;
}

function koRound(r) {
  return `
    <section class="ko-round">
      <h2 class="ko-round-title">${r.round}</h2>
      <div class="ko-list">${r.matches.map(koMatch).join('')}</div>
    </section>`;
}

// --- Live knockout: map our round names to the provider's stage codes ---
const STAGE_OF = {
  'Round of 32': 'LAST_32',
  'Round of 16': 'LAST_16',
  'Quarter-finals': 'QUARTER_FINALS',
  'Semi-finals': 'SEMI_FINALS',
  'Third-place play-off': 'THIRD_PLACE',
  'Final': 'FINAL',
};

function koBadge(m) {
  if (m.status === 'IN_PLAY') return m.minute ? `${m.minute}'` : 'LIVE';
  if (m.status === 'PAUSED') return 'HT';
  if (m.status === 'FINISHED') return 'FT';
  return '';
}

// A real (drawn) knockout match from the live feed, with teams + score.
function koLiveCard(m) {
  const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
  const done = m.status === 'FINISHED';
  const hasScore = m.homeScore != null && m.awayScore != null;
  const center = hasScore
    ? `<span class="ko-score">${m.homeScore} – ${m.awayScore}</span>`
    : '<span class="ko-vs">v</span>';
  const b = koBadge(m);
  const status = b ? `<div class="ko-status"><span class="fx-live${done ? ' is-final' : ''}">${b}</span></div>` : '';
  const dt = koDate(m.utcDate.slice(0, 10));
  return `
    <article class="ko-match${live ? ' is-live' : ''}">
      ${status}
      <div class="ko-pair">
        <span class="ko-slot ko-team">${show(m.home)}${flag(m.home)}</span>
        ${center}
        <span class="ko-slot ko-team">${flag(m.away)}${show(m.away)}</span>
      </div>
      <p class="ko-meta">${dt}${m.venue ? `&nbsp; ·&nbsp; ${m.venue}` : ''}</p>
    </article>`;
}

// Render a round: real fixtures from the feed once teams are drawn, else the
// static placeholder bracket.
function roundHTML(roundName, matches) {
  const stage = STAGE_OF[roundName];
  const liveMatches = (matches || [])
    .filter((m) => m.stage === stage && m.home && m.away)
    .sort((a, b) => String(a.utcDate).localeCompare(String(b.utcDate)));
  if (liveMatches.length) {
    return `
      <section class="ko-round">
        <h2 class="ko-round-title">${roundName}</h2>
        <div class="ko-list">${liveMatches.map(koLiveCard).join('')}</div>
      </section>`;
  }
  const stat = knockout.find((r) => r.round === roundName);
  return stat ? koRound(stat) : '';
}

// One tab per round. Third-place play-off is grouped into the Final tab.
const koTabGroups = [
  { label: 'Round of 32', rounds: ['Round of 32'] },
  { label: 'Round of 16', rounds: ['Round of 16'] },
  { label: 'Quarter-finals', rounds: ['Quarter-finals'] },
  { label: 'Semi-finals', rounds: ['Semi-finals'] },
  { label: 'Final', rounds: ['Third-place play-off', 'Final'] },
];

const tabsBar = document.getElementById('fx-tabs');
const koPanels = document.getElementById('ko-panels');
const groupPanel = document.getElementById('fixtures-root');

if (tabsBar && koPanels && groupPanel) {
  const panelIds = ['fixtures-root'];

  // Create one (empty) panel div per knockout tab.
  koPanels.innerHTML = koTabGroups
    .map((g, i) => {
      const id = `ko-panel-${i}`;
      panelIds.push(id);
      return `<div id="${id}" class="fx-panel is-hidden"></div>`;
    })
    .join('');

  // Fill / refresh every panel's contents (static placeholders, or live cards).
  const renderPanels = (matches) => {
    koTabGroups.forEach((g, i) => {
      const el = document.getElementById(`ko-panel-${i}`);
      if (el) el.innerHTML = g.rounds.map((rn) => roundHTML(rn, matches)).join('');
    });
  };
  renderPanels([]); // initial paint with the static bracket

  // Build the tab buttons: Group Stage first, then each knockout round.
  const tabDefs = [{ label: 'Group Stage', target: 'fixtures-root' }].concat(
    koTabGroups.map((g, i) => ({ label: g.label, target: `ko-panel-${i}` }))
  );
  tabsBar.innerHTML = tabDefs
    .map(
      (t, i) =>
        `<button class="fx-tab${i === 0 ? ' is-active' : ''}" data-target="${t.target}" role="tab" aria-selected="${i === 0}">${t.label}</button>`
    )
    .join('');

  const showPanel = (target) => {
    panelIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('is-hidden', id !== target);
    });
  };
  tabsBar.querySelectorAll('.fx-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      tabsBar.querySelectorAll('.fx-tab').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      showPanel(btn.dataset.target);
      const ff = document.getElementById('fx-filter');
      if (ff) ff.classList.toggle('is-hidden', btn.dataset.target !== 'fixtures-root');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Auto-fill real teams + live scores as soon as the feed has them.
  onScores((data) => renderPanels(data.matches || []));
  startFeed();
}

// ---------- Match reminders (.ics calendar download) ----------
const rem = document.getElementById('fx-reminders');
if (rem) {
  const teams = [...new Set(fixtures.flatMap((m) => [m.t1, m.t2]))].sort();
  rem.innerHTML = `
    <span class="fx-rem-label">🔔 Match reminders</span>
    <select id="fx-rem-team" class="fx-rem-select" aria-label="Choose a team">
      ${teams.map((t) => `<option value="${t}"${t === 'Argentina' ? ' selected' : ''}>${show(t)}</option>`).join('')}
    </select>
    <button id="fx-rem-btn" class="fx-rem-btn" type="button">Add to calendar</button>
    <span class="fx-rem-hint">Downloads that team's matches with a reminder 1 hour before each kickoff — works with Google, Apple &amp; Outlook calendars.</span>`;
  rem.querySelector('#fx-rem-btn').addEventListener('click', () => {
    downloadTeamICS(rem.querySelector('#fx-rem-team').value);
  });
}

initCountdown();
