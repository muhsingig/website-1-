// Shared mobile navigation: injects a hamburger toggle into the floating
// pill nav and toggles an open state. No-op on desktop (button hidden via CSS).
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

if (document.readyState !== 'loading') initMobileNav();
else document.addEventListener('DOMContentLoaded', initMobileNav);
