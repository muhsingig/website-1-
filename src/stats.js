import './style.css';
import { titlesByNation } from './winners-data.js';
import { flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './golden-boot.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function flag(code) {
  return `<img class="st-flag" src="${flagUrl(code, 80)}" alt="" width="30" height="22" loading="lazy" />`;
}

/* ===== Data (FIFA World Cup finals tournaments, through 2022) ===== */
const headline = [
  { num: '5', label: 'Most titles', sub: 'Brazil (1958–2002)' },
  { num: '16', label: 'Most career goals', sub: 'Miroslav Klose' },
  { num: '26', label: 'Most matches played', sub: 'Lionel Messi' },
  { num: '13', label: 'Most goals, one finals', sub: 'Just Fontaine, 1958' },
  { num: '22/22', label: 'Ever-present nation', sub: 'Brazil — every World Cup' },
];

const topScorers = [
  { n: 'Miroslav Klose', c: 'Germany', f: 'de', g: 16, span: '2002–2014' },
  { n: 'Ronaldo', c: 'Brazil', f: 'br', g: 15, span: '1998–2006' },
  { n: 'Gerd Müller', c: 'West Germany', f: 'de', g: 14, span: '1970–1974' },
  { n: 'Just Fontaine', c: 'France', f: 'fr', g: 13, span: '1958' },
  { n: 'Lionel Messi', c: 'Argentina', f: 'ar', g: 13, span: '2006–2022' },
  { n: 'Pelé', c: 'Brazil', f: 'br', g: 12, span: '1958–1970' },
  { n: 'Kylian Mbappé', c: 'France', f: 'fr', g: 12, span: '2018–2022' },
  { n: 'Sándor Kocsis', c: 'Hungary', f: 'hu', g: 11, span: '1954' },
  { n: 'Jürgen Klinsmann', c: 'Germany', f: 'de', g: 11, span: '1990–1998' },
  { n: 'Gabriel Batistuta', c: 'Argentina', f: 'ar', g: 10, span: '1994–2002' },
];

const appearances = [
  { n: 'Lionel Messi', c: 'Argentina', f: 'ar', m: 26 },
  { n: 'Lothar Matthäus', c: 'Germany', f: 'de', m: 25 },
  { n: 'Miroslav Klose', c: 'Germany', f: 'de', m: 24 },
  { n: 'Paolo Maldini', c: 'Italy', f: 'it', m: 23 },
  { n: 'Diego Maradona', c: 'Argentina', f: 'ar', m: 21 },
  { n: 'Władysław Żmuda', c: 'Poland', f: 'pl', m: 21 },
  { n: 'Cafu', c: 'Brazil', f: 'br', m: 20 },
  { n: 'Philipp Lahm', c: 'Germany', f: 'de', m: 20 },
];

const assists = [
  { n: 'Lionel Messi', c: 'Argentina', f: 'ar', a: 8 },
  { n: 'Diego Maradona', c: 'Argentina', f: 'ar', a: 8 },
  { n: 'Pierre Littbarski', c: 'Germany', f: 'de', a: 7 },
  { n: 'Grzegorz Lato', c: 'Poland', f: 'pl', a: 7 },
  { n: 'Pelé', c: 'Brazil', f: 'br', a: 6 },
  { n: 'David Beckham', c: 'England', f: 'gb-eng', a: 6 },
  { n: 'Thomas Müller', c: 'Germany', f: 'de', a: 6 },
  { n: 'Francesco Totti', c: 'Italy', f: 'it', a: 6 },
];

// Goal involvements = goals + assists.
const involvements = [
  { n: 'Lionel Messi', c: 'Argentina', f: 'ar', g: 13, a: 8 },
  { n: 'Pelé', c: 'Brazil', f: 'br', g: 12, a: 6 },
  { n: 'Diego Maradona', c: 'Argentina', f: 'ar', g: 8, a: 8 },
];

// Player-of-the-Match awards (presented by FIFA since 2002).
const motm = [
  { n: 'Lionel Messi', c: 'Argentina', f: 'ar', m: 11 },
  { n: 'Cristiano Ronaldo', c: 'Portugal', f: 'pt', m: 6 },
  { n: 'Arjen Robben', c: 'Netherlands', f: 'nl', m: 6 },
];

