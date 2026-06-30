// =============================================
// UKM Proker Registration Portal — Mock Data
// =============================================

import { Proker, Division, StatusSearchResult } from '@/types';

// ── Divisions ──────────────────────────────

const divisiFotografi: Division[] = [
  {
    id: 'div-001',
    proker_id: 'proker-001',
    name: 'Fotografer Dokumentasi',
    description: 'Bertugas mengabadikan setiap momen kegiatan UKM dengan sudut pandang yang artistik dan profesional.',
    tasks: [
      'Mengambil foto dan video selama acara',
      'Melakukan editing foto dengan standar UKM',
      'Mengelola arsip dokumentasi digital',
      'Membuat konten visual untuk media sosial',
    ],
    quota: 8,
    filled_quota: 5,
    requirements: 'Memiliki kamera DSLR/mirrorless atau smartphone dengan kamera berkualitas baik',
    display_order: 1,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-002',
    proker_id: 'proker-001',
    name: 'Desainer Grafis',
    description: 'Menciptakan materi visual yang menarik untuk keperluan publikasi, banner, dan media sosial UKM.',
    tasks: [
      'Membuat desain poster dan flyer kegiatan',
      'Mendesain konten media sosial (IG, Twitter)',
      'Membuat template presentasi UKM',
      'Berkolaborasi dengan tim dokumentasi',
    ],
    quota: 6,
    filled_quota: 6,
    requirements: 'Menguasai minimal satu software desain (Canva, Figma, Adobe)',
    display_order: 2,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-003',
    proker_id: 'proker-001',
    name: 'Videografer & Editor',
    description: 'Memproduksi konten video berkualitas tinggi mulai dari perencanaan, pengambilan gambar, hingga post-production.',
    tasks: [
      'Merencanakan konsep video',
      'Mengoperasikan kamera video dan peralatan audio',
      'Melakukan color grading dan editing video',
      'Membuat video recap & highlight kegiatan',
    ],
    quota: 5,
    filled_quota: 2,
    requirements: null,
    display_order: 3,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-004',
    proker_id: 'proker-001',
    name: 'Humas & Media Sosial',
    description: 'Mengelola komunikasi eksternal UKM dan membangun brand awareness melalui platform digital.',
    tasks: [
      'Mengelola akun media sosial UKM',
      'Menulis caption dan copywriting konten',
      'Berinteraksi dengan followers & komunitas',
      'Membuat laporan analitik bulanan',
    ],
    quota: 4,
    filled_quota: 1,
    requirements: null,
    display_order: 4,
    created_at: '2026-06-01T00:00:00Z',
  },
];

const divisiSeminar: Division[] = [
  {
    id: 'div-011',
    proker_id: 'proker-002',
    name: 'Panitia Acara (OC)',
    description: 'Bertanggung jawab atas kelancaran teknis dan operasional seluruh rangkaian acara seminar.',
    tasks: [
      'Koordinasi dengan pembicara dan moderator',
      'Mengatur jadwal dan rundown acara',
      'Mengelola registrasi peserta on-site',
      'Memastikan kelancaran sesi Q&A',
    ],
    quota: 15,
    filled_quota: 8,
    requirements: null,
    display_order: 1,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-012',
    proker_id: 'proker-002',
    name: 'Divisi Konsumsi',
    description: 'Mengurus kebutuhan konsumsi untuk panitia, pembicara, dan peserta seminar.',
    tasks: [
      'Survei dan pemilihan vendor katering',
      'Koordinasi jumlah dan distribusi konsumsi',
      'Mengurus konsumsi VIP untuk pembicara',
      'Membuat laporan keuangan konsumsi',
    ],
    quota: 8,
    filled_quota: 3,
    requirements: null,
    display_order: 2,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-013',
    proker_id: 'proker-002',
    name: 'Divisi Publikasi & Dekorasi',
    description: 'Merancang dan mengeksekusi identitas visual acara, mulai dari dekorasi venue hingga materi digital.',
    tasks: [
      'Mendesain backdrop dan banner venue',
      'Membuat materi publikasi digital dan cetak',
      'Mendekorasi ruangan sesuai tema acara',
      'Dokumentasi foto dan video acara',
    ],
    quota: 10,
    filled_quota: 10,
    requirements: 'Berpengalaman dalam desain atau dekorasi (opsional)',
    display_order: 3,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-014',
    proker_id: 'proker-002',
    name: 'Sponsorship & Dana',
    description: 'Mengelola pendanaan acara melalui proposal sponsorship dan kerjasama dengan berbagai pihak.',
    tasks: [
      'Membuat proposal sponsorship yang menarik',
      'Menghubungi dan negosiasi dengan sponsor',
      'Mengelola administrasi dan laporan keuangan',
      'Memberikan laporan realisasi ke sponsor',
    ],
    quota: 6,
    filled_quota: 2,
    requirements: null,
    display_order: 4,
    created_at: '2026-06-10T00:00:00Z',
  },
];

