// FIFA World Cup 2026 — Final Draw (held 5 Dec 2025, Washington D.C.)
// flag = flagcdn ISO 3166-1 alpha-2 code (gb-eng / gb-sct for home nations)
// color = representative national-team colour for the Teams page

export const groups = [
  {
    id: 'A',
    teams: [
      { name: 'Mexico', flag: 'mx', color: '#006847' },
      { name: 'South Africa', flag: 'za', color: '#007749' },
      { name: 'Korea Republic', flag: 'kr', color: '#c8102e' },
      { name: 'Czechia', flag: 'cz', color: '#11457e' },
    ],
  },
  {
    id: 'B',
    teams: [
      { name: 'Canada', flag: 'ca', color: '#d52b1e' },
      { name: 'Bosnia and Herzegovina', flag: 'ba', color: '#002395' },
      { name: 'Qatar', flag: 'qa', color: '#8a1538' },
      { name: 'Switzerland', flag: 'ch', color: '#d52b1e' },
    ],
  },
  {
    id: 'C',
    teams: [
      { name: 'Brazil', flag: 'br', color: '#009c3b' },
      { name: 'Morocco', flag: 'ma', color: '#c1272d' },
      { name: 'Haiti', flag: 'ht', color: '#00209f' },
      { name: 'Scotland', flag: 'gb-sct', color: '#0065bd' },
    ],
  },
  {
    id: 'D',
    teams: [
      { name: 'United States', flag: 'us', color: '#002868' },
      { name: 'Paraguay', flag: 'py', color: '#d52b1e' },
      { name: 'Australia', flag: 'au', color: '#00843d' },
      { name: 'Türkiye', flag: 'tr', color: '#e30a17' },
    ],
  },
  {
    id: 'E',
    teams: [
      { name: 'Germany', flag: 'de', color: '#1a1a1a' },
      { name: 'Curaçao', flag: 'cw', color: '#002b7f' },
      { name: "Côte d'Ivoire", flag: 'ci', color: '#ff8200' },
      { name: 'Ecuador', flag: 'ec', color: '#ffd100' },
    ],
  },
  {
    id: 'F',
    teams: [
      { name: 'Netherlands', flag: 'nl', color: '#ec6300' },
      { name: 'Japan', flag: 'jp', color: '#00008b' },
      { name: 'Sweden', flag: 'se', color: '#fecc00' },
      { name: 'Tunisia', flag: 'tn', color: '#e70013' },
    ],
  },
  {
    id: 'G',
    teams: [
      { name: 'Belgium', flag: 'be', color: '#ed2939' },
      { name: 'Egypt', flag: 'eg', color: '#ce1126' },
      { name: 'Iran', flag: 'ir', color: '#239f40' },
      { name: 'New Zealand', flag: 'nz', color: '#1a1a1a' },
    ],
  },
  {
    id: 'H',
    teams: [
      { name: 'Spain', flag: 'es', color: '#c60b1e' },
      { name: 'Cabo Verde', flag: 'cv', color: '#003893' },
      { name: 'Saudi Arabia', flag: 'sa', color: '#006c35' },
      { name: 'Uruguay', flag: 'uy', color: '#4c9dce' },
    ],
  },
  {
    id: 'I',
    teams: [
      { name: 'France', flag: 'fr', color: '#002654' },
      { name: 'Senegal', flag: 'sn', color: '#00853f' },
      { name: 'Iraq', flag: 'iq', color: '#007a33' },
      { name: 'Norway', flag: 'no', color: '#ba0c2f' },
    ],
  },
  {
    id: 'J',
    teams: [
      { name: 'Argentina', flag: 'ar', color: '#6cace4' },
      { name: 'Algeria', flag: 'dz', color: '#006233' },
      { name: 'Austria', flag: 'at', color: '#ed2939' },
      { name: 'Jordan', flag: 'jo', color: '#007a3d' },
    ],
  },
  {
    id: 'K',
    teams: [
      { name: 'Portugal', flag: 'pt', color: '#da291c' },
      { name: 'DR Congo', flag: 'cd', color: '#007fff' },
      { name: 'Uzbekistan', flag: 'uz', color: '#0099b5' },
      { name: 'Colombia', flag: 'co', color: '#fcd116' },
    ],
  },
  {
    id: 'L',
    teams: [
      { name: 'England', flag: 'gb-eng', color: '#ce1124' },
      { name: 'Croatia', flag: 'hr', color: '#c8102e' },
      { name: 'Ghana', flag: 'gh', color: '#006b3f' },
      { name: 'Panama', flag: 'pa', color: '#da121a' },
    ],
  },
];

