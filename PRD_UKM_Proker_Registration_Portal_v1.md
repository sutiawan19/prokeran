# Product Requirements Document (PRD)
## UKM Proker Registration Portal v1.0

**Document Version:** 1.0  
**Date:** 2026-07-01  
**Author:** Product Owner  
**Status:** Draft → Ready for Development  
**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Supabase, Vercel  
**Target Platform:** Web (Responsive Desktop & Mobile)

---

## 1. Executive Summary

### 1.1 Product Vision
Membangun portal pendaftaran program kerja (proker) UKM yang **tanpa login untuk user**, **admin dashboard terpisah**, dan **sertifikat digital otomatis**. Sistem ini menggantikan proses pendaftaran manual (Google Form/Spreadsheet) menjadi satu platform terintegrasi dengan real-time quota tracking, status tracking, dan sertifikat generator.

### 1.2 Problem Statement
- Pendaftaran divisi proker masih manual via form terpisah
- Tidak ada visibility real-time untuk sisa kuota divisi
- Pendaftar tidak bisa cek status penerimaan secara mandiri
- Distribusi sertifikat masih manual dan tidak terstruktur
- Admin kesulitan filter dan manage pendaftar per proker

### 1.3 Success Metrics
- 100% pendaftaran via portal (0% manual form)
- < 3 detik load time untuk landing page
- Real-time quota update tanpa refresh
- Admin bisa review pendaftar dalam < 2 klik per aksi
- Sertifikat generate < 5 detik per peserta

---

## 2. Scope & Boundaries

### 2.1 In Scope (MVP)
- Single UKM scope (extensible schema untuk multi-UKM di v2)
- Public landing: list proker ongoing
- Detail proker: deskripsi, dokumentasi gallery, benefit
- Divisi registration cards dengan real-time kuota
- No-login registration (nama + no HP)
- Status tracking via nama/HP search
- Admin dashboard: CRUD proker, manage divisi, review pendaftar
- Filter pendaftar by proker & divisi
- Sertifikat digital generator & download
- QR code verification untuk sertifikat
- WhatsApp group CTA untuk pendaftar diterima
- Export CSV pendaftar

### 2.2 Out of Scope (Future Releases)
- Multi-UKM support (v2)
- Payment/registration fee
- Email notification system (v1.5)
- WhatsApp API gateway (v1.5)
- Mobile native app
- AI chatbot assistant
- Gamification/point system

---

## 3. User Personas & Stories

### 3.1 Persona: Calon Anggota (Public User)
**Name:** Mahasiswa Baru  
**Goal:** Mendaftar divisi proker UKM yang diminati  
**Pain Point:** Tidak tahu sisa kuota, harus nunggu email lama untuk status

**User Stories:**
1. Sebagai calon anggota, saya ingin melihat list proker yang sedang berjalan agar bisa memilih proker yang sesuai minat.
2. Sebagai calon anggota, saya ingin melihat detail proker (deskripsi, dokumentasi, benefit) agar yakin dengan pilihan saya.
3. Sebagai calon anggota, saya ingin melihat list divisi dengan sisa kuota real-time agar bisa memilih divisi yang masih available.
4. Sebagai calon anggota, saya ingin mendaftar hanya dengan nama dan no HP (tanpa login) agar prosesnya cepat dan simple.
5. Sebagai calon anggota, saya ingin mengecek status pendaftaran saya dengan mencari nama/no HP agar tidak perlu menunggu email.
6. Sebagai calon anggota yang diterima, saya ingin download sertifikat dan dapat link grup WA agar bisa langsung bergabung.

### 3.2 Persona: Admin UKM
**Name:** Sekretaris/Bendahara UKM  
**Goal:** Manage proker, review pendaftar, distribusi sertifikat  
**Pain Point:** Data pendaftar tersebar, sulit filter, manual update status

**User Stories:**
1. Sebagai admin, saya ingin membuat dan mengelola proker (judul, deskripsi, periode, banner) agar informasi selalu up-to-date.
2. Sebagai admin, saya ingin mengelola divisi per proker (nama, tugas, kuota) agar struktur pendaftaran jelas.
3. Sebagai admin, saya ingin melihat list pendaftar dengan filter by proker agar mudah review.
4. Sebagai admin, saya ingin accept/reject pendaftar dengan catatan agar proses seleksi terstruktur.
5. Sebagai admin, saya ingin generate dan kirim sertifikat digital untuk peserta yang diterima agar tidak manual.
6. Sebagai admin, saya ingin export data pendaftar ke CSV/Excel untuk laporan.

### 3.3 Persona: Ketua Proker (Future Role)
**Name:** Ketua Proker A  
**Goal:** Manage proker sendiri saja  
**Note:** Disiapkan schema untuk v1.5, tapi v1 semua admin bisa akses semua proker.

---

## 4. Functional Requirements

### 4.1 Public Module — Landing & Discovery

#### FR-PUB-001: Landing Page Proker List
- **Priority:** P0
- **Description:** Halaman utama menampilkan list proker yang statusnya `ongoing` atau `upcoming`
- **Acceptance Criteria:**
  - [ ] Hero section dengan branding UKM
  - [ ] Grid card proker: banner, judul, periode, status badge
  - [ ] Filter by status (All / Ongoing / Upcoming / Completed)
  - [ ] Search by proker title
  - [ ] Empty state jika tidak ada proker aktif
  - [ ] Responsive: 1 kolom mobile, 2-3 kolom desktop
  - [ ] Sort by start_date (descending)

#### FR-PUB-002: Detail Proker Page
- **Priority:** P0
- **Description:** Halaman detail proker dengan informasi lengkap
- **Acceptance Criteria:**
  - [ ] Banner image full-width
  - [ ] Tabs: Tentang Proker | Dokumentasi | Benefit | Divisi
  - [ ] Tentang: deskripsi lengkap, timeline, target peserta
  - [ ] Dokumentasi: carousel/gallery foto dari proker sebelumnya (jika ada)
  - [ ] Benefit: list benefit menjadi anggota divisi (sertifikat, pengalaman, networking)
  - [ ] Divisi: preview card divisi dengan kuota (link ke halaman daftar)
  - [ ] Breadcrumb navigation
  - [ ] SEO: meta title, description, OG image

