// Single shared poller for /api/scores. Both the group-stage row updater and the
// knockout renderer subscribe, so the page makes one request per cycle (not two).
const POLL_MS = 45_000;
const subscribers = new Set();
let latest = null;
let started = false;

async function poll() {
  try {
    const res = await fetch('/api/scores', { cache: 'no-store' });
    latest = await res.json();
  } catch {
    return; // keep last data; try again next tick
  }
  subscribers.forEach((fn) => {
    try { fn(latest); } catch { /* one bad subscriber shouldn't break the rest */ }
  });
}

export function onScores(fn) {
  subscribers.add(fn);
  if (latest) fn(latest); // replay the most recent data to a late subscriber
  return () => subscribers.delete(fn);
}

export function startFeed() {
  if (started) return;
  started = true;
  poll();
  setInterval(poll, POLL_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
}
