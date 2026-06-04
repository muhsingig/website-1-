// Homepage "Today's Matches" widget. Shows today's games (or the next match
// day before the tournament), live scores via the shared feed, the countdown
// note, and prioritises a picked team.
import { fixtures, flagByName, flagUrl } from './wc-data.js';
import { normTeam, pairKey } from './teamkey.js';
import { getFav } from './prefs.js';
import { onScores, startFeed } from './scores-feed.js';

const root = document.getElementById('home-today');
if (root) {
  const show = (n) => (n === 'United States' ? 'USA' : n);
  const flag = (n) => {
    const c = flagByName[n];
    return c ? `<img class="ht-flag" src="${flagUrl(c, 80)}" alt="" loading="lazy" />` : '';
  };
  const kickoff = (m) => {
    const [y, mo, d] = m.date.split('-').map(Number);
    const [hh, mm] = m.time.replace(/\s*ET/i, '').split(':').map(Number);
    return new Date(Date.UTC(y, mo - 1, d, hh + 4, mm || 0));
  };
  const localTime = (dt) => dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const localKey = (dt) => dt.toLocaleDateString('en-CA');
  const todayKey = new Date().toLocaleDateString('en-CA');

  // Group fixtures by local day.
  const byDay = new Map();
  for (const m of fixtures) {
    const dt = kickoff(m);
    const k = localKey(dt);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push({ m, dt });
  }
  const days = [...byDay.keys()].sort();
  // Today if it has matches, else the next upcoming match day.
  let dayKey = days.find((k) => k === todayKey) || days.find((k) => k >= todayKey) || days[days.length - 1];
  const isToday = dayKey === todayKey;
  const items = (byDay.get(dayKey) || []).sort((a, b) => a.dt - b.dt);

  const fav = getFav();
  const heading = isToday ? "Today's Matches" : 'Next Matches';
  const dateLabel = new Date(dayKey + 'T12:00:00Z').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
  });

  function matchHTML({ m, dt }) {
    const favHit = fav && (m.t1 === fav || m.t2 === fav);
    return `
      <article class="home-match${favHit ? ' is-fav' : ''}" data-key="${pairKey(m.t1, m.t2)}" data-home="${m.t1}">
        <span class="hm-side hm-home"><span class="hm-name">${show(m.t1)}</span>${flag(m.t1)}</span>
        <span class="hm-mid"><span class="hm-time">${localTime(dt)}</span></span>
        <span class="hm-side hm-away">${flag(m.t2)}<span class="hm-name">${show(m.t2)}</span></span>
        ${favHit ? '<span class="hm-fav-tag">★ Your team</span>' : ''}
      </article>`;
  }

  // Order: fav team's match first if present.
  items.sort((a, b) => {
    const af = fav && (a.m.t1 === fav || a.m.t2 === fav) ? 0 : 1;
    const bf = fav && (b.m.t1 === fav || b.m.t2 === fav) ? 0 : 1;
    return af - bf || a.dt - b.dt;
  });

  root.innerHTML = `
    <div class="ht-head">
      <div>
        <span class="eyebrow">${isToday ? 'Live & upcoming' : 'Get ready'}</span>
        <h2 class="section-headline ht-title">${heading}</h2>
        <p class="ht-date">${dateLabel}${isToday ? '' : ' · tournament kicks off 11 June'}</p>
      </div>
      <a class="ht-all" href="/fixtures.html">All fixtures →</a>
    </div>
    <div class="ht-list">${items.map(matchHTML).join('')}</div>`;

  // Live score overlay via shared feed.
  function badge(m) {
    if (m.status === 'IN_PLAY') return m.minute ? `${m.minute}'` : 'LIVE';
    if (m.status === 'PAUSED') return 'HT';
    if (m.status === 'FINISHED') return 'FT';
    return null;
  }
  function applyLive(data) {
    (data.matches || []).forEach((m) => {
      const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
      const done = m.status === 'FINISHED';
      if ((!live && !done) || m.homeScore == null) return;
      const el = root.querySelector(`.home-match[data-key="${pairKey(m.home, m.away)}"]`);
      if (!el) return;
      let hs = m.homeScore, as = m.awayScore;
      if (normTeam(m.home) !== normTeam(el.dataset.home)) { hs = m.awayScore; as = m.homeScore; }
      const mid = el.querySelector('.hm-mid');
      mid.innerHTML = `<span class="hm-score">${hs}–${as}</span><span class="hm-badge${done ? ' is-final' : ''}">${badge(m)}</span>`;
      el.classList.toggle('is-live', live);
    });
  }
  onScores(applyLive);
  startFeed();
}
