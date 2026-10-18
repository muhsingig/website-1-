import './style.css';
import { groups, flagUrl, flagByName, teamMeta } from './wc-data.js';
import { teamInfo } from './team-info.js';
import { squads } from './squads-data.js';
import { computeStandings } from './standings-compute.js';
import { getFav, setFav } from './prefs.js';
import { normTeam } from './teamkey.js';
import { results, teamJourney, scoreFor, homeWon, ROUND_LABEL } from './results-2026.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 80));
}

const root = document.getElementById('myteam-root');
const allTeams = groups.flatMap((g) => g.teams.map((t) => ({ ...t, group: g.id })));
const byName = Object.fromEntries(allTeams.map((t) => [t.name, t]));

const show = (n) => (n === 'United States' ? 'USA' : n);
const flag = (n, size = 80) => {
  const c = flagByName[n];
  return c ? `<img class="fx-flag" src="${flagUrl(c, size)}" alt="" loading="lazy" />` : '';
};
function textColor(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#0a1712' : '#ffffff';
}
const localDate = (dt) => dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const advanced = new Set(results.filter((m) => m.stage === 'LAST_32').flatMap((m) => [m.home, m.away]));

const POS = [['GK', 'Goalkeepers'], ['DEF', 'Defenders'], ['MID', 'Midfielders'], ['FWD', 'Forwards']];

// ---------------- Picker ----------------
function renderPicker() {
  const sorted = [...allTeams].sort((a, b) => show(a.name).localeCompare(show(b.name)));
  root.innerHTML = `
    <section class="mt-pick">
      <h2 class="mt-pick-title">Pick your team</h2>
      <p class="mt-pick-sub">Choose a nation to relive its 2026 World Cup — every result, its group table and squad. You can change it anytime.</p>
      <div class="mt-pick-grid">
        ${sorted
          .map(
            (t) => `<button class="mt-pick-card" data-pick="${t.name}" style="--tc:${t.color};--fg:${textColor(t.color)}">
              <span class="mt-pick-flag">${flag(t.name)}</span>
              <span class="mt-pick-name">${show(t.name)}</span>
              <span class="mt-pick-grp">Group ${t.group}</span>
            </button>`
          )
          .join('')}
      </div>
    </section>`;
}

// ---------------- Dashboard ----------------
// One finished match from the followed team's 2026 campaign.
function resultRow(m, fav, group) {
  const draw = m.homeScore === m.awayScore && !m.pens;
  const won = homeWon(m) === (m.home === fav);
  const tag = draw ? 'D' : won ? 'W' : 'L';
  const extra = m.pens ? ` (${m.pens} pens)` : m.aet ? ' (a.e.t.)' : '';
  const round = m.stage === 'GROUP_STAGE' ? `Group ${group}` : ROUND_LABEL[m.stage];
  return `
    <article class="fx-match is-final">
      <div class="fx-teams">
        <span class="fx-team fx-home"><span class="fx-name">${show(m.home)}</span>${flag(m.home)}</span>
        <span class="fx-time fx-score">${m.homeScore} – ${m.awayScore}</span>
        <span class="fx-team fx-away">${flag(m.away)}<span class="fx-name">${show(m.away)}</span></span>
      </div>
      <p class="fx-meta"><span class="fx-live is-final mt-res mt-res-${tag.toLowerCase()}">${tag}</span>${localDate(new Date(m.utcDate))}&nbsp; ·&nbsp; ${round}${extra}</p>
    </article>`;
}