#### FR-PUB-003: Divisi Registration Cards
- **Priority:** P0
- **Description:** Card per divisi dengan informasi pendaftaran
- **Acceptance Criteria:**
  - [ ] Card berisi: nama divisi, deskripsi, list tugas, kuota/sisa kuota
  - [ ] Progress bar visual untuk kuota terisi
  - [ ] Real-time update sisa kuota (Supabase Realtime)
  - [ ] Card disabled jika kuota penuh atau registration_close sudah lewat
  - [ ] Badge: "Tersedia", "Sisa X", "Penuh", "Waitlist"
  - [ ] CTA button: "Daftar Sekarang" (enabled) atau "Kuota Penuh" (disabled)
  - [ ] Hover state dengan animation smooth

#### FR-PUB-004: Registration Form
- **Priority:** P0
- **Description:** Form pendaftaran muncul setelah memilih divisi
- **Acceptance Criteria:**
  - [ ] Step 1: Pilih divisi (sudah terpilih dari card)
  - [ ] Step 2: Isi data pribadi:
    - Nama Lengkap (required, min 3 chars)
    - Nomor HP (required, validasi format Indonesia +62/08)
    - Email (optional)
    - Institusi/Fakultas (optional)
    - Motivasi bergabung (optional, textarea)
  - [ ] Validasi real-time: duplicate check (nama + HP + divisi + proker yang sama)
  - [ ] Error handling: show toast/snackbar
  - [ ] Success: modal konfirmasi dengan nomor pendaftaran (generate ID unik)
  - [ ] Auto-redirect ke cek status setelah submit
  - [ ] No login required

#### FR-PUB-005: Status Tracking
- **Priority:** P0
- **Description:** Halaman cek status pendaftaran
- **Acceptance Criteria:**
  - [ ] Input field: Nama atau Nomor HP (minimal 3 char untuk nama, 4 digit untuk HP)
  - [ ] Search button dengan loading state
  - [ ] Result list: semua pendaftaran yang match
  - [ ] Per item: nama, proker, divisi, tanggal daftar, status badge
  - [ ] Status badge: Pending (yellow), Accepted (green), Rejected (red), Waitlist (blue)
  - [ ] Jika Accepted: show CTA "Download Sertifikat" dan "Join Grup WA"
  - [ ] Jika Completed proker: show sertifikat download + QR verification
  - [ ] Empty state: tidak ditemukan, ajukan untuk cek kembali
  - [ ] Privacy: hanya show nama (partial mask) dan status, detail lengkap via HP exact match

#### FR-PUB-006: Sertifikat Download & Verification
- **Priority:** P1
- **Description:** Download dan verifikasi sertifikat digital
- **Acceptance Criteria:**
  - [ ] Sertifikat page: tampilkan preview sertifikat (PDF/PNG)
  - [ ] Download button: generate & download file
  - [ ] Sertifikat berisi: nama peserta, nama proker, divisi, periode, QR code
  - [ ] QR code mengarah ke halaman verifikasi: `/sertifikat/verify/[code]`
  - [ ] Verify page: tampilkan info valid/tidak + detail sertifikat
  - [ ] Sertifikat template: landscape A4, branding UKM, clean design

### 4.2 Admin Module — Dashboard & Management

#### FR-ADM-001: Authentication & Authorization
- **Priority:** P0
- **Description:** Sistem login untuk admin
- **Acceptance Criteria:**
  - [ ] Login page: email + password (Supabase Auth)
  - [ ] Role-based access: Super Admin (all access), Proker Admin (v1.5)
  - [ ] Protected route: middleware redirect jika belum login
  - [ ] Session management: auto-refresh token
  - [ ] Logout functionality
  - [ ] Password reset via email

#### FR-ADM-002: Dashboard Overview
- **Priority:** P0
- **Description:** Halaman utama admin dengan summary metrics
- **Acceptance Criteria:**
  - [ ] Stats cards: Total Proker, Total Pendaftar, Diterima, Menunggu
  - [ ] Chart: pendaftar per proker (bar chart)
  - [ ] Chart: status distribution (pie/donut chart)
  - [ ] Recent registrations table (last 10)
  - [ ] Quick actions: Tambah Proker, Review Pendaftar, Generate Sertifikat
  - [ ] Responsive grid layout

#### FR-ADM-003: Proker Management (CRUD)
- **Priority:** P0
- **Description:** Kelola program kerja
- **Acceptance Criteria:**
  - [ ] List view: DataTable dengan kolom judul, periode, status, jumlah divisi, jumlah pendaftar
  - [ ] Create: form dengan field:
    - Judul Proker (required)
    - Slug (auto-generate dari judul, editable)
    - Deskripsi (rich text / markdown)
    - Banner image (upload ke Supabase Storage, max 2MB, jpg/png)
    - Start Date & End Date (date picker)
    - Registration Open & Close (datetime picker)
    - Status: upcoming, ongoing, completed, cancelled
    - Benefits (textarea)
  - [ ] Edit: same form dengan pre-filled data
  - [ ] Delete: confirmation dialog, soft delete (update status cancelled) atau hard delete
  - [ ] Upload dokumentasi: multiple image upload untuk gallery
  - [ ] Search & pagination

#### FR-ADM-004: Division Management
- **Priority:** P0
- **Description:** Kelola divisi dalam proker
- **Acceptance Criteria:**
  - [ ] Akses dari detail proker atau tab terpisah
  - [ ] List divisi dengan drag-drop reorder
  - [ ] Create divisi form:
    - Nama Divisi (required)
    - Deskripsi
    - Tugas-tugas (dynamic input array)
    - Kuota (number, min 1)
    - Persyaratan khusus (optional)
    - Display order (auto)
  - [ ] Edit & delete divisi
  - [ ] Real-time kuota counter: filled_quota / quota
  - [ ] Cannot delete divisi jika sudah ada pendaftar (alert)

#### FR-ADM-005: Pendaftar Review & Management
- **Priority:** P0
- **Description:** Review dan kelola pendaftar
- **Acceptance Criteria:**
  - [ ] DataTable dengan kolom: No, Nama, No HP, Proker, Divisi, Tanggal Daftar, Status, Aksi
  - [ ] Filter:
    - By Proker (Select dropdown)
    - By Divisi (Select dropdown, dependent on Proker)
    - By Status (Multi-select: Pending, Accepted, Rejected, Waitlist)
    - By Date Range
  - [ ] Sort: by date, by name, by status
  - [ ] Search: by nama atau no HP
  - [ ] Bulk action: select multiple rows, bulk Accept / Reject / Delete
  - [ ] Single action:
    - Accept: update status + catatan admin (optional)
    - Reject: update status + alasan penolakan (optional)
    - Waitlist: update status
  - [ ] Detail view: modal/drawer dengan data lengkap pendaftar
  - [ ] Export: CSV/Excel button (filtered data atau all data)
  - [ ] Pagination: 25/50/100 per page