const divisiWorkshop: Division[] = [
  {
    id: 'div-021',
    proker_id: 'proker-003',
    name: 'Instruktur & Fasilitator',
    description: 'Memfasilitasi sesi pembelajaran dan membantu peserta dalam memahami materi workshop.',
    tasks: [
      'Menyiapkan materi dan modul workshop',
      'Memfasilitasi sesi diskusi kelompok',
      'Mendampingi peserta praktik langsung',
      'Mengevaluasi hasil karya peserta',
    ],
    quota: 10,
    filled_quota: 4,
    requirements: 'Minimal semester 4, menguasai materi yang diajarkan',
    display_order: 1,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-022',
    proker_id: 'proker-003',
    name: 'Koordinator Logistik',
    description: 'Memastikan semua kebutuhan perlengkapan dan peralatan workshop tersedia dan siap digunakan.',
    tasks: [
      'Inventarisasi dan peminjaman peralatan',
      'Setup venue sebelum acara',
      'Distribusi bahan praktik ke peserta',
      'Pengembalian dan perawatan peralatan',
    ],
    quota: 8,
    filled_quota: 1,
    requirements: null,
    display_order: 2,
    created_at: '2026-07-01T00:00:00Z',
  },
];

// ── Prokers ────────────────────────────────

export const mockProkers: Proker[] = [
  {
    id: 'proker-001',
    ukm_id: 'ukm-001',
    title: 'Proker Kreatif Visual UKM 2026',
    slug: 'proker-kreatif-visual-2026',
    description: `Program Kerja Kreatif Visual adalah inisiatif unggulan UKM Kreasi Digital yang berfokus pada pengembangan kemampuan dokumentasi dan desain visual anggota.

Program ini dirancang untuk menghasilkan konten berkualitas tinggi yang merepresentasikan kegiatan UKM secara profesional. Peserta akan mendapatkan pelatihan intensif, mentoring dari praktisi industri, dan kesempatan untuk membangun portofolio nyata.

Bergabunglah dengan tim kreatif kami dan jadilah bagian dari perjalanan membangun brand UKM yang kuat di era digital!`,
    banner_url: null,
    start_date: '2026-07-15',
    end_date: '2026-12-15',
    registration_open: '2026-07-01T00:00:00Z',
    registration_close: '2026-07-14T23:59:59Z',
    status: 'ongoing',
    documentation: [
      { url: 'https://picsum.photos/seed/doc1/800/600', caption: 'Workshop fotografi semester lalu' },
      { url: 'https://picsum.photos/seed/doc2/800/600', caption: 'Pameran karya anggota 2025' },
      { url: 'https://picsum.photos/seed/doc3/800/600', caption: 'Sesi mentoring bersama praktisi' },
      { url: 'https://picsum.photos/seed/doc4/800/600', caption: 'Tim kreatif dalam aksi' },
      { url: 'https://picsum.photos/seed/doc5/800/600', caption: 'Dokumentasi acara Dies Natalis' },
    ],
    benefits: `- Sertifikat resmi berlogo UKM dan kampus
- Portofolio kerja nyata yang bisa digunakan untuk melamar pekerjaan
- Networking dengan alumni dan praktisi industri kreatif
- Akses ke peralatan fotografi dan studio mini UKM
- Kesempatan ikut lomba fotografi dan desain bertim
- Letter of Recommendation dari ketua UKM`,
    created_at: '2026-06-01T00:00:00Z',
    updated_at: '2026-06-28T00:00:00Z',
    divisions: divisiFotografi,
  },
  {
    id: 'proker-002',
    ukm_id: 'ukm-001',
    title: 'Seminar Nasional Teknologi & Inovasi 2026',
    slug: 'seminar-nasional-tekno-2026',
    description: `Seminar Nasional Teknologi & Inovasi adalah acara tahunan bergengsi yang menghadirkan pembicara kelas dunia untuk berbagi wawasan tentang tren teknologi terkini.

Tahun ini bertema "AI & Human Collaboration: Mempersiapkan Generasi Adaptif", seminar ini akan mempertemukan lebih dari 500 peserta dari berbagai kampus di Indonesia.

Jadilah bagian dari panitia dan dapatkan pengalaman berorganisasi skala nasional!`,
    banner_url: null,
    start_date: '2026-08-20',
    end_date: '2026-08-21',
    registration_open: '2026-07-01T00:00:00Z',
    registration_close: '2026-08-10T23:59:59Z',
    status: 'ongoing',
    documentation: [
      { url: 'https://picsum.photos/seed/sem1/800/600', caption: 'Seminar nasional 2025' },
      { url: 'https://picsum.photos/seed/sem2/800/600', caption: 'Pembicara keynote dari Silicon Valley' },
      { url: 'https://picsum.photos/seed/sem3/800/600', caption: 'Sesi networking antar peserta' },
    ],
    benefits: `- Pengalaman kepanitiaan event skala nasional
- Sertifikat panitia dengan nilai SKS (tergantung kebijakan kampus)
- Free akses ke semua sesi seminar sebagai peserta
- Makan siang dan konsumsi selama acara
- Merchandise eksklusif panitia
- Kesempatan berkenalan langsung dengan pembicara nasional`,
    created_at: '2026-06-10T00:00:00Z',
    updated_at: '2026-06-29T00:00:00Z',
    divisions: divisiSeminar,
  },
  {
    id: 'proker-003',
    ukm_id: 'ukm-001',
    title: 'Workshop UI/UX Design Bootcamp',
    slug: 'workshop-uiux-bootcamp-2026',
    description: `Workshop UI/UX Design Bootcamp adalah program intensif 3 hari yang dirancang untuk mempersiapkan mahasiswa dengan skill desain digital yang relevan dengan industri.

Dipandu oleh designer berpengalaman dari startup dan perusahaan teknologi, bootcamp ini akan mencakup proses riset pengguna, wireframing, prototyping, hingga presentasi desain.

Daftarkan dirimu dan mulai perjalanan menjadi UI/UX designer profesional!`,
    banner_url: null,
    start_date: '2026-09-10',
    end_date: '2026-09-12',
    registration_open: '2026-08-01T00:00:00Z',
    registration_close: '2026-09-01T23:59:59Z',
    status: 'upcoming',
    documentation: [
      { url: 'https://picsum.photos/seed/ws1/800/600', caption: 'Workshop design thinking sebelumnya' },
      { url: 'https://picsum.photos/seed/ws2/800/600', caption: 'Peserta presentasi hasil desain' },
    ],
    benefits: `- Sertifikat workshop dari UKM dan mentor industri
- Akses materi dan recording workshop seumur hidup
- Feedback langsung dari mentor berpengalaman
- Kesempatan ikut program magang mitra UKM
- Gratis Figma Pro selama 3 bulan`,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-01T00:00:00Z',
    divisions: divisiWorkshop,
  },
  {
    id: 'proker-004',
    ukm_id: 'ukm-001',
    title: 'Pekan Seni & Budaya UKM 2025',
    slug: 'pekan-seni-budaya-2025',
    description: `Pekan Seni & Budaya adalah program tahunan yang merayakan kekayaan seni dan budaya Indonesia melalui pertunjukan, pameran, dan kompetisi.

Program ini telah sukses digelar dengan partisipasi lebih dari 200 anggota dan menghadirkan 15 pertunjukan seni dari berbagai daerah di Indonesia.`,
    banner_url: null,
    start_date: '2025-11-01',
    end_date: '2025-11-07',
    registration_open: '2025-10-01T00:00:00Z',
    registration_close: '2025-10-25T23:59:59Z',
    status: 'completed',
    documentation: [
      { url: 'https://picsum.photos/seed/psb1/800/600', caption: 'Pembukaan Pekan Seni Budaya 2025' },
      { url: 'https://picsum.photos/seed/psb2/800/600', caption: 'Pertunjukan tari tradisional' },
      { url: 'https://picsum.photos/seed/psb3/800/600', caption: 'Pameran lukisan dan fotografi' },
      { url: 'https://picsum.photos/seed/psb4/800/600', caption: 'Kompetisi musikalisasi puisi' },
    ],
    benefits: `- Sertifikat partisipasi telah diterbitkan untuk semua peserta
- Dokumentasi kegiatan tersedia di galeri digital UKM`,
    created_at: '2025-09-15T00:00:00Z',
    updated_at: '2025-11-10T00:00:00Z',
    divisions: [],
  },
];

