import './style.css';
import { fixtures, flagByName, flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function flag(name) {
  const code = flagByName[name];
  return code ? `<img class="fx-flag" src="${flagUrl(code, 40)}" alt="" width="28" height="21" loading="lazy" />` : '';
}

function matchRow(m) {
  return `
    <article class="fx-match">
      <span class="fx-group">Group ${m.group}</span>
      <div class="fx-teams">
        <span class="fx-team fx-home"><span class="fx-name">${m.t1}</span>${flag(m.t1)}</span>
        <span class="fx-time">${m.time.replace(' ET', '')}<span class="fx-tz">ET</span></span>
        <span class="fx-team fx-away">${flag(m.t2)}<span class="fx-name">${m.t2}</span></span>
      </div>
      <span class="fx-venue">${m.venue} · ${m.city}</span>
    </article>`;
}

function dateBlock(date, matches) {
  return `
    <section class="fx-day">
      <h2 class="fx-date">${formatDate(date)}</h2>
      <div class="fx-list">
        ${matches.map(matchRow).join('')}
      </div>
    </section>`;
}

const root = document.getElementById('fixtures-root');
if (root) {
  const byDate = new Map();
  for (const m of fixtures) {
    if (!byDate.has(m.date)) byDate.set(m.date, []);
    byDate.get(m.date).push(m);
  }
  const sorted = [...byDate.keys()].sort();
  root.innerHTML = sorted.map((d) => dateBlock(d, byDate.get(d))).join('');
}

initCountdown();
