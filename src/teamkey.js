// Shared team-name normalization so the live feed (football-data.org names) can
// be matched to our local fixtures (wc-data.js names) even when wording differs.

// Map common provider spellings -> a single canonical key.
const ALIAS = {
  usa: 'unitedstates',
  unitedstatesofamerica: 'unitedstates',
  southkorea: 'korearepublic',
  korea: 'korearepublic',
  iriran: 'iran',
  iranislamicrepublic: 'iran',
  ivorycoast: 'cotedivoire',
  capeverde: 'caboverde',
  czechrepublic: 'czechia',
  northmacedonia: 'macedonia',
  bosniaandherzegovina: 'bosnia',
  drcongo: 'congodr',
  democraticrepublicofthecongo: 'congodr',
  curacao: 'curacao',
};

export function normTeam(name) {
  const k = String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents (Côte -> cote)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '');
  return ALIAS[k] || k;
}

// Order-independent key for a single match (group stage pairs are unique).
export function pairKey(a, b) {
  return [normTeam(a), normTeam(b)].sort().join('__');
}