export function flagUrl(code, size = 40) {
  return `https://flagcdn.com/w${size}/${code}.png`;
}

// name -> flag code lookup, built from the groups above
export const flagByName = Object.fromEntries(
  groups.flatMap((g) => g.teams.map((t) => [t.name, t.flag]))
);

// Per-team meta for the Teams page.
//  rank = FIFA Men's World Ranking (recent snapshot; top-20 are exact)
//  apps = FIFA World Cup participations through 2022 (0 = 2026 debut)
//  display = optional shorter display name
export const teamMeta = {
  Mexico: { rank: 15, apps: 17 },
  'South Africa': { rank: 56, apps: 3 },
  'Korea Republic': { rank: 23, apps: 11 },
  Czechia: { rank: 43, apps: 9 },
  Canada: { rank: 30, apps: 2 },
  'Bosnia and Herzegovina': { rank: 74, apps: 1 },
  Qatar: { rank: 52, apps: 1 },
  Switzerland: { rank: 19, apps: 12 },
  Brazil: { rank: 6, apps: 22 },
  Morocco: { rank: 8, apps: 6 },
  Haiti: { rank: 83, apps: 1 },
  Scotland: { rank: 37, apps: 8 },
  'United States': { rank: 16, apps: 11, display: 'USA' },
  Paraguay: { rank: 39, apps: 8 },
  Australia: { rank: 27, apps: 6 },
  'Türkiye': { rank: 26, apps: 2 },
  Germany: { rank: 10, apps: 20 },
  'Curaçao': { rank: 82, apps: 0 },
  "Côte d'Ivoire": { rank: 41, apps: 3 },
  Ecuador: { rank: 22, apps: 4 },
  Netherlands: { rank: 7, apps: 11 },
  Japan: { rank: 18, apps: 7 },
  Sweden: { rank: 42, apps: 12 },
  Tunisia: { rank: 40, apps: 6 },
  Belgium: { rank: 9, apps: 14 },
  Egypt: { rank: 33, apps: 3 },
  Iran: { rank: 21, apps: 6 },
  'New Zealand': { rank: 89, apps: 2 },
  Spain: { rank: 2, apps: 16 },
  'Cabo Verde': { rank: 70, apps: 0 },
  'Saudi Arabia': { rank: 58, apps: 6 },
  Uruguay: { rank: 17, apps: 14 },
  France: { rank: 1, apps: 16 },
  Senegal: { rank: 14, apps: 3 },
  Iraq: { rank: 59, apps: 1 },
  Norway: { rank: 25, apps: 3 },
  Argentina: { rank: 3, apps: 18 },
  Algeria: { rank: 28, apps: 4 },
  Austria: { rank: 24, apps: 7 },
  Jordan: { rank: 62, apps: 0 },
  Portugal: { rank: 5, apps: 8 },
  'DR Congo': { rank: 60, apps: 1 },
  Uzbekistan: { rank: 57, apps: 0 },
  Colombia: { rank: 13, apps: 6 },
  England: { rank: 4, apps: 16 },
  Croatia: { rank: 11, apps: 6 },
  Ghana: { rank: 73, apps: 4 },
  Panama: { rank: 31, apps: 1 },
};

