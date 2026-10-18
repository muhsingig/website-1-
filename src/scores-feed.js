// Shared score source for every page. The tournament is over, so instead of
// polling /api/scores this serves the final snapshot of all 104 results.
// Callers subscribe with onScores(fn), which is called straight away.
import { results } from './results-2026.js';

const latest = { matches: results, final: true };

export function onScores(fn) {
  try { fn(latest); } catch { /* one bad subscriber shouldn't break the rest */ }
  return () => {};
}
