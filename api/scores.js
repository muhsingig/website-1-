// Vercel serverless function: hides the football-data.org token and caches the
// response so all visitors share ONE upstream call per 30s (keeps us well under
// the free-tier 10 req/min limit). Front-end polls /api/scores, never the API.
//
// Set the token in Vercel → Settings → Environment Variables:
//   FOOTBALL_DATA_TOKEN = <your token from football-data.org>
// To switch providers later (e.g. API-Football) only this file changes.

let cache = { at: 0, data: null };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  const now = Date.now();
  if (cache.data && now - cache.at < 30_000) {
    return res.status(200).json(cache.data);
  }

  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) {
    // No key yet → return empty so the page just keeps showing kickoff times.
    return res.status(200).json({ matches: [], note: 'no-token' });
  }

  try {
    const r = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: { 'X-Auth-Token': token },
    });
    if (!r.ok) {
      return res.status(200).json({ matches: [], note: `upstream-${r.status}` });
    }
    const json = await r.json();
    // Slim payload to only what the UI needs.
    const matches = (json.matches || []).map((m) => ({
      id: m.id,
      utcDate: m.utcDate,
      status: m.status, // SCHEDULED | TIMED | IN_PLAY | PAUSED | FINISHED
      minute: m.minute ?? null,
      home: m.homeTeam?.name ?? m.homeTeam?.shortName ?? '',
      away: m.awayTeam?.name ?? m.awayTeam?.shortName ?? '',
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
    }));
    const data = { matches, updated: new Date().toISOString() };
    cache = { at: now, data };
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({ matches: [], note: 'error' });
  }
}
