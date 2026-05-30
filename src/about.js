import './style.css';
import { initCountdown } from './countdown.js';
import './nav.js';
import { revealAll } from './scroll-reveal.js';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

initCountdown();

// ScrollReveal effect on the About prose (headings + paragraphs)
revealAll('.ab-h2, .ab-p');
