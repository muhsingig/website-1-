// Vanilla adaptation of the ReactBits ScrollReveal effect.
// Splits an element's text into words and reveals them on scroll with a
// scrubbed opacity + blur ramp, plus a subtle container un-rotation.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wrap every word in a <span class="sr-word">, preserving inline elements
// like <strong>. Returns the list of word spans for animation.
function wrapWords(root) {
  const words = [];
  const walk = (parent) => {
    [...parent.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (part === '' ) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'sr-word';
            span.textContent = part;
            frag.appendChild(span);
            words.push(span);
          }
        });
        parent.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(root);
  return words;
}

export function scrollReveal(el, opts = {}) {
  if (!el || el.dataset.srDone) return;
  el.dataset.srDone = '1';
  const {
    baseOpacity = 0.1,
    enableBlur = true,
    baseRotation = 3,
    blurStrength = 4,
    stagger = 0.045,
  } = opts;

  const words = wrapWords(el);
  if (!words.length) return;

  gsap.fromTo(
    el,
    { transformOrigin: '0% 50%', rotate: baseRotation },
    {
      rotate: 0,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 50%', scrub: true },
    }
  );

  gsap.fromTo(
    words,
    {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
      willChange: 'opacity, filter',
    },
    {
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'none',
      stagger,
      scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 38%', scrub: true },
    }
  );
}

export function revealAll(selector, opts) {
  document.querySelectorAll(selector).forEach((el) => scrollReveal(el, opts));
}
