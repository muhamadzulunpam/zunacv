import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-src');
const outDir = path.join(root, 'public', 'images');

// Ukuran mengikuti batas spesifikasi: foto besar maks 1200px, thumbnail maks 600px.
// Sumber default assets-src/<nama>.svg; entri foto memakai assets-src/foto.jpeg lalu di-crop kotak (900x900) agar wajah jatuh di tengah bingkai bulat.
const TARGETS = [
  {
    name: 'avatar',
    src: 'foto.jpeg',
    crop: { left: 0, top: 250, width: 900, height: 900 },
    width: 600,
    height: 600,
  },
  { name: 'proyek-1', width: 600, height: 375 },
  { name: 'proyek-2', width: 600, height: 450 },
  { name: 'proyek-3', width: 600, height: 450 },
  { name: 'proyek-4', width: 600, height: 450 },
  { name: 'proyek-5', width: 600, height: 450 },
  { name: 'proyek-6', width: 600, height: 450 },
  { name: 'og-image', width: 1200, height: 630 },
];

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp belum ada. Jalankan: npm install --no-save sharp');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

let total = 0;
for (const target of TARGETS) {
  const input = path.join(srcDir, target.src ?? `${target.name}.svg`);
  const output = path.join(outDir, `${target.name}.webp`);
  const buffer = await readFile(input);
  const isSvg = input.toLowerCase().endsWith('.svg');
  let image = sharp(buffer, isSvg ? { density: 300 } : undefined);
  if (target.crop) image = image.extract(target.crop);
  const info = await image
    .resize({ width: target.width, height: target.height, fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  total += info.size;
  console.log(`${target.name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

console.log(`\nTotal gambar: ${(total / 1024 / 1024).toFixed(2)} MB di public/images`);
