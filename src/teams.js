import './style.css';
import { groups, flagUrl, teamMeta, fixtures } from './wc-data.js';
import { teamInfo } from './team-info.js';
import { squads } from './squads-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// Flatten teams with their group id, and build a quick lookup.
const allTeams = groups.flatMap((g) => g.teams.map((t) => ({ ...t, group: g.id })));
const byName = Object.fromEntries(allTeams.map((t) => [t.name, t]));

// Pick black or white text for a given background colour (relative luminance).
function textColor(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 150 ? '#0a1712' : '#ffffff';
}

function card(name, { host = false } = {}) {
  const t = byName[name];
  if (!t) return '';
  const meta = teamMeta[name] || { rank: '–', apps: 0 };
  const label = (meta.display || name);
  const fg = textColor(t.color);
  const dim = fg === '#ffffff' ? 'rgba(255,255,255,0.75)' : 'rgba(10,23,18,0.6)';
  return `
    <article class="tm-card" data-team="${name}" tabindex="0" role="button"
             aria-label="${label} — view team profile" style="--tc:${t.color};--fg:${fg};--dim:${dim}">
      <div class="tm-top">
        <span class="tm-flag-chip">
          <img src="${flagUrl(t.flag, 80)}" alt="${label} flag" width="34" height="25" loading="lazy" />
        </span>
        <div class="tm-head">
          ${host ? '<span class="tm-eyebrow">Host country</span>' : ''}
          <h3 class="tm-name">${label}</h3>
        </div>
      </div>
      <div class="tm-stats">
        <div class="tm-row"><span>Stage</span><span>Group ${t.group}</span></div>
        <div class="tm-row"><span>World Ranking</span><span>${meta.rank}</span></div>
        <div class="tm-row"><span>Participations</span><span>${meta.apps}</span></div>
      </div>
      <span class="tm-cta">View profile →</span>
    </article>`;
}

const HOSTS = ['Canada', 'Mexico', 'United States'];

const hostsRoot = document.getElementById('hosts-root');
if (hostsRoot) {
  hostsRoot.innerHTML = HOSTS.map((n) => card(n, { host: true })).join('');
}

const qualifiedRoot = document.getElementById('qualified-root');
if (qualifiedRoot) {
  const qualified = allTeams
    .filter((t) => !HOSTS.includes(t.name))
    .map((t) => t.name)
    .sort((a, b) => {
      const da = (teamMeta[a]?.display || a);
      const db = (teamMeta[b]?.display || b);
      return da.localeCompare(db);
    });
  qualifiedRoot.innerHTML = qualified.map((n) => card(n)).join('');
}

// ---------------------------------------------------------------------------
// Team profile modal
// ---------------------------------------------------------------------------
const mdate = (d) => {
  const [y, mo, da] = d.split('-').map(Number);
  return new Date(Date.UTC(y, mo - 1, da, 12))
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
};

function tileBlock(meta, info) {
  const tiles = [
    { num: meta.apps ?? 0, lbl: 'World Cups' },
    { num: info?.best ?? '—', lbl: 'Best result', small: true },
    { num: info?.titles?.length ?? 0, lbl: 'Major titles' },
    { num: `#${meta.rank ?? '–'}`, lbl: 'FIFA ranking' },
  ];
  return `<div class="tmd-tiles">${tiles
    .map(
      (t) =>
        `<div class="tmd-tile"><span class="tmd-tile-num${t.small ? ' tmd-tile-sm' : ''}">${t.num}</span><span class="tmd-tile-lbl">${t.lbl}</span></div>`
    )
    .join('')}</div>`;
}

function teamMatchesHTML(name) {
  const ms = fixtures.filter((m) => m.t1 === name || m.t2 === name);
  if (!ms.length) return '';
  return `
    <section class="tmd-sec">
      <h4 class="tmd-h">🏟️ World Cup 2026 matches</h4>
      <div class="tmd-matches">
        ${ms
          .map(
            (m) => `
          <div class="tmd-match">
            <span class="tmd-match-date">${mdate(m.date)}</span>
            <span class="tmd-match-teams">${m.t1} <em>vs</em> ${m.t2}</span>
            <span class="tmd-match-venue">📍 ${m.venue} · ${m.city}</span>
          </div>`
          )
          .join('')}
      </div>
    </section>`;
}

function listSection(title, items) {
  if (!items || !items.length) return '';
  return `
    <section class="tmd-sec">
      <h4 class="tmd-h">${title}</h4>
      <ul class="tmd-list">${items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </section>`;
}

function momentsSection(moments) {
  if (!moments || !moments.length) return '';
  return `
    <section class="tmd-sec">
      <h4 class="tmd-h">📅 Historic moments</h4>
      <div class="tmd-timeline">
        ${moments
          .map(
            (m) => `<div class="tmd-tl-item"><span class="tmd-tl-year">${m.year}</span><span class="tmd-tl-text">${m.text}</span></div>`
          )
          .join('')}
      </div>
    </section>`;
}

function profileHTML(name) {
  const t = byName[name];
  const meta = teamMeta[name] || {};
  const info = teamInfo[name] || {};
  const label = meta.display || name;
  const coach = squads[name]?.coach;
  const fg = textColor(t.color);

  return `
    <header class="tmd-hero" style="--tc:${t.color};--fg:${fg}">
      <img class="tmd-flag" src="${flagUrl(t.flag, 160)}" alt="${label} flag" />
      <div class="tmd-hero-text">
        <h2 class="tmd-name" id="tmd-name">${label}</h2>
        <p class="tmd-sub">
          Group ${t.group}${info.conf ? ` · ${info.conf}` : ''}${coach ? ` · Coach: ${coach}` : ''}
        </p>
      </div>
    </header>

    ${tileBlock(meta, info)}

    ${info.bio ? `<p class="tmd-bio">${info.bio}</p>` : ''}

    ${listSection('🏆 Honours', info.titles && info.titles.length ? info.titles : ['No major senior titles yet'])}
    ${listSection('💡 Did you know', info.facts)}
    ${momentsSection(info.moments)}
    ${teamMatchesHTML(name)}

    <div class="tmd-actions">
      <a class="tmd-squad-link" href="/squads.html">View full squad →</a>
    </div>
    <p class="tmd-sources">Sources: FIFA, Wikipedia</p>`;
}

// Build the modal shell once.
const modal = document.createElement('div');
modal.className = 'team-modal';
modal.hidden = true;
modal.innerHTML = `
  <div class="tmd-backdrop" data-close></div>
  <div class="tmd-dialog" role="dialog" aria-modal="true" aria-labelledby="tmd-name">
    <button class="tmd-close" data-close aria-label="Close">✕</button>
    <div class="tmd-content"></div>
  </div>`;
document.body.appendChild(modal);
const content = modal.querySelector('.tmd-content');

function openTeam(name) {
  if (!byName[name]) return;
  content.innerHTML = profileHTML(name);
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.tmd-dialog').scrollTop = 0;
  modal.querySelector('.tmd-close').focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// Delegate clicks/keyboard from the team cards.
function wire(rootEl) {
  if (!rootEl) return;
  rootEl.addEventListener('click', (e) => {
    const c = e.target.closest('.tm-card');
    if (c) openTeam(c.dataset.team);
  });
  rootEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const c = e.target.closest('.tm-card');
    if (c) {
      e.preventDefault();
      openTeam(c.dataset.team);
    }
  });
}
wire(hostsRoot);
wire(qualifiedRoot);

initCountdown();
