// Polls our /api/scores proxy and live-updates the Fixtures rows: shows the score
// in place of the kickoff time, a pulsing LIVE minute badge while in play, and FT
// when finished. If there's no API token / no live data, rows keep showing times.
import { normTeam, pairKey } from './teamkey.js';

const POLL_MS = 45_000; // 45s — comfortably inside football-data's 10 req/min

function badgeLabel(m) {
  if (m.status === 'IN_PLAY') return m.minute ? `${m.minute}'` : 'LIVE';
  if (m.status === 'PAUSED') return 'HT';
  if (m.status === 'FINISHED') return 'FT';
  return null;
}

function applyMatch(m) {
  const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
  const done = m.status === 'FINISHED';
  if (!live && !done) return;

  const el = document.querySelector(`.fx-match[data-key="${pairKey(m.home, m.away)}"]`);
  if (!el) return;

  // Orient score to our row's home team (m.t1 stored in data-home).
  let hs = m.homeScore;
  let as = m.awayScore;
  if (normTeam(m.home) !== normTeam(el.dataset.home)) {
    hs = m.awayScore;
    as = m.homeScore;
  }

  const timeEl = el.querySelector('.fx-time');
  if (timeEl && hs != null && as != null) {
    timeEl.textContent = `${hs} – ${as}`;
    timeEl.classList.add('fx-score');
  }

  el.classList.toggle('is-live', live);
  el.classList.toggle('is-final', done);

  let badge = el.querySelector('.fx-live');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'fx-live';
    el.querySelector('.fx-meta')?.prepend(badge);
  }
  badge.textContent = badgeLabel(m);
  badge.classList.toggle('is-final', done);
}

async function poll() {
  let data;
  try {
    const res = await fetch('/api/scores', { cache: 'no-store' });
    data = await res.json();
  } catch {
    return; // network hiccup — keep last state, try again next tick
  }
  (data.matches || []).forEach(applyMatch);
}

// Only run where fixture rows exist.
if (document.querySelector('.fx-match') || document.getElementById('fixtures-root')) {
  poll();
  setInterval(poll, POLL_MS);
  // Refresh immediately when the tab regains focus.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
}