const records = [
  { k: 'Most titles (nation)', v: 'Brazil — 5' },
  { k: 'Most Golden Balls (best player)', v: 'Lionel Messi — 2 (2014, 2022)' },
  { k: 'Most knockout-stage goals', v: 'Ronaldo & Mbappé — 8' },
  { k: 'Most assists (one tournament)', v: 'Pelé — 6 (1970)' },
  { k: 'Most goal involvements', v: 'Lionel Messi — 21 (13 G + 8 A)' },
  { k: 'Most finals reached (nation)', v: 'Germany — 8' },
  { k: 'Only ever-present nation', v: 'Brazil — all 22 tournaments' },
  { k: 'Most career goals (player)', v: 'Miroslav Klose — 16' },
  { k: 'Most goals in one tournament', v: 'Just Fontaine — 13 (1958)' },
  { k: 'Most matches played', v: 'Lionel Messi — 26' },
  { k: 'Most titles (player)', v: 'Pelé — 3 (1958, 1962, 1970)' },
  { k: 'Goals in a final (player)', v: 'Geoff Hurst — 3 (1966)' },
  { k: 'Fastest goal', v: 'Hakan Şükür — 11 seconds (2002)' },
  { k: 'Highest-scoring match', v: 'Austria 7–5 Switzerland — 12 goals (1954)' },
  { k: 'Biggest winning margin', v: 'Hungary 10–1 El Salvador (1982)' },
  { k: 'Youngest goalscorer', v: 'Pelé — 17y 239d (1958)' },
  { k: 'Oldest goalscorer', v: 'Roger Milla — 42y 39d (1994)' },
  { k: 'Most goals in one tournament (total)', v: '172 goals — Qatar 2022' },
  { k: 'Most World Cups hosted', v: 'Mexico — 3 (1970, 1986, 2026)' },
];

/* ===== Render ===== */
const cards = document.getElementById('stat-cards');
if (cards) {
  cards.innerHTML = headline
    .map(
      (h) => `<div class="st-card">
        <span class="st-card-num">${h.num}</span>
        <span class="st-card-label">${h.label}</span>
        <span class="st-card-sub">${h.sub}</span>
      </div>`
    )
    .join('');
}

function rankTable(rootId, rows, valueKey, valueLabel) {
  const root = document.getElementById(rootId);
  if (!root) return;
  root.innerHTML = `
    <div class="st-table">
      <div class="st-row st-head">
        <span class="st-rank">#</span>
        <span class="st-player">Player</span>
        <span class="st-country">Nation</span>
        <span class="st-val">${valueLabel}</span>
      </div>
      ${rows
        .map(
          (r, i) => `
        <div class="st-row">
          <span class="st-rank">${i + 1}</span>
          <span class="st-player">${r.n}${r.span ? `<span class="st-span">${r.span}</span>` : ''}</span>
          <span class="st-country">${flag(r.f)}<span class="st-cname">${r.c}</span></span>
          <span class="st-val">${r[valueKey]}</span>
        </div>`
        )
        .join('')}
    </div>`;
}

rankTable('scorers-root', topScorers, 'g', 'Goals');
rankTable('apps-root', appearances, 'm', 'Matches');
rankTable('assists-root', assists, 'a', 'Assists');
rankTable('motm-root', motm, 'm', 'Awards');

// Goal involvements table (goals + assists breakdown)
const involveRoot = document.getElementById('involve-root');
if (involveRoot) {
  involveRoot.innerHTML = `
    <div class="st-table">
      <div class="st-row st-row-ga st-head">
        <span class="st-rank">#</span>
        <span class="st-player">Player</span>
        <span class="st-country">Nation</span>
        <span class="st-val">G</span>
        <span class="st-val">A</span>
        <span class="st-val">G+A</span>
      </div>
      ${involvements
        .map(
          (r, i) => `
        <div class="st-row st-row-ga">
          <span class="st-rank">${i + 1}</span>
          <span class="st-player">${r.n}</span>
          <span class="st-country">${flag(r.f)}<span class="st-cname">${r.c}</span></span>
          <span class="st-val">${r.g}</span>
          <span class="st-val">${r.a}</span>
          <span class="st-val st-val-win">${r.g + r.a}</span>
        </div>`
        )
        .join('')}
    </div>`;
}

const titlesRoot = document.getElementById('titles-root');
if (titlesRoot) {
  titlesRoot.innerHTML = `
    <div class="st-table">
      <div class="st-row st-head st-row-nation">
        <span class="st-rank">#</span>
        <span class="st-player">Nation</span>
        <span class="st-val">Titles</span>
        <span class="st-val">Runners-up</span>
      </div>
      ${titlesByNation
        .map(
          (t, i) => `
        <div class="st-row st-row-nation">
          <span class="st-rank">${i + 1}</span>
          <span class="st-player">${flag(t.flag)}<span class="st-cname">${t.name}</span><span class="st-span">${t.years.join(', ')}</span></span>
          <span class="st-val st-val-win">${t.titles}</span>
          <span class="st-val">${t.runnerUps}</span>
        </div>`
        )
        .join('')}
    </div>`;
}

const recordsRoot = document.getElementById('records-root');
if (recordsRoot) {
  recordsRoot.innerHTML = records
    .map(
      (r) => `<div class="st-record">
        <span class="st-record-k">${r.k}</span>
        <span class="st-record-v">${r.v}</span>
      </div>`
    )
    .join('');
}

initCountdown();
