// User preferences persisted in localStorage: colour theme + favourite team.
// Theme is applied as early as this module is imported to minimise any flash.
const THEME_KEY = 'wc26-theme';
const FAV_KEY = 'wc26-fav-team';

export function getTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}
export function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
}
export function setTheme(t) {
  localStorage.setItem(THEME_KEY, t === 'dark' ? 'dark' : 'light');
  applyTheme(t);
}
export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function getFav() {
  return localStorage.getItem(FAV_KEY) || '';
}
export function setFav(name) {
  if (name) localStorage.setItem(FAV_KEY, name);
  else localStorage.removeItem(FAV_KEY);
  window.dispatchEvent(new CustomEvent('wc-fav-change', { detail: name || '' }));
}
export function isFav(name) {
  return getFav() === name;
}

// Apply saved theme immediately on import.
applyTheme(getTheme());
