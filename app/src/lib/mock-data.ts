// =============================================
// UKM Proker Registration Portal — Mock Data
// =============================================

import { Proker, Division, StatusSearchResult } from '@/types';

// ── Divisions ──────────────────────────────

const divisiMakrab: Division[] = [
  {
    id: 'div-001',
    proker_id: 'proker-001',
    name: 'Acara',
    description: 'Bertanggung jawab menyusun, mengatur, dan memastikan seluruh rangkaian acara berjalan sesuai rundown.',
    tasks: [
      'Menyusun konsep dan rundown acara',
      'Mengatur jalannya acara selama pelaksanaan',
      'Berkoordinasi dengan seluruh divisi',
      'Memastikan setiap sesi berjalan tepat waktu',
    ],
    quota: 6,
    filled_quota: 3,
    requirements: 'Mampu bekerja sama, komunikatif, dan bertanggung jawab',
    display_order: 1,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-002',
    proker_id: 'proker-001',
    name: 'Humas & Keamanan',
    description: 'Mengelola komunikasi dengan peserta serta menjaga keamanan dan ketertiban selama acara berlangsung.',
    tasks: [
      'Memberikan informasi kepada peserta',
      'Menjadi penghubung dengan pihak eksternal',
      'Menjaga keamanan dan ketertiban acara',
      'Mengatur alur keluar masuk peserta',
    ],
    quota: 6,
    filled_quota: 2,
    requirements: 'Komunikatif, ramah, dan sigap dalam menangani situasi',
    display_order: 2,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-003',
    proker_id: 'proker-001',
    name: 'PDD (Publikasi, Dokumentasi & Desain)',
    description: 'Bertugas mendokumentasikan kegiatan serta membuat media publikasi dan desain acara.',
    tasks: [
      'Mengambil foto dan video selama acara',
      'Membuat desain poster dan media publikasi',
      'Melakukan editing dokumentasi',
      'Mengelola publikasi di media sosial',
    ],
    quota: 7,
    filled_quota: 4,
    requirements: 'Menguasai Canva, Figma, atau software desain lainnya menjadi nilai tambah',
    display_order: 3,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-004',
    proker_id: 'proker-001',
    name: 'P3K',
    description: 'Bertanggung jawab memberikan pertolongan pertama apabila terjadi kondisi darurat selama acara.',
    tasks: [
      'Menyiapkan perlengkapan P3K',
      'Memberikan pertolongan pertama kepada peserta',
      'Memantau kondisi kesehatan peserta',
      'Berkoordinasi dengan tenaga medis jika diperlukan',
    ],
    quota: 4,
    filled_quota: 1,
    requirements: 'Memiliki pengetahuan dasar mengenai pertolongan pertama menjadi nilai tambah',
    display_order: 4,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-005',
    proker_id: 'proker-001',
    name: 'Logistik',
    description: 'Mengelola seluruh perlengkapan dan kebutuhan teknis yang digunakan selama acara berlangsung.',
    tasks: [
      'Menyiapkan perlengkapan acara',
      'Mengatur distribusi peralatan',
      'Memastikan seluruh kebutuhan teknis tersedia',
      'Melakukan pengecekan dan inventarisasi barang',
    ],
    quota: 5,
    filled_quota: 2,
    requirements: 'Teliti, disiplin, dan mampu bekerja di lapangan',
    display_order: 5,
    created_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'div-006',
    proker_id: 'proker-001',
    name: 'Konsumsi',
    description: 'Mengatur penyediaan makanan dan minuman bagi panitia, peserta, serta tamu undangan.',
    tasks: [
      'Menentukan kebutuhan konsumsi',
      'Berkoordinasi dengan vendor atau katering',
      'Mendistribusikan konsumsi kepada peserta',
      'Memastikan konsumsi tersedia sesuai jadwal',
    ],
    quota: 5,
    filled_quota: 3,
    requirements: 'Mampu bekerja sama dan memiliki manajemen waktu yang baik',
    display_order: 6,
    created_at: '2026-06-01T00:00:00Z',
  },
];

