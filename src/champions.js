// Champions 2026 page — the final, the podium, Spain's road to the title, the
// full knockout bracket, the awards and the tournament in numbers.
import './style.css';
import { flagUrl, flagByName } from './wc-data.js';
import { results, scorers, homeWon, teamJourney, scoreFor, ROUND_LABEL } from './results-2026.js';
import { champion, final, podium, awards, numbers, storylines } from './champions-data.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

const show = (n) => (n === 'United States' ? 'USA' : n);
const img = (code, cls, size = 80) =>
  code ? `<img class="${cls}" src="${flagUrl(code, size)}" alt="" loading="lazy" />` : '';
const flagOf = (team) => img(flagByName[team], 'ch-flag');
const set = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};

/* ---- The final ---- */
const side = (team) => final.goals.filter((g) => g.team === team)
  .map((g) => `<span class="ch-ev">⚽ ${g.player} ${g.min}</span>`)
  .concat(final.cards.filter((c) => c.team === team).map((c) => `<span class="ch-ev ch-ev-red"><i class="ch-redcard"></i>${c.player} ${c.min}</span>`))
  .join('');

set('ch-final', `
  <div class="ch-final-board">
    <div class="ch-final-team is-win">
      ${img(final.homeFlag, 'ch-final-flag', 160)}
      <span class="ch-final-name">${final.home}</span>
      <span class="ch-final-tag">World champions</span>
    </div>
    <div class="ch-final-mid">
      <span class="ch-final-score">${final.score}</span>
      <span class="ch-final-note">${final.note}</span>
    </div>
    <div class="ch-final-team">
      ${img(final.awayFlag, 'ch-final-flag', 160)}
      <span class="ch-final-name">${final.away}</span>
      <span class="ch-final-tag">Runners-up</span>
    </div>
  </div>
  <div class="ch-final-events">
    <div class="ch-evs ch-evs-home">${side('home')}</div>
    <div class="ch-evs ch-evs-away">${side('away')}</div>
  </div>
  <p class="ch-final-story">${final.story}</p>
  <dl class="ch-final-facts">
    <div><dt>Date</dt><dd>${final.date}</dd></div>
    <div><dt>Venue</dt><dd>${final.venue}</dd></div>
    <div><dt>Attendance</dt><dd>${final.attendance}</dd></div>
    <div><dt>Referee</dt><dd>${final.referee}</dd></div>
    <div><dt>Player of the match</dt><dd>${final.potm}</dd></div>
    <div><dt>Coach</dt><dd>${champion.coach}</dd></div>
  </dl>`);

/* ---- Podium ---- */
set('ch-podium', podium.map((p) => `
  <div class="ch-pod ch-pod-${p.pos}">
    <span class="ch-pod-pos">${p.pos}</span>
    ${img(p.flag, 'ch-pod-flag', 160)}
    <span class="ch-pod-name">${p.name}</span>
    <span class="ch-pod-label">${p.label}</span>
  </div>`).join(''));

