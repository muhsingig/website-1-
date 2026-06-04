// Match-alert notifications via the browser Notifications API.
// NOTE: a static site can't push when the tab is closed (that needs a service
// worker + push server). These alerts fire while the site is open; the Fixtures
// page "Add to calendar" (.ics) covers reliable off-site reminders.
import { fixtures } from './wc-data.js';

const scheduled = new Set(); // de-dupe timers across calls in one session

function kickoffUTC(m) {
  const [y, mo, d] = m.date.split('-').map(Number);
  const [hh, mm] = m.time.replace(/\s*ET/i, '').split(':').map(Number);
  return new Date(Date.UTC(y, mo - 1, d, hh + 4, mm || 0));
}

function notify(title, body) {
  try {
    new Notification(title, { body, icon: '/logo-wc26.png', badge: '/favicon.svg' });
  } catch { /* ignore */ }
}

function scheduleFor(team) {
  const now = Date.now();
  const MAX = 24 * 60 * 60 * 1000; // setTimeout is unreliable beyond ~24 days; only near matches
  fixtures
    .filter((m) => m.t1 === team || m.t2 === team)
    .forEach((m, i) => {
      const ko = kickoffUTC(m).getTime();
      [
        { id: `${team}-${i}-1h`, at: ko - 60 * 60 * 1000, msg: 'kick off in 1 hour' },
        { id: `${team}-${i}-ko`, at: ko, msg: 'are kicking off now' },
      ].forEach((a) => {
        const delay = a.at - now;
        if (delay <= 0 || delay > MAX || scheduled.has(a.id)) return;
        scheduled.add(a.id);
        setTimeout(() => notify(`${team} — World Cup 2026`, `${m.t1} vs ${m.t2} ${a.msg}.`), delay);
      });
    });
}

// Returns: 'ok' | 'denied' | 'unsupported'
export async function enableAlerts(team) {
  if (!('Notification' in window)) return 'unsupported';
  let perm = Notification.permission;
  if (perm === 'default') perm = await Notification.requestPermission();
  if (perm !== 'granted') return 'denied';
  scheduleFor(team);
  return 'ok';
}