#### FR-ADM-006: Sertifikat Management
- **Priority:** P1
- **Description:** Generate dan kelola sertifikat
- **Acceptance Criteria:**
  - [ ] List view: peserta yang status = accepted & proker = completed
  - [ ] Filter by proker
  - [ ] Bulk generate: select multiple, generate sertifikat
  - [ ] Single generate: per peserta
  - [ ] Preview sertifikat sebelum final generate
  - [ ] Template upload: admin upload template PNG/PDF (optional, v1 pakai template bawaan)
  - [ ] Status: Not Generated, Generated, Downloaded
  - [ ] Re-generate capability
  - [ ] QR code auto-generate per sertifikat

### 4.3 System & Backend Requirements

#### FR-SYS-001: Real-time Quota Updates
- **Priority:** P0
- **Description:** Kuota terisi update real-time
- **Acceptance Criteria:**
  - [ ] Trigger: setiap insert ke registrations table
  - [ ] Auto-increment filled_quota di divisions table
  - [ ] Broadcast via Supabase Realtime ke semua client aktif
  - [ ] Card divisi update tanpa refresh page
  - [ ] Race condition handling (transaction safe)

#### FR-SYS-002: Duplicate Prevention
- **Priority:** P0
- **Description:** Cegah pendaftar ganda
- **Acceptance Criteria:**
  - [ ] Unique constraint: applicant_id + proker_id + division_id
  - [ ] Soft check: nama + no HP yang sama di proker & divisi yang sama
  - [ ] Alert user: "Anda sudah terdaftar di divisi ini"
  - [ ] Suggest: pilih divisi lain atau cek status

#### FR-SYS-003: Auto-Close Registration
- **Priority:** P1
- **Description:** Tutup pendaftaran otomatis
- **Acceptance Criteria:**
  - [ ] Cron job / edge function cek registration_close setiap jam
  - [ ] Jika close date lewat: update status proker atau disable form
  - [ ] Jika kuota penuh: muncul badge "Waitlist" (bisa daftar tapi status waitlist)
  - [ ] Manual override: admin bisa extend periode

#### FR-SYS-004: Certificate Generation Engine
- **Priority:** P1
- **Description:** Engine pembuatan sertifikat
- **Acceptance Criteria:**
  - [ ] Generate unique certificate code: `UKM-[PROKER_SLUG]-[TIMESTAMP_BASE36]`
  - [ ] Client-side generation menggunakan html2canvas + jspdf
  - [ ] Template: A4 Landscape, 3508x2480px
  - [ ] Fields: nama peserta, nama proker, divisi, periode, tanggal generate, QR code
  - [ ] Store generated PDF ke Supabase Storage bucket `certificates`
  - [ ] Update certificates table dengan URL dan metadata
  - [ ] Max 100 certificate generation per batch

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-PER-001:** Landing page load < 3 detik (Lighthouse Performance > 90)
- **NFR-PER-002:** Time to Interactive < 3.5 detik di 4G
- **NFR-PER-003:** DataTable admin load < 2 detik untuk 100 rows
- **NFR-PER-004:** Real-time quota update latency < 500ms
- **NFR-PER-005:** Certificate generation < 5 detik per file

### 5.2 Security
- **NFR-SEC-001:** RLS (Row Level Security) aktif di semua tabel Supabase
- **NFR-SEC-002:** Admin routes protected by middleware + auth check
- **NFR-SEC-003:** Public hanya bisa read active prokers, insert registrations
- **NFR-SEC-004:** No sensitive data exposure (no HP partial mask di public search)
- **NFR-SEC-005:** File upload validation: type, size, scan (ClamAV optional)
- **NFR-SEC-006:** Rate limiting: 10 requests/minute untuk pendaftaran (prevent spam)

### 5.3 Scalability
- **NFR-SCA-001:** Support hingga 5000 pendaftar per proker
- **NFR-SCA-002:** Support hingga 50 proker aktif simultan
- **NFR-SCA-003:** Database indexing untuk phone, status, proker_id, division_id
- **NFR-SCA-004:** CDN untuk static assets (banner, dokumentasi, sertifikat)

### 5.4 Usability & Accessibility
- **NFR-UX-001:** Responsive: Mobile-first, breakpoints sm/md/lg/xl
- **NFR-UX-002:** Accessibility: WCAG 2.1 AA (contrast ratio, keyboard nav, alt text)
- **NFR-UX-003:** Dark mode support (optional, v1.5)
- **NFR-UX-004:** Bahasa Indonesia 100% (kecuali tech terms)
- **NFR-UX-005:** Loading skeleton untuk semua data fetch
- **NFR-UX-006:** Empty state illustration + copy untuk semua list view
- **NFR-UX-007:** Error boundary dengan fallback UI
- **NFR-UX-008:** Toast notification untuk semua action (success, error, info)

### 5.5 Reliability
- **NFR-REL-001:** Uptime 99.9% (Vercel + Supabase SLA)
- **NFR-REL-002:** Data backup otomatis (Supabase daily backup)
- **NFR-REL-003:** Graceful degradation jika realtime gagal (fallback polling 30s)

---

## 6. Database Schema

### 6.1 Entity Relationship Diagram (Textual)

```
ukm (1) ───< prokers (N) ───< divisions (N)
                                    │
                                    │
applicants (1) ───< registrations (N) >─── divisions (N)
                       │
                       │
                   certificates (1)

admin_profiles (N) ─── auth.users (N) [Supabase Auth]
```

### 6.2 Table Definitions

#### Table: `ukm`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID unik UKM |
| name | text | NOT NULL | Nama UKM |
| logo_url | text | NULL | URL logo UKM |
| created_at | timestamp | default now() | Tanggal dibuat |

#### Table: `prokers`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID proker |
| ukm_id | uuid | FK → ukm.id | Referensi UKM |
| title | text | NOT NULL | Judul proker |
| slug | text | UNIQUE, NOT NULL | URL-friendly identifier |
| description | text | NULL | Deskripsi lengkap |
| banner_url | text | NULL | URL banner image |
| start_date | date | NULL | Tanggal mulai proker |
| end_date | date | NULL | Tanggal selesai proker |
| registration_open | timestamp | NULL | Waktu buka pendaftaran |
| registration_close | timestamp | NULL | Waktu tutup pendaftaran |
| status | text | CHECK in ('upcoming','ongoing','completed','cancelled'), default 'upcoming' | Status proker |
| documentation | jsonb | default '[]' | Array {url, caption} |
| benefits | text | NULL | Benefit menjadi anggota |
| created_at | timestamp | default now() | Tanggal dibuat |
| updated_at | timestamp | default now() | Tanggal update |

