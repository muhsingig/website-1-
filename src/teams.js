import './style.css';
import { groups, flagUrl, teamMeta } from './wc-data.js';
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
    <article class="tm-card" style="--tc:${t.color};--fg:${fg};--dim:${dim}">
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

initCountdown();