// FIFA World Cup 2026 group-stage schedule (all 72 matches).
// Kickoff times in U.S. Eastern Time (ET). Times after midnight ET shown on the listed date.
export const fixtures = [
  { date: '2026-06-11', group: 'A', t1: 'Mexico', t2: 'South Africa', venue: 'Estadio Azteca', city: 'Mexico City', time: '15:00 ET' },
  { date: '2026-06-11', group: 'A', t1: 'Korea Republic', t2: 'Czechia', venue: 'Estadio Akron', city: 'Guadalajara', time: '22:00 ET' },

  { date: '2026-06-12', group: 'B', t1: 'Canada', t2: 'Bosnia and Herzegovina', venue: 'BMO Field', city: 'Toronto', time: '15:00 ET' },
  { date: '2026-06-12', group: 'D', t1: 'United States', t2: 'Paraguay', venue: 'SoFi Stadium', city: 'Los Angeles', time: '21:00 ET' },

  { date: '2026-06-13', group: 'B', t1: 'Qatar', t2: 'Switzerland', venue: "Levi's Stadium", city: 'San Francisco Bay Area', time: '15:00 ET' },
  { date: '2026-06-13', group: 'C', t1: 'Brazil', t2: 'Morocco', venue: 'MetLife Stadium', city: 'New York / New Jersey', time: '18:00 ET' },
  { date: '2026-06-13', group: 'C', t1: 'Haiti', t2: 'Scotland', venue: 'Gillette Stadium', city: 'Boston', time: '21:00 ET' },
  { date: '2026-06-13', group: 'D', t1: 'Australia', t2: 'Türkiye', venue: 'BC Place', city: 'Vancouver', time: '21:00 ET' },

  { date: '2026-06-14', group: 'E', t1: 'Germany', t2: 'Curaçao', venue: 'NRG Stadium', city: 'Houston', time: '13:00 ET' },
  { date: '2026-06-14', group: 'F', t1: 'Netherlands', t2: 'Japan', venue: 'AT&T Stadium', city: 'Dallas', time: '16:00 ET' },
  { date: '2026-06-14', group: 'E', t1: "Côte d'Ivoire", t2: 'Ecuador', venue: 'Lincoln Financial Field', city: 'Philadelphia', time: '19:00 ET' },
  { date: '2026-06-14', group: 'F', t1: 'Sweden', t2: 'Tunisia', venue: 'Estadio BBVA', city: 'Monterrey', time: '22:00 ET' },

  { date: '2026-06-15', group: 'H', t1: 'Spain', t2: 'Cabo Verde', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', time: '12:00 ET' },
  { date: '2026-06-15', group: 'G', t1: 'Belgium', t2: 'Egypt', venue: 'BC Place', city: 'Vancouver', time: '15:00 ET' },
  { date: '2026-06-15', group: 'H', t1: 'Saudi Arabia', t2: 'Uruguay', venue: 'Hard Rock Stadium', city: 'Miami', time: '18:00 ET' },
  { date: '2026-06-15', group: 'G', t1: 'Iran', t2: 'New Zealand', venue: 'SoFi Stadium', city: 'Los Angeles', time: '21:00 ET' },

  { date: '2026-06-16', group: 'I', t1: 'France', t2: 'Senegal', venue: 'MetLife Stadium', city: 'New York / New Jersey', time: '15:00 ET' },
  { date: '2026-06-16', group: 'I', t1: 'Iraq', t2: 'Norway', venue: 'Gillette Stadium', city: 'Boston', time: '18:00 ET' },
  { date: '2026-06-16', group: 'J', t1: 'Argentina', t2: 'Algeria', venue: 'Arrowhead Stadium', city: 'Kansas City', time: '21:00 ET' },
  { date: '2026-06-16', group: 'J', t1: 'Austria', t2: 'Jordan', venue: "Levi's Stadium", city: 'San Francisco Bay Area', time: '00:00 ET' },

  { date: '2026-06-17', group: 'K', t1: 'Portugal', t2: 'DR Congo', venue: 'NRG Stadium', city: 'Houston', time: '13:00 ET' },
  { date: '2026-06-17', group: 'L', t1: 'England', t2: 'Croatia', venue: 'AT&T Stadium', city: 'Dallas', time: '16:00 ET' },
  { date: '2026-06-17', group: 'L', t1: 'Ghana', t2: 'Panama', venue: 'BMO Field', city: 'Toronto', time: '19:00 ET' },
  { date: '2026-06-17', group: 'K', t1: 'Uzbekistan', t2: 'Colombia', venue: 'Estadio Azteca', city: 'Mexico City', time: '22:00 ET' },

  { date: '2026-06-18', group: 'A', t1: 'Czechia', t2: 'South Africa', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', time: '12:00 ET' },
  { date: '2026-06-18', group: 'B', t1: 'Switzerland', t2: 'Bosnia and Herzegovina', venue: 'SoFi Stadium', city: 'Los Angeles', time: '15:00 ET' },
  { date: '2026-06-18', group: 'B', t1: 'Canada', t2: 'Qatar', venue: 'BC Place', city: 'Vancouver', time: '18:00 ET' },
  { date: '2026-06-18', group: 'A', t1: 'Mexico', t2: 'Korea Republic', venue: 'Estadio Akron', city: 'Guadalajara', time: '21:00 ET' },

  { date: '2026-06-19', group: 'D', t1: 'United States', t2: 'Australia', venue: 'Lumen Field', city: 'Seattle', time: '15:00 ET' },
  { date: '2026-06-19', group: 'C', t1: 'Scotland', t2: 'Morocco', venue: 'Gillette Stadium', city: 'Boston', time: '18:00 ET' },
  { date: '2026-06-19', group: 'C', t1: 'Brazil', t2: 'Haiti', venue: 'Lincoln Financial Field', city: 'Philadelphia', time: '21:00 ET' },
  { date: '2026-06-19', group: 'D', t1: 'Türkiye', t2: 'Paraguay', venue: "Levi's Stadium", city: 'San Francisco Bay Area', time: '00:00 ET' },

  { date: '2026-06-20', group: 'F', t1: 'Netherlands', t2: 'Sweden', venue: 'NRG Stadium', city: 'Houston', time: '13:00 ET' },
  { date: '2026-06-20', group: 'E', t1: 'Germany', t2: "Côte d'Ivoire", venue: 'BMO Field', city: 'Toronto', time: '16:00 ET' },
  { date: '2026-06-20', group: 'E', t1: 'Ecuador', t2: 'Curaçao', venue: 'Arrowhead Stadium', city: 'Kansas City', time: '20:00 ET' },
  { date: '2026-06-20', group: 'F', t1: 'Tunisia', t2: 'Japan', venue: 'Estadio BBVA', city: 'Monterrey', time: '00:00 ET' },

  { date: '2026-06-21', group: 'H', t1: 'Spain', t2: 'Saudi Arabia', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', time: '12:00 ET' },
  { date: '2026-06-21', group: 'G', t1: 'Belgium', t2: 'Iran', venue: 'SoFi Stadium', city: 'Los Angeles', time: '15:00 ET' },
  { date: '2026-06-21', group: 'H', t1: 'Uruguay', t2: 'Cabo Verde', venue: 'Hard Rock Stadium', city: 'Miami', time: '18:00 ET' },
  { date: '2026-06-21', group: 'G', t1: 'New Zealand', t2: 'Egypt', venue: 'BC Place', city: 'Vancouver', time: '21:00 ET' },

  { date: '2026-06-22', group: 'J', t1: 'Argentina', t2: 'Austria', venue: 'AT&T Stadium', city: 'Dallas', time: '13:00 ET' },
  { date: '2026-06-22', group: 'I', t1: 'France', t2: 'Iraq', venue: 'Lincoln Financial Field', city: 'Philadelphia', time: '17:00 ET' },
  { date: '2026-06-22', group: 'I', t1: 'Norway', t2: 'Senegal', venue: 'MetLife Stadium', city: 'New York / New Jersey', time: '20:00 ET' },
  { date: '2026-06-22', group: 'J', t1: 'Jordan', t2: 'Algeria', venue: "Levi's Stadium", city: 'San Francisco Bay Area', time: '23:00 ET' },

  { date: '2026-06-23', group: 'K', t1: 'Portugal', t2: 'Uzbekistan', venue: 'NRG Stadium', city: 'Houston', time: '13:00 ET' },
  { date: '2026-06-23', group: 'L', t1: 'England', t2: 'Ghana', venue: 'Gillette Stadium', city: 'Boston', time: '16:00 ET' },
  { date: '2026-06-23', group: 'L', t1: 'Panama', t2: 'Croatia', venue: 'BMO Field', city: 'Toronto', time: '19:00 ET' },
  { date: '2026-06-23', group: 'K', t1: 'Colombia', t2: 'DR Congo', venue: 'Estadio Akron', city: 'Guadalajara', time: '22:00 ET' },

  { date: '2026-06-24', group: 'B', t1: 'Switzerland', t2: 'Canada', venue: 'BC Place', city: 'Vancouver', time: '15:00 ET' },
  { date: '2026-06-24', group: 'B', t1: 'Bosnia and Herzegovina', t2: 'Qatar', venue: 'Lumen Field', city: 'Seattle', time: '15:00 ET' },
  { date: '2026-06-24', group: 'C', t1: 'Scotland', t2: 'Brazil', venue: 'Hard Rock Stadium', city: 'Miami', time: '18:00 ET' },
  { date: '2026-06-24', group: 'C', t1: 'Morocco', t2: 'Haiti', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', time: '18:00 ET' },
  { date: '2026-06-24', group: 'A', t1: 'Czechia', t2: 'Mexico', venue: 'Estadio Azteca', city: 'Mexico City', time: '21:00 ET' },
  { date: '2026-06-24', group: 'A', t1: 'South Africa', t2: 'Korea Republic', venue: 'Estadio BBVA', city: 'Monterrey', time: '21:00 ET' },

  { date: '2026-06-25', group: 'E', t1: 'Ecuador', t2: 'Germany', venue: 'MetLife Stadium', city: 'New York / New Jersey', time: '16:00 ET' },
  { date: '2026-06-25', group: 'E', t1: 'Curaçao', t2: "Côte d'Ivoire", venue: 'Lincoln Financial Field', city: 'Philadelphia', time: '16:00 ET' },
  { date: '2026-06-25', group: 'F', t1: 'Japan', t2: 'Sweden', venue: 'AT&T Stadium', city: 'Dallas', time: '19:00 ET' },
  { date: '2026-06-25', group: 'F', t1: 'Tunisia', t2: 'Netherlands', venue: 'Arrowhead Stadium', city: 'Kansas City', time: '19:00 ET' },
  { date: '2026-06-25', group: 'D', t1: 'Türkiye', t2: 'United States', venue: 'SoFi Stadium', city: 'Los Angeles', time: '22:00 ET' },
  { date: '2026-06-25', group: 'D', t1: 'Paraguay', t2: 'Australia', venue: "Levi's Stadium", city: 'San Francisco Bay Area', time: '22:00 ET' },

  { date: '2026-06-26', group: 'I', t1: 'Norway', t2: 'France', venue: 'Gillette Stadium', city: 'Boston', time: '15:00 ET' },
  { date: '2026-06-26', group: 'I', t1: 'Senegal', t2: 'Iraq', venue: 'BMO Field', city: 'Toronto', time: '15:00 ET' },
  { date: '2026-06-26', group: 'H', t1: 'Cabo Verde', t2: 'Saudi Arabia', venue: 'NRG Stadium', city: 'Houston', time: '20:00 ET' },
  { date: '2026-06-26', group: 'H', t1: 'Uruguay', t2: 'Spain', venue: 'Estadio Akron', city: 'Guadalajara', time: '20:00 ET' },
  { date: '2026-06-26', group: 'G', t1: 'Egypt', t2: 'Iran', venue: 'Lumen Field', city: 'Seattle', time: '23:00 ET' },
  { date: '2026-06-26', group: 'G', t1: 'New Zealand', t2: 'Belgium', venue: 'BC Place', city: 'Vancouver', time: '23:00 ET' },

  { date: '2026-06-27', group: 'L', t1: 'Panama', t2: 'England', venue: 'MetLife Stadium', city: 'New York / New Jersey', time: '17:00 ET' },
  { date: '2026-06-27', group: 'L', t1: 'Croatia', t2: 'Ghana', venue: 'Lincoln Financial Field', city: 'Philadelphia', time: '17:00 ET' },
  { date: '2026-06-27', group: 'K', t1: 'Colombia', t2: 'Portugal', venue: 'Hard Rock Stadium', city: 'Miami', time: '19:30 ET' },
  { date: '2026-06-27', group: 'K', t1: 'DR Congo', t2: 'Uzbekistan', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', time: '19:30 ET' },
  { date: '2026-06-27', group: 'J', t1: 'Algeria', t2: 'Austria', venue: 'Arrowhead Stadium', city: 'Kansas City', time: '22:00 ET' },
  { date: '2026-06-27', group: 'J', t1: 'Jordan', t2: 'Argentina', venue: 'AT&T Stadium', city: 'Dallas', time: '22:00 ET' },
];

// ---------------------------------------------------------------------------
// Knockout stage (matches 73–104). Slots stay as placeholders until the group
// positions are decided. Source: official FIFA 2026 knockout bracket.
// ---------------------------------------------------------------------------
export const knockout = [
  {
    round: 'Round of 32',
    matches: [
      { n: 73, date: '2026-06-28', t1: 'Runners-up A', t2: 'Runners-up B', venue: 'SoFi Stadium', city: 'Los Angeles' },
      { n: 74, date: '2026-06-29', t1: 'Winners E', t2: '3rd A/B/C/D/F', venue: 'Gillette Stadium', city: 'Boston' },
      { n: 75, date: '2026-06-29', t1: 'Winners F', t2: 'Runners-up C', venue: 'Estadio BBVA', city: 'Monterrey' },
      { n: 76, date: '2026-06-29', t1: 'Winners C', t2: 'Runners-up F', venue: 'NRG Stadium', city: 'Houston' },
      { n: 77, date: '2026-06-30', t1: 'Winners I', t2: '3rd C/D/F/G/H', venue: 'MetLife Stadium', city: 'New York / New Jersey' },
      { n: 78, date: '2026-06-30', t1: 'Runners-up E', t2: 'Runners-up I', venue: 'AT&T Stadium', city: 'Dallas' },
      { n: 79, date: '2026-06-30', t1: 'Winners A', t2: '3rd C/E/F/H/I', venue: 'Estadio Azteca', city: 'Mexico City' },
      { n: 80, date: '2026-07-01', t1: 'Winners L', t2: '3rd E/H/I/J/K', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
      { n: 81, date: '2026-07-01', t1: 'Winners D', t2: '3rd B/E/F/I/J', venue: "Levi's Stadium", city: 'San Francisco Bay Area' },
      { n: 82, date: '2026-07-01', t1: 'Winners G', t2: '3rd A/E/H/I/J', venue: 'Lumen Field', city: 'Seattle' },
      { n: 83, date: '2026-07-02', t1: 'Runners-up K', t2: 'Runners-up L', venue: 'BMO Field', city: 'Toronto' },
      { n: 84, date: '2026-07-02', t1: 'Winners H', t2: 'Runners-up J', venue: 'SoFi Stadium', city: 'Los Angeles' },
      { n: 85, date: '2026-07-02', t1: 'Winners B', t2: '3rd E/F/G/I/J', venue: 'BC Place', city: 'Vancouver' },
      { n: 86, date: '2026-07-03', t1: 'Winners J', t2: 'Runners-up H', venue: 'Hard Rock Stadium', city: 'Miami' },
      { n: 87, date: '2026-07-03', t1: 'Winners K', t2: '3rd D/E/I/J/L', venue: 'Arrowhead Stadium', city: 'Kansas City' },
      { n: 88, date: '2026-07-03', t1: 'Runners-up D', t2: 'Runners-up G', venue: 'AT&T Stadium', city: 'Dallas' },
    ],
  },
  {
    round: 'Round of 16',
    matches: [
      { n: 89, date: '2026-07-04', t1: 'Winners 74', t2: 'Winners 77', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
      { n: 90, date: '2026-07-04', t1: 'Winners 73', t2: 'Winners 75', venue: 'NRG Stadium', city: 'Houston' },
      { n: 91, date: '2026-07-05', t1: 'Winners 76', t2: 'Winners 78', venue: 'MetLife Stadium', city: 'New York / New Jersey' },
      { n: 92, date: '2026-07-05', t1: 'Winners 79', t2: 'Winners 80', venue: 'Estadio Azteca', city: 'Mexico City' },
      { n: 93, date: '2026-07-06', t1: 'Winners 83', t2: 'Winners 84', venue: 'AT&T Stadium', city: 'Dallas' },
      { n: 94, date: '2026-07-06', t1: 'Winners 81', t2: 'Winners 82', venue: 'Lumen Field', city: 'Seattle' },
      { n: 95, date: '2026-07-07', t1: 'Winners 86', t2: 'Winners 88', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
      { n: 96, date: '2026-07-07', t1: 'Winners 85', t2: 'Winners 87', venue: 'BC Place', city: 'Vancouver' },
    ],
  },
  {
    round: 'Quarter-finals',
    matches: [
      { n: 97, date: '2026-07-09', t1: 'Winners 89', t2: 'Winners 90', venue: 'Gillette Stadium', city: 'Boston' },
      { n: 98, date: '2026-07-10', t1: 'Winners 93', t2: 'Winners 94', venue: 'SoFi Stadium', city: 'Los Angeles' },
      { n: 99, date: '2026-07-11', t1: 'Winners 91', t2: 'Winners 92', venue: 'Hard Rock Stadium', city: 'Miami' },
      { n: 100, date: '2026-07-11', t1: 'Winners 95', t2: 'Winners 96', venue: 'Arrowhead Stadium', city: 'Kansas City' },
    ],
  },
  {
    round: 'Semi-finals',
    matches: [
      { n: 101, date: '2026-07-14', t1: 'Winners 97', t2: 'Winners 98', venue: 'AT&T Stadium', city: 'Dallas' },
      { n: 102, date: '2026-07-15', t1: 'Winners 99', t2: 'Winners 100', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
    ],
  },
  {
    round: 'Third-place play-off',
    matches: [
      { n: 103, date: '2026-07-18', t1: 'Losers 101', t2: 'Losers 102', venue: 'Hard Rock Stadium', city: 'Miami' },
    ],
  },
  {
    round: 'Final',
    matches: [
      { n: 104, date: '2026-07-19', t1: 'Winners 101', t2: 'Winners 102', venue: 'MetLife Stadium', city: 'New York / New Jersey' },
    ],
  },
];