const divisiTahuConnect: Division[] = [
  {
    id: 'div-011',
    proker_id: 'proker-002',
    name: 'Acara',
    description: 'Merancang konsep dan memastikan seluruh rangkaian kegiatan Tahu Connect berjalan sesuai rundown.',
    tasks: [
      'Menyusun konsep dan susunan acara',
      'Mengatur jalannya acara',
      'Berkoordinasi dengan MC dan pengisi acara',
      'Memastikan setiap sesi berjalan tepat waktu',
    ],
    quota: 8,
    filled_quota: 8,
    requirements: 'Mampu bekerja dalam tim dan memiliki komunikasi yang baik',
    display_order: 1,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-012',
    proker_id: 'proker-002',
    name: 'Humas',
    description: 'Menjalin komunikasi dengan peserta, alumni, serta tamu undangan sebelum dan selama acara berlangsung.',
    tasks: [
      'Menyebarkan informasi acara',
      'Menghubungi narasumber dan tamu undangan',
      'Melayani pertanyaan peserta',
      'Membangun komunikasi dengan pihak eksternal',
    ],
    quota: 6,
    filled_quota: 4,
    requirements: null,
    display_order: 2,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-013',
    proker_id: 'proker-002',
    name: 'PDD (Publikasi, Dokumentasi & Desain)',
    description: 'Membuat media publikasi sekaligus mendokumentasikan seluruh kegiatan Tahu Connect.',
    tasks: [
      'Membuat desain publikasi',
      'Mengambil foto dan video selama acara',
      'Mengedit hasil dokumentasi',
      'Mengunggah konten ke media sosial',
    ],
    quota: 7,
    filled_quota: 3,
    requirements: 'Menguasai Canva, Figma, atau software editing menjadi nilai tambah',
    display_order: 3,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-014',
    proker_id: 'proker-002',
    name: 'Logistik',
    description: 'Menyiapkan dan mengelola seluruh perlengkapan yang dibutuhkan selama acara berlangsung.',
    tasks: [
      'Menyiapkan perlengkapan acara',
      'Mengatur distribusi alat',
      'Melakukan pengecekan inventaris',
      'Memastikan seluruh kebutuhan teknis tersedia',
    ],
    quota: 6,
    filled_quota: 3,
    requirements: null,
    display_order: 4,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-015',
    proker_id: 'proker-002',
    name: 'Konsumsi',
    description: 'Mengatur kebutuhan konsumsi bagi panitia, peserta, dan tamu undangan.',
    tasks: [
      'Menentukan kebutuhan konsumsi',
      'Berkoordinasi dengan vendor',
      'Mendistribusikan konsumsi',
      'Memastikan konsumsi tersedia tepat waktu',
    ],
    quota: 5,
    filled_quota: 2,
    requirements: null,
    display_order: 5,
    created_at: '2026-06-10T00:00:00Z',
  },
  {
    id: 'div-016',
    proker_id: 'proker-002',
    name: 'Liaison Officer (LO)',
    description: 'Mendampingi narasumber, tamu undangan, maupun pengisi acara selama kegiatan berlangsung.',
    tasks: [
      'Mendampingi narasumber',
      'Mengatur kebutuhan narasumber',
      'Menjadi penghubung dengan panitia inti',
      'Memastikan jadwal narasumber berjalan lancar',
    ],
    quota: 4,
    filled_quota: 4,
    requirements: null,
    display_order: 6,
    created_at: '2026-06-10T00:00:00Z',
  },
];

