// Vercel serverless proxy for the World Cup top-scorers (Golden Boot race).
// Hides the football-data.org token and caches for 5 minutes (scorers change
// far less often than live scores). Set FOOTBALL_DATA_TOKEN in Vercel env.

let cache = { at: 0, data: null };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  const now = Date.now();
  if (cache.data && now - cache.at < 300_000) {
    return res.status(200).json(cache.data);
  }
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return res.status(200).json({ scorers: [], note: 'no-token' });

  try {
    const r = await fetch('https://api.football-data.org/v4/competitions/WC/scorers?limit=15', {
      headers: { 'X-Auth-Token': token },
    });
    if (!r.ok) return res.status(200).json({ scorers: [], note: `upstream-${r.status}` });
    const json = await r.json();
    const scorers = (json.scorers || []).map((s) => ({
      name: s.player?.name ?? '',
      team: s.team?.name ?? '',
      goals: s.goals ?? 0,
      assists: s.assists ?? null,
      penalties: s.penalties ?? null,
    }));
    const data = { scorers, updated: new Date().toISOString() };
    cache = { at: now, data };
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({ scorers: [], note: 'error' });
  }
}
