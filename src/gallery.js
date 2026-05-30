import './style.css';
import { moments } from './gallery-data.js';
import { flagUrl } from './wc-data.js';
import { initCountdown } from './countdown.js';
import './nav.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

function flagImgs(codes) {
  return codes
    .map((c) => `<img class="gl-flag" src="${flagUrl(c, 80)}" alt="" width="30" height="22" loading="lazy" />`)
    .join('');
}

function tile(m, i) {
  const bg = m.img
    ? `style="--c1:${m.c1};--c2:${m.c2};background-image:linear-gradient(180deg, rgba(7,18,12,0.15), rgba(7,18,12,0.85)), url('${m.img}')" data-img="1"`
    : `style="--c1:${m.c1};--c2:${m.c2}"`;
  return `
    <figure class="gl-tile" ${bg} data-i="${i}">
      <div class="gl-top">
        <span class="gl-year">${m.year}</span>
        <span class="gl-tag">${m.tag}</span>
      </div>
      <figcaption class="gl-cap">
        <div class="gl-flags">${flagImgs(m.flags)}</div>
        <h3 class="gl-title">${m.title}</h3>
        <p class="gl-match">${m.match}</p>
        <p class="gl-desc">${m.desc}</p>
        <p class="gl-venue">${m.venue}</p>
      </figcaption>
    </figure>`;
}

const root = document.getElementById('gallery-root');
if (root) {
  root.innerHTML = moments.map(tile).join('');

  // Lightweight fade-up as tiles scroll into view
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  root.querySelectorAll('.gl-tile').forEach((t, i) => {
    t.style.transitionDelay = `${(i % 3) * 70}ms`;
    io.observe(t);
  });
}

initCountdown();
