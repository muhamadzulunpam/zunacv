/**
 * SATU-SATUNYA FILE YANG PERLU DIEDIT UNTUK REBRAND.
 * Ganti isi file ini + gambar di public/images, seluruh website ikut berubah.
 */

export const config = {
  /* ---------- IDENTITAS ---------- */
  profile: {
    name: 'Nazla Sofiah',
    initials: 'AR',
    roles: ['UI/UX Designer', 'Graphic Designer', 'Fresh Graduate DKV', 'Creative Thinker'],
    tagline: 'Merancang antarmuka yang rapi, manusiawi, dan enak dilihat.',
    bio: [
      'Lulusan S1 Desain Komunikasi Visual dengan IPK 3,82. Selama kuliah saya fokus pada desain produk digital: riset kecil-kecilan, wireframe, sampai UI yang siap di-handoff ke developer.',
      'Saya senang pekerjaan yang kolaboratif — mendengar user, berdiskusi dengan developer, lalu merapikan detail. Terbuka untuk posisi UI/UX Designer, Graphic Designer, atau desainer in-house.',
    ],
    photo: './images/avatar.webp',
    photoAlt: 'Foto profil Nazla Sofiah, UI/UX Designer',
    location: 'Bandung, Jawa Barat',
    availability: 'Terbuka untuk peluang kerja',
    availabilityNote: 'Bisa mulai full-time mulai Maret 2026',
  },

  /* ---------- TAUTAN UTAMA ---------- */
  links: {
    cv: './cv.pdf',
    cvFileName: 'CV-Nazla-Sofiah.pdf',
  },

  contact: {
    email: 'nazla.sofiah@example.com',
    // Format 62xxx, tanpa tanda + dan tanpa spasi
    whatsapp: '628123456780',
    whatsappLabel: '+62 812-3456-780',
  },

  // icon: nama ikon dari daftar di src/components/ui/iconFor.js
  socials: [
    { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', handle: 'nazlasofiah', url: 'https://www.linkedin.com/in/nazlasofiah' },
    { id: 'instagram', label: 'Instagram', icon: 'instagram', handle: '@nazla.sofiah', url: 'https://www.instagram.com/aisyah.rdesain' },
    { id: 'behance', label: 'Behance', icon: 'behance', handle: 'nazlasofiah', url: 'https://www.behance.net/nazlasofiah' },
    { id: 'github', label: 'GitHub', icon: 'github', handle: 'nazlasofiah', url: 'https://github.com/aisyahrahma' },
  ],

  /* ---------- STATISTIK (count-up) ---------- */
  stats: [
    { value: 15, suffix: '+', label: 'Proyek desain', note: 'UI, branding & poster' },
    { value: 3, suffix: '', label: 'Pengalaman', note: 'Magang, freelance, organisasi' },
    { value: 5, suffix: '', label: 'Sertifikat', note: 'Pelatihan & bootcamp' },
    { value: 3.82, suffix: '', decimals: 2, label: 'IPK', note: 'Cum laude' },
  ],

  /* ---------- KEAHLIAN (skill bar) ---------- */
  skills: [
    { name: 'Figma', level: 92, group: 'Desain UI' },
    { name: 'UI Design', level: 90, group: 'Desain UI' },
    { name: 'Prototyping & Handoff', level: 86, group: 'Riset & Prototipe' },
    { name: 'Adobe Illustrator', level: 88, group: 'Visual' },
    { name: 'Adobe Photoshop', level: 85, group: 'Visual' },
    { name: 'UX Research', level: 78, group: 'Riset & Prototipe' },
    { name: 'Canva', level: 95, group: 'Visual' },
    { name: 'HTML/CSS dasar', level: 70, group: 'Web' },
  ],

  // Ikon tools untuk marquee (ticker berjalan)
  tools: [
    { name: 'Figma', icon: 'figma' },
    { name: 'Illustrator', icon: 'pen' },
    { name: 'Photoshop', icon: 'brush' },
    { name: 'After Effects', icon: 'film' },
    { name: 'Canva', icon: 'sparkles' },
    { name: 'Procreate', icon: 'palette' },
    { name: 'Adobe XD', icon: 'layers' },
    { name: 'Miro', icon: 'sticky' },
    { name: 'Notion', icon: 'book' },
    { name: 'HTML/CSS', icon: 'code' },
  ],

  /* ---------- PENGALAMAN (timeline) ---------- */
  experience: [
    {
      type: 'Magang',
      role: 'UI/UX Designer Intern',
      organization: 'PT Ruang Karya Digital — produk RuangKerja',
      period: 'Feb 2025 – Agu 2025',
      duration: '7 bulan',
      location: 'Bandung (hybrid)',
      points: [
        'Ikut meredesain 14 layar aplikasi mobile HR; waktu pengisian formulir cuti turun dari 4 menit menjadi 1,5 menit.',
        'Menyusun design system sederhana (38 komponen Figma) yang dipakai 3 desainer dan 2 frontend developer.',
        'Memimpin 8 sesi usability testing dengan 12 karyawan klien, hasilnya jadi prioritas perbaikan 1 sprint.',
      ],
      tags: ['Figma', 'Design System', 'Usability Testing'],
    },
    {
      type: 'Freelance',
      role: 'Freelance Brand & Visual Designer',
      organization: 'Klien UMKM, komunitas kampus, dan 2 startup dini',
      period: 'Sep 2024 – sekarang',
      duration: '1 tahun 4 bulan',
      location: 'Remote',
      points: [
        'Menyelesaikan 15 paket pekerjaan: logo & brand guideline, kemasan, poster kampanye, dan feed Instagram.',
        'Brand kit untuk Kopi Senja membantu kenaikan interaksi akun bisnis ±60% dalam 3 bulan.',
        'Membiasakan diri bekerja dengan brief, revisi terjadwal, dan handoff file siap cetak ke vendor.',
      ],
      tags: ['Branding', 'Packaging', 'Social Media'],
    },
    {
      type: 'Organisasi',
      role: 'Kepala Divisi Media & Desain',
      organization: 'Himpunan Mahasiswa Desain Komunikasi Visual — USDN',
      period: 'Okt 2023 – Okt 2024',
      duration: '1 tahun',
      location: 'Kampus USDN, Bandung',
      points: [
        'Mengarahkan 9 anggota divisi dan memproduksi 120+ materi visual untuk 7 acara kampus.',
        'Membangun template desain bersama (Canva + Figma) sehingga waktu produksi materi turun ±40%.',
        'Menjadi panitia festival desain kampus dengan 450 pengunjung dan 22 stand UMKM.',
      ],
      tags: ['Kepemimpinan', 'Art Direction', 'Canva'],
    },
  ],

  /* ---------- PENDIDIKAN ---------- */
  education: {
    degree: 'S1 Desain Komunikasi Visual',
    institution: 'Universitas Seni Digital Nusantara (USDN)',
    period: '2021 – 2025',
    gpa: 'IPK 3,82 / 4,00',
    honors: 'Cum laude',
    thesis: 'Skripsi: Redesign aplikasi layanan kampus dengan pendekatan user journey mapping',
  },

  /* ---------- SERTIFIKAT (2 tampil sebagai kartu, sisanya list ringkas) ---------- */
  certificates: [
    {
      name: 'UX Design Basic Certificate',
      issuer: 'Rekrutmen Pro / Bootcamp Desain Produk',
      year: '2024',
      credentialId: 'UX-2024-08121',
      featured: true,
      url: 'https://example.com/sertifikat/ux-2024-08121',
    },
    {
      name: 'Google UX Design — Coursera',
      issuer: 'Google Career Certificates',
      year: '2024',
      credentialId: 'GXU-4K9P2',
      featured: true,
      url: 'https://example.com/sertifikat/gxu-4k9p2',
    },
    { name: 'Adobe Illustrator untuk Branding', issuer: 'Adobe Create for Indonesia', year: '2023' },
    { name: 'Design System Fundamentals', issuer: 'Daily Design Network', year: '2025' },
    { name: 'Riset Pengguna untuk Desainer', issuer: 'Nusantara Design School', year: '2025' },
  ],

  /* ---------- PROYEK (filter kategori + modal) ---------- */
  projects: [
    {
      id: 'anterin',
      title: 'Redesign Aplikasi Antar Makanan “Anterin”',
      category: 'UI/UX',
      year: '2025',
      thumbnail: './images/proyek-1.webp',
      alt: 'Tampilan tiga layar aplikasi mobile Anterin di dalam mockup ponsel',
      tags: ['Figma', 'Mobile App', 'Usability'],
      summary:
        'Perancangan ulang alur pemesanan pada aplikasi antar makanan supaya pengguna baru bisa selesai checkout lebih cepat.',
      role: 'Product designer (solo project, studi kasus skripsi)',
      outcomes: [
        'Jumlah langkah checkout turun dari 7 menjadi 4 layar.',
        'Time-on-task pada tes 10 responden rata-rata 42 detik, sebelumnya 96 detik.',
        'Task success rate naik dari 70% menjadi 95%.',
      ],
      link: 'https://www.behance.net/nazlasofiah',
      linkLabel: 'Lihat case study',
      wide: true,
    },
    {
      id: 'kopisenja',
      title: 'Branding UMKM “Kopi Senja”',
      category: 'Branding',
      year: '2024',
      thumbnail: './images/proyek-2.webp',
      alt: 'Set identitas visual Kopi Senja: logo, gelas, dan kartu nama',
      tags: ['Illustrator', 'Brand Guideline', 'Packaging'],
      summary:
        'Identitas visual lengkap untuk kedai kopi rumahan: logo, palet, tipografi, stiker cup, sampai panduan pemakaian.',
      role: 'Desainer brand & illustrator',
      outcomes: [
        '1 brand guideline 12 halaman yang bisa dipakai sendiri oleh pemilik kedai.',
        'Interaksi akun bisnis naik ±60% dalam 3 bulan setelah peluncuran visual baru.',
        'Aplikasi kemasan disetujui vendor cetak tanpa revisi struktur.',
      ],
      link: 'https://www.behance.net/nazlasofiah',
      linkLabel: 'Lihat karya',
    },
    {
      id: 'kirana',
      title: 'Design System “Kirana UI”',
      category: 'UI/UX',
      year: '2025',
      thumbnail: './images/proyek-3.webp',
      alt: 'Lembar komponen Kirana UI berisi tombol, form, dan kartu',
      tags: ['Figma', 'Design Tokens', 'Handoff'],
      summary:
        'Pustaka komponen internal untuk tim produk: token warna, tipografi, 38 komponen, dan dokumentasi state.',
      role: 'Desainer design system',
      outcomes: [
        '38 komponen + 24 variabel token siap pakai.',
        'Waktu pembuatan wireframe fitur baru turun ±1 hari.',
        'Konsistensi spacing dan radius diperiksa lewat audit komponen tiap sprint.',
      ],
      link: 'https://www.figma.com/community',
      linkLabel: 'Lihat library',
    },
    {
      id: 'hemat-air',
      title: 'Poster Kampanye “Hemat Air”',
      category: 'Desain Grafis',
      year: '2024',
      thumbnail: './images/proyek-4.webp',
      alt: 'Seri poster kampanye hemat air dengan tipografi besar',
      tags: ['Illustrator', 'Typography', 'Print'],
      summary:
        'Seri tiga poster kampanye lingkungan untuk kampus, dimainkan di mading dan media sosial.',
      role: 'Desainer visual & typography',
      outcomes: [
        '3 poster ukuran A1 siap cetak dengan budget produksi minim.',
        'Dipakai sebagai materi resmi pekan lingkungan hidup kampus.',
        'Jangkauan unggahan Instagram 12.400 akun.',
      ],
      link: 'https://www.behance.net/nazlasofiah',
      linkLabel: 'Lihat poster',
    },
    {
      id: 'madu',
      title: 'Kemasan & Label “Madu Hutan Sindang”',
      category: 'Branding',
      year: '2023',
      thumbnail: './images/proyek-5.webp',
      alt: 'Botol madu dengan label baru dan kotak kemasan',
      tags: ['Packaging', 'Illustrator', 'Print'],
      summary:
        'Perbaikan kemasan madu hutan supaya terlihat premium dan lolos requirements izin edar PIRT.',
      role: 'Desainer kemasan',
      outcomes: [
        'Label memuat informasi PIRT, komposisi, dan barcode dengan hierarki jelas.',
        'Harga jual per botol dinaikkan Rp8.000 tanpa penurunan permintaan.',
        'Desain dipakai untuk 3 ukuran botol dengan satu sistem grid.',
      ],
      link: 'https://www.behance.net/nazlasofiah',
      linkLabel: 'Lihat kemasan',
    },
    {
      id: 'sobat-desain',
      title: 'Konten Instagram “Sobat Desain”',
      category: 'Konten',
      year: '2024',
      thumbnail: './images/proyek-6.webp',
      alt: 'Susunan grid feed Instagram Sobat Desain dengan tema oranye-cream',
      tags: ['Canva', 'Carousel', 'Konten'],
      summary:
        'Template carousel dan IG Story untuk komunitas desain kampus agar tiap panitia bisa bikin konten konsisten.',
      role: 'Content designer & art director',
      outcomes: [
        '24 template carousel siap edit di Canva.',
        'Followers komunitas bertambah 1.150 dalam 4 bulan.',
        'Rata-rata save per unggahan naik 3x lipat.',
      ],
      link: 'https://www.instagram.com/aisyah.rdesain',
      linkLabel: 'Lihat feed',
    },
  ],

  /* ---------- TESTIMONI ---------- */
  testimonials: [
    {
      quote:
        'Aisyah salah satu mahasiswa yang paling teliti soal detail. Laporan perancangan dan visualnya selalu siap sebelum deadline, dan ia nyaman menerima masukan.',
      name: 'Dr. Rina Kartika, M.Ds.',
      role: 'Dosen Pembimbing Skripsi — USDN',
      initials: 'RK',
      rating: 5,
    },
    {
      quote:
        'Saat magang ia langsung paham ritme tim. Hasil redesign formulirnya kami pakai sampai sekarang, dan dokumentasi figmanya rapi untuk developer.',
      name: 'Bayu Pratama',
      role: 'Product Design Lead — RuangKerja',
      initials: 'BP',
      rating: 5,
    },
    {
      quote:
        'Brand kit yang dibuat Aisyah bikin kedai kami kelihatan lebih serius. Revisi cepat, komunikasi enak, hasilnya dipakai sampai sekarang.',
      name: 'Siti Nurhaliza',
      role: 'Owner — Kopi Senja',
      initials: 'SN',
      rating: 5,
    },
  ],

  /* ---------- TAMPILAN & BOTTOM ---------- */
  // defaultPreset: 'aurora' | 'minimal' | 'neon'   defaultMode: 'light' | 'dark'
  theme: {
    defaultPreset: 'aurora',
    defaultMode: 'light',
    showStylePanel: true, // set false untuk website klien final
  },

  share: {
    // Biarkan null agar QR memakai URL otomatis tempat situs di-hosting.
    url: null,
    caption: 'Pindai untuk melihat CV + portfolio online saya',
  },

  footer: {
    credit: 'Dibuat oleh ZUNASOLUTION',
    creditUrl: 'https://example.com',
    note: 'Situs ini dibuat sebagai CV + portfolio online. Seluruh data bersifat contoh.',
  },

  seo: {
    title: 'Nazla Sofiah — UI/UX Designer & Fresh Graduate DKV',
    description:
      'CV dan portfolio online Nazla Sofiah, fresh graduate Desain Komunikasi Visual (IPK 3,82). Lihat keahlian, pengalaman magang, proyek desain, dan hubungi lewat WhatsApp.',
    ogImage: './images/og-image.webp',
    keywords: 'CV online, portfolio UI UX, fresh graduate DKV, desainer grafis Bandung, Nazla Sofiah',
  },
};

export default config;
