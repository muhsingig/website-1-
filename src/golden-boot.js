// Golden Boot (top scorers) tracker — live once the tournament begins.
// Golden Ball (best player) is a subjective FIFA award decided after the final,
// so it is shown as a post-tournament note rather than a live feed.
import { flagByName, flagUrl } from './wc-data.js';
import { normTeam } from './teamkey.js';

const root = document.getElementById('golden-boot');
if (root) {
  const FLAG = {};
  for (const [n, c] of Object.entries(flagByName)) FLAG[normTeam(n)] = c;
  const flag = (team) => {
    const c = flagByName[team] || FLAG[normTeam(team)];
    return c ? `<img class="gb-flag" src="${flagUrl(c, 40)}" alt="" loading="lazy" />` : '';
  };

  function render(scorers) {
    const list =
      scorers && scorers.length
        ? `<ol class="gb-list">${scorers
            .map(
              (s, i) => `
          <li class="gb-row">
            <span class="gb-rank">${i + 1}</span>
            ${flag(s.team)}
            <span class="gb-info"><span class="gb-name">${s.name}</span><span class="gb-team">${s.team}</span></span>
            <span class="gb-goals">${s.goals}<span class="gb-g">G</span></span>
          </li>`
            )
            .join('')}</ol>`
        : `<p class="gb-empty">⚽ The Golden Boot race begins on <strong>11 June</strong>. Top scorers will appear here live as goals fly in.</p>`;

    root.innerHTML = `
      <div class="gb-head">
        <span class="eyebrow">Race for the Golden Boot</span>
        <h2 class="section-headline gb-title">Top Scorers</h2>
      </div>
      ${list}
      <div class="gb-ball-note">
        🏆 <strong>Golden Ball</strong> (best player) is voted by the FIFA Technical Study Group and awarded after the final on <strong>19 July</strong>.
      </div>`;
  }

  render([]); // initial
  fetch('/api/scorers', { cache: 'no-store' })
    .then((r) => r.json())
    .then((d) => render(d.scorers || []))
    .catch(() => {});
}
