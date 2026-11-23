/** Helper scroll & URL (dipakai navbar, tombol atas, dan halaman QR) */

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

/** Gulir ke bagian berdasarkan id. Tidak memakai href="#id" agar HashRouter tidak kacau. */
export function scrollToId(id) {
  const node = document.getElementById(id);
  if (!node) return;
  const top = node.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * URL bersih situs ini (tanpa hash rute) untuk QR code.
 * Bisa dipaksa lewat config.share.url bila ingin menaruh domain tetap.
 */
export function siteUrl(override) {
  if (override) return override;
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  const clean = pathname.replace(/index\.html$/i, '');
  return `${origin}${clean}`;
}