function squadHTML(fav) {
  const s = squads[fav];
  if (!s) return '';
  return POS.map(([code, label]) => {
    const list = s.players.filter((p) => p.p === code);
    if (!list.length) return '';
    return `<div class="sq-pos"><span class="sq-pos-label">${label}</span><ul class="sq-players">
      ${list.map((p) => `<li class="sq-player" data-player="${p.n.replace(/"/g, '')}" data-pos="${p.p}" data-club="${p.c.replace(/"/g, '')}" data-team="${fav.replace(/"/g, '')}"><span class="sq-pname">${p.n}</span><span class="sq-club">${p.c}</span></li>`).join('')}
    </ul></div>`;
  }).join('');
}

function listSection(title, items) {
  if (!items || !items.length) return '';
  return `<section class="tmd-sec"><h4 class="tmd-h">${title}</h4><ul class="tmd-list">${items.map((x) => `<li>${x}</li>`).join('')}</ul></section>`;
}
function momentsSection(moments) {
  if (!moments || !moments.length) return '';
  return `<section class="tmd-sec"><h4 class="tmd-h">📅 Historic moments</h4><div class="tmd-timeline">
    ${moments.map((m) => `<div class="tmd-tl-item"><span class="tmd-tl-year">${m.year}</span><span class="tmd-tl-text">${m.text}</span></div>`).join('')}
  </div></section>`;
}

function renderDashboard(fav) {
  const t = byName[fav];
  const meta = teamMeta[fav] || {};
  const info = teamInfo[fav] || {};
  const coach = squads[fav]?.coach;
  const fg = textColor(t.color);
  const journey = teamJourney(fav);

  const tiles = [
    { n: journey.finish, l: '2026 finish', sm: true },
    { n: (meta.apps ?? 0) + 1, l: 'World Cups' },
    { n: info.best ?? '—', l: 'Best result', sm: true },
    { n: info.titles?.length ?? 0, l: 'Major titles' },
  ];

  root.innerHTML = `
    <header class="mt-hero" style="--tc:${t.color};--fg:${fg}">
      <img class="mt-hero-flag" src="${flagUrl(t.flag, 160)}" alt="${show(fav)} flag" />
      <div class="mt-hero-text">
        <span class="mt-hero-eyebrow">You're following</span>
        <h2 class="mt-hero-name">${show(fav)}</h2>
        <p class="mt-hero-sub">Group ${t.group}${info.conf ? ` · ${info.conf}` : ''}${coach ? ` · Coach: ${coach}` : ''}</p>
      </div>
      <button class="mt-change" id="mt-change">Change team</button>
    </header>

    <div class="tmd-tiles mt-tiles">
      ${tiles.map((x) => `<div class="tmd-tile"><span class="tmd-tile-num${x.sm ? ' tmd-tile-sm' : ''}">${x.n}</span><span class="tmd-tile-lbl">${x.l}</span></div>`).join('')}
    </div>

    <section class="mt-block">
      <div class="mt-block-head">
        <h3 class="mt-h">🗓️ ${show(fav)}'s 2026 results</h3>
        <span class="mt-finish${journey.finish === 'Champions' ? ' is-champ' : ''}">${journey.finish === 'Champions' ? '🏆 ' : ''}${journey.finish}</span>
      </div>
      <div class="fx-list">${journey.matches.map((m) => resultRow(m, fav, t.group)).join('')}</div>
    </section>

    <section class="mt-block">
      <h3 class="mt-h">📊 Group ${t.group} — final table</h3>
      <div id="mt-standings"></div>
    </section>

    <section class="mt-block">
      <h3 class="mt-h">👕 Squad</h3>
      <div class="sq-body mt-squad">${squadHTML(fav)}</div>
    </section>

    ${info.bio ? `<p class="tmd-bio mt-bio">${info.bio}</p>` : ''}
    ${listSection('🏆 Honours', info.titles && info.titles.length ? info.titles : ['No major senior titles yet'])}
    ${listSection('💡 Did you know', info.facts)}
    ${momentsSection(info.moments)}
    <p class="tmd-sources">Sources: FIFA, Wikipedia. Results via football-data.org.</p>`;

  document.getElementById('mt-change').addEventListener('click', () => { setFav(''); render(); });

  renderGroupStandings(results);
}

// Mini final group table for the followed team.
function renderGroupStandings(matches) {
  const host = document.getElementById('mt-standings');
  const fav = getFav();
  if (!host || !fav) return;
  const model = computeStandings(groups, matches || []);
  const g = model.find((gr) => gr.teams.some((s) => normTeam(s.name) === normTeam(fav)));
  if (!g) return;
  host.innerHTML = `
    <div class="group-block glass-card"><div class="group-table-wrap">
      <table class="standings-table">
        <thead><tr><th class="pos-col">#</th><th class="team-col">Team</th><th>MP</th><th>W</th><th>D</th><th>L</th><th class="hide-sm">GD</th><th class="pts-col">Pts</th></tr></thead>
        <tbody>
          ${g.teams.map((s, i) => {
            const gd = s.gf - s.ga;
            const me = normTeam(s.name) === normTeam(fav);
            return `<tr class="${advanced.has(s.name) ? 'qual' : ''}${me ? ' mt-fav-row' : ''}">
              <td class="pos-col"><span class="pos">${i + 1}</span></td>
              <td class="team-col"><img class="team-flag" src="${flagUrl(s.flag, 40)}" alt="" width="26" height="20" loading="lazy" /><span class="tname">${show(s.name)}</span></td>
              <td>${s.mp}</td><td>${s.w}</td><td>${s.d}</td><td>${s.l}</td>
              <td class="hide-sm">${gd > 0 ? '+' + gd : gd}</td>
              <td class="pts-col">${s.pts}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div></div>`;
}

// ---------------- Player profile modal (reused minimal) ----------------
const POS_FULL = { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward' };
const pmodal = document.createElement('div');
pmodal.className = 'pl-modal';
pmodal.hidden = true;
pmodal.innerHTML = `<div class="pl-backdrop" data-pl-close></div><div class="pl-dialog" role="dialog" aria-modal="true"><button class="pl-close" data-pl-close aria-label="Close">✕</button><div class="pl-content"></div></div>`;
document.body.appendChild(pmodal);
function openPlayer(d) {
  const code = flagByName[d.team];
  pmodal.querySelector('.pl-content').innerHTML = `
    <div class="pl-hero">${code ? `<img class="pl-flag" src="${flagUrl(code, 80)}" alt="" />` : ''}
      <div><h2 class="pl-name">${d.player}</h2><p class="pl-sub">${POS_FULL[d.pos] || d.pos} · ${d.team}</p></div></div>
    <div class="pl-rows">
      <div class="pl-row"><span>Position</span><span>${POS_FULL[d.pos] || d.pos}</span></div>
      <div class="pl-row"><span>Club</span><span>${d.club}</span></div>
      <div class="pl-row"><span>National team</span><span>${d.team}</span></div>
    </div>`;
  pmodal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closePlayer() { pmodal.hidden = true; document.body.style.overflow = ''; }
pmodal.addEventListener('click', (e) => { if (e.target.hasAttribute('data-pl-close')) closePlayer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pmodal.hidden) closePlayer(); });

// ---------------- Wire ----------------
function render() {
  const fav = getFav();
  if (!fav || !byName[fav]) renderPicker();
  else renderDashboard(fav);
}

if (root) {
  root.addEventListener('click', (e) => {
    const pick = e.target.closest('.mt-pick-card');
    if (pick) { setFav(pick.dataset.pick); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const li = e.target.closest('.sq-player');
    if (li) openPlayer(li.dataset);
  });
  render();
}

