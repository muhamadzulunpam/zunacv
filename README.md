# ZunaCV — Website CV + Portfolio Satu Halaman

Template website CV + portofolio untuk satu orang (demo: **Nazla Sofiah**, fresh graduate DKV / UI-UX Designer). Dibuat untuk dijual sebagai paket web statis: ringan, tampil modern, dan bisa di-rebrand hanya dengan mengubah satu file konfigurasi.

Tanpa backend, tanpa database, tanpa login. Hasil build berupa file statis sehingga bisa diunggah ke hosting Apache/PHP biasa (mis. InfinityFree).

---

## Teknologi

| Bagian | Pilihan | Alasan |
| --- | --- | --- |
| Framework | React 19 + Vite 8 | build cepat, output statis |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | utilitas + komponen CSS sendiri |
| Routing | `react-router-dom` **HashRouter** | `/#/qr` tetap aman di-refresh di Apache tanpa `.htaccess` |
| Ikon | `lucide-react` + SVG inline untuk merek (LinkedIn, Instagram, GitHub, Behance, Figma) | lucide v1 sudah menghapus ikon merek |
| QR | `qrcode.react` (`QRCodeCanvas`) | bisa langsung diunduh jadi PNG |
| Animasi | CSS + IntersectionObserver (tanpa framer-motion) | paling ringan untuk HP kelas menengah |

Dependensi runtime hanya 5 paket. `sharp` dipakai sementara untuk konversi gambar dan sengaja **tidak** masuk `package.json`.

---

## Menjalankan di komputer lokal

Prasyarat: Node.js 18+ dan npm.

```bash
npm install      # pasang dependensi
npm run dev      # http://localhost:5173
```

Perintah lain:

```bash
npm run build    # hasilkan folder dist/
npm run preview  # uji hasil build di http://localhost:4173
npm run cv       # regenerasi public/cv.pdf dari src/config.js
npm run images   # render assets-src/*.svg -> public/images/*.webp (butuh sharp)
```

`npm run images` memerlukan sharp yang dipasang tanpa dicatat di package.json:

```bash
npm install --no-save sharp
```

---

## Struktur folder

```
index.html              SEO dasar, preload font, skrip anti-kedip tema
vite.config.js          base: './' supaya aman diunggah ke subfolder
public/
  cv.pdf                file yang diunduh tombol "Unduh CV"
  favicon.svg, robots.txt
  images/               avatar.webp, proyek-1..6.webp, og-image.webp
assets-src/             sumber SVG gambar (diedit lalu dikonversi npm run images)
scripts/
  make-cv.mjs         pembuat PDF satu halaman tanpa dependensi
  build-images.mjs    konversi SVG -> WebP
src/
  config.js           SEMUA konten & pengaturan ada di sini
  main.jsx, App.jsx
  components/         Navbar, MobileMenu, Timeline, ProjectModal, StylePanel, ...
    ui/               Button, Reveal, SectionHeading, SmartImage, icons
  sections/           Hero, About, Skills, Experience, Projects, Testimonials, Contact, Footer
  pages/              HomePage.jsx, QrPage.jsx
  hooks/              useReveal, useTypewriter, useCountUp, useScrollProgress, useActiveSection, useTheme
  utils/              theme.js (pengelola tema), whatsapp.js (pembuat pesan), scroll.js, navigation.js, format.js
  styles/             theme.css (token warna/font/radius), base.css, components.css
```

---

## Rebrand untuk klien baru

Yang perlu diubah **hanya dua hal**: `src/config.js` dan isi `public/images/` (+ `public/cv.pdf`).

### 1. Edit `src/config.js`

| Bagian | Isi |
| --- | --- |
| `profile` | nama, `initials`, `roles` (daftar yang diketik bergantian di hero), `tagline`, `bio`, `photo`, `photoAlt`, `location`, `availability` |
| `links` | `cv` (default `./cv.pdf`) dan `cvFileName` nama file hasil unduhan |
| `contact` | `email`, `whatsapp` (format `62...`), `whatsappLabel` yang tampil di layar |
| `socials` | LinkedIn / Instagram / Behance / GitHub: `label`, `handle`, `url`, `icon` |
| `stats` | angka statistik; nilai `decimals` untuk angka seperti IPK |
| `skills` | 6-8 keahlian beserta `level` persen dan `group` |
| `tools` | logo yang berjalan di marquee |
| `experience` | magang, freelance, organisasi: `period`, `duration`, `org`, `points`, `tags` |
| `education`, `certificates` | riwayat pendidikan dan sertifikat |
| `projects` | 5-6 proyek: `title`, `category`, `year`, `thumbnail`, `tags`, `summary`, `role`, `outcomes`, `link` |
| `testimonials` | 2-3 testimoni |
| `theme` | `defaultPreset`, `defaultMode`, `showStylePanel` |
| `share` | `url` — isi domain asli agar QR mengarah ke alamat yang benar (`null` = otomatis dari alamat browser) |
| `footer`, `seo` | kredit dan teks meta |

### 2. Ganti gambar

Letakkan file WebP baru di `public/images/` dengan nama yang sama (`avatar.webp`, `proyek-1.webp`, ... `og-image.webp`). Ukuran acuan: avatar 600×600, thumbnail 600×450, og-image 1200×630. Foto besar maksimal 1200px, thumbnail maksimal 600px.

