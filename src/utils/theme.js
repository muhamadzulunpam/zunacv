/**
 * Pengelola tema: preset (Aurora/Minimal/Neon) + mode (terang/gelap).
 * Semuanya ditulis ke atribut data di <html> sehingga CSS variables yang bekerja,
 * tanpa reload. Pilihan pengguna disimpan di localStorage.
 */

export const PRESETS = [
  {
    id: 'aurora',
    name: 'Aurora',
    tagline: 'Gradasi ungu-biru-pink',
    fontLabel: 'Sora',
    headingMode: 'gradient',
    swatch: ['#6d5bff', '#22c7f0', '#ff4fa3'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Putih-hitam, satu aksen',
    fontLabel: 'Playfair Display',
    headingMode: 'solid',
    swatch: ['#14110f', '#ffffff', '#c2410c'],
  },
  {
    id: 'neon',
    name: 'Neon Dark',
    tagline: 'Gelap pekat, aksen neon',
    fontLabel: 'Space Grotesk',
    headingMode: 'gradient',
    swatch: ['#05070a', '#00ffa3', '#22d3ee'],
  },
];

const KEYS = { preset: 'zunacv:preset', mode: 'zunacv:mode' };

// Warna bilah alamat HP mengikuti preset+mode yang aktif
const META_COLOR = {
  'aurora|light': '#6d5bff',
  'aurora|dark': '#0a0716',
  'minimal|light': '#ffffff',
  'minimal|dark': '#101012',
  'neon|light': '#00966d',
  'neon|dark': '#05070a',
};

function read(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value || fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* mode penyamaran / storage diblokir: gaya tetap jalan, hanya tidak tersimpan */
  }
}

export function isPreset(value) {
  return PRESETS.some((preset) => preset.id === value);
}

/** Ambil preferensi tersimpan; bila kosong pakai default dari config.js */
export function getTheme(defaults = {}) {
  const preset = read(KEYS.preset, defaults.defaultPreset || 'aurora');
  const mode = read(KEYS.mode, defaults.defaultMode || 'light');
  return {
    preset: isPreset(preset) ? preset : 'aurora',
    mode: mode === 'dark' ? 'dark' : 'light',
  };
}

/** Terapkan ke dokumen. persist=false dipakai saat init agar tidak menimpa storage kosong */
export function applyTheme({ preset, mode }, { persist = true } = {}) {
  const root = document.documentElement;
  root.setAttribute('data-preset', preset);
  root.setAttribute('data-mode', mode);
  const meta = PRESETS.find((item) => item.id === preset);
  root.setAttribute('data-heading', meta ? meta.headingMode : 'gradient');
  if (persist) {
    write(KEYS.preset, preset);
    write(KEYS.mode, mode);
  }
  const themeColor = META_COLOR[`${preset}|${mode}`] || '#6d5bff';
  document.querySelectorAll('meta[name="theme-color"]').forEach((tag) => {
    tag.setAttribute('content', themeColor);
  });
}

export function initTheme(defaults) {
  applyTheme(getTheme(defaults), { persist: false });
}

export function setPreset(preset) {
  const current = getTheme();
  applyTheme({ ...current, preset: isPreset(preset) ? preset : current.preset });
}

export function setMode(mode) {
  const current = getTheme();
  applyTheme({ ...current, mode: mode === 'dark' ? 'dark' : 'light' });
}

export function toggleMode() {
  const current = getTheme();
  setMode(current.mode === 'dark' ? 'light' : 'dark');
  return current.mode === 'dark' ? 'light' : 'dark';
}
