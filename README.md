# PROKERAN - Portal Pendaftaran Program Kerja UKM

## 👥 Nama Kelompok & NIM Anggota

1. **Athiyya Salsabila Hermawan** - 240160221053
2. **Rasya Putri Ramadhani** - 240160221055
3. **Salwa Ananda Rachmat** - 240160221043
4. **Sutiawan** - 240160221046

---

## 🌐 Link Demo Live

- **URL Vercel**: [https://prokeran.vercel.app](https://prokeran.vercel.app)

---

## 📝 Tema & Deskripsi Aplikasi

**Tema:** Sistem Informasi Manajemen Kepanitiaan/Kegiatan Mahasiswa (UKM).

**Latar Belakang & Deskripsi:**
Prokeran adalah platform inovatif berbasis web yang dirancang khusus untuk mempermudah Unit Kegiatan Mahasiswa (UKM) dalam mengelola program kerja (proker) dan mendigitalisasi proses pendaftaran anggotanya. Website ini dibuat sebagai proyek **Tugas Akhir/UAS** untuk mengatasi masalah pendaftaran kepanitiaan yang berserakan, kurang transparan, dan rumit untuk direkap, menjadi satu portal yang terpusat dan modern.

**Fitur Utama:**
1. **Portal Publik (Calon Peserta)**
   - **Landing Page Interaktif**: Menampilkan informasi proker aktif dengan desain *Neo-Brutalist* yang menarik.
   - **Pendaftaran Tanpa Login**: Calon peserta dapat langsung mendaftar ke divisi proker yang diminati dengan form yang cepat dan responsif.
   - **Lacak Status Pendaftaran**: Peserta mendapatkan Nomor Pendaftaran (*Tracking ID*) unik setelah mendaftar dan dapat menggunakannya untuk mengecek status seleksi (Menunggu, Diterima, Ditolak).
   - **Aksi Cepat**: Notifikasi instan dan tautan ke Grup WhatsApp bagi yang lolos.
2. **Dashboard Admin (Pengurus UKM)**
   - **Manajemen Proker (CRUD)**: Admin dapat menambah, mengubah, melihat, dan menghapus program kerja.
   - **Manajemen Pendaftar**: Antarmuka tabel untuk mereview, memfilter (berdasarkan status/divisi), serta mengubah status kelulusan peserta.
   - **Statistik Cepat (Overview)**: Tampilan ringkas mengenai total pendaftar, kuota, dan status (diterima/ditolak).

---

## 💾 Struktur Data

Aplikasi ini menggunakan sistem penyimpanan berbasis JSON (`data.json`) untuk mensimulasikan *database* secara ringan. Terdapat dua struktur objek/properti data utama yang saling berelasi:

### 1. Objek `Proker` (Program Kerja)
Menyimpan informasi spesifik tentang kegiatan yang dibuka.
```json
{
  "id": "string (UUID unik dari program kerja)",
  "title": "string (Nama/Judul Proker)",
  "slug": "string (URL-friendly name untuk sistem routing)",
  "status": "string ('ongoing', 'upcoming', 'completed')",
  "description": "string (Deskripsi lengkap kegiatan)",
  "benefits": "string[] (Daftar benefit/keuntungan, cth: ['Sertifikat', 'Relasi'])",
  "divisions": [
    {
      "id": "string (UUID unik divisi)",
      "name": "string (Nama divisi, cth: 'Acara', 'Humas')",
      "quota": "number (Kapasitas maksimal pendaftar)"
    }
  ],
  "banner_url": "string (URL banner gambar proker)"
}
```

### 2. Objek `Registration` (Pendaftar)
Menyimpan data historis mahasiswa yang mendaftar beserta status kelulusannya.
```json
{
  "id": "string (Nomor Pendaftaran Unik, cth: 'REG-XXX')",
  "proker_id": "string (Foreign Key ke ID Proker)",
  "proker_title": "string (Nama Proker yang didaftar)",
  "division_id": "string (Foreign Key ke ID Divisi)",
  "division_name": "string (Nama Divisi yang dipilih)",
  "name": "string (Nama lengkap pendaftar)",
  "nim": "string (Nomor Induk Mahasiswa)",
  "whatsapp": "string (Nomor Kontak aktif)",
  "status": "string ('pending', 'accepted', 'rejected')",
  "registered_at": "string (ISO 8601 Tanggal pendaftaran)"
}
```

---

## 🛠️ Tech Stack & Library

- **Framework Core**: [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) (Strict Typing)
- **Styling & Layouting**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Komponen UI (Design System)**: [shadcn/ui](https://ui.shadcn.com/)
- **Animasi & Interaksi**: [Framer Motion](https://www.framer.com/motion/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Database**: *Local JSON Store* (`data.json`)
- **Software Code**: Antigravity
- **AI Tools**: Claude & Gemini

---

## 💻 Cara Menjalankan Proyek (Lokal)

1. Buka terminal dan arahkan ke direktori proyek (`app`).
2. Instal semua dependensi dengan menjalankan perintah:
   ```bash
   npm install
   ```
3. Mulai *development server* dengan menjalankan perintah:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:3000` di *browser* Anda untuk melihat hasilnya.

---
✨ *Dibuat dengan dedikasi untuk menyempurnakan manajemen kegiatan kampus.*
