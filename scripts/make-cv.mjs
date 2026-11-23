/**
 * Membuat public/cv.pdf (satu halaman) memakai data dari src/config.js.
 * Tanpa dependensi: PDF disusun manual dengan font standar Helvetica.
 * Jalankan: npm run cv   (lalu ganti file ini dengan PDF asli bila klien punya)
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from '../src/config.js';

const here = dirname(fileURLToPath(import.meta.url));
const outFile = join(here, '..', 'public', 'cv.pdf');

const PAGE = { w: 595.28, h: 841.89 };
const MARGIN = 46;
const ACCENT = [0.43, 0.36, 1]; // #6d5bff
const INK = [0.09, 0.08, 0.16];
const GRAY = [0.35, 0.34, 0.42];

// Ganti karakter di luar WinAnsi agar file PDF tidak rusak
const ascii = (input) =>
  String(input)
    .replace(/[–—]/g, '-')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/±/g, '+/-')
    .replace(/\u00a0/g, ' ')
    .replace(/[^\x20-\x7e]/g, '');

const esc = (input) =>
  ascii(input).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

// Perkiraan lebar teks Helvetica (cukup akurat untuk wrapping)
const textWidth = (str, size, bold = false) =>
  ascii(str).length * size * (bold ? 0.55 : 0.5);

function wrap(str, size, maxWidth, bold = false) {
  const words = ascii(str).split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size, bold) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
}

/* ---------- penyusun halaman ---------- */
let y = PAGE.h;
const ops = [];

const fill = (color) => ops.push(`${color.map((c) => c.toFixed(3)).join(' ')} rg`);
const at = (x, yPos, text, size, bold = false) => {
  ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${yPos.toFixed(2)} Tm (${esc(text)}) Tj ET`);
};
const moveTo = (x, yPos) => ops.push(`${x.toFixed(2)} ${yPos.toFixed(2)} m`);
const lineTo = (x, yPos) => ops.push(`${x.toFixed(2)} ${yPos.toFixed(2)} l`);

// Kepala: pita warna + nama
const bandHeight = 108;
y = PAGE.h - bandHeight;
ops.push(`${ACCENT.map((c) => c.toFixed(3)).join(' ')} rg`);
ops.push(`0 ${y} ${PAGE.w} ${bandHeight} re f`);
fill([1, 1, 1]);
at(MARGIN, PAGE.h - 44, config.profile.name, 23, true);
at(MARGIN, PAGE.h - 64, config.profile.roles[0], 11);
const contactLine = [
  config.contact.email,
  config.contact.whatsappLabel,
  config.profile.location,
].join('  |  ');
at(MARGIN, PAGE.h - 82, contactLine, 9);

y = PAGE.h - bandHeight - 30;

function sectionTitle(title) {
  fill(ACCENT);
  at(MARGIN, y, title.toUpperCase(), 10.5, true);
  moveTo(MARGIN, y - 6);
  lineTo(PAGE.w - MARGIN, y - 6);
  ops.push('0.7 0.7 0.78 RG 0.6 w S');
  y -= 20;
}

function paragraph(text, size = 9.5, gap = 13) {
  fill(GRAY);
  wrap(text, size, PAGE.w - MARGIN * 2).forEach((line) => {
    at(MARGIN, y, line, size);
    y -= gap;
  });
  y -= 3;
}

function bullet(text, size = 9.5) {
  fill(INK);
  const lines = wrap(text, size, PAGE.w - MARGIN * 2 - 12);
  lines.forEach((line, index) => {
    at(MARGIN + (index === 0 ? 0 : 12), y, index === 0 ? `- ${line}` : line, size);
    y -= 12;
  });
}

function labeled(left, right, size = 9.5) {
  fill(INK);
  at(MARGIN, y, left, size, true);
  fill(GRAY);
  const rightLines = wrap(right, size, 190, false);
  at(PAGE.w - MARGIN - 190, y, rightLines[0] || '', size);
  y -= 13;
}

/* ---------- isi ---------- */
sectionTitle('Ringkasan');
paragraph(`${config.profile.tagline} ${config.profile.bio[0]}`);

sectionTitle('Keahlian');
const skillText = config.skills.map((skill) => `${skill.name} ${skill.level}%`).join('   ');
paragraph(skillText);

sectionTitle('Pengalaman');
config.experience.forEach((item) => {
  labeled(`${item.role}`, `${item.period}`);
  fill(GRAY);
  at(MARGIN, y, `${item.type} - ${item.organization}`, 9);
  y -= 12;
  item.points.slice(0, 2).forEach((point) => bullet(point));
  y -= 6;
});

sectionTitle('Pendidikan');
labeled(`${config.education.degree}`, config.education.period);
fill(GRAY);
at(MARGIN, y, `${config.education.institution} - ${config.education.gpa}, ${config.education.honors}`, 9);
y -= 16;

sectionTitle('Sertifikat');
config.certificates.slice(0, 3).forEach((cert) => {
  fill(GRAY);
  at(MARGIN, y, `- ${cert.name} (${cert.issuer}, ${cert.year})`, 9);
  y -= 12;
});

sectionTitle('Proyek Pilihan');
config.projects.slice(0, 4).forEach((project) => {
  fill(INK);
  at(MARGIN, y, project.title, 9.5, true);
  fill(GRAY);
  at(MARGIN, y - 11, `${project.category}, ${project.year} - ${project.summary}`, 9);
  y -= 11;
  y -= 12;
});

if (y < 80) {
  // Bila halaman hampir penuh, hentikan konten (PDF tetap satu halaman)
  console.warn('Catatan: konten CV melebihi satu halaman, sebagian baris dipotong.');
}

const content = ops.join('\n');

/* ---------- perakitan file PDF ---------- */
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.w} ${PAGE.h}] ` +
    '/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((offset) => {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

writeFileSync(outFile, Buffer.from(pdf, 'latin1'));

// Verifikasi sederhana: offset di xref benar-benar menunjuk ke "N 0 obj"
const bytes = Buffer.from(pdf, 'latin1');
const bad = offsets.filter((offset, index) => {
  const at2 = bytes.subarray(offset, offset + 24).toString('latin1');
  return !at2.startsWith(`${index + 1} 0 obj`);
});
if (bad.length) {
  console.error('Offset xref tidak cocok, PDF kemungkinan rusak.');
  process.exitCode = 1;
}

console.log(`cv.pdf dibuat: ${outFile} (${(bytes.length / 1024).toFixed(1)} KB)`);
