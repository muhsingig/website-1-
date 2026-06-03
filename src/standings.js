import './style.css';
import { groups, flagUrl } from './wc-data.js';
import { computeStandings } from './standings-compute.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

const POLL_MS = 45_000;
const compute = (matches) => computeStandings(groups, matches);

// ---- Render ----
function formDots(stat) {
  const last = stat.results.slice(-5); // chronological, newest at the right
  const dots = [];
  for (let i = 0; i < 5; i++) {
    const r = last[i - (5 - last.length)];
    dots.push(`<span class="form-dot${r ? ' ' + r.o : ''}"></span>`);
  }
  return dots.join('');
}

function teamRow(stat, pos) {
  const gd = stat.gf - stat.ga;
  return `
    <tr class="${pos <= 2 ? 'qual' : ''}">
      <td class="pos-col"><span class="pos">${pos}</span></td>
      <td class="team-col">
        <img class="team-flag" src="${flagUrl(stat.flag, 40)}" alt="" width="26" height="20" loading="lazy" />
        <span class="tname">${stat.name}</span>
      </td>
      <td>${stat.mp}</td><td>${stat.w}</td><td>${stat.d}</td><td>${stat.l}</td>
      <td class="hide-sm">${stat.gf}</td><td class="hide-sm">${stat.ga}</td>
      <td class="hide-sm">${gd > 0 ? '+' + gd : gd}</td>
      <td class="pts-col">${stat.pts}</td>
      <td class="form-col hide-sm">${formDots(stat)}</td>
    </tr>`;
}

function groupBlock(g) {
  return `
    <section class="group-block glass-card">
      <div class="group-head">
        <span class="group-label">Group ${g.id}</span>
        ${g.live ? '<span class="group-live">LIVE</span>' : ''}
      </div>
      <div class="group-table-wrap">
        <table class="standings-table">
          <thead>
            <tr>
              <th class="pos-col">#</th>
              <th class="team-col">Team</th>
              <th>MP</th><th>W</th><th>D</th><th>L</th>
              <th class="hide-sm">GF</th><th class="hide-sm">GA</th><th class="hide-sm">GD</th>
              <th class="pts-col">Pts</th>
              <th class="form-col hide-sm">Form</th>
            </tr>
          </thead>
          <tbody>
            ${g.teams.map((t, i) => teamRow(t, i + 1)).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

const root = document.getElementById('groups-root');
function render(model) {
  if (root) root.innerHTML = model.map(groupBlock).join('');
}

// Initial paint (all zeros) so the page shows instantly, then live data.
render(compute([]));

async function poll() {
  let data;
  try {
    const res = await fetch('/api/scores', { cache: 'no-store' });
    data = await res.json();
  } catch {
    return;
  }
  render(compute(data.matches || []));
}

if (root) {
  poll();
  setInterval(poll, POLL_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
}

initCountdown();