const divisiTahuVisit: Division[] = [
  {
    id: 'div-021',
    proker_id: 'proker-003',
    name: 'Acara',
    description: 'Bertanggung jawab menyusun dan mengatur seluruh rangkaian kegiatan Tahu Visit agar berjalan sesuai jadwal.',
    tasks: [
      'Menyusun rundown kegiatan',
      'Berkoordinasi dengan perusahaan tujuan',
      'Memastikan kegiatan berjalan sesuai jadwal',
      'Mengatur jalannya sesi kunjungan dan sharing',
    ],
    quota: 6,
    filled_quota: 4,
    requirements: 'Mampu bekerja sama dan memiliki komunikasi yang baik',
    display_order: 1,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-022',
    proker_id: 'proker-003',
    name: 'Humas & Keamanan',
    description: 'Mengelola komunikasi dengan perusahaan tujuan serta menjaga ketertiban peserta selama kegiatan.',
    tasks: [
      'Berkomunikasi dengan pihak perusahaan',
      'Memberikan informasi kepada peserta',
      'Menjaga ketertiban selama kunjungan',
      'Mengatur alur keberangkatan dan kepulangan',
    ],
    quota: 5,
    filled_quota: 3,
    requirements: 'Komunikatif dan mampu bekerja di lapangan',
    display_order: 2,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-023',
    proker_id: 'proker-003',
    name: 'PDD (Publikasi, Dokumentasi & Desain)',
    description: 'Mendokumentasikan seluruh rangkaian kegiatan serta membuat materi publikasi Tahu Visit.',
    tasks: [
      'Mengambil foto dan video kegiatan',
      'Membuat desain publikasi',
      'Mengedit dokumentasi',
      'Mengunggah dokumentasi ke media sosial',
    ],
    quota: 6,
    filled_quota: 5,
    requirements: 'Menguasai Canva atau software editing menjadi nilai tambah',
    display_order: 3,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-024',
    proker_id: 'proker-003',
    name: 'P3K',
    description: 'Menyiapkan pertolongan pertama serta memantau kondisi kesehatan peserta selama kegiatan berlangsung.',
    tasks: [
      'Menyiapkan perlengkapan P3K',
      'Memberikan pertolongan pertama',
      'Memastikan kondisi peserta tetap aman',
      'Berkoordinasi jika terjadi keadaan darurat',
    ],
    quota: 3,
    filled_quota: 1,
    requirements: 'Memiliki pengetahuan dasar mengenai P3K menjadi nilai tambah',
    display_order: 4,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-025',
    proker_id: 'proker-003',
    name: 'Logistik',
    description: 'Mengelola seluruh perlengkapan dan kebutuhan operasional selama kegiatan Tahu Visit.',
    tasks: [
      'Menyiapkan perlengkapan keberangkatan',
      'Mengatur inventaris barang',
      'Memastikan seluruh perlengkapan tersedia',
      'Melakukan pengecekan sebelum dan sesudah kegiatan',
    ],
    quota: 5,
    filled_quota: 2,
    requirements: 'Teliti dan bertanggung jawab',
    display_order: 5,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-026',
    proker_id: 'proker-003',
    name: 'Konsumsi',
    description: 'Mengatur kebutuhan konsumsi bagi peserta dan panitia selama kegiatan berlangsung.',
    tasks: [
      'Menentukan kebutuhan konsumsi',
      'Berkoordinasi dengan vendor',
      'Mendistribusikan konsumsi',
      'Memastikan konsumsi tersedia tepat waktu',
    ],
    quota: 4,
    filled_quota: 2,
    requirements: 'Mampu bekerja sama dan memiliki manajemen waktu yang baik',
    display_order: 6,
    created_at: '2026-07-01T00:00:00Z',
  },
];

