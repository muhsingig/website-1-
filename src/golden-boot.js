// 2026 Golden Boot — the final top-scorer table plus the post-tournament
// Golden Ball result (the tournament ended on 19 July 2026).
import { flagByName, flagUrl } from './wc-data.js';
import { scorers } from './results-2026.js';

const root = document.getElementById('golden-boot');
if (root) {
  const flag = (team) => {
    const c = flagByName[team];
    return c ? `<img class="gb-flag" src="${flagUrl(c, 40)}" alt="" loading="lazy" />` : '';
  };

  root.innerHTML = `
    <div class="gb-head">
      <span class="eyebrow">2026 Golden Boot · Final</span>
      <h2 class="section-headline gb-title">Top Scorers</h2>
    </div>
    <ol class="gb-list">${scorers
      .slice(0, 10)
      .map(
        (s, i) => `
      <li class="gb-row">
        <span class="gb-rank">${i + 1}</span>
        ${flag(s.team)}
        <span class="gb-info"><span class="gb-name">${s.name}</span><span class="gb-team">${s.team}</span></span>
        <span class="gb-goals">${s.goals}<span class="gb-g">G</span></span>
      </li>`
      )
      .join('')}</ol>
    <div class="gb-ball-note">
      🏆 <strong>Golden Ball:</strong> Rodri (Spain) · Silver: Lionel Messi · Bronze: Kylian Mbappé.
      <a href="/champions-2026.html">All 2026 awards →</a>
    </div>`;
}
