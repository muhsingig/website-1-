import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCountdown } from './countdown.js';
import './nav.js';

gsap.registerPlugin(ScrollTrigger);
initCountdown();

/* ============================================================
   RENDERER
   ============================================================ */
const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.64;
renderer.outputColorSpace = THREE.SRGBColorSpace;

/* ============================================================
   SCENE & CAMERA
   ============================================================ */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 5.5);

/* ============================================================
   ENVIRONMENT
   ============================================================ */
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

/* ============================================================
   LIGHTING
   ============================================================ */
scene.add(new THREE.AmbientLight(0xfff0dd, 0.55));

const key = new THREE.DirectionalLight(0xffeedd, 1.6);
key.position.set(-2, 4, 5);
scene.add(key);

const fill = new THREE.DirectionalLight(0xf5e8d0, 0.35);
fill.position.set(4, 1, -2);
scene.add(fill);

scene.add(new THREE.HemisphereLight(0xfff0dd, 0xcfc0ae, 0.4));

/* ============================================================
   SECTION WAYPOINTS
   ============================================================ */
const DESKTOP_SECTIONS = {
  hero:   { x: 0.5,  y: -0.45, z: 0,    scale: 0.97 },
  stats:  { x: 2.2,  y: 0.0,   z: 0,    scale: 0.97 },
  how:    { x: -2.2, y: 0.0,   z: 0,    scale: 0.97 },
  footer: { x: 2.0,  y: -1.1,  z: -2.0, scale: 0.5 },
};
// Mobile: ball smaller and placed in the lower half so it never covers the
// headline; footer goal centred so the celebration is visible.
const MOBILE_SECTIONS = {
  hero:   { x: 0.0,  y: -1.15, z: 0,    scale: 0.95 },
  stats:  { x: 0.9,  y: 0.05,  z: 0,    scale: 0.85 },
  how:    { x: -0.9, y: 0.05,  z: 0,    scale: 0.85 },
  footer: { x: 0.0,  y: -0.45, z: -0.8, scale: 0.62 },
};
const isMobileView = () => window.innerWidth <= 700;
let SECTIONS = isMobileView() ? MOBILE_SECTIONS : DESKTOP_SECTIONS;

// Pull the camera back on narrow / portrait screens so the ball fits the frame.
function fitCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const z = aspect < 0.8 ? 8.6 : aspect < 1.1 ? 6.9 : 5.5;
  camera.position.z = z;
  camera.updateProjectionMatrix();
}
fitCamera();

/* ============================================================
   STATE
   ============================================================ */
let ball = null;
let baseScale = 1;
let ballLoaded = false;
let currentSection = 'hero';

const BASE_SPEED = 0.003;
let autoVel = {
  x: (Math.random() - 0.5) * 0.003,
  y: BASE_SPEED + Math.random() * 0.002,
};

let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
const DAMPING = 0.94;
let momentumRAF = null;

/* ============================================================
   LOAD GLB
   ============================================================ */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
  '/models/basketball.glb',
  (gltf) => {
    ball = gltf.scene;

    // Center the model
    const box = new THREE.Box3().setFromObject(ball);
    ball.position.sub(box.getCenter(new THREE.Vector3()));

    // Normalize scale so longest axis = 2.4 units
    const size = box.getSize(new THREE.Vector3());
    baseScale = 2.4 / Math.max(size.x, size.y, size.z);
    ball.scale.setScalar(baseScale * SECTIONS.hero.scale);
    ball.position.set(SECTIONS.hero.x, SECTIONS.hero.y, SECTIONS.hero.z);

    // Material overrides — gritty street look
    ball.traverse((child) => {
      if (child.isMesh && child.material) {
        const m = child.material;
        m.envMapIntensity = 0.15;
        if (m.roughness !== undefined) {
          m.roughness = Math.min(1.0, Math.max(0.82, (m.roughness ?? 0.5) * 1.55));
        }
        if (m.metalness !== undefined) m.metalness = 0;
        if (m.color) m.color.multiplyScalar(0.68);
        m.needsUpdate = true;
      }
    });

    scene.add(ball);
    ballLoaded = true;
    ballEntrance();
  },
  undefined,
  (err) => {
    console.error('Failed to load basketball.glb — place your model in public/models/basketball.glb', err);
  }
);

/* ============================================================
   ENTRANCE ANIMATION (one-time)
   ============================================================ */