const divisiTahuCompile: Division[] = [
  {
    id: 'div-027',
    proker_id: 'proker-004',
    name: 'Acara',
    description: 'Bertanggung jawab menyusun dan menjalankan seluruh rangkaian kegiatan Tahu Compile selama bulan Ramadhan.',
    tasks: [
      'Menyusun konsep dan rundown acara',
      'Mengatur jalannya kegiatan buka bersama dan kajian',
      'Berkoordinasi dengan seluruh divisi',
      'Memastikan acara berjalan sesuai jadwal',
    ],
    quota: 6,
    filled_quota: 6,
    requirements: 'Mampu bekerja sama dan memiliki komunikasi yang baik',
    display_order: 1,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-028',
    proker_id: 'proker-004',
    name: 'Humas & Keamanan',
    description: 'Mengelola komunikasi dengan peserta serta menjaga keamanan dan ketertiban selama kegiatan Ramadhan berlangsung.',
    tasks: [
      'Memberikan informasi kepada peserta',
      'Menghubungi tamu undangan',
      'Menjaga keamanan dan ketertiban acara',
      'Mengatur alur peserta selama kegiatan',
    ],
    quota: 5,
    filled_quota: 5,
    requirements: 'Komunikatif, ramah, dan sigap',
    display_order: 2,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-029',
    proker_id: 'proker-004',
    name: 'PDD (Publikasi, Dokumentasi & Desain)',
    description: 'Mendokumentasikan seluruh kegiatan Tahu Compile serta membuat media publikasi acara.',
    tasks: [
      'Mengambil foto dan video kegiatan',
      'Membuat desain publikasi',
      'Mengedit dokumentasi acara',
      'Mengunggah dokumentasi ke media sosial',
    ],
    quota: 6,
    filled_quota: 6,
    requirements: 'Menguasai Canva atau software editing menjadi nilai tambah',
    display_order: 3,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-030',
    proker_id: 'proker-004',
    name: 'P3K',
    description: 'Menyiapkan pertolongan pertama dan memastikan kesehatan peserta selama kegiatan berlangsung.',
    tasks: [
      'Menyiapkan perlengkapan P3K',
      'Memberikan pertolongan pertama bila diperlukan',
      'Memantau kondisi kesehatan peserta',
      'Berkoordinasi dengan tenaga medis jika terjadi keadaan darurat',
    ],
    quota: 3,
    filled_quota: 3,
    requirements: 'Memiliki pengetahuan dasar mengenai P3K menjadi nilai tambah',
    display_order: 4,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-031',
    proker_id: 'proker-004',
    name: 'Logistik',
    description: 'Mengelola seluruh perlengkapan dan kebutuhan operasional selama kegiatan Ramadhan.',
    tasks: [
      'Menyiapkan perlengkapan acara',
      'Mengatur inventaris barang',
      'Memastikan perlengkapan siap digunakan',
      'Melakukan pengecekan sebelum dan sesudah kegiatan',
    ],
    quota: 5,
    filled_quota: 5,
    requirements: 'Teliti dan bertanggung jawab',
    display_order: 5,
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'div-032',
    proker_id: 'proker-004',
    name: 'Konsumsi',
    description: 'Mengatur penyediaan konsumsi berbuka puasa, takjil, serta makanan bagi peserta dan panitia.',
    tasks: [
      'Menentukan kebutuhan konsumsi',
      'Berkoordinasi dengan vendor atau katering',
      'Membagikan takjil dan makanan berbuka',
      'Memastikan konsumsi tersedia tepat waktu',
    ],
    quota: 5,
    filled_quota: 5,
    requirements: 'Mampu bekerja sama dan memiliki manajemen waktu yang baik',
    display_order: 6,
    created_at: '2026-07-01T00:00:00Z',
  },
];

// ── Prokers ────────────────────────────────

