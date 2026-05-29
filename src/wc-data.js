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
