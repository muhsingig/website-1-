// Generate an .ics calendar file of a team's World Cup 2026 matches, each with
// a 1-hour-before alarm. Adding it to a phone/Google/Apple calendar means the
// device notifies you automatically before every match — no backend needed.
import { fixtures } from './wc-data.js';

// Kickoff in UTC (data times are U.S. Eastern; June/July EDT = UTC-4).
function kickoffUTC(m) {
  const [y, mo, d] = m.date.split('-').map(Number);
  const [hh, mm] = m.time.replace(/\s*ET/i, '').split(':').map(Number);
  return new Date(Date.UTC(y, mo - 1, d, hh + 4, mm || 0));
}

const fmt = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');

export function teamMatches(team) {
  return fixtures.filter((m) => m.t1 === team || m.t2 === team);
}

export function buildICS(team) {
  const matches = teamMatches(team);
  const stamp = fmt(new Date());
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FIFA World Cup 2026 Fan Site//Matches//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(team)} · FIFA World Cup 2026`,
  ];
  matches.forEach((m, i) => {
    const start = kickoffUTC(m);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    lines.push(
      'BEGIN:VEVENT',
      `UID:wc2026-${m.date}-${i}@worldcup26`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${esc(`${m.t1} vs ${m.t2} — World Cup 2026`)}`,
      `LOCATION:${esc(`${m.venue}, ${m.city}`)}`,
      `DESCRIPTION:${esc(`Group ${m.group} · FIFA World Cup 2026 group stage`)}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${esc(`${team} play in 1 hour`)}`,
      'END:VALARM',
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadTeamICS(team) {
  const blob = new Blob([buildICS(team)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${team.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-wc2026.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
