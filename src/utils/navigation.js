import { scrollToId } from './scroll';

/** Daftar bagian satu halaman (dipakai navbar, menu HP, dan indikator bagian aktif) */
export const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'kontak', label: 'Kontak' },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * Gulir ke bagian. Kalau sedang di rute lain (mis. /#/qr) kembali dulu ke beranda,
 * baru gulir setelah halaman sempat render.
 */
export function goToSection(id, navigate, pathname) {
  if (pathname !== '/') {
    navigate('/');
    window.setTimeout(() => scrollToId(id), 120);
    return;
  }
  scrollToId(id);
}
