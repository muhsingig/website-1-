import './style.css';
import { tournaments, titlesByNation } from './winners-data.js';
import { flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function flag(code, cls = 'wn-flag') {
  return `<img class="${cls}" src="${flagUrl(code, 80)}" alt="" width="40" height="30" loading="lazy" />`;
}

/* ---- Roll of honour ---- */
const honour = document.getElementById('honour-root');
if (honour) {
  honour.innerHTML = titlesByNation
    .map(
      (n) => `
      <div class="wn-honour">
        ${flag(n.flag, 'wn-honour-flag')}
        <span class="wn-honour-name">${n.name}</span>
        <span class="wn-honour-titles"><strong>${n.titles}</strong> ${n.titles === 1 ? 'title' : 'titles'}</span>
        <span class="wn-honour-years">${n.years.join(' · ')}</span>
      </div>`
    )
    .join('');
}

/* ---- Tournament timeline (newest first) ---- */
function card(t) {
  const hostFlags = t.hostFlags.map((c) => flag(c, 'wn-host-flag')).join('');
  return `
    <article class="wn-card">
      <div class="wn-year">${t.year}</div>
      <div class="wn-main">
        <div class="wn-final">
          <span class="wn-team wn-champ">
            ${flag(t.winnerFlag)}
            <span class="wn-team-name">${t.winner}</span>
            <span class="wn-tag wn-tag-win">Champions</span>
          </span>
          <span class="wn-score">${t.score}</span>
          <span class="wn-team wn-runner">
            ${flag(t.runnerUpFlag)}
            <span class="wn-team-name">${t.runnerUp}</span>
            <span class="wn-tag">Runners-up</span>
          </span>
        </div>
        <div class="wn-meta">
          <span class="wn-meta-item"><span class="wn-meta-host">${hostFlags}</span>Hosts: ${t.hostName}</span>
          <span class="wn-meta-item"><span class="wn-meta-k">Final</span> ${t.venue}</span>
          <span class="wn-meta-item"><span class="wn-meta-k">3rd</span> ${t.third}</span>
          <span class="wn-meta-item"><span class="wn-meta-k">Teams</span> ${t.teams}</span>
          <span class="wn-meta-item"><span class="wn-meta-k">Top scorer</span> ${t.topScorer}</span>
        </div>
      </div>
    </article>`;
}

const root = document.getElementById('winners-root');
if (root) {
  root.innerHTML = [...tournaments].reverse().map(card).join('');
}

initCountdown();