export const mockProkers: Proker[] = [
  {
    id: 'proker-001',
    ukm_id: 'ukm-001',
    title: 'MALAM KEAKRABAN',
    slug: 'malam-keakraban',
    description: `Program Kerja Malam Keakraban (Makrab) merupakan kegiatan yang bertujuan 
    untuk mempererat hubungan, membangun kekompakan, serta menumbuhkan rasa kekeluargaan antar anggota UKM. 
    Melalui berbagai aktivitas seperti permainan kelompok, diskusi, sesi kebersamaan, dan hiburan, peserta akan saling mengenal lebih dekat serta meningkatkan kerja sama dalam tim. 
    Kegiatan ini diharapkan dapat menciptakan lingkungan organisasi yang harmonis, solid, dan penuh semangat sehingga mampu mendukung keberhasilan setiap program kerja UKM di masa mendatang.`,
    banner_url: null,
    start_date: '2026-08-11',
    end_date: '2026-08-12',
    registration_open: '2026-07-01T00:00:00Z',
    registration_close: '2026-07-08T23:59:59Z',
    status: 'ongoing',
    documentation: [
      { url: '/images/documentation/Penghargaan.png', caption: 'Pemberian Penghargaan' },
      { url: '/images/documentation/Penyematan.png', caption: 'Penyematan ID CARD Anggota UKM' },
      { url: '/images/documentation/Senam.png', caption: 'Senam Pagi' },
      { url: '/images/documentation/Sarapan.png', caption: 'Sarapan Bersama' },
      { url: '/images/documentation/Pentas.png', caption: 'Pentas Kelompok' },
    ],
    benefits: `Menambah relasi dan mempererat tali persaudaraan antar anggota UKM
  Meningkatkan rasa kekeluargaan dan solidaritas dalam organisasi
  Networking dengan alumni dan praktisi industri kreatif
  Melatih kerja sama tim melalui berbagai permainan dan aktivitas kelompok
  Membangun komunikasi yang lebih baik antar anggota baru dan lama
  Mendapatkan pengalaman seru melalui kegiatan kebersamaan di alam terbuka
  Menciptakan kenangan berharga bersama keluarga besar UKM`,
    created_at: '2026-06-01T00:00:00Z',
    updated_at: '2026-06-28T00:00:00Z',
    divisions: divisiMakrab,
  },
  {
    id: 'proker-002',
    ukm_id: 'ukm-001',
    title: 'Tahu Connect',
    slug: 'tahu-connect',
    description: `Tahu Connect adalah kegiatan yang bertujuan untuk memperkenalkan anggota baru dengan keluarga besar Tahu Ngoding sekaligus membangun rasa kebersamaan sejak awal bergabung. 
    Melalui berbagai aktivitas interaktif, peserta akan lebih mengenal budaya organisasi, memperluas relasi, serta meningkatkan semangat kolaborasi antar anggota.`,
    banner_url: null,
    start_date: '2026-08-20',
    end_date: '2026-08-21',
    registration_open: '2026-07-01T00:00:00Z',
    registration_close: '2026-08-10T23:59:59Z',
    status: 'ongoing',
    documentation: [
      { url: '/images/documentation/connect1.jpeg', caption: 'Seminar nasional 2025' },
      { url: '/images/documentation/connect2.jpeg', caption: 'Pembicara keynote dari Silicon Valley' },
      { url: '/images/documentation/connect3.jpeg', caption: 'Sesi networking antar peserta' },
      { url: '/images/documentation/connect4.jpeg', caption: 'Sesi networking antar peserta' },
    ],
    benefits: `Meningkatkan kemampuan leadership dan manajemen acara
    Melatih komunikasi, koordinasi, dan kerja sama tim
    Memperluas relasi dengan anggota, alumni, dan pengurus Tahu Ngoding
    Menambah pengalaman dalam menyelenggarakan sebuah event organisasi
    Membangun rasa tanggung jawab dan profesionalisme dalam kepanitiaan
    Mendapatkan sertifikat kepanitiaan serta pengalaman yang bermanfaat`,
    created_at: '2026-06-10T00:00:00Z',
    updated_at: '2026-06-29T00:00:00Z',
    divisions: divisiTahuConnect,
  },
  {
    id: 'proker-003',
    ukm_id: 'ukm-001',
    title: 'Tahu Visit',
    slug: 'tahu-visit',
    description: `Tahu Visit merupakan program kerja Tahu Ngoding yang bertujuan untuk memperluas wawasan anggota melalui kegiatan kunjungan ke perusahaan, startup, 
    maupun institusi yang bergerak di bidang teknologi dan industri kreatif. Melalui kegiatan ini, peserta dapat mengenal dunia kerja secara langsung, memahami perkembangan teknologi terkini, 
    serta mendapatkan pengalaman belajar dari para profesional. 
    Bergabunglah sebagai panitia Tahu Visit dan jadilah bagian dari tim yang menghadirkan pengalaman edukatif serta inspiratif bagi seluruh anggota Tahu Ngoding.`,
    banner_url: null,
    start_date: '2026-08-12',
    end_date: '2026-08-12',
    registration_open: '2026-07-01T00:00:00Z',
    registration_close: '2026-07-15T23:59:59Z',
    status: 'upcoming',
    documentation: [

    ],
    benefits: `Menambah wawasan mengenai dunia kerja dan industri teknologi
    Memperluas relasi dengan perusahaan, startup, dan profesional di bidang IT
    Melatih kemampuan komunikasi, koordinasi, dan kerja sama tim
    Mendapatkan pengalaman dalam menyelenggarakan kegiatan kunjungan industri      Meningkatkan kemampuan problem solving dan manajemen acara
    Membangun pengalaman organisasi yang bermanfaat untuk pengembangan diri`,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-01T00:00:00Z',
    divisions: divisiTahuVisit,
  },
  {
    id: 'proker-004',
    ukm_id: 'ukm-001',
    title: 'Tahu Compile',
    slug: 'tahu-compile',
    description: `Tahu Compile merupakan program kerja Tahu Ngoding yang diselenggarakan selama bulan suci Ramadhan sebagai wadah untuk mempererat tali silaturahmi serta meningkatkan nilai kebersamaan antar anggota. 
    Kegiatan ini menghadirkan berbagai rangkaian acara seperti buka puasa bersama, kajian inspiratif, berbagi kepada sesama, dan aktivitas kebersamaan lainnya yang menciptakan suasana hangat dan penuh makna. 
    Bergabunglah sebagai panitia Tahu Compile dan berkontribusilah dalam menghadirkan momen Ramadhan yang berkesan bagi keluarga besar Tahu Ngoding.`,
    banner_url: null,
    start_date: '2026-03-15',
    end_date: '2026-03-15',
    registration_open: '2026-02-01T00:00:00Z',
    registration_close: '2026-02-10T23:59:59Z',
    status: 'completed',
    documentation: [
      { url: '/images/documentation/TahuCompile-024.jpg', caption: 'Pembukaan Pekan Seni Budaya 2025' },
      { url: '/images/documentation/TahuCompile-025.jpg', caption: 'Pertunjukan tari tradisional' },
      { url: '/images/documentation/TahuCompile-030.jpg', caption: 'Pameran lukisan dan fotografi' },
      { url: '/images/documentation/TahuCompile-095.jpg', caption: 'Kompetisi musikalisasi puisi' },
    ],
    benefits: `Mempererat tali silaturahmi antar anggota Tahu Ngoding              Menumbuhkan semangat kebersamaan dan kepedulian sosial
    Melatih kemampuan bekerja sama dalam kepanitiaan acara Ramadhan
    Mendapatkan pengalaman mengelola kegiatan sosial dan keagamaan
    Meningkatkan rasa tanggung jawab, kepemimpinan, dan komunikasi
    Menciptakan momen Ramadhan yang bermakna bersama keluarga besar Tahu Ngoding`,
    created_at: '2025-09-15T00:00:00Z',
    updated_at: '2025-11-10T00:00:00Z',
    divisions: divisiTahuCompile,
  },
];