// ── Mock Registration Results ───────────────

export const mockRegistrationResults: StatusSearchResult[] = [
  {
    id: 'reg-001',
    full_name: 'Ahmad Fauzi Ramadan',
    phone_masked: '••••••••7823',
    proker_title: 'Proker Kreatif Visual UKM 2026',
    division_name: 'Fotografer Dokumentasi',
    status: 'accepted',
    registered_at: '2026-07-02T09:30:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-002',
    full_name: 'Siti Nurhaliza Putri',
    phone_masked: '••••••••4512',
    proker_title: 'Seminar Nasional Teknologi & Inovasi 2026',
    division_name: 'Panitia Acara (OC)',
    status: 'pending',
    registered_at: '2026-07-03T14:20:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-003',
    full_name: 'Budi Santoso',
    phone_masked: '••••••••9901',
    proker_title: 'Pekan Seni & Budaya UKM 2025',
    division_name: 'Tim Dokumentasi',
    status: 'accepted',
    registered_at: '2025-10-10T11:00:00Z',
    proker_status: 'completed',
    certificate_code: 'UKM-PSB-K7X2M',
  },
  {
    id: 'reg-004',
    full_name: 'Dewi Rahayu',
    phone_masked: '••••••••3344',
    proker_title: 'Proker Kreatif Visual UKM 2026',
    division_name: 'Desainer Grafis',
    status: 'waitlist',
    registered_at: '2026-07-05T16:45:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-005',
    full_name: 'Reza Firmansyah',
    phone_masked: '••••••••6678',
    proker_title: 'Seminar Nasional Teknologi & Inovasi 2026',
    division_name: 'Divisi Publikasi & Dekorasi',
    status: 'rejected',
    registered_at: '2026-07-04T08:15:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
];

// ── UKM Info ───────────────────────────────

export const ukmInfo = {
  name: 'UKM Kreasi Digital',
  shortName: 'Kreasi Digital',
  tagline: 'Berkreasi, Berinovasi, Menginspirasi',
  description: 'Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kreativitas digital, fotografi, desain, dan multimedia.',
  totalProkers: 12,
  totalAnggota: 340,
  totalPendaftar: 1250,
  foundedYear: 2018,
  socialMedia: {
    instagram: '@ukmkreasidgital',
    lineGroup: 'line://ti/g/kreasi-digital',
  },
};

// ── FAQ ────────────────────────────────────

export const faqItems = [
  {
    question: 'Apakah pendaftaran memerlukan akun atau login?',
    answer: 'Tidak! Pendaftaran proker UKM sepenuhnya gratis dan tidak memerlukan pembuatan akun. Cukup isi nama lengkap dan nomor HP kamu, dan kamu sudah terdaftar.',
  },
  {
    question: 'Bagaimana cara mengecek status pendaftaran saya?',
    answer: 'Kamu bisa cek status kapan saja di halaman "Cek Status" menggunakan nama lengkap atau nomor HP yang kamu daftarkan. Status akan diperbarui secara real-time oleh admin.',
  },
  {
    question: 'Apakah bisa mendaftar lebih dari satu divisi?',
    answer: 'Dalam satu proker, kamu hanya bisa mendaftar ke satu divisi. Namun, kamu boleh mendaftar ke proker yang berbeda secara bersamaan.',
  },
  {
    question: 'Apa yang terjadi jika kuota divisi sudah penuh?',
    answer: 'Jika kuota penuh, kamu bisa mendaftar sebagai waitlist. Kamu akan otomatis dipromosikan jika ada peserta yang mengundurkan diri atau kuota ditambah oleh admin.',
  },
  {
    question: 'Kapan sertifikat akan diterbitkan?',
    answer: 'Sertifikat digital akan diterbitkan setelah proker selesai (status "Completed") untuk peserta yang berstatus "Diterima". Kamu bisa download langsung dari halaman Cek Status.',
  },
  {
    question: 'Bagaimana cara bergabung ke grup WhatsApp setelah diterima?',
    answer: 'Setelah status pendaftaranmu berubah menjadi "Diterima", akan muncul tombol "Join Grup WA" di halaman Cek Status. Link grup akan aktif sampai 7 hari setelah pengumuman.',
  },
];
