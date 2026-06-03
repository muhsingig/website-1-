// Pure standings computation — no DOM, no CSS — so it can be unit-tested.
// Folds live/finished matches into group tables and sorts by the usual rules.
import { normTeam } from './teamkey.js';

export function computeStandings(groups, matches) {
  const byKey = new Map(); // normalized team name -> stat object
  const model = groups.map((g) => ({
    id: g.id,
    live: false,
    teams: g.teams.map((t, seed) => {
      const stat = {
        name: t.name, flag: t.flag, seed,
        mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0,
        results: [], // finished only, for form dots
      };
      byKey.set(normTeam(t.name), stat);
      return stat;
    }),
  }));
  const groupOf = new Map(model.flatMap((g) => g.teams.map((s) => [normTeam(s.name), g])));

  for (const m of matches || []) {
    const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    const done = m.status === 'FINISHED';
    if (!live && !done) continue;
    if (m.homeScore == null || m.awayScore == null) continue;

    const home = byKey.get(normTeam(m.home));
    const away = byKey.get(normTeam(m.away));
    if (!home || !away) continue; // not in our group stage

    const hs = m.homeScore;
    const as = m.awayScore;
    home.mp++; away.mp++;
    home.gf += hs; home.ga += as;
    away.gf += as; away.ga += hs;

    let hOut, aOut;
    if (hs > as) { home.pts += 3; hOut = 'w'; aOut = 'l'; }
    else if (hs < as) { away.pts += 3; hOut = 'l'; aOut = 'w'; }
    else { home.pts++; away.pts++; hOut = 'd'; aOut = 'd'; }
    home.w += hOut === 'w'; home.d += hOut === 'd'; home.l += hOut === 'l';
    away.w += aOut === 'w'; away.d += aOut === 'd'; away.l += aOut === 'l';

    if (done) {
      home.results.push({ date: m.utcDate, o: hOut });
      away.results.push({ date: m.utcDate, o: aOut });
    }
    if (live) {
      const g = groupOf.get(normTeam(m.home));
      if (g) g.live = true;
    }
  }

  for (const g of model) {
    g.teams.forEach((s) => s.results.sort((a, b) => String(a.date).localeCompare(String(b.date))));
    g.teams.sort((a, b) =>
      b.pts - a.pts ||
      (b.gf - b.ga) - (a.gf - a.ga) ||
      b.gf - a.gf ||
      a.seed - b.seed
    );
  }
  return model;
}