function ballEntrance() {
  const finalScale = baseScale * SECTIONS.hero.scale;
  const finalY = SECTIONS.hero.y;

  ball.scale.setScalar(finalScale * 0.25);
  ball.position.y = finalY - 0.8;

  gsap.to(ball.scale, {
    x: finalScale, y: finalScale, z: finalScale,
    duration: 1.3, ease: 'expo.out', delay: 0.5,
  });
  gsap.to(ball.position, {
    y: finalY,
    duration: 1.3, ease: 'expo.out', delay: 0.5,
    onComplete: enableDrag,
  });
}

/* ============================================================
   DRAG PHYSICS (hero only)
   ============================================================ */
function enableDrag() {
  canvas.classList.add('drag-enabled');
}
function disableDrag() {
  canvas.classList.remove('drag-enabled');
}

function getPos(e) {
  if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function onDown(e) {
  if (currentSection !== 'hero' || !ballLoaded) return;
  isDragging = true;
  canvas.classList.add('dragging');
  if (momentumRAF) cancelAnimationFrame(momentumRAF);
  prevMouse = getPos(e);
}

function onMove(e) {
  if (!isDragging || !ball) return;
  const pos = getPos(e);
  velocity.x = (pos.y - prevMouse.y) * 0.006;
  velocity.y = (pos.x - prevMouse.x) * 0.006;
  ball.rotation.x += velocity.x;
  ball.rotation.y += velocity.y;
  prevMouse = pos;
}

function onUp() {
  if (!isDragging) return;
  isDragging = false;
  canvas.classList.remove('dragging');
  coast();
}

function coast() {
  velocity.x *= DAMPING;
  velocity.y *= DAMPING;
  if (ball) {
    ball.rotation.x += velocity.x;
    ball.rotation.y += velocity.y;
  }
  if (Math.abs(velocity.x) > 0.0003 || Math.abs(velocity.y) > 0.0003) {
    momentumRAF = requestAnimationFrame(coast);
  } else {
    // Carry spin in the thrown direction
    const dirX = velocity.x || autoVel.x;
    const dirY = velocity.y || autoVel.y;
    const mag = Math.hypot(dirX, dirY) || 1;
    autoVel.x = (dirX / mag) * (BASE_SPEED * 0.4);
    autoVel.y = (dirY / mag) * BASE_SPEED || BASE_SPEED;
  }
}

canvas.addEventListener('mousedown', onDown);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);
canvas.addEventListener('touchstart', onDown, { passive: true });
window.addEventListener('touchmove', onMove, { passive: true });
window.addEventListener('touchend', onUp);

/* ============================================================
   SCROLL-DRIVEN BALL POSITIONING
   ============================================================ */
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function lerp(a, b, t) { return a + (b - a) * t; }
function depthOffset(y) { return y < 0 ? y * 0.4 : 0; }

function applyWaypoint(from, to, p) {
  if (!ball) return;
  const ey = easeInOut(p);
  const x = lerp(from.x, to.x, p);
  const y = lerp(from.y, to.y, ey);
  const z = lerp(from.z, to.z, p) + depthOffset(y);
  const s = lerp(from.scale, to.scale, p);
  ball.position.set(x, y, z);
  ball.scale.setScalar(baseScale * s);
}

// Snap the ball to a section's waypoint (used after a responsive layout swap).
function snapToSection(name) {
  const wp = SECTIONS[name] || SECTIONS.hero;
  applyWaypoint(wp, wp, 1);
}

/* ============================================================
   FOOTER GOAL NET + CELEBRATION
   The net is anchored to the footer ball waypoint by projecting that
   3D position to screen coordinates, so it always frames the ball.
   ============================================================ */
const goalNetZone = document.getElementById('goal-net-zone');
const goalNetSvg = goalNetZone && goalNetZone.querySelector('.goal-net');
const goalBurst = document.getElementById('goal-burst');
const goalBurstText = goalBurst && goalBurst.querySelector('.goal-burst-text');
const goalConfetti = goalBurst && goalBurst.querySelector('.goal-confetti');
const goalFlash = goalBurst && goalBurst.querySelector('.goal-flash');
let goalScored = false;