#### Table: `divisions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID divisi |
| proker_id | uuid | FK → prokers.id, ON DELETE CASCADE | Referensi proker |
| name | text | NOT NULL | Nama divisi |
| description | text | NULL | Deskripsi divisi |
| tasks | text[] | default '{}' | Array tugas-tugas |
| quota | int | default 0 | Kuota maksimal |
| filled_quota | int | default 0 | Kuota terisi |
| requirements | text | NULL | Persyaratan khusus |
| display_order | int | default 0 | Urutan tampilan |
| created_at | timestamp | default now() | Tanggal dibuat |

#### Table: `applicants`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID pendaftar |
| full_name | text | NOT NULL | Nama lengkap |
| phone | text | NOT NULL, UNIQUE | Nomor HP (normalisasi +62) |
| email | text | NULL | Email (opsional) |
| institution | text | NULL | Institusi/fakultas |
| created_at | timestamp | default now() | Tanggal dibuat |

#### Table: `registrations`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID registrasi |
| applicant_id | uuid | FK → applicants.id | Referensi pendaftar |
| proker_id | uuid | FK → prokers.id | Referensi proker |
| division_id | uuid | FK → divisions.id | Referensi divisi |
| status | text | CHECK in ('pending','accepted','rejected','waitlist'), default 'pending' | Status pendaftaran |
| motivation | text | NULL | Motivasi bergabung |
| admin_notes | text | NULL | Catatan admin |
| registered_at | timestamp | default now() | Waktu daftar |
| reviewed_at | timestamp | NULL | Waktu direview |
| UNIQUE | | (applicant_id, proker_id, division_id) | Anti duplicate |

#### Table: `certificates`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, default gen_random_uuid() | ID sertifikat |
| registration_id | uuid | FK → registrations.id | Referensi registrasi |
| certificate_code | text | UNIQUE, NOT NULL | Kode unik sertifikat |
| template_url | text | NULL | URL template (optional) |
| file_url | text | NULL | URL file PDF/PNG hasil generate |
| issued_at | timestamp | default now() | Waktu terbit |
| downloaded_at | timestamp | NULL | Waktu didownload |
| metadata | jsonb | NULL | Data tambahan |

#### Table: `admin_profiles`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, FK → auth.users.id | ID admin (Supabase Auth) |
| role | text | CHECK in ('super_admin','proker_admin'), default 'proker_admin' | Role admin |
| full_name | text | NULL | Nama lengkap admin |
| assigned_proker_id | uuid | FK → prokers.id, NULL | Proker yang di-assign (NULL = all) |
| created_at | timestamp | default now() | Tanggal dibuat |

### 6.3 Indexes
```sql
-- Performance indexes
CREATE INDEX idx_prokers_status ON prokers(status);
CREATE INDEX idx_prokers_ukm ON prokers(ukm_id);
CREATE INDEX idx_divisions_proker ON divisions(proker_id);
CREATE INDEX idx_registrations_applicant ON registrations(applicant_id);
CREATE INDEX idx_registrations_proker ON registrations(proker_id);
CREATE INDEX idx_registrations_division ON registrations(division_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_applicants_phone ON applicants(phone);
CREATE INDEX idx_certificates_code ON certificates(certificate_code);
```

### 6.4 RLS Policies
```sql
-- Public policies
ALTER TABLE prokers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active prokers" ON prokers
  FOR SELECT USING (status != 'cancelled');

ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read divisions" ON divisions
  FOR SELECT USING (true);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert registration" ON registrations 
  FOR INSERT WITH CHECK (true);

-- Admin policies (full access untuk authenticated admin)
CREATE POLICY "Admin full access registrations" ON registrations
  FOR ALL USING (auth.uid() IN (SELECT id FROM admin_profiles));
CREATE POLICY "Admin full access prokers" ON prokers
  FOR ALL USING (auth.uid() IN (SELECT id FROM admin_profiles));
CREATE POLICY "Admin full access divisions" ON divisions
  FOR ALL USING (auth.uid() IN (SELECT id FROM admin_profiles));
```

---

## 7. API & Backend Specification

### 7.1 Supabase Client Architecture

```typescript
// lib/supabase/client.ts - Browser client (public)
import { createBrowserClient } from '@supabase/ssr';
export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase/server.ts - Server client (admin/api)
import { createServerClient } from '@supabase/ssr';
export const supabaseServer = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role untuk bypass RLS di API
  { cookies }
);
```

### 7.2 API Routes (Next.js App Router)

#### POST /api/registrations
- **Description:** Submit pendaftaran baru
- **Auth:** Public (no auth)
- **Body:** `{ full_name, phone, email?, institution?, motivation?, proker_id, division_id }`
- **Flow:**
  1. Normalize phone number (+62 format)
  2. Upsert applicant (create if not exists by phone)
  3. Check duplicate registration (applicant + proker + division)
  4. Insert registration with status 'pending'
  5. Increment filled_quota in divisions (transaction)
  6. Broadcast realtime update
- **Response:** `{ success: true, registration_id, applicant_id, message }`
- **Error:** `409 Duplicate`, `400 Validation`, `500 Server`

#### GET /api/registrations/search
- **Description:** Cari pendaftaran by nama atau phone
- **Auth:** Public (no auth)
- **Query:** `?query=string&type=name|phone&limit=20`
- **Response:** `{ data: [{ id, full_name, phone_masked, proker_title, division_name, status, registered_at }] }`
- **Privacy:** Phone number masked (show last 4 digits only)

#### GET /api/certificates/generate
- **Description:** Trigger generate sertifikat
- **Auth:** Admin only (middleware check)
- **Query:** `?registration_id=uuid`
- **Flow:**
  1. Verify registration status = 'accepted' & proker = 'completed'
  2. Generate certificate code
  3. Return certificate metadata (frontend akan generate PDF via html2canvas)
- **Response:** `{ certificate_code, template_data: { name, proker, division, period } }`

#### GET /api/certificates/verify/[code]
- **Description:** Verifikasi keaslian sertifikat
- **Auth:** Public
- **Response:** `{ valid: true, certificate: { name, proker, division, issued_at, file_url } }` atau `{ valid: false }`

