// Shared navigation behaviour:
//  1. Mobile hamburger toggle (dropdown panel <=1024px)
//  2. PillNav-style hover-circle fill on each desktop link (vanilla adaptation
//     of the ReactBits PillNav effect, using GSAP).
import { gsap } from 'gsap';

const PILL_EASE = 'power3.out';

function initMobileNav() {
  const navbar = document.getElementById('navbar');
  const links = navbar && navbar.querySelector('.nav-links');
  if (!navbar || !links || navbar.querySelector('.nav-toggle')) return;

  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle navigation menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  navbar.appendChild(btn);

  const close = () => {
    navbar.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = navbar.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close when a link is tapped or when tapping outside the nav.
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('nav-open') && !navbar.contains(e.target)) close();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) close();
  });
}

// ---- PillNav hover-circle effect ----
function initPillNav() {
  const navbar = document.getElementById('navbar');
  const links = navbar && navbar.querySelectorAll('.nav-links a');
  if (!links || !links.length) return;

  // Restructure each link once: label stack + hover label + reveal circle.
  links.forEach((a) => {
    if (a.dataset.pill) return;
    a.dataset.pill = '1';
    const label = a.textContent.trim();
    a.classList.add('pill');
    a.innerHTML =
      '<span class="hover-circle" aria-hidden="true"></span>' +
      '<span class="label-stack">' +
      `<span class="pill-label">${label}</span>` +
      `<span class="pill-label-hover" aria-hidden="true">${label}</span>` +
      '</span>';
  });

  const layout = () => {
    links.forEach((a) => {
      const circle = a.querySelector('.hover-circle');
      const label = a.querySelector('.pill-label');
      const white = a.querySelector('.pill-label-hover');
      if (!circle || !label || !white) return;

      const rect = a.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });
      gsap.set(label, { y: 0 });
      gsap.set(white, { y: h + 12, opacity: 0 });

      // store geometry for the hover handlers
      a._pillGeo = { circle, label, white, h };

      if (!a.dataset.pillBound) {
        a.dataset.pillBound = '1';
        a.addEventListener('mouseenter', () => {
          const g = a._pillGeo;
          if (!g) return;
          gsap.to(g.circle, { scale: 1.2, duration: 0.4, ease: PILL_EASE, overwrite: 'auto' });
          gsap.to(g.label, { y: -(g.h + 8), duration: 0.4, ease: PILL_EASE, overwrite: 'auto' });
          gsap.to(g.white, { y: 0, opacity: 1, duration: 0.4, ease: PILL_EASE, overwrite: 'auto' });
        });
        a.addEventListener('mouseleave', () => {
          const g = a._pillGeo;
          if (!g) return;
          gsap.to(g.circle, { scale: 0, duration: 0.3, ease: PILL_EASE, overwrite: 'auto' });
          gsap.to(g.label, { y: 0, duration: 0.3, ease: PILL_EASE, overwrite: 'auto' });
          gsap.to(g.white, { y: g.h + 12, opacity: 0, duration: 0.3, ease: PILL_EASE, overwrite: 'auto' });
        });
      }
    });
  };

  requestAnimationFrame(layout);
  window.addEventListener('resize', () => requestAnimationFrame(layout));
  if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});
}

function initNav() {
  initMobileNav();
  initPillNav();
}

if (document.readyState !== 'loading') initNav();
else document.addEventListener('DOMContentLoaded', initNav);