// Generate a draped diamond net (two families of curved diagonals over the
// goal opening, sagging toward the ground like real netting).
function buildGoalNet() {
  if (!goalNetSvg) return;
  const mesh = goalNetSvg.querySelector('.goal-mesh');
  if (!mesh) return;
  const cols = 20;
  const rows = 15;
  const left = 20, right = 220, top = 24, bot = 182;
  const node = (r, c) => {
    const u = c / cols;
    const v = r / rows;
    let x = left + u * (right - left);
    let y = top + v * (bot - top);
    const bulge = Math.sin(Math.PI * u);   // 0 at posts, 1 at centre
    y += bulge * (2 + v * v * 18);          // sags, deeper toward the ground
    x += (u - 0.5) * bulge * 3;             // gentle pinch inward
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  };
  let d = '';
  for (let s = -rows; s <= cols; s++) {     // "\" diagonals
    let started = false;
    for (let r = 0; r <= rows; r++) {
      const c = s + r;
      if (c < 0 || c > cols) continue;
      d += (started ? 'L' : 'M') + node(r, c) + ' ';
      started = true;
    }
  }
  for (let s = 0; s <= cols + rows; s++) {  // "/" diagonals
    let started = false;
    for (let r = 0; r <= rows; r++) {
      const c = s - r;
      if (c < 0 || c > cols) continue;
      d += (started ? 'L' : 'M') + node(r, c) + ' ';
      started = true;
    }
  }
  mesh.setAttribute('d', d.trim());
}
buildGoalNet();

function projectScreen(x, y, z) {
  const v = new THREE.Vector3(x, y, z).project(camera);
  return { x: (v.x * 0.5 + 0.5) * window.innerWidth, y: (-v.y * 0.5 + 0.5) * window.innerHeight };
}

function positionGoal() {
  if (!goalNetZone) return;
  const f = SECTIONS.footer;
  const c = projectScreen(f.x, f.y, f.z);
  const rWorld = (2.4 * f.scale) / 2;           // ball radius in world units at footer
  const edge = projectScreen(f.x + rWorld, f.y, f.z);
  const rpx = Math.abs(edge.x - c.x) || 110;    // ball radius in screen px
  const w = rpx * 3.4;
  const h = w * 0.9;
  goalNetZone.style.left = `${c.x}px`;
  goalNetZone.style.top = `${c.y}px`;
  goalNetZone.style.width = `${w}px`;
  goalNetZone.style.height = `${h}px`;
  if (goalBurst) {
    goalBurst.style.left = `${c.x}px`;
    goalBurst.style.top = `${c.y - h * 0.5}px`;
  }
}

function spawnConfetti() {
  if (!goalConfetti) return;
  goalConfetti.innerHTML = '';
  const colors = ['#2b6cff', '#e8113a', '#00a651', '#d9a521', '#ffffff'];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    s.style.background = colors[i % colors.length];
    s.style.width = s.style.height = `${7 + Math.random() * 7}px`;
    goalConfetti.appendChild(s);
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2; // mostly upward fan
    const speed = 90 + Math.random() * 150;
    gsap.set(s, { x: 0, y: 0, opacity: 1, scale: 1 });
    gsap
      .timeline({ onComplete: () => s.remove() })
      .to(s, {
        x: Math.cos(ang) * speed,
        y: Math.sin(ang) * speed,
        rotation: Math.random() * 540,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'power2.out',
      })
      .to(s, { y: '+=200', opacity: 0, rotation: '+=180', duration: 0.9, ease: 'power1.in' }, '>-0.05');
  }
}

