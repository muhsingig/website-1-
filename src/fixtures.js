import './style.css';
import { fixtures, flagByName, flagUrl, knockout } from './wc-data.js';
import { initCountdown } from './countdown.js';
import { downloadTeamICS } from './calendar.js';
import { pairKey } from './teamkey.js';
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

function flag(name) {
  const code = flagByName[name];
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

const root = document.getElementById('fixtures-root');
if (root) {
  // Group by LOCAL calendar date so kickoff times display in the viewer's zone.
  const byDay = new Map();
  for (const m of fixtures) {
    const dt = kickoff(m);
    const key = localDateKey(dt);
    if (!byDay.has(key)) byDay.set(key, { label: localDateLabel(dt), items: [] });
    byDay.get(key).items.push({ m, dt });
  }
  const days = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  root.innerHTML = days
    .map(([, day]) => {
      day.items.sort((a, b) => a.dt - b.dt);
      return dateBlock(day.label, day.items.map((x) => x.m));
    })
    .join('');
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

  // Build one panel per knockout tab.
  koPanels.innerHTML = koTabGroups
    .map((g, i) => {
      const id = `ko-panel-${i}`;
      panelIds.push(id);
      const rounds = g.rounds
        .map((rn) => knockout.find((r) => r.round === rn))
        .filter(Boolean)
        .map(koRound)
        .join('');
      return `<div id="${id}" class="fx-panel is-hidden">${rounds}</div>`;
    })
    .join('');

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
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
