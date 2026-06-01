import './style.css';
import { groups, flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function teamRow(team, pos) {
  return `
    <tr class="${pos <= 2 ? 'qual' : ''}">
      <td class="pos-col"><span class="pos">${pos}</span></td>
      <td class="team-col">
        <img class="team-flag" src="${flagUrl(team.flag, 40)}" alt="" width="26" height="20" loading="lazy" />
        <span class="tname">${team.name}</span>
      </td>
      <td>0</td><td>0</td><td>0</td><td>0</td>
      <td class="hide-sm">0</td><td class="hide-sm">0</td><td class="hide-sm">0</td>
      <td class="pts-col">0</td>
      <td class="form-col hide-sm">
        <span class="form-dot"></span><span class="form-dot"></span><span class="form-dot"></span><span class="form-dot"></span><span class="form-dot"></span>
      </td>
    </tr>`;
}

function groupBlock(group) {
  return `
    <section class="group-block glass-card">
      <div class="group-head">
        <span class="group-label">Group ${group.id}</span>
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
            ${group.teams.map((t, i) => teamRow(t, i + 1)).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

const root = document.getElementById('groups-root');
if (root) {
  root.innerHTML = groups.map(groupBlock).join('');
}

initCountdown();