function celebrateGoal() {
  if (goalScored || !goalNetZone) return;
  goalScored = true;

  // Net snap + bulge as the ball hits
  if (goalNetSvg) {
    gsap.killTweensOf(goalNetSvg);
    gsap
      .timeline()
      .fromTo(goalNetSvg, { scale: 1 }, { scale: 1.1, duration: 0.14, ease: 'power3.out', transformOrigin: '50% 42%' })
      .to(goalNetSvg, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
  }

  // White flash burst behind the text
  if (goalFlash) {
    gsap.killTweensOf(goalFlash);
    gsap.fromTo(
      goalFlash,
      { scale: 0.2, opacity: 0.85 },
      { scale: 3, opacity: 0, duration: 0.7, ease: 'power2.out' }
    );
  }

  // "GOAL!" punch in, hold, fade
  if (goalBurstText) {
    gsap.killTweensOf(goalBurstText);
    gsap.fromTo(
      goalBurstText,
      { scale: 0.2, opacity: 0, y: 18, rotate: -4 },
      { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 0.55, ease: 'back.out(2.6)' }
    );
    gsap.to(goalBurstText, { scale: 1.06, duration: 0.9, delay: 0.55, ease: 'sine.inOut', yoyo: true, repeat: 1 });
    gsap.to(goalBurstText, { opacity: 0, scale: 1.25, duration: 0.6, delay: 1.9, ease: 'power1.in' });
  }

  spawnConfetti();
}

function resetGoal() {
  goalScored = false;
  if (goalBurstText) gsap.set(goalBurstText, { opacity: 0, scale: 0.3 });
}

function setupScrollBall() {
  ScrollTrigger.create({
    trigger: '#stats-section',
    start: 'top bottom',
    end: 'top top',
    scrub: 2,
    onUpdate: (self) => applyWaypoint(SECTIONS.hero, SECTIONS.stats, self.progress),
    onEnter: () => { currentSection = 'stats'; disableDrag(); },
    onLeaveBack: () => { currentSection = 'hero'; if (ballLoaded) enableDrag(); },
  });

  ScrollTrigger.create({
    trigger: '#how-section',
    start: 'top bottom',
    end: 'top top',
    scrub: 2,
    onUpdate: (self) => applyWaypoint(SECTIONS.stats, SECTIONS.how, self.progress),
    onEnter: () => { currentSection = 'how'; },
    onLeaveBack: () => { currentSection = 'stats'; },
  });

  ScrollTrigger.create({
    trigger: '#site-footer',
    start: 'top bottom',
    end: 'top top',
    scrub: 2,
    onUpdate: (self) => {
      applyWaypoint(SECTIONS.how, SECTIONS.footer, self.progress);
      if (goalNetZone) {
        if (!goalNetZone.dataset.pos) { positionGoal(); goalNetZone.dataset.pos = '1'; }
        goalNetZone.classList.toggle('is-active', self.progress > 0.12);
        if (self.progress > 0.9) celebrateGoal();
        else if (self.progress < 0.55) resetGoal();
      }
    },
    onEnter: () => { currentSection = 'footer'; },
    onLeaveBack: () => {
      currentSection = 'how';
      if (goalNetZone) goalNetZone.classList.remove('is-active');
      resetGoal();
    },
  });

  // Section content reveals
  ScrollTrigger.create({
    trigger: '#stats-section',
    start: 'top 75%',
    onEnter: () => gsap.to('.stat-card', {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out', delay: 0.1,
    }),
  });

  ScrollTrigger.create({
    trigger: '#how-section',
    start: 'top 70%',
    onEnter: () => gsap.to('.step-item', {
      opacity: 1, x: 0, stagger: 0.15, duration: 0.9, ease: 'expo.out', delay: 0.1,
    }),
  });
}

/* ============================================================
   NAVBAR SCROLL STATE
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

/* ============================================================
   GSAP UI ENTRANCE
   ============================================================ */
const tl = gsap.timeline({ delay: 0.15 });
tl.to('.nav-logo', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.1)
  .to('.nav-links a', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04 }, 0.15)
  .to('.profile-btn', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.2)
  .to('#ph-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.4)
  .to('#event-card', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' }, 0.55)
  .to('#hero-text', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' }, 0.65)
  .to('#nav-arrow', { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.1)
  .to('#sig-wrap', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.2)
  .to('.sp1', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 1.2)
  .to('.sp2', { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 1.8)
  .to('.sp3', { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 2.0);

/* ============================================================
   EVENT CARD HOVER (GSAP)
   ============================================================ */
const eventCardEl = document.getElementById('event-card');
if (eventCardEl) {
  eventCardEl.addEventListener('mouseenter', () =>
    gsap.to(eventCardEl, { scale: 1.035, y: -6, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
  );
  eventCardEl.addEventListener('mouseleave', () =>
    gsap.to(eventCardEl, { scale: 1.0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
  );
}

/* ============================================================
   RENDER LOOP
   ============================================================ */
function animate() {
  requestAnimationFrame(animate);
  if (ball && !isDragging) {
    ball.rotation.x += autoVel.x;
    ball.rotation.y += autoVel.y;
  }
  renderer.render(scene, camera);
}
animate();

/* ============================================================
   RESIZE
   ============================================================ */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  fitCamera();
  renderer.setSize(window.innerWidth, window.innerHeight);
  SECTIONS = isMobileView() ? MOBILE_SECTIONS : DESKTOP_SECTIONS;
  snapToSection(currentSection);
  if (goalNetZone) {
    goalNetZone.dataset.pos = '';
    positionGoal();
  }
});

/* ============================================================
   ON LOAD
   ============================================================ */
window.addEventListener('load', () => {
  setupScrollBall();
  ScrollTrigger.refresh();
});
