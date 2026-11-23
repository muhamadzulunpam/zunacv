/**
 * Pembuat tautan WhatsApp + pesan terformat.
 * Nomor selalu dinormalisasi ke digit (format 62xxx) supaya aman dari salah ketik.
 */

export function normalizePhone(input) {
  const digits = String(input || '').replace(/\D/g, '');
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

export function waUrl(phone, text = '') {
  const number = normalizePhone(phone);
  if (!number) return '#';
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${number}${query}`;
}

/** Pesan otomatis dari form kontak */
export function buildContactMessage({ name, email, message }, profileName = '') {
  const lines = [
    'Halo' + (profileName ? ` ${profileName},` : ','),
    '',
    `Nama   : ${name || '-'}`,
    `Email  : ${email || '-'}`,
    '',
    'Pesan:',
    message || '-',
    '',
    '(dikirim dari CV online)',
  ];
  return lines.join('\n');
}

/** Pesan perkenalan untuk tombol WhatsApp di kartu kontak */
export function buildIntroMessage(profileName = '') {
  return `Halo${profileName ? ` ${profileName}` : ''}, saya menemukan CV online Anda dan ingin bertanya soal ketersediaan untuk proyek/posisi.`;
}

export function mailtoUrl(email, subject = '', body = '') {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ''}`;
}

/** Salin teks ke clipboard, dengan fallback untuk browser lama / HTTP */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* lanjut ke fallback */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