/* ---- Spain's road to the title ---- */
const SPAIN_SCORERS = {
  LAST_32: 'Oyarzabal 2, Porro',
  LAST_16: 'Merino 90+1’',
  QUARTER_FINALS: 'Fabián Ruiz, Merino',
  SEMI_FINALS: 'Oyarzabal (pen), Porro',
  FINAL: 'Ferran Torres 106’',
};
const road = teamJourney(champion.name).matches;
set('ch-road', road.map((m, i) => {
  const opp = m.home === champion.name ? m.away : m.home;
  const stage = m.stage === 'GROUP_STAGE' ? `Group H · Match ${i + 1}` : ROUND_LABEL[m.stage];
  const date = new Date(m.utcDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const draw = m.homeScore === m.awayScore && !m.pens;
  return `
    <li class="ch-step${m.stage === 'FINAL' ? ' is-final' : ''}">
      <span class="ch-step-dot ${draw ? 'd' : 'w'}">${draw ? 'D' : 'W'}</span>
      <div class="ch-step-body">
        <span class="ch-step-stage">${stage} · ${date}</span>
        <span class="ch-step-match">vs ${flagOf(opp)}<strong>${show(opp)}</strong></span>
        ${SPAIN_SCORERS[m.stage] ? `<span class="ch-step-goals">${SPAIN_SCORERS[m.stage]}</span>` : ''}
      </div>
      <span class="ch-step-score">${scoreFor(m, champion.name)}</span>
    </li>`;
}).join(''));

/* ---- Knockout bracket (derived backwards from the final) ---- */
const STAGES = ['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'];
const TITLES = ['Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];
const matchOf = (stage, team) => results.find((m) => m.stage === stage && (m.home === team || m.away === team));
const columns = [];
columns[4] = results.filter((m) => m.stage === 'FINAL');
for (let r = 3; r >= 0; r--) {
  columns[r] = columns[r + 1].flatMap((m) => [matchOf(STAGES[r], m.home), matchOf(STAGES[r], m.away)]);
}
function bkRow(m, team, isHome) {
  const won = homeWon(m) === isHome;
  const goals = isHome ? m.homeScore : m.awayScore;
  const pen = m.pens ? `<sup>${m.pens.split('–')[isHome ? 0 : 1]}</sup>` : '';
  return `<div class="bk-row${won ? ' is-win' : ''}">${flagOf(team)}<span class="bk-name">${show(team)}</span><span class="bk-goals">${goals}${pen}</span></div>`;
}
set('ch-bracket', columns.map((col, r) => `
  <div class="bk-col bk-col-${r}">
    <span class="bk-title">${TITLES[r]}</span>
    <div class="bk-matches">
      ${col.map((m) => `
        <div class="bk-match${m.stage === 'FINAL' ? ' is-final' : ''}" title="${m.home} ${m.homeScore}–${m.awayScore} ${m.away}${m.pens ? ` (${m.pens} pens)` : m.aet ? ' (a.e.t.)' : ''}">
          ${bkRow(m, m.home, true)}${bkRow(m, m.away, false)}
          ${m.aet && !m.pens ? '<span class="bk-aet">aet</span>' : ''}
        </div>`).join('')}
    </div>
  </div>`).join(''));

const third = results.find((m) => m.stage === 'THIRD_PLACE');
set('ch-third', `Third-place play-off: <strong>${third.away} ${third.awayScore}–${third.homeScore} ${third.home}</strong> · Hard Rock Stadium, Miami · 18 July`);

/* ---- Awards ---- */
set('ch-awards', awards.map((a) => `
  <article class="ch-award">
    <span class="ch-award-icon" aria-hidden="true">${a.icon}</span>
    <span class="ch-award-title">${a.title}</span>
    <span class="ch-award-what">${a.what}</span>
    <div class="ch-award-winner">${img(a.winner.flag, 'ch-flag')}<span><strong>${a.winner.name}</strong><small>${a.winner.team}</small></span></div>
    ${a.podium ? `<ul class="ch-award-rest">${a.podium.map((p) => `<li><span>${p.k}</span>${img(p.flag, 'ch-flag-sm', 40)}${p.v}</li>`).join('')}</ul>` : ''}
  </article>`).join(''));

/* ---- Top scorers ---- */
set('ch-scorers', `
  <div class="st-table">
    <div class="st-row st-head">
      <span class="st-rank">#</span><span class="st-player">Player</span><span class="st-country">Nation</span><span class="st-val">Goals</span>
    </div>
    ${scorers.slice(0, 10).map((s, i) => `
      <div class="st-row${i === 0 ? ' ch-boot-row' : ''}">
        <span class="st-rank">${i + 1}</span>
        <span class="st-player">${s.name}${s.assists ? `<span class="st-span">${s.assists} assist${s.assists === 1 ? '' : 's'}</span>` : ''}</span>
        <span class="st-country">${img(flagByName[s.team], 'st-flag')}<span class="st-cname">${show(s.team)}</span></span>
        <span class="st-val">${s.goals}</span>
      </div>`).join('')}
  </div>`);

/* ---- Numbers & storylines ---- */
set('ch-numbers', numbers.map((n) => `
  <div class="st-card"><span class="st-card-num">${n.num}</span><span class="st-card-label">${n.label}</span><span class="st-card-sub">${n.sub}</span></div>`).join(''));

set('ch-stories', storylines.map((s) => `
  <article class="ch-story"><h3 class="ch-story-k">${s.k}</h3><p class="ch-story-v">${s.v}</p></article>`).join(''));