#### POST /api/admin/bulk-update
- **Description:** Bulk update status pendaftar
- **Auth:** Admin only
- **Body:** `{ registration_ids: [], status: 'accepted'|'rejected'|'waitlist', admin_notes? }`
- **Response:** `{ updated: number, failed: number }`

#### GET /api/admin/export
- **Description:** Export pendaftar ke CSV
- **Auth:** Admin only
- **Query:** `?proker_id=&division_id=&status=&format=csv|excel`
- **Response:** File download (Content-Type: text/csv)

### 7.3 Realtime Subscriptions

```typescript
// Client-side realtime untuk kuota
const channel = supabase
  .channel('divisions-quota')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'divisions' },
    (payload) => {
      // Update UI: filled_quota, is_full
      updateDivisionCard(payload.new);
    }
  )
  .subscribe();
```

### 7.4 Edge Functions (Supabase)

#### Edge Function: `auto-close-registration`
- **Trigger:** Cron (every hour via pg_cron atau Vercel Cron)
- **Logic:**
  1. SELECT prokers WHERE registration_close < NOW() AND status = 'ongoing'
  2. Update status to 'completed' OR disable registration
  2. Send notification (v1.5)

#### Edge Function: `generate-certificate-pdf` (Optional)
- **Trigger:** HTTP request dari admin
- **Logic:** Server-side PDF generation menggunakan headless Chrome (jika client-side tidak memungkinkan)
- **Note:** Vercel Edge Functions tidak support Puppeteer, gunakan client-side generation untuk v1

---

## 8. UI/UX Design System

### 8.1 Design Tokens (Tailwind Config)

```javascript
// tailwind.config.ts extensions
{
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        status: {
          pending: '#f59e0b',    // amber-500
          accepted: '#10b981',   // emerald-500
          rejected: '#ef4444',   // red-500
          waitlist: '#3b82f6',   // blue-500
          completed: '#8b5cf6',  // violet-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
}
```

### 8.2 Component Inventory (shadcn/ui)

**Installed Components:**
| Component | Usage | Customization |
|-----------|-------|---------------|
| Button | CTA, actions | Size variants: xs, sm, default, lg, icon |
| Card | Proker card, divisi card | Hover lift effect, shadow transition |
| Badge | Status, kuota | Custom color mapping untuk status |
| Input | Form fields | Icon prefix (phone, user), error state |
| Textarea | Motivasi, deskripsi | Auto-resize, char counter |
| Select | Filter, dropdown | Searchable untuk proker list |
| Dialog | Modal form, konfirmasi | Max-width variants, backdrop blur |
| Drawer | Mobile form | Slide from bottom, snap points |
| Tabs | Detail proker sections | Underline style, animated indicator |
| Table | DataTable admin | Sortable, filterable, pagination |
| DataTable | Admin pendaftar | TanStack Table integration |
| Pagination | List navigation | Simple / Complex variants |
| Progress | Kuota bar | Animated, color by percentage |
| Skeleton | Loading states | Pulse animation, rounded |
| Toast | Notifications | Position: bottom-right, auto-dismiss 5s |
| Alert | Warning, info | Icon + title + description |
| AlertDialog | Confirm delete | Destructive styling |
| Carousel | Dokumentasi gallery | Auto-play, dots, arrows |
| Avatar | Admin profile | Fallback initials |
| DropdownMenu | Admin actions | Icon + label items |
| Sheet | Mobile filter | Slide from right |
| Separator | Content divider | Vertical / horizontal |
| Tooltip | Info hover | Delay 300ms |
| Calendar | Date picker | Range selection |
| Popover | Calendar trigger | Focus trap |
| Checkbox | Bulk select | Indeterminate state |
| ScrollArea | Scrollable content | Custom scrollbar |
| Accordion | FAQ, mobile nav | Single / multiple open |
| Breadcrumb | Navigation | Slash separator |
| Command | Search palette | Keyboard navigation |
| Form | Validation | React Hook Form + Zod integration |
| Label | Form labels | Required indicator |
| Switch | Toggle | Checked state animation |
| Slider | Range input | Step markers |
| Toggle | View toggle | Group variant |
| ToggleGroup | Filter toggle | Single / multiple |
| AspectRatio | Image container | 16/9, 4/3, 1/1 |
| Resizable | Panel resize | Handle hover |
| Sonner | Toast (alt) | Rich toast dengan action |
| Menubar | Admin top nav | Horizontal menu |
| NavigationMenu | Public nav | Mega menu support |
| HoverCard | Preview card | Delay 200ms |
| ContextMenu | Right-click menu | Admin table |

**Custom Components:**
| Component | Description | Props |
|-----------|-------------|-------|
| ProkerCard | Card proker di landing | proker: Proker, variant: 'default' \| 'compact' |
| DivisionCard | Card divisi dengan kuota | division: Division, isFull: boolean |
| StatusBadge | Badge status dengan icon | status: RegistrationStatus |
| QuotaBar | Progress bar kuota | filled: number, total: number |
| RegistrationForm | Multi-step form | prokerId, divisionId, onSuccess |
| SearchStatus | Search & result | query, results, onSearch |
| CertificatePreview | Preview sertifikat | certificate: Certificate, onDownload |
| QRCodeDisplay | QR code dengan scan hint | value: string, size: number |
| StatCard | Dashboard stat | title, value, trend, icon |
| DataTableFilter | Filter bar untuk DataTable | filters, onFilterChange |
| BulkActionBar | Action bar bulk select | selectedCount, actions |
| EmptyState | Illustration + text | illustration, title, description, action |
| LoadingScreen | Full page loading | message |
| ImageGallery | Grid gallery dengan lightbox | images: {url, caption}[] |
| CountdownTimer | Countdown untuk tutup daftar | targetDate |
| Confetti | Success animation | trigger: boolean |
| PhoneInput | Input nomor HP Indonesia | value, onChange |
| AnimatedCounter | Counter animasi | value, duration |
| GradientText | Text dengan gradient | children, className |
| FloatingCTA | Floating button mobile | icon, label, onClick |

### 8.3 Page Layouts

#### Public Pages
1. **Landing Page (`/`)**
   - Navbar: Logo UKM + nav links + CTA Admin
   - Hero: Headline + subheadline + CTA "Lihat Proker"
   - Section: Proker Cards Grid (3 col desktop, 1 col mobile)
   - Section: Statistik UKM (total proker, total pendaftar, dll)
   - Section: FAQ Accordion
   - Footer: Links, kontak, copyright