Kalau klien mengirim foto JPG/PNG, konversi dulu ke WebP memakai tool apa pun (mis. `cwebp -resize 600 600 foto.jpg -o public/images/avatar.webp`, atau editor grafis). Sumber gambar template sendiri ada di `assets-src/` dan dikonversi dengan `npm run images`.

### 3. Buat CV PDF baru

```bash
npm run cv
```

Skrip membaca `src/config.js`, jadi isi PDF otomatis mengikuti data terbaru. Kalau nama panjang, sesuaikan pemenggalan baris di `scripts/make-cv.mjs`.

### 4. Sinkronkan `index.html`

Beberapa teks berada di HTML, bukan di React — ubah agar konsisten:

- `<title>`, `meta description`, `meta author`, `keywords`
- blok Open Graph & Twitter (ganti `https://example.com` dengan domain asli, termasuk `og:image` dan `og:url`)
- `<noscript>` (nomor WhatsApp cadangan)
- JSON-LD `"Person"` (nama, jobTitle, alumniOf, kota)
- atribut `data-preset` dan `data-mode` pada `<html>`, serta nilai DEFAULT di skrip inline tema — **harus sama** dengan `theme.defaultPreset` / `theme.defaultMode` di `src/config.js`

### 5. Mengatur preset gaya

Tiga preset tersedia di panel melayang "Ganti Gaya": **Aurora** (gradien ungu-biru-pink, font Sora), **Minimal** (putih-hitam, satu aksen, judul Playfair Display), **Neon Dark** (gelap pekat, aksen hijau neon, Space Grotesk), plus tombol Terang/Gelap.

- Ganti default: ubah `theme.defaultPreset` / `theme.defaultMode` di `src/config.js`.
- Sembunyikan panelnya: `showStylePanel: false`.
- Ubah warna/font radius sebuah preset: `src/styles/theme.css` (token per preset), dan label serta warna swatch di `src/utils/theme.js`.

---

## Build

```bash
npm run build
```

Hasilnya folder `dist/` dengan total ± 0,5 MB: JS 362 KB (gzip 114 KB), CSS 41 KB (gzip 10 KB), 8 gambar WebP 92 KB, `cv.pdf` 6 KB. Jauh di bawah batas 10 MB. `base: './'` membuat aset dicari secara relatif, jadi situs tetap jalan baik di domain utama maupun di subfolder.

---

## Upload ke InfinityFree (atau hosting Apache lain)

1. `npm run build` sampai selesai tanpa error.
2. Buka **Control Panel → Online File Manager**, atau pakai FTP client (FileZilla) dengan host, username, dan password yang dikirim InfinityFree lewat email pendaftaran.
3. Masuk ke folder **`htdocs`**.
4. Hapus file bawaan hosting (`index2.html` / halaman default), jangan hapus folder `error`.
5. **Unggah seluruh ISI `dist/`** (bukan folder `dist`-nya): `index.html`, folder `assets/`, folder `images/`, `cv.pdf`, `favicon.svg`, `robots.txt`.
6. Buka `https://nama-akun-anda.infinityfreeapp.com/` — cek hero, panel gaya, lalu buka `.../#/qr` dan **tekan F5/refresh** di alamat itu. Kalau tetap tampil (tidak 404), routing sudah benar.
7. Setelah itu baru ganti `share.url` di `src/config.js` + `og:url`/`og:image` di `index.html` dengan domain ini, lalu build dan unggah ulang agar QR dan preview media sosial menunjuk ke alamat final.

Catatan: hosting hanya mendukung Apache/PHP, jadi tidak ada langkah `npm install` di server — yang diunggah murni hasil build.

---

## Catatan kualitas

- **Aksesibilitas**: semua gambar punya `alt` bermakna, field form berlabel, `role="progressbar"` + `aria-valuenow` pada bar keahlian, modal dengan focus trap + Esc + pengembalian fokus, `aria-current` pada menu aktif, teks kontras, dan navigasi keyboard utuh.
- **Animasi**: menghormati `prefers-reduced-motion` — seluruh animasi dimatikan dan konten langsung tampil.
- **Stabil saat gambar gagal**: `SmartImage` selalu menampilkan lapisan gradien + inisial sebagai cadangan.
- **Cetak**: halaman `/#/qr` punya gaya cetak A4; kartu nama 85×55 mm bisa digunting.

## Known trade-off

- Thumbnail proyek dan `og-image` adalah **mockup vektor buatan sendiri** (`assets-src/*.svg`) yang dirender ke WebP, bukan foto hasil AI — generator gambar tidak tersedia pada akun pengerja. Ganti dengan gambar milik klien sesuai langkah "Rebrand" di atas.
- Foto profil memakai foto asli `assets-src/foto.jpeg`. `npm run images` memotongnya jadi kotak 900×900 (kiri 0, atas 250) lalu mengecilkan ke 600×600 agar wajah berada di tengah bingkai bulat. Kalau foto pengganti punya posisi wajah berbeda, sesuaikan angka `crop` pada entri `avatar` di `scripts/build-images.mjs` (atau hapus `crop` untuk memakai pemotongan otomatis di tengah).
- Font diambil dari Google Fonts CDN (butuh internet saat pertama kali dibuka). Untuk situs yang harus jalan sepenuhnya offline, unduh file WOFF2 dan letakkan di `public/fonts` lalu ganti tautan `<link>` di `index.html` dengan `@font-face` lokal.
