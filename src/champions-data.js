// FIFA World Cup 2026 — champions, final and awards (tournament ended 19 July 2026).
// Sources: FIFA, Wikipedia, NBC Sports, CBS News, NPR. Match-by-match scores
// live in results-2026.js; this file holds the editorial facts around them.

export const champion = { name: 'Spain', flag: 'es', titles: 2, years: [2010, 2026], coach: 'Luis de la Fuente', captain: 'Rodri' };

export const final = {
  home: 'Spain', homeFlag: 'es', away: 'Argentina', awayFlag: 'ar',
  score: '1–0', note: 'After extra time',
  date: 'Sunday 19 July 2026',
  venue: 'MetLife Stadium, East Rutherford, New Jersey',
  attendance: '80,663',
  referee: 'Slavko Vinčić (Slovenia)',
  potm: 'Ferran Torres (Spain)',
  goals: [{ team: 'home', player: 'Ferran Torres', min: "106'" }],
  cards: [{ team: 'away', player: 'Enzo Fernández', min: "90+3'", type: 'red', note: 'second yellow' }],
  story:
    'Spain had the ball, the chances and the patience. Argentina did not register a shot in the first 90 minutes — a first in a World Cup final — while Emiliano Martínez made a final-record 11 saves to keep them alive. Down to ten men after Enzo Fernández was sent off in stoppage time, Argentina’s resistance finally broke in the 106th minute: substitute Ferran Torres turned in Nico Williams’ header from close range, and La Roja were world champions for the second time.',
};

export const podium = [
  { pos: 1, label: 'Champions', name: 'Spain', flag: 'es' },
  { pos: 2, label: 'Runners-up', name: 'Argentina', flag: 'ar' },
  { pos: 3, label: 'Third place', name: 'England', flag: 'gb-eng' },
  { pos: 4, label: 'Fourth place', name: 'France', flag: 'fr' },
];

export const awards = [
  {
    title: 'Golden Ball', what: 'Best player', icon: '🏆',
    winner: { name: 'Rodri', team: 'Spain', flag: 'es' },
    podium: [{ k: 'Silver Ball', v: 'Lionel Messi', flag: 'ar' }, { k: 'Bronze Ball', v: 'Kylian Mbappé', flag: 'fr' }],
  },
  {
    title: 'Golden Boot', what: 'Top scorer · 10 goals', icon: '👟',
    winner: { name: 'Kylian Mbappé', team: 'France', flag: 'fr' },
    podium: [{ k: 'Silver Boot', v: 'Lionel Messi · 8', flag: 'ar' }, { k: 'Bronze Boot', v: 'Jude Bellingham · 7', flag: 'gb-eng' }],
  },
  {
    title: 'Golden Glove', what: 'Best goalkeeper · 7 clean sheets', icon: '🧤',
    winner: { name: 'Unai Simón', team: 'Spain', flag: 'es' },
  },
  {
    title: 'Best Young Player', what: 'Age 21 or under', icon: '⭐',
    winner: { name: 'Pau Cubarsí', team: 'Spain', flag: 'es' },
  },
  {
    title: 'FIFA Fair Play Trophy', what: 'Best disciplinary record', icon: '🤝',
    winner: { name: 'Netherlands', team: 'Team award', flag: 'nl' },
  },
];

export const numbers = [
  { num: '104', label: 'Matches', sub: 'Most ever' },
  { num: '308', label: 'Goals', sub: 'Record · 2.96 per game' },
  { num: '6.81M', label: 'Fans in stadiums', sub: 'Record attendance' },
  { num: '65,490', label: 'Average crowd', sub: 'Per match' },
  { num: '48', label: 'Nations', sub: '12 groups of four' },
];

export const storylines = [
  { k: 'Double world champions', v: 'Spain became the first nation to hold the men’s and women’s World Cups at the same time, following their 2023 Women’s World Cup win.' },
  { k: 'Mbappé’s records', v: 'Kylian Mbappé finished with 10 goals to become the first man to win two Golden Boots, and his 22 career goals make him the World Cup’s all-time top scorer, passing Lionel Messi (21).' },
  { k: 'A goalkeeper’s final', v: 'Emiliano Martínez made 11 saves in the final — the most by any goalkeeper in a World Cup final.' },
  { k: 'Ten-goal bronze', v: 'England beat France 6–4 in Miami: the highest-scoring third-place play-off in World Cup history, with a Bukayo Saka hat-trick. It was Didier Deschamps’ last match as France coach.' },
  { k: 'Messi’s sixth World Cup', v: 'At his sixth World Cup, Lionel Messi took his tournament totals to 21 goals and a record 12 assists, winning the Silver Ball and Silver Boot.' },
  { k: 'Unbeaten champions', v: 'Spain won seven and drew one of their eight matches, conceding just once — to Belgium in the quarter-finals — all tournament.' },
];
