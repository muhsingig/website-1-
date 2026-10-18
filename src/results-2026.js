// FIFA World Cup 2026 — final results (tournament complete, 11 June – 19 July 2026).
// Snapshot of all 104 matches in the same shape the live /api/scores feed used,
// so every page renders final scores without a network call.
//  homeScore/awayScore = score after 90' (or after extra time when aet: true)
//  pens = penalty shoot-out score, home–away
// Team names follow wc-data.js.

export const results = [
  {utcDate: '2026-06-11T19:00:00Z', stage: 'GROUP_STAGE', home: 'Mexico', away: 'South Africa', homeScore: 2, awayScore: 0},
  {utcDate: '2026-06-12T02:00:00Z', stage: 'GROUP_STAGE', home: 'Korea Republic', away: 'Czechia', homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-12T19:00:00Z', stage: 'GROUP_STAGE', home: 'Canada', away: 'Bosnia and Herzegovina', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-13T01:00:00Z', stage: 'GROUP_STAGE', home: 'United States', away: 'Paraguay', homeScore: 4, awayScore: 1},
  {utcDate: '2026-06-13T19:00:00Z', stage: 'GROUP_STAGE', home: 'Qatar', away: 'Switzerland', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-13T22:00:00Z', stage: 'GROUP_STAGE', home: 'Brazil', away: 'Morocco', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-14T01:00:00Z', stage: 'GROUP_STAGE', home: 'Haiti', away: 'Scotland', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-14T04:00:00Z', stage: 'GROUP_STAGE', home: 'Australia', away: 'Türkiye', homeScore: 2, awayScore: 0},
  {utcDate: '2026-06-14T17:00:00Z', stage: 'GROUP_STAGE', home: 'Germany', away: 'Curaçao', homeScore: 7, awayScore: 1},
  {utcDate: '2026-06-14T20:00:00Z', stage: 'GROUP_STAGE', home: 'Netherlands', away: 'Japan', homeScore: 2, awayScore: 2},
  {utcDate: '2026-06-14T23:00:00Z', stage: 'GROUP_STAGE', home: "Côte d'Ivoire", away: 'Ecuador', homeScore: 1, awayScore: 0},
  {utcDate: '2026-06-15T02:00:00Z', stage: 'GROUP_STAGE', home: 'Sweden', away: 'Tunisia', homeScore: 5, awayScore: 1},
  {utcDate: '2026-06-15T16:00:00Z', stage: 'GROUP_STAGE', home: 'Spain', away: 'Cabo Verde', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-15T19:00:00Z', stage: 'GROUP_STAGE', home: 'Belgium', away: 'Egypt', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-15T22:00:00Z', stage: 'GROUP_STAGE', home: 'Saudi Arabia', away: 'Uruguay', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-16T01:00:00Z', stage: 'GROUP_STAGE', home: 'Iran', away: 'New Zealand', homeScore: 2, awayScore: 2},
  {utcDate: '2026-06-16T19:00:00Z', stage: 'GROUP_STAGE', home: 'France', away: 'Senegal', homeScore: 3, awayScore: 1},
  {utcDate: '2026-06-16T22:00:00Z', stage: 'GROUP_STAGE', home: 'Iraq', away: 'Norway', homeScore: 1, awayScore: 4},
  {utcDate: '2026-06-17T01:00:00Z', stage: 'GROUP_STAGE', home: 'Argentina', away: 'Algeria', homeScore: 3, awayScore: 0},
  {utcDate: '2026-06-17T04:00:00Z', stage: 'GROUP_STAGE', home: 'Austria', away: 'Jordan', homeScore: 3, awayScore: 1},
  {utcDate: '2026-06-17T17:00:00Z', stage: 'GROUP_STAGE', home: 'Portugal', away: 'DR Congo', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-17T20:00:00Z', stage: 'GROUP_STAGE', home: 'England', away: 'Croatia', homeScore: 4, awayScore: 2},
  {utcDate: '2026-06-17T23:00:00Z', stage: 'GROUP_STAGE', home: 'Ghana', away: 'Panama', homeScore: 1, awayScore: 0},
  {utcDate: '2026-06-18T02:00:00Z', stage: 'GROUP_STAGE', home: 'Uzbekistan', away: 'Colombia', homeScore: 1, awayScore: 3},
  {utcDate: '2026-06-18T16:00:00Z', stage: 'GROUP_STAGE', home: 'Czechia', away: 'South Africa', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-18T19:00:00Z', stage: 'GROUP_STAGE', home: 'Switzerland', away: 'Bosnia and Herzegovina', homeScore: 4, awayScore: 1},
  {utcDate: '2026-06-18T22:00:00Z', stage: 'GROUP_STAGE', home: 'Canada', away: 'Qatar', homeScore: 6, awayScore: 0},
  {utcDate: '2026-06-19T01:00:00Z', stage: 'GROUP_STAGE', home: 'Mexico', away: 'Korea Republic', homeScore: 1, awayScore: 0},
  {utcDate: '2026-06-19T19:00:00Z', stage: 'GROUP_STAGE', home: 'United States', away: 'Australia', homeScore: 2, awayScore: 0},
  {utcDate: '2026-06-19T22:00:00Z', stage: 'GROUP_STAGE', home: 'Scotland', away: 'Morocco', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-20T00:30:00Z', stage: 'GROUP_STAGE', home: 'Brazil', away: 'Haiti', homeScore: 3, awayScore: 0},
  {utcDate: '2026-06-20T03:00:00Z', stage: 'GROUP_STAGE', home: 'Türkiye', away: 'Paraguay', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-20T17:00:00Z', stage: 'GROUP_STAGE', home: 'Netherlands', away: 'Sweden', homeScore: 5, awayScore: 1},
  {utcDate: '2026-06-20T20:00:00Z', stage: 'GROUP_STAGE', home: 'Germany', away: "Côte d'Ivoire", homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-21T00:00:00Z', stage: 'GROUP_STAGE', home: 'Ecuador', away: 'Curaçao', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-21T04:00:00Z', stage: 'GROUP_STAGE', home: 'Tunisia', away: 'Japan', homeScore: 0, awayScore: 4},
  {utcDate: '2026-06-21T16:00:00Z', stage: 'GROUP_STAGE', home: 'Spain', away: 'Saudi Arabia', homeScore: 4, awayScore: 0},
  {utcDate: '2026-06-21T19:00:00Z', stage: 'GROUP_STAGE', home: 'Belgium', away: 'Iran', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-21T22:00:00Z', stage: 'GROUP_STAGE', home: 'Uruguay', away: 'Cabo Verde', homeScore: 2, awayScore: 2},
  {utcDate: '2026-06-22T01:00:00Z', stage: 'GROUP_STAGE', home: 'New Zealand', away: 'Egypt', homeScore: 1, awayScore: 3},
  {utcDate: '2026-06-22T17:00:00Z', stage: 'GROUP_STAGE', home: 'Argentina', away: 'Austria', homeScore: 2, awayScore: 0},
  {utcDate: '2026-06-22T21:00:00Z', stage: 'GROUP_STAGE', home: 'France', away: 'Iraq', homeScore: 3, awayScore: 0},
  {utcDate: '2026-06-23T00:00:00Z', stage: 'GROUP_STAGE', home: 'Norway', away: 'Senegal', homeScore: 3, awayScore: 2},
  {utcDate: '2026-06-23T03:00:00Z', stage: 'GROUP_STAGE', home: 'Jordan', away: 'Algeria', homeScore: 1, awayScore: 2},
  {utcDate: '2026-06-23T17:00:00Z', stage: 'GROUP_STAGE', home: 'Portugal', away: 'Uzbekistan', homeScore: 5, awayScore: 0},
  {utcDate: '2026-06-23T20:00:00Z', stage: 'GROUP_STAGE', home: 'England', away: 'Ghana', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-23T23:00:00Z', stage: 'GROUP_STAGE', home: 'Panama', away: 'Croatia', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-24T02:00:00Z', stage: 'GROUP_STAGE', home: 'Colombia', away: 'DR Congo', homeScore: 1, awayScore: 0},
  {utcDate: '2026-06-24T19:00:00Z', stage: 'GROUP_STAGE', home: 'Switzerland', away: 'Canada', homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-24T19:00:00Z', stage: 'GROUP_STAGE', home: 'Bosnia and Herzegovina', away: 'Qatar', homeScore: 3, awayScore: 1},
  {utcDate: '2026-06-24T22:00:00Z', stage: 'GROUP_STAGE', home: 'Morocco', away: 'Haiti', homeScore: 4, awayScore: 2},
  {utcDate: '2026-06-24T22:00:00Z', stage: 'GROUP_STAGE', home: 'Scotland', away: 'Brazil', homeScore: 0, awayScore: 3},
  {utcDate: '2026-06-25T01:00:00Z', stage: 'GROUP_STAGE', home: 'Czechia', away: 'Mexico', homeScore: 0, awayScore: 3},
  {utcDate: '2026-06-25T01:00:00Z', stage: 'GROUP_STAGE', home: 'South Africa', away: 'Korea Republic', homeScore: 1, awayScore: 0},
  {utcDate: '2026-06-25T20:00:00Z', stage: 'GROUP_STAGE', home: 'Ecuador', away: 'Germany', homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-25T20:00:00Z', stage: 'GROUP_STAGE', home: 'Curaçao', away: "Côte d'Ivoire", homeScore: 0, awayScore: 2},
  {utcDate: '2026-06-25T23:00:00Z', stage: 'GROUP_STAGE', home: 'Tunisia', away: 'Netherlands', homeScore: 1, awayScore: 3},
  {utcDate: '2026-06-25T23:00:00Z', stage: 'GROUP_STAGE', home: 'Japan', away: 'Sweden', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-26T02:00:00Z', stage: 'GROUP_STAGE', home: 'Türkiye', away: 'United States', homeScore: 3, awayScore: 2},
  {utcDate: '2026-06-26T02:00:00Z', stage: 'GROUP_STAGE', home: 'Paraguay', away: 'Australia', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-26T19:00:00Z', stage: 'GROUP_STAGE', home: 'Norway', away: 'France', homeScore: 1, awayScore: 4},
  {utcDate: '2026-06-26T19:00:00Z', stage: 'GROUP_STAGE', home: 'Senegal', away: 'Iraq', homeScore: 5, awayScore: 0},
  {utcDate: '2026-06-27T00:00:00Z', stage: 'GROUP_STAGE', home: 'Uruguay', away: 'Spain', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-27T00:00:00Z', stage: 'GROUP_STAGE', home: 'Cabo Verde', away: 'Saudi Arabia', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-27T03:00:00Z', stage: 'GROUP_STAGE', home: 'New Zealand', away: 'Belgium', homeScore: 1, awayScore: 5},
  {utcDate: '2026-06-27T03:00:00Z', stage: 'GROUP_STAGE', home: 'Egypt', away: 'Iran', homeScore: 1, awayScore: 1},
  {utcDate: '2026-06-27T21:00:00Z', stage: 'GROUP_STAGE', home: 'Panama', away: 'England', homeScore: 0, awayScore: 2},
  {utcDate: '2026-06-27T21:00:00Z', stage: 'GROUP_STAGE', home: 'Croatia', away: 'Ghana', homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-27T23:30:00Z', stage: 'GROUP_STAGE', home: 'Colombia', away: 'Portugal', homeScore: 0, awayScore: 0},
  {utcDate: '2026-06-27T23:30:00Z', stage: 'GROUP_STAGE', home: 'DR Congo', away: 'Uzbekistan', homeScore: 3, awayScore: 1},
  {utcDate: '2026-06-28T02:00:00Z', stage: 'GROUP_STAGE', home: 'Jordan', away: 'Argentina', homeScore: 1, awayScore: 3},
  {utcDate: '2026-06-28T02:00:00Z', stage: 'GROUP_STAGE', home: 'Algeria', away: 'Austria', homeScore: 3, awayScore: 3},
  {utcDate: '2026-06-28T19:00:00Z', stage: 'LAST_32', home: 'South Africa', away: 'Canada', homeScore: 0, awayScore: 1},
  {utcDate: '2026-06-29T17:00:00Z', stage: 'LAST_32', home: 'Brazil', away: 'Japan', homeScore: 2, awayScore: 1},
  {utcDate: '2026-06-29T20:30:00Z', stage: 'LAST_32', home: 'Germany', away: 'Paraguay', homeScore: 1, awayScore: 1, aet: true, pens: '3–4'},
  {utcDate: '2026-06-30T01:00:00Z', stage: 'LAST_32', home: 'Netherlands', away: 'Morocco', homeScore: 1, awayScore: 1, aet: true, pens: '2–3'},
  {utcDate: '2026-06-30T17:00:00Z', stage: 'LAST_32', home: "Côte d'Ivoire", away: 'Norway', homeScore: 1, awayScore: 2},
  {utcDate: '2026-06-30T21:00:00Z', stage: 'LAST_32', home: 'France', away: 'Sweden', homeScore: 3, awayScore: 0},
  {utcDate: '2026-07-01T02:00:00Z', stage: 'LAST_32', home: 'Mexico', away: 'Ecuador', homeScore: 2, awayScore: 0},
  {utcDate: '2026-07-01T16:00:00Z', stage: 'LAST_32', home: 'England', away: 'DR Congo', homeScore: 2, awayScore: 1},
  {utcDate: '2026-07-01T20:00:00Z', stage: 'LAST_32', home: 'Belgium', away: 'Senegal', homeScore: 3, awayScore: 2, aet: true},
  {utcDate: '2026-07-02T00:00:00Z', stage: 'LAST_32', home: 'United States', away: 'Bosnia and Herzegovina', homeScore: 2, awayScore: 0},
  {utcDate: '2026-07-02T19:00:00Z', stage: 'LAST_32', home: 'Spain', away: 'Austria', homeScore: 3, awayScore: 0},
  {utcDate: '2026-07-02T23:00:00Z', stage: 'LAST_32', home: 'Portugal', away: 'Croatia', homeScore: 2, awayScore: 1},
  {utcDate: '2026-07-03T03:00:00Z', stage: 'LAST_32', home: 'Switzerland', away: 'Algeria', homeScore: 2, awayScore: 0},
  {utcDate: '2026-07-03T18:00:00Z', stage: 'LAST_32', home: 'Australia', away: 'Egypt', homeScore: 1, awayScore: 1, aet: true, pens: '2–4'},
  {utcDate: '2026-07-03T22:00:00Z', stage: 'LAST_32', home: 'Argentina', away: 'Cabo Verde', homeScore: 3, awayScore: 2, aet: true},
  {utcDate: '2026-07-04T01:30:00Z', stage: 'LAST_32', home: 'Colombia', away: 'Ghana', homeScore: 1, awayScore: 0},
  {utcDate: '2026-07-04T17:00:00Z', stage: 'LAST_16', home: 'Canada', away: 'Morocco', homeScore: 0, awayScore: 3},
  {utcDate: '2026-07-04T21:00:00Z', stage: 'LAST_16', home: 'Paraguay', away: 'France', homeScore: 0, awayScore: 1},
  {utcDate: '2026-07-05T20:00:00Z', stage: 'LAST_16', home: 'Brazil', away: 'Norway', homeScore: 1, awayScore: 2},
  {utcDate: '2026-07-06T01:00:00Z', stage: 'LAST_16', home: 'Mexico', away: 'England', homeScore: 2, awayScore: 3},
  {utcDate: '2026-07-06T19:00:00Z', stage: 'LAST_16', home: 'Portugal', away: 'Spain', homeScore: 0, awayScore: 1},
  {utcDate: '2026-07-07T00:00:00Z', stage: 'LAST_16', home: 'United States', away: 'Belgium', homeScore: 1, awayScore: 4},
  {utcDate: '2026-07-07T16:00:00Z', stage: 'LAST_16', home: 'Argentina', away: 'Egypt', homeScore: 3, awayScore: 2},
  {utcDate: '2026-07-07T20:00:00Z', stage: 'LAST_16', home: 'Switzerland', away: 'Colombia', homeScore: 0, awayScore: 0, aet: true, pens: '4–3'},
  {utcDate: '2026-07-09T20:00:00Z', stage: 'QUARTER_FINALS', home: 'France', away: 'Morocco', homeScore: 2, awayScore: 0},
  {utcDate: '2026-07-10T19:00:00Z', stage: 'QUARTER_FINALS', home: 'Spain', away: 'Belgium', homeScore: 2, awayScore: 1},
  {utcDate: '2026-07-11T21:00:00Z', stage: 'QUARTER_FINALS', home: 'Norway', away: 'England', homeScore: 1, awayScore: 2},
  {utcDate: '2026-07-12T01:00:00Z', stage: 'QUARTER_FINALS', home: 'Argentina', away: 'Switzerland', homeScore: 3, awayScore: 1, aet: true},
  {utcDate: '2026-07-14T19:00:00Z', stage: 'SEMI_FINALS', home: 'France', away: 'Spain', homeScore: 0, awayScore: 2},
  {utcDate: '2026-07-15T19:00:00Z', stage: 'SEMI_FINALS', home: 'England', away: 'Argentina', homeScore: 1, awayScore: 2},
  {utcDate: '2026-07-18T21:00:00Z', stage: 'THIRD_PLACE', home: 'France', away: 'England', homeScore: 4, awayScore: 6},
  {utcDate: '2026-07-19T19:00:00Z', stage: 'FINAL', home: 'Spain', away: 'Argentina', homeScore: 1, awayScore: 0, aet: true},
].map((m) => ({ ...m, status: 'FINISHED' }));

// Final Golden Boot table (goals, assists).
export const scorers = [
  {name: 'Kylian Mbappé', team: 'France', goals: 10, assists: 4},
  {name: 'Lionel Messi', team: 'Argentina', goals: 8, assists: 4},
  {name: 'Erling Haaland', team: 'Norway', goals: 7, assists: 0},
  {name: 'Jude Bellingham', team: 'England', goals: 7, assists: 1},
  {name: 'Harry Kane', team: 'England', goals: 6, assists: 1},
  {name: 'Ousmane Dembélé', team: 'France', goals: 6, assists: 2},
  {name: 'Mikel Oyarzabal', team: 'Spain', goals: 5, assists: 1},
  {name: 'Julián Quiñones', team: 'Mexico', goals: 4, assists: 1},
  {name: 'Vinicius Junior', team: 'Brazil', goals: 4, assists: 1},
  {name: 'Ismaïla Sarr', team: 'Senegal', goals: 4, assists: 1},
  {name: 'Raúl Jiménez', team: 'Mexico', goals: 3, assists: 0},
  {name: 'Folarin Balogun', team: 'United States', goals: 3, assists: 0},
  {name: 'Ismael Saibari', team: 'Morocco', goals: 3, assists: 0},
  {name: 'Kai Havertz', team: 'Germany', goals: 3, assists: 0},
  {name: 'Deniz Undav', team: 'Germany', goals: 3, assists: 2},
];

export const ROUND_LABEL = {
  GROUP_STAGE: 'Group stage',
  LAST_32: 'Round of 32',
  LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-final',
  SEMI_FINALS: 'Semi-final',
  THIRD_PLACE: 'Third-place play-off',
  FINAL: 'Final',
};

// Did the home side win (after extra time / penalties where needed)?
export function homeWon(m) {
  if (m.pens) {
    const [h, a] = m.pens.split('–').map(Number);
    return h > a;
  }
  return m.homeScore > m.awayScore;
}

// Score string from one team's point of view, e.g. "1–1 (4–3 pens)".
export function scoreFor(m, team) {
  const flip = m.away === team;
  const [gf, ga] = flip ? [m.awayScore, m.homeScore] : [m.homeScore, m.awayScore];
  let extra = '';
  if (m.pens) {
    const [h, a] = m.pens.split('–');
    extra = ` (${flip ? `${a}–${h}` : `${h}–${a}`} pens)`;
  } else if (m.aet) extra = ' (a.e.t.)';
  return `${gf}–${ga}${extra}`;
}

// Every match a team played, oldest first, plus how far they went.
export function teamJourney(team) {
  const matches = results.filter((m) => m.home === team || m.away === team);
  const last = matches[matches.length - 1];
  let finish = 'Group stage';
  if (last && last.stage !== 'GROUP_STAGE') {
    const won = homeWon(last) === (last.home === team);
    if (last.stage === 'FINAL') finish = won ? 'Champions' : 'Runners-up';
    else if (last.stage === 'THIRD_PLACE') finish = won ? 'Third place' : 'Fourth place';
    else finish = ROUND_LABEL[last.stage].replace(/-final$/, '-finals');
  }
  return { matches, finish };
}
