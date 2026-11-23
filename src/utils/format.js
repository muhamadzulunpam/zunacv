/** Format angka & teks ringan */

export function formatNumber(value, decimals = 0) {
  const num = Number(value) || 0;
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function initials(name = '') {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export function currentYear() {
  return new Date().getFullYear();
}

/** "15+ proyek" & tanggal pendek */
export function withSuffix(value, suffix = '') {
  return `${value}${suffix}`;
}
