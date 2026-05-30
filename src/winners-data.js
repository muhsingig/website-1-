// FIFA World Cup — every tournament 1930–2022 (22 editions).
// flag = flagcdn ISO code. West Germany uses Germany's flag (de);
// Czechoslovakia uses the modern Czech flag (cz), which is visually identical.
// score includes the final result; (a.e.t.) = after extra time, (pens) = penalty shoot-out.
// 1950 had no single final — the decisive deciding match is shown.

export const tournaments = [
  { year: 1930, hostName: 'Uruguay', hostFlags: ['uy'], winner: 'Uruguay', winnerFlag: 'uy', runnerUp: 'Argentina', runnerUpFlag: 'ar', score: '4–2', third: 'United States', venue: 'Estadio Centenario, Montevideo', teams: 13, topScorer: 'Guillermo Stábile (ARG) · 8' },
  { year: 1934, hostName: 'Italy', hostFlags: ['it'], winner: 'Italy', winnerFlag: 'it', runnerUp: 'Czechoslovakia', runnerUpFlag: 'cz', score: '2–1 (a.e.t.)', third: 'Germany', venue: 'Stadio Nazionale PNF, Rome', teams: 16, topScorer: 'Oldřich Nejedlý (TCH) · 5' },
  { year: 1938, hostName: 'France', hostFlags: ['fr'], winner: 'Italy', winnerFlag: 'it', runnerUp: 'Hungary', runnerUpFlag: 'hu', score: '4–2', third: 'Brazil', venue: 'Stade Olympique de Colombes, Paris', teams: 15, topScorer: 'Leônidas (BRA) · 7' },
  { year: 1950, hostName: 'Brazil', hostFlags: ['br'], winner: 'Uruguay', winnerFlag: 'uy', runnerUp: 'Brazil', runnerUpFlag: 'br', score: '2–1', third: 'Sweden', venue: 'Maracanã, Rio de Janeiro', teams: 13, topScorer: 'Ademir (BRA) · 8' },
  { year: 1954, hostName: 'Switzerland', hostFlags: ['ch'], winner: 'West Germany', winnerFlag: 'de', runnerUp: 'Hungary', runnerUpFlag: 'hu', score: '3–2', third: 'Austria', venue: 'Wankdorf Stadium, Bern', teams: 16, topScorer: 'Sándor Kocsis (HUN) · 11' },
  { year: 1958, hostName: 'Sweden', hostFlags: ['se'], winner: 'Brazil', winnerFlag: 'br', runnerUp: 'Sweden', runnerUpFlag: 'se', score: '5–2', third: 'France', venue: 'Råsunda Stadium, Solna', teams: 16, topScorer: 'Just Fontaine (FRA) · 13' },
  { year: 1962, hostName: 'Chile', hostFlags: ['cl'], winner: 'Brazil', winnerFlag: 'br', runnerUp: 'Czechoslovakia', runnerUpFlag: 'cz', score: '3–1', third: 'Chile', venue: 'Estadio Nacional, Santiago', teams: 16, topScorer: 'Six players tied · 4' },
  { year: 1966, hostName: 'England', hostFlags: ['gb-eng'], winner: 'England', winnerFlag: 'gb-eng', runnerUp: 'West Germany', runnerUpFlag: 'de', score: '4–2 (a.e.t.)', third: 'Portugal', venue: 'Wembley Stadium, London', teams: 16, topScorer: 'Eusébio (POR) · 9' },
  { year: 1970, hostName: 'Mexico', hostFlags: ['mx'], winner: 'Brazil', winnerFlag: 'br', runnerUp: 'Italy', runnerUpFlag: 'it', score: '4–1', third: 'West Germany', venue: 'Estadio Azteca, Mexico City', teams: 16, topScorer: 'Gerd Müller (FRG) · 10' },
  { year: 1974, hostName: 'West Germany', hostFlags: ['de'], winner: 'West Germany', winnerFlag: 'de', runnerUp: 'Netherlands', runnerUpFlag: 'nl', score: '2–1', third: 'Poland', venue: 'Olympiastadion, Munich', teams: 16, topScorer: 'Grzegorz Lato (POL) · 7' },
  { year: 1978, hostName: 'Argentina', hostFlags: ['ar'], winner: 'Argentina', winnerFlag: 'ar', runnerUp: 'Netherlands', runnerUpFlag: 'nl', score: '3–1 (a.e.t.)', third: 'Brazil', venue: 'Estadio Monumental, Buenos Aires', teams: 16, topScorer: 'Mario Kempes (ARG) · 6' },
  { year: 1982, hostName: 'Spain', hostFlags: ['es'], winner: 'Italy', winnerFlag: 'it', runnerUp: 'West Germany', runnerUpFlag: 'de', score: '3–1', third: 'Poland', venue: 'Santiago Bernabéu, Madrid', teams: 24, topScorer: 'Paolo Rossi (ITA) · 6' },
  { year: 1986, hostName: 'Mexico', hostFlags: ['mx'], winner: 'Argentina', winnerFlag: 'ar', runnerUp: 'West Germany', runnerUpFlag: 'de', score: '3–2', third: 'France', venue: 'Estadio Azteca, Mexico City', teams: 24, topScorer: 'Gary Lineker (ENG) · 6' },
  { year: 1990, hostName: 'Italy', hostFlags: ['it'], winner: 'West Germany', winnerFlag: 'de', runnerUp: 'Argentina', runnerUpFlag: 'ar', score: '1–0', third: 'Italy', venue: 'Stadio Olimpico, Rome', teams: 24, topScorer: 'Salvatore Schillaci (ITA) · 6' },
  { year: 1994, hostName: 'United States', hostFlags: ['us'], winner: 'Brazil', winnerFlag: 'br', runnerUp: 'Italy', runnerUpFlag: 'it', score: '0–0 (3–2 pens)', third: 'Sweden', venue: 'Rose Bowl, Pasadena', teams: 24, topScorer: 'Salenko (RUS) & Stoichkov (BUL) · 6' },
  { year: 1998, hostName: 'France', hostFlags: ['fr'], winner: 'France', winnerFlag: 'fr', runnerUp: 'Brazil', runnerUpFlag: 'br', score: '3–0', third: 'Croatia', venue: 'Stade de France, Saint-Denis', teams: 32, topScorer: 'Davor Šuker (CRO) · 6' },
  { year: 2002, hostName: 'South Korea & Japan', hostFlags: ['kr', 'jp'], winner: 'Brazil', winnerFlag: 'br', runnerUp: 'Germany', runnerUpFlag: 'de', score: '2–0', third: 'Turkey', venue: 'International Stadium, Yokohama', teams: 32, topScorer: 'Ronaldo (BRA) · 8' },
  { year: 2006, hostName: 'Germany', hostFlags: ['de'], winner: 'Italy', winnerFlag: 'it', runnerUp: 'France', runnerUpFlag: 'fr', score: '1–1 (5–3 pens)', third: 'Germany', venue: 'Olympiastadion, Berlin', teams: 32, topScorer: 'Miroslav Klose (GER) · 5' },
  { year: 2010, hostName: 'South Africa', hostFlags: ['za'], winner: 'Spain', winnerFlag: 'es', runnerUp: 'Netherlands', runnerUpFlag: 'nl', score: '1–0 (a.e.t.)', third: 'Germany', venue: 'Soccer City, Johannesburg', teams: 32, topScorer: 'Thomas Müller (GER) · 5' },
  { year: 2014, hostName: 'Brazil', hostFlags: ['br'], winner: 'Germany', winnerFlag: 'de', runnerUp: 'Argentina', runnerUpFlag: 'ar', score: '1–0 (a.e.t.)', third: 'Netherlands', venue: 'Maracanã, Rio de Janeiro', teams: 32, topScorer: 'James Rodríguez (COL) · 6' },
  { year: 2018, hostName: 'Russia', hostFlags: ['ru'], winner: 'France', winnerFlag: 'fr', runnerUp: 'Croatia', runnerUpFlag: 'hr', score: '4–2', third: 'Belgium', venue: 'Luzhniki Stadium, Moscow', teams: 32, topScorer: 'Harry Kane (ENG) · 6' },
  { year: 2022, hostName: 'Qatar', hostFlags: ['qa'], winner: 'Argentina', winnerFlag: 'ar', runnerUp: 'France', runnerUpFlag: 'fr', score: '3–3 (4–2 pens)', third: 'Croatia', venue: 'Lusail Stadium, Lusail', teams: 32, topScorer: 'Kylian Mbappé (FRA) · 8' },
];

// Roll of honour — titles by nation (Germany totals include West Germany).
export const titlesByNation = [
  { name: 'Brazil', flag: 'br', titles: 5, years: [1958, 1962, 1970, 1994, 2002], runnerUps: 2 },
  { name: 'Germany', flag: 'de', titles: 4, years: [1954, 1974, 1990, 2014], runnerUps: 4 },
  { name: 'Italy', flag: 'it', titles: 4, years: [1934, 1938, 1982, 2006], runnerUps: 2 },
  { name: 'Argentina', flag: 'ar', titles: 3, years: [1978, 1986, 2022], runnerUps: 3 },
  { name: 'France', flag: 'fr', titles: 2, years: [1998, 2018], runnerUps: 1 },
  { name: 'Uruguay', flag: 'uy', titles: 2, years: [1930, 1950], runnerUps: 0 },
  { name: 'England', flag: 'gb-eng', titles: 1, years: [1966], runnerUps: 0 },
  { name: 'Spain', flag: 'es', titles: 1, years: [2010], runnerUps: 0 },
];