2. **Detail Proker (`/proker/[slug]`)**
   - Breadcrumb: Home / Proker / [Title]
   - Hero Banner: Full-width, overlay gradient
   - Content Tabs: Tentang | Dokumentasi | Benefit | Divisi
   - Divisi Section: Grid cards dengan CTA daftar
   - CTA Footer: "Daftar Sekarang" sticky button (mobile)

3. **Form Pendaftaran (`/proker/[slug]/daftar`)**
   - Step indicator: Pilih Divisi → Isi Data → Konfirmasi
   - Divisi selection: Radio card atau select
   - Form fields: Nama, No HP, Email, Institusi, Motivasi
   - Summary: Preview data sebelum submit
   - Success: Confetti + nomor pendaftaran + link cek status

4. **Cek Status (`/cek-status`)**
   - Search box: Input + button
   - Results: List card dengan status badge
   - Detail modal: Data lengkap + sertifikat (jika eligible)
   - Empty state: Ilustrasi + tips

5. **Sertifikat (`/sertifikat/[code]`)**
   - Preview: Canvas/iframe sertifikat
   - Download button: PDF/PNG
   - Verify info: Detail keaslian
   - Share buttons (optional)

#### Admin Pages
1. **Login (`/admin/login`)**
   - Centered card: Email + Password + Submit
   - Link: Lupa password
   - Background: Subtle pattern atau gradient

2. **Dashboard (`/admin`)**
   - Stats row: 4 cards
   - Charts row: 2 charts (bar + pie)
   - Recent table: Last 10 registrations
   - Quick actions: 3 cards

3. **Proker List (`/admin/prokers`)**
   - Header: Title + "Tambah Proker" button
   - DataTable: Kolom + actions
   - Filter: Status, Date range
   - Search: Judul proker

4. **Proker Detail (`/admin/prokers/[id]`)**
   - Tabs: Overview | Divisi | Dokumentasi | Pendaftar
   - Overview: Form edit proker
   - Divisi: List + drag reorder + CRUD
   - Dokumentasi: Upload gallery + caption edit
   - Pendaftar: Embedded DataTable filtered by proker

5. **Pendaftar Review (`/admin/pendaftar`)**
   - Filter bar: Proker (select), Divisi (select dependent), Status (multi), Date
   - DataTable: Checkbox + bulk action + pagination
   - Detail drawer: Slide from right dengan data lengkap
   - Export button: CSV/Excel

6. **Sertifikat (`/admin/sertifikat`)**
   - Filter: Proker (completed only), Status sertifikat
   - List: Peserta eligible
   - Actions: Generate single / bulk, Preview, Re-generate
   - Template: Upload / preview template

### 8.4 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, drawer nav, stacked cards |
| Tablet | 640px - 1024px | 2 columns, sidebar nav (admin) |
| Desktop | > 1024px | 3-4 columns, full sidebar, hover effects |

### 8.5 Animation & Interaction

- **Page transitions:** Fade-in 0.3s ease-out
- **Card hover:** translateY(-4px) + shadow-lg transition 0.2s
- **Button hover:** Scale 1.02 + brightness transition
- **Loading:** Skeleton pulse + shimmer effect
- **Success:** Confetti burst 2s + checkmark animation
- **Real-time update:** Number counter animation (0 → filled_quota)
- **Scroll:** Navbar glassmorphism on scroll > 50px
- **Modal:** Backdrop blur + scale-in 0.2s
- **Toast:** Slide-in from right + progress bar auto-dismiss

---

## 9. Authentication & Authorization

### 9.1 Auth Flow

```
[Public User]
  → No login required
  → Identified by phone number (normalized +62)
  → Session: none (stateless)
  → Security: RLS public policies

[Admin]
  → Login: Email + Password (Supabase Auth)
  → Session: JWT cookie (httpOnly, secure, sameSite)
  → Middleware: Check session + admin_profiles table
  → Role: super_admin (all), proker_admin (v1.5)
  → Logout: Clear cookies + redirect to login
```

