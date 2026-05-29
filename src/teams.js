import './style.css';
import { groups, flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function teamCard(team) {
  return `
    <article class="team-card glass-card" style="--team-color:${team.color}">
      <span class="team-color-bar"></span>
      <img class="team-card-flag" src="${flagUrl(team.flag, 80)}" alt="${team.name} flag" width="56" height="42" loading="lazy" />
      <span class="team-card-name">${team.name}</span>
      <span class="team-card-color" style="background:${team.color}"></span>
    </article>`;
}

function groupBlock(group) {
  return `
    <section class="teams-group">
      <h2 class="teams-group-title">Group ${group.id}</h2>
      <div class="teams-grid">
        ${group.teams.map(teamCard).join('')}
      </div>
    </section>`;
}

const root = document.getElementById('teams-root');
if (root) {
  root.innerHTML = groups.map(groupBlock).join('');
}

initCountdown();
