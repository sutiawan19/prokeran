# PROKERAN - Portal Pendaftaran Program Kerja UKM

Prokeran adalah platform inovatif berbasis web yang dirancang khusus untuk mempermudah Unit Kegiatan Mahasiswa (UKM) dalam mengelola program kerja (proker) dan proses pendaftaran anggotanya. Website ini dibuat sebagai proyek **Tugas Akhir/UAS**.

## 🚀 Fitur Utama

### 1. Portal Publik (Calon Peserta)
- **Landing Page Interaktif**: Menampilkan informasi proker aktif dengan desain *Neo-Brutalist* yang menarik.
- **Pendaftaran Tanpa Login**: Calon peserta dapat langsung mendaftar ke divisi proker yang diminati dengan form yang cepat dan responsif.
- **Lacak Status Pendaftaran**: Peserta mendapatkan Nomor Pendaftaran (*Tracking ID*) unik setelah mendaftar dan dapat menggunakannya untuk mengecek status seleksi (Menunggu, Diterima, Ditolak).
- **Aksi Cepat**: Notifikasi instan, tautan ke Grup WhatsApp.

### 2. Dashboard Admin (Pengurus UKM)
- **Manajemen Proker (CRUD)**: Admin dapat menambah, mengubah, melihat, dan menghapus program kerja.
- **Manajemen Pendaftar**: Antarmuka tabel untuk mereview, memfilter (berdasarkan status/divisi), serta mengubah status kelulusan peserta.
- **Statistik Cepat (Overview)**: Tampilan ringkas mengenai total pendaftar, kuota, dan status (diterima/ditolak).
- **Desain Minimalis Elegan**: Tema *dashboard* yang bersih (berbeda dari desain *bold* pada halaman publik) untuk kenyamanan pengelolaan data.

---

## 🛠️ Tech Stack & Library

Proyek ini dibangun menggunakan teknologi web modern untuk memastikan performa yang cepat dan antarmuka yang dinamis:

- **Framework Core**: [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) (Strict Typing)
- **Styling & Layouting**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Komponen UI (Design System)**: [shadcn/ui](https://ui.shadcn.com/) (dibangun di atas Radix UI)
- **Animasi & Interaksi**: [Framer Motion](https://www.framer.com/motion/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Database/Penyimpanan**: *Local JSON Store* (`data.json`) dan *Mock Database Utility* (sebagai simulasi *database* ringan).
- **Software Code**: Antigravity
- **AI Tools**: Claude & Gemini

---

## 👥 Anggota Kelompok

Proyek UAS ini dikembangkan oleh:

1. **Athiyya Salsabila Hermawan** - 240160221053
2. **Rasya Putri Ramadhani** - 240160221055
3. **Salwa Ananda Rachmat** - 240160221043
4. **Sutiawan** - 240160221046


---

## 💻 Cara Menjalankan Proyek (Lokal)

1. Pastikan Anda telah menginstal Node.js di komputer Anda.
2. Buka terminal dan arahkan ke direktori proyek (`app`).
3. Instal semua dependensi:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` di *browser* Anda untuk melihat hasilnya.

---

✨ *Dibuat dengan dedikasi untuk menyempurnakan manajemen kegiatan kampus.*