### 9.2 Middleware Implementation

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Verify admin role
    const { data: admin } = await supabase
      .from('admin_profiles')
      .select('role, assigned_proker_id')
      .eq('id', session.user.id)
      .single();

    if (!admin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Add admin info to headers for downstream use
    res.headers.set('x-admin-role', admin.role);
    res.headers.set('x-admin-proker', admin.assigned_proker_id || 'all');
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
```

### 9.3 Phone Number Normalization

```typescript
// lib/utils/phone.ts
export function normalizePhone(phone: string): string {
  // Remove all non-digit
  let cleaned = phone.replace(/\D/g, '');

  // Remove leading 0, add +62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }

  // Add + if not present
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

export function maskPhone(phone: string): string {
  // Show only last 4 digits
  return phone.slice(0, -4).replace(/./g, '•') + phone.slice(-4);
}
```

---

## 10. Sertifikat System (Detailed)

### 10.1 Certificate Template Design

**Dimensions:** 3508 x 2480 px (A4 Landscape, 300 DPI)  
**Format:** PDF (vector text) + PNG (preview)  
**Template Fields:**
- Header: Logo UKM + Nama UKM
- Title: "SERTIFIKAT PENGHARGAAN" / "SERTIFIKAT PARTISIPASI"
- Body: "Diberikan kepada: [NAMA PESERTA]"
- Sub-body: "Atas partisipasi sebagai [DIVISI] dalam program kerja [PROKER] periode [PERIODE]"
- Footer: Tanggal terbit, Tanda tangan ketua (placeholder), QR code
- QR Code: Link ke `/sertifikat/verify/[CODE]`

### 10.2 Generation Flow

```
[Admin Click Generate]
  → API: POST /api/certificates/generate
  → Validate: registration accepted + proker completed
  → Generate code: UKM-[SLUG]-[TIMESTAMP_BASE36]
  → Insert to certificates table
  → Return: certificate data + template config

[Frontend Generate]
  → Render hidden HTML component (CertificateTemplate)
  → Use html2canvas to capture DOM (scale: 2 for high DPI)
  → Convert to PDF via jsPDF (landscape, A4)
  → Upload PDF to Supabase Storage: certificates/[code].pdf
  → Update certificates.file_url
  → Show preview + download button
```

### 10.3 Verification Flow

```
[User Scan QR / Visit URL]
  → GET /sertifikat/verify/[code]
  → Query: SELECT * FROM certificates WHERE code = [code]
  → If found: Show valid badge + details
  → If not found: Show invalid warning
```

### 10.4 Tech Stack for Certificate

- **html2canvas:** DOM to canvas capture (v1.4.1+)
- **jspdf:** Canvas to PDF conversion (v2.5.1+)
- **qrcode.react:** QR code generation (v3.1.0+)
- **@supabase/storage-js:** File upload

### 10.5 Batch Generation

- **Limit:** Max 50 certificates per batch (prevent browser crash)
- **Progress:** Show progress bar (x / total)
- **Error handling:** Skip failed, log error, allow retry
- **Background:** Optional edge function untuk batch besar (v1.5)

---

## 11. File Storage (Supabase Storage)

### 11.1 Buckets

| Bucket | Public | Max Size | Allowed Types | Path Structure |
|--------|--------|----------|---------------|----------------|
| banners | Yes | 2 MB | jpg, png, webp | `prokers/[proker_id]/banner.[ext]` |
| documentation | Yes | 5 MB | jpg, png, webp | `prokers/[proker_id]/[timestamp].[ext]` |
| certificates | Yes | 1 MB | pdf | `certificates/[certificate_code].pdf` |
| templates | No | 1 MB | png, pdf | `templates/[template_id].[ext]` |
| avatars | No | 1 MB | jpg, png | `avatars/[user_id].[ext]` |

### 11.2 Storage Policies

```sql
-- Public read banners & documentation
CREATE POLICY "Public read banners" ON storage.objects
  FOR SELECT USING (bucket_id = 'banners');

CREATE POLICY "Public read documentation" ON storage.objects
  FOR SELECT USING (bucket_id = 'documentation');

CREATE POLICY "Public read certificates" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

-- Admin upload all buckets
CREATE POLICY "Admin upload" ON storage.objects
  FOR INSERT USING (
    auth.uid() IN (SELECT id FROM admin_profiles)
  );
```

---

## 12. State Management & Data Fetching

### 12.1 Architecture

- **Server State:** TanStack Query (React Query) v5
  - Cache time: 5 minutes
  - Stale time: 1 minute
  - Realtime integration untuk quota

- **Client State:** Zustand (lightweight)
  - Admin sidebar state
  - Filter state (persist to localStorage)
  - Toast notification queue

- **Form State:** React Hook Form + Zod
  - Validation schema terpusat
  - Error message bahasa Indonesia

### 12.2 Data Fetching Patterns

```typescript
// hooks/useProkers.ts
export function useProkers(status?: string) {
  return useQuery({
    queryKey: ['prokers', status],
    queryFn: async () => {
      const { data } = await supabase
        .from('prokers')
        .select('*, divisions(*)')
        .eq('status', status || 'ongoing')
        .order('start_date', { ascending: false });
      return data;
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

// hooks/useRealtimeQuota.ts
export function useRealtimeQuota(prokerId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`divisions-${prokerId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'divisions', filter: `proker_id=eq.${prokerId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['divisions', prokerId] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [prokerId, queryClient]);
}
```

---

## 13. Error Handling & Logging

### 13.1 Error Types

| Error | Handling | UX |
|-------|----------|-----|
| Validation (Zod) | Inline field error | Red border + message below field |
| Duplicate registration | Toast + redirect to status | Warning toast + link |
| Network timeout | Retry 3x then error | Toast "Koneksi bermasalah, coba lagi" |
| 500 Server error | Log to Sentry | Toast "Terjadi kesalahan, hubungi admin" |
| Auth failure | Redirect to login | Silent redirect |
| Storage upload fail | Retry 1x then error | Toast "Gagal upload, coba lagi" |
| RLS violation | Log + 403 | Toast "Akses ditolak" |

### 13.2 Monitoring (Vercel + Supabase)

- **Vercel Analytics:** Web Vitals, Performance
- **Supabase Logs:** Database query performance, auth events
- **Sentry (optional):** Error tracking, release monitoring
- **Uptime:** Vercel status page + Supabase status

---

## 14. Deployment & DevOps

### 14.1 Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production (Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
NEXT_PUBLIC_APP_URL=https://ukm-portal.vercel.app
```

### 14.2 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "crons": [
    {
      "path": "/api/cron/auto-close",
      "schedule": "0 * * * *"
    }
  ]
}
```

### 14.3 Build Optimization

- **Image Optimization:** Next.js Image component + Supabase CDN
- **Font Optimization:** next/font (Inter)
- **Bundle Analysis:** @next/bundle-analyzer (dev only)
- **Code Splitting:** Dynamic import untuk admin chunks
- **Prefetch:** Hover prefetch untuk detail proker links

### 14.4 Supabase Configuration

- **Region:** Southeast Asia (Singapore) untuk latency optimal
- **Database:** PostgreSQL 15, connection pooling (PgBouncer)
- **Realtime:** Enabled untuk divisions table
- **Storage:** CDN enabled, 1GB limit (upgrade jika perlu)
- **Auth:** Email provider enabled, confirm email disabled (untuk admin)

---

## 15. Testing Strategy

### 15.1 Unit Tests (Vitest)

- **Utils:** Phone normalization, slug generation, date formatting
- **Hooks:** useRealtimeQuota, useSearchRegistrations
- **Components:** Form validation, button states, card rendering

### 15.2 Integration Tests (Playwright)

- **Public flow:** Landing → Detail → Daftar → Cek Status
- **Admin flow:** Login → Create Proker → Add Divisi → Review Pendaftar
- **Certificate flow:** Generate → Download → Verify
- **Real-time:** 2 browsers simultaneous, check quota update

### 15.3 E2E Test Cases

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|----------------|
| E2E-001 | Pendaftaran berhasil | Landing → Pilih Proker → Pilih Divisi → Isi Form → Submit | Success modal, redirect cek status |
| E2E-002 | Duplicate prevention | Daftar divisi A → Daftar lagi divisi A | Error duplicate, suggest cek status |
| E2E-003 | Kuota penuh | Isi kuota divisi → Coba daftar lagi | Card disabled, badge "Penuh" |
| E2E-004 | Admin accept pendaftar | Login → Pendaftar → Accept → Cek status public | Status berubah jadi "Diterima" |
| E2E-005 | Generate sertifikat | Admin → Sertifikat → Generate → Download | File PDF terdownload, QR valid |
| E2E-006 | Auto-close registration | Set registration_close ke waktu lampau | Proker status auto update |

---

## 16. Roadmap & Timeline

### 16.1 Phase 1: MVP (Week 1-4)

**Week 1: Foundation**
- [ ] Setup project: Next.js + Tailwind + shadcn/ui + Supabase
- [ ] Setup database schema & RLS policies
- [ ] Setup storage buckets & policies
- [ ] Setup auth (admin login)
- [ ] Setup middleware & protected routes
- [ ] Deploy initial to Vercel

**Week 2: Public Flow**
- [ ] Landing page proker list
- [ ] Detail proker page (tabs, dokumentasi gallery)
- [ ] Divisi cards dengan real-time kuota
- [ ] Registration form (nama, HP, motivasi)
- [ ] Duplicate prevention logic
- [ ] Cek status page (search by nama/HP)
- [ ] Responsive testing mobile

**Week 3: Admin Flow**
- [ ] Admin dashboard (stats, charts)
- [ ] CRUD Proker (form, upload banner)
- [ ] CRUD Divisi (dynamic tasks input)
- [ ] Pendaftar review (DataTable, filter, bulk action)
- [ ] Export CSV
- [ ] Auto-close registration (cron)

**Week 4: Sertifikat & Polish**
- [ ] Certificate template design (HTML/CSS)
- [ ] Certificate generator (html2canvas + jspdf)
- [ ] QR code generation & verification page
- [ ] Download sertifikat + CTA grup WA
- [ ] Loading states & skeletons
- [ ] Error handling & toast notifications
- [ ] Performance optimization (Lighthouse > 90)
- [ ] Final testing & bug fixes
- [ ] Production deployment

### 16.2 Phase 2: Enhancement (Week 5-8)

- [ ] Email notification (Supabase Edge Functions + Resend/Postmark)
- [ ] WhatsApp API integration (status notification)
- [ ] Multi-UKM support (schema already ready)
- [ ] Role-based admin (super_admin vs proker_admin)
- [ ] Dark mode toggle
- [ ] Advanced analytics dashboard
- [ ] Public API untuk integrasi (optional)

### 16.3 Phase 3: Scale (Week 9-12)

- [ ] Mobile PWA (offline support)
- [ ] Advanced certificate templates (per proker)
- [ ] Batch certificate generation (edge function)
- [ ] AI-powered chatbot (optional)
- [ ] SSO integration (Google/Microsoft)

---

## 17. Appendix

### 17.1 Glossary

| Term | Definition |
|------|------------|
| UKM | Unit Kegiatan Mahasiswa |
| Proker | Program Kerja |
| PDD | Publikasi, Dokumentasi, dan Dekorasi (divisi) |
| Humas | Hubungan Masyarakat (divisi) |
| RLS | Row Level Security (Supabase) |
| CSR | Client-Side Rendering |
| SSR | Server-Side Rendering |
| RSC | React Server Component |
| OG | Open Graph (social media preview) |
| CDN | Content Delivery Network |
| CRUD | Create, Read, Update, Delete |
| MVP | Minimum Viable Product |

### 17.2 Reference Links

- Next.js 14 Docs: https://nextjs.org/docs
- shadcn/ui Components: https://ui.shadcn.com/docs/components
- Supabase JS Client: https://supabase.com/docs/reference/javascript
- Tailwind CSS: https://tailwindcss.com/docs
- TanStack Query: https://tanstack.com/query/latest
- React Hook Form: https://react-hook-form.com/
- Zod Validation: https://zod.dev/
- html2canvas: https://html2canvas.hertzen.com/
- jsPDF: https://github.com/parallax/jsPDF

### 17.3 Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-01 | Product Owner | Initial PRD for Antigravity implementation |

---

## 18. Antigravity Implementation Notes

### 18.1 Skill Integration

Dengan skill yang sudah terpasang:
- **frontend-design (anthropics/skills):** Gunakan untuk generate layout & component structure
- **shadcn-ui (giuseppe-trisciuoglio/developer-kit):** Generate components via CLI: `npx shadcn add [component]`
- **tailwind-design-system (wshobson/agents):** Gunakan design tokens & utility classes yang konsisten
- **ui-ux-pro-max (nextlevelbuilder/ui-ux-pro-max-skill):** Pastikan semua halaman punya loading state, empty state, error state, dan success animation

### 18.2 Prompt Strategy untuk Antigravity

**Prompt Pattern yang Direkomendasikan:**

```
"Build a [component/page] using Next.js 14 App Router, shadcn/ui components, 
Tailwind CSS, and Supabase. Follow the UKM Proker Registration Portal PRD v1.0.

Requirements:
- [Specific FR code, e.g., FR-PUB-001]
- Tech: [specific stack]
- Design: [responsive, mobile-first, animations]
- Data: [Supabase table, RLS policy]
- Auth: [public/admin]

Include:
- Loading skeleton
- Empty state
- Error handling with toast
- Responsive breakpoints
- Accessibility (aria-labels, keyboard nav)
"
```

### 18.3 File Generation Order (Rekomendasi)

1. **Database & Config:**
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/config.toml`
   - `.env.local`

2. **Foundation:**
   - `src/lib/supabase/client.ts`
   - `src/lib/supabase/server.ts`
   - `src/lib/utils.ts`
   - `src/types/database.ts` (generated)
   - `tailwind.config.ts`
   - `src/app/layout.tsx`
   - `src/app/globals.css`

3. **Public Pages:**
   - `src/app/page.tsx` (Landing)
   - `src/app/proker/[slug]/page.tsx` (Detail)
   - `src/app/proker/[slug]/daftar/page.tsx` (Form)
   - `src/app/cek-status/page.tsx` (Status)
   - `src/app/sertifikat/[code]/page.tsx` (Certificate)

4. **Admin Pages:**
   - `src/app/admin/login/page.tsx`
   - `src/app/admin/page.tsx` (Dashboard)
   - `src/app/admin/prokers/page.tsx`
   - `src/app/admin/prokers/[id]/page.tsx`
   - `src/app/admin/pendaftar/page.tsx`
   - `src/app/admin/sertifikat/page.tsx`

5. **Components:**
   - `src/components/ui/*` (shadcn)
   - `src/components/public/*`
   - `src/components/admin/*`
   - `src/components/shared/*`

6. **Hooks & Utils:**
   - `src/hooks/use-prokers.ts`
   - `src/hooks/use-registrations.ts`
   - `src/hooks/use-realtime-quota.ts`
   - `src/lib/utils/phone.ts`
   - `src/lib/utils/certificate.ts`

7. **API Routes:**
   - `src/app/api/registrations/route.ts`
   - `src/app/api/certificates/generate/route.ts`
   - `src/app/api/certificates/verify/[code]/route.ts`
   - `src/app/api/admin/export/route.ts`

---

**End of Document**

*This PRD is a living document. Updates should be tracked in the Change Log section and communicated to all stakeholders.*
