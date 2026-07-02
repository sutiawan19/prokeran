'use client';

import { use, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { mockProkers } from '@/lib/mock-data';
import { Division, RegistrationFormData } from '@/types';
import { QuotaBar } from '@/components/ui/QuotaBar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Building,
  MessageSquare,
  Copy,
  ExternalLink,
  CheckCheck,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

// ── Step Indicator ────────────────────────
const STEPS = ['Pilih Divisi', 'Data Diri', 'Pertanyaan Divisi', 'Konfirmasi'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 w-full max-w-lg mx-auto">
      {STEPS.map((label, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-[#0038FF] text-white border-[#0038FF]'
                    : isActive
                    ? 'bg-[#0038FF] text-white border-[#0038FF] shadow-md scale-110'
                    : 'bg-white text-gray-400 border-gray-200'
                }`}
              >
                {isCompleted ? <CheckCheck className="w-5 h-5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap hidden sm:block mt-1 ${
                  isActive ? 'text-[#0038FF]' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-all duration-300 rounded-full ${
                  isCompleted ? 'bg-[#0038FF]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Success Modal ─────────────────────────
function SuccessModal({
  open,
  regId,
  onClose,
}: {
  open: boolean;
  regId: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(regId);
    setCopied(true);
    toast.success('Disalin ke clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-black/5 shadow-lg p-8 rounded-[2rem]">
        <DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={3} />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Pendaftaran Sukses!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500 mt-2">
            Data kamu sudah kami terima dan akan diproses oleh admin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="rounded-[1.5rem] bg-gray-50 border border-black/5 p-5">
            <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Nomor Pendaftaran</p>
            <div className="flex items-center justify-between gap-4">
              <code className="text-lg font-mono font-bold tracking-widest text-[#0038FF]">
                {regId}
              </code>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#0038FF] transition-all shadow-sm"
                aria-label="Salin nomor pendaftaran"
              >
                {copied ? (
                  <CheckCheck className="w-5 h-5" strokeWidth={3} />
                ) : (
                  <Copy className="w-5 h-5" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500 px-4">
            Simpan nomor pendaftaran ini. Kamu bisa cek status kapan saja.
          </p>

          <div className="flex flex-col gap-3">
            <Link 
              href="/cek-status"
              className="flex items-center justify-center bg-[#0038FF] text-white py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md hover:bg-blue-700 transition-all"
            >
              Cek Status Pendaftaran
              <ExternalLink className="w-5 h-5 ml-2" strokeWidth={2.5} />
            </Link>
            <button 
              onClick={onClose} 
              className="flex items-center justify-center bg-white text-gray-700 py-3.5 rounded-xl border border-gray-200 font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Helper ────────────────────────────────
function getDivisionSpecificQuestion(divisionName: string): string {
  const name = divisionName.toLowerCase();
  if (name.includes('acara')) return 'Apakah kamu memiliki pengalaman MC atau moderator?';
  if (name.includes('humas') || name.includes('hubungan')) return 'Apakah kamu memiliki pengalaman melobi pihak eksternal atau mencari sponsorship?';
  if (name.includes('pdd') || name.includes('publikasi') || name.includes('desain') || name.includes('dokumentasi')) return 'Sebutkan software desain/editing yang kamu kuasai (Sertakan link portofolio jika ada).';
  if (name.includes('p3k') || name.includes('kesehatan')) return 'Apakah kamu pernah mengikuti pelatihan dasar kesehatan atau PMR?';
  if (name.includes('logistik') || name.includes('perlengkapan')) return 'Apakah kamu siap bekerja secara fisik dan mengatur inventaris barang?';
  if (name.includes('konsumsi')) return 'Apakah kamu memiliki pengalaman dalam manajemen konsumsi acara besar?';
  if (name.includes('liaison') || name.includes('lo')) return 'Apakah kamu memiliki pengalaman mendampingi tamu VIP atau narasumber?';
  
  return 'Apa skill utama yang kamu miliki yang berguna untuk divisi ini?';
}

// ── Main Form Page ────────────────────────
function DaftarForm({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDivisionId = searchParams.get('divisi') ?? '';

  const proker = mockProkers.find((p) => p.slug === slug);
  if (!proker) notFound();

  const [step, setStep] = useState(0);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(
    proker.divisions?.find((d) => d.id === initialDivisionId) ?? null
  );
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    full_name: '',
    nim: '',
    phone: '',
    general_motivation: '',
    organization_experience: '',
    motivation: '',
    mc_experience: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  function validateStep0() {
    if (!selectedDivision) {
      toast.error('Pilih divisi terlebih dahulu');
      return false;
    }
    return true;
  }

  function validateStep1() {
    const errs: typeof errors = {};
    if (!formData.full_name || formData.full_name.trim().length < 3) {
      errs.full_name = 'Nama lengkap minimal 3 karakter';
    }
    if (!formData.nim || formData.nim.trim().length < 5) {
      errs.nim = 'NIM minimal 5 karakter';
    }
    if (!formData.phone || !/^(\+62|62|0)[0-9]{8,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      errs.phone = 'Format nomor HP tidak valid (contoh: 08123456789)';
    }
    if (!formData.general_motivation || formData.general_motivation.trim().length < 5) {
      errs.general_motivation = 'Harap isi alasan bergabung';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs: typeof errors = {};
    if (!formData.organization_experience || formData.organization_experience.trim().length < 5) {
      errs.organization_experience = 'Harap isi pengalaman organisasi';
    }
    if (!formData.motivation || formData.motivation.trim().length < 5) {
      errs.motivation = 'Harap isi alasan bergabung divisi';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (step === 0 && validateStep0()) setStep(1);
    else if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const regId = `REG-${Date.now().toString(36).toUpperCase()}`;

    // Save to localStorage so cek-status can look it up
    const saved = {
      id: regId,
      registration_number: regId,
      full_name: formData.full_name,
      nim: formData.nim,
      phone: formData.phone,
      phone_masked: formData.phone
        ? formData.phone.replace(/.(?=.{4})/g, '•')
        : '',
      proker_title: proker.title,
      proker_slug: slug,
      division_name: selectedDivision?.name ?? '',
      status: 'pending',
      registered_at: new Date().toISOString(),
      proker_status: proker.status ?? 'ongoing',
      certificate_code: undefined,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('registrations') ?? '[]');
      existing.push(saved);
      localStorage.setItem('registrations', JSON.stringify(existing));
    } catch (_) {}

    setRegistrationId(regId);
    setIsSubmitting(false);
    setSuccessModalOpen(true);
  }

  // Common input styling
  const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0038FF]/20 focus:border-[#0038FF] transition-all shadow-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-12">

      <div className="bg-white border border-black/5 shadow-sm rounded-[2rem] p-8 md:p-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center leading-tight mb-2">
          Daftar Kepanitiaan {proker.title}
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center mb-10">
          Isi data dirimu dan jadilah bagian dari panitia {proker.title}.
        </p>

        <StepIndicator current={step} />

        {/* ── Step 0: Pilih Divisi ─────────── */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gray-900 text-center mb-6">
              Pilih Divisi yang Kamu Minati
            </h2>
            <div className="grid gap-4 mt-2">
              {proker.divisions?.map((div) => {
                const isFull = div.filled_quota >= div.quota;
                const isSelected = selectedDivision?.id === div.id;
                return (
                  <button
                    key={div.id}
                    onClick={() => !isFull && setSelectedDivision(div)}
                    disabled={isFull}
                    className={`w-full text-left rounded-2xl border p-6 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#0038FF] bg-blue-50/50 shadow-sm ring-1 ring-[#0038FF]'
                        : isFull
                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                        : 'border-gray-200 bg-white hover:border-[#0038FF]/30 hover:bg-gray-50 shadow-sm cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className={`font-bold text-lg ${isSelected ? 'text-[#0038FF]' : 'text-gray-900'}`}>
                          {div.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {div.description}
                        </p>
                      </div>
                      <div className="shrink-0 mt-1">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-[#0038FF] flex items-center justify-center">
                            <CheckCheck className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                        )}
                      </div>
                    </div>
                    <QuotaBar filled={div.filled_quota} total={div.quota} showText={false} size="sm" />
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 pt-6">
              <Link
                href={`/proker/${slug}`}
                className="bg-white text-gray-700 px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </Link>
              <button
                onClick={handleNext}
                disabled={!selectedDivision}
                className="flex-1 bg-[#0038FF] text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjut Isi Data
                <ChevronRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Data Diri ─────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gray-900 text-center mb-6">
              Lengkapi Data Dirimu
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Nama Lengkap *</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-black/40" />
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className={`${inputClass} pl-12`}
                    placeholder="Budi Santoso"
                  />
                </div>
                {errors.full_name && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.full_name}</p>}
              </div>

              <div>
                <label className={labelClass}>NIM (Nomor Induk Mahasiswa) *</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 w-5 h-5 text-black/40" />
                  <input
                    type="text"
                    value={formData.nim}
                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                    className={`${inputClass} pl-12`}
                    placeholder="23010..."
                  />
                </div>
                {errors.nim && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.nim}</p>}
              </div>

              <div>
                <label className={labelClass}>Nomor WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-black/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`${inputClass} pl-12`}
                    placeholder="08123456789"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.phone}</p>}
              </div>

              <div>
                <label className={labelClass}>Alasan Bergabung *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/40" />
                  <textarea
                    value={formData.general_motivation}
                    onChange={(e) => setFormData({ ...formData, general_motivation: e.target.value })}
                    className={`${inputClass} pl-12 min-h-[120px]`}
                    placeholder="Saya ingin belajar dan berkontribusi di kegiatan ini..."
                  />
                </div>
                {errors.general_motivation && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.general_motivation}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(0)}
                className="bg-white text-gray-700 px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#0038FF] text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all flex justify-center items-center"
              >
                Lanjut Pertanyaan Divisi
                <ChevronRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Pertanyaan Divisi ─────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gray-900 text-center mb-6">
              Pertanyaan Divisi
            </h2>
            
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className={labelClass}>1. Apa pengalaman berorganisasi yang pernah kamu ikuti? *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/40" />
                  <textarea
                    value={formData.organization_experience}
                    onChange={(e) => setFormData({ ...formData, organization_experience: e.target.value })}
                    className={`${inputClass} pl-12 min-h-[120px]`}
                    placeholder="Sebutkan pengalaman organisasimu..."
                  />
                </div>
                {errors.organization_experience && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.organization_experience}</p>}
              </div>

              <div>
                <label className={labelClass}>
                  2. Mengapa kamu tertarik bergabung di Divisi {selectedDivision?.name}? *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/40" />
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className={`${inputClass} pl-12 min-h-[120px]`}
                    placeholder="Alasan saya tertarik adalah..."
                  />
                </div>
                {errors.motivation && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.motivation}</p>}
              </div>

              <div>
                <label className={labelClass}>
                  3. {selectedDivision ? getDivisionSpecificQuestion(selectedDivision.name) : 'Pertanyaan Tambahan'} (Opsional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/40" />
                  <textarea
                    value={formData.mc_experience}
                    onChange={(e) => setFormData({ ...formData, mc_experience: e.target.value })}
                    className={`${inputClass} pl-12 min-h-[100px]`}
                    placeholder="Jawabanmu..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(1)}
                className="bg-white text-gray-700 px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#0038FF] text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all flex justify-center items-center"
              >
                Review Data
                <ChevronRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Konfirmasi ───────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-black/5 rounded-[1.5rem] p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4 border-b border-gray-200 pb-3">Review Pendaftaran</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Pilihan Divisi</span>
                  <span className="inline-block bg-blue-100 text-[#0038FF] font-medium px-3 py-1 rounded-md">{selectedDivision?.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Nama Lengkap</span>
                    <span className="font-medium">{formData.full_name}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">NIM</span>
                    <span className="font-medium">{formData.nim}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs text-gray-500 mb-1">No. WhatsApp</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="mb-4">
                    <span className="block text-xs text-gray-500 mb-1">Alasan Bergabung Proker</span>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200 mt-2 shadow-sm">{formData.general_motivation}</p>
                  </div>
                  <div className="mb-4">
                    <span className="block text-xs text-gray-500 mb-1">Pengalaman Organisasi</span>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200 mt-2 shadow-sm">{formData.organization_experience}</p>
                  </div>
                  <div className="mb-4">
                    <span className="block text-xs text-gray-500 mb-1">Alasan Bergabung Divisi</span>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200 mt-2 shadow-sm">{formData.motivation}</p>
                  </div>
                  {formData.mc_experience && (
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Pertanyaan Tambahan Divisi</span>
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200 mt-2 shadow-sm">{formData.mc_experience}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="bg-white text-gray-700 px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-[#0038FF] text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all flex justify-center items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> MENGIRIM...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran
                    <CheckCircle2 className="w-5 h-5 ml-2" strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>

      <SuccessModal
        open={successModalOpen}
        regId={registrationId}
        onClose={() => router.push('/')}
      />
    </div>
  );
}

export default function DaftarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-[#0038FF] animate-spin" strokeWidth={3} />
      </div>
    }>
      <DaftarForm slug={slug} />
    </Suspense>
  );
}
