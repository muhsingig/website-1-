// Working countdown to the FIFA World Cup 2026 opening match
// Mexico City · Estadio Azteca · 11 June 2026
const KICKOFF = new Date('2026-06-11T19:00:00Z').getTime();

export function initCountdown() {
  const root = document.getElementById('wc-countdown');
  if (!root) return;

  const dd = root.querySelector('[data-cd="days"]');
  const hh = root.querySelector('[data-cd="hours"]');
  const mm = root.querySelector('[data-cd="mins"]');
  const ss = root.querySelector('[data-cd="secs"]');
  if (!dd || !hh || !mm || !ss) return;

  const pad = (n) => String(n).padStart(2, '0');

  let timer;
  function tick() {
    const diff = KICKOFF - Date.now();
    if (diff <= 0) {
      dd.textContent = '00';
      hh.textContent = '00';
      mm.textContent = '00';
      ss.textContent = '00';
      const lbl = root.querySelector('.cd-status');
      if (lbl) lbl.textContent = 'The tournament is live';
      if (timer) clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    dd.textContent = pad(Math.floor(s / 86400));
    hh.textContent = pad(Math.floor((s % 86400) / 3600));
    mm.textContent = pad(Math.floor((s % 3600) / 60));
    ss.textContent = pad(s % 60);
  }

  tick();
  if (KICKOFF - Date.now() > 0) {
    timer = setInterval(tick, 1000);
  }
}
