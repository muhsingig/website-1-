// Homepage results widget. The tournament is over, so this shows how it ended:
// the final, the third-place play-off and both semi-finals, and highlights the
// picked team if it played in any of them.
import { flagByName, flagUrl } from './wc-data.js';
import { results, homeWon, ROUND_LABEL } from './results-2026.js';
import { getFav } from './prefs.js';

const root = document.getElementById('home-today');
if (root) {
  const show = (n) => (n === 'United States' ? 'USA' : n);
  const flag = (n) => {
    const c = flagByName[n];
    return c ? `<img class="hm-flag" src="${flagUrl(c, 80)}" alt="" loading="lazy" />` : '';
  };
  const ORDER = ['FINAL', 'THIRD_PLACE', 'SEMI_FINALS'];
  const items = results
    .filter((m) => ORDER.includes(m.stage))
    .sort((a, b) => ORDER.indexOf(a.stage) - ORDER.indexOf(b.stage) || a.utcDate.localeCompare(b.utcDate));

  const fav = getFav();

  function matchHTML(m) {
    const favHit = fav && (m.home === fav || m.away === fav);
    const hw = homeWon(m);
    const extra = m.pens ? `${m.pens} pens` : m.aet ? 'a.e.t.' : 'FT';
    return `
      <article class="home-match${m.stage === 'FINAL' ? ' is-final-match' : ''}${favHit ? ' is-fav' : ''}">
        <span class="hm-side hm-home${hw ? ' hm-win' : ''}"><span class="hm-name">${show(m.home)}</span>${flag(m.home)}</span>
        <span class="hm-mid">
          <span class="hm-score">${m.homeScore}–${m.awayScore}</span>
          <span class="hm-badge is-final">${extra}</span>
          <span class="ht-final-label">${ROUND_LABEL[m.stage]}</span>
        </span>
        <span class="hm-side hm-away${hw ? '' : ' hm-win'}">${flag(m.away)}<span class="hm-name">${show(m.away)}</span></span>
        ${favHit ? '<span class="hm-fav-tag">★ Your team</span>' : ''}
      </article>`;
  }

  root.innerHTML = `
    <div class="ht-head">
      <div>
        <span class="eyebrow">Full time</span>
        <h2 class="section-headline ht-title">How it ended</h2>
        <p class="ht-date">Semi-finals 14–15 July · Third place 18 July · Final 19 July 2026</p>
      </div>
      <a class="ht-all" href="/fixtures.html">All 104 results →</a>
    </div>
    <div class="ht-list">${items.map(matchHTML).join('')}</div>`;
}