// ── Mock Registration Results ───────────────

export const mockRegistrationResults: StatusSearchResult[] = [
  {
    id: 'reg-001',
    full_name: 'Ahmad Fauzi Ramadan',
    phone_masked: '••••••••7823',
    proker_title: 'Malam Keakraban',
    division_name: 'Divisi Acara',
    status: 'accepted',
    registered_at: '2026-07-02T09:30:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-002',
    full_name: 'Siti Nurhaliza Putri',
    phone_masked: '••••••••4512',
    proker_title: 'Tahu Connect',
    division_name: 'Divisi Publikasi & Dokumentasi',
    status: 'pending',
    registered_at: '2026-07-03T14:20:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-003',
    full_name: 'Budi Santoso',
    phone_masked: '••••••••9901',
    proker_title: 'Tahu Compile',
    division_name: 'Divisi Konsumsi',
    status: 'accepted',
    registered_at: '2026-05-18T11:00:00Z',
    proker_status: 'completed',
    certificate_code: 'THC-2026-K7X2M',
  },
  {
    id: 'reg-004',
    full_name: 'Dewi Rahayu',
    phone_masked: '••••••••3344',
    proker_title: 'Tahu Visit',
    division_name: 'Divisi Humas',
    status: 'waitlist',
    registered_at: '2026-07-05T16:45:00Z',
    proker_status: 'ongoing',
    certificate_code: undefined,
  },
  {
    id: 'reg-005',
    full_name: 'Reza Firmansyah',
    phone_masked: '••••••••6678',
    proker_title: 'Tahu Connect',
    division_name: 'Sie Perlengkapan',
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
