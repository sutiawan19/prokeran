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
const STEPS = ['Pilih Divisi', 'Isi Data', 'Konfirmasi'];

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
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-[3px] border-black transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#CCFF00] text-black shadow-[2px_2px_0_0_black]'
                    : isActive
                    ? 'bg-[#0038FF] text-white shadow-[2px_2px_0_0_black] scale-110'
                    : 'bg-white text-black/50'
                }`}
              >
                {isCompleted ? <CheckCheck className="w-5 h-5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap hidden sm:block ${
                  isActive ? 'text-[#0038FF]' : 'text-black/60'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-[4px] mx-2 transition-all duration-300 rounded-full ${
                  isCompleted ? 'bg-[#CCFF00] border-y-[2px] border-black' : 'bg-black/10'
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
      <DialogContent className="max-w-md bg-[#CCFF00] border-[4px] border-black shadow-[12px_12px_0_0_black] p-8 rounded-[2rem]">
        <DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white border-[4px] border-black shadow-[4px_4px_0_0_black] flex items-center justify-center rotate-6 hover:rotate-0 transition-transform">
              <CheckCircle2 className="w-10 h-10 text-[#0038FF]" strokeWidth={3} />
            </div>
          </div>
          <DialogTitle className="text-center text-3xl font-black uppercase">
            Pendaftaran Sukses!
          </DialogTitle>
          <DialogDescription className="text-center text-sm font-bold text-black/80 mt-2">
            Data kamu sudah kami terima dan akan diproses oleh admin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="rounded-[1.5rem] bg-white border-[3px] border-black p-5 shadow-[4px_4px_0_0_black]">
            <p className="text-[10px] font-black uppercase text-black/60 mb-2">Nomor Pendaftaran</p>
            <div className="flex items-center justify-between gap-4">
              <code className="text-xl font-black tracking-widest text-[#0038FF]">
                {regId}
              </code>
              <button
                onClick={handleCopy}
                className="p-3 rounded-xl bg-black text-white hover:bg-[#0038FF] hover:scale-105 transition-all shadow-md"
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

          <p className="text-[10px] font-black uppercase text-center text-black/80 bg-white/50 py-2 rounded-lg">
            Simpan nomor pendaftaran ini. Kamu bisa cek status kapan saja.
          </p>

          <div className="flex flex-col gap-3">
            <Link 
              href="/cek-status"
              className="flex items-center justify-center bg-[#0038FF] text-white py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
            >
              Cek Status Pendaftaran
              <ExternalLink className="w-5 h-5 ml-2" strokeWidth={3} />
            </Link>
            <button 
              onClick={onClose} 
              className="flex items-center justify-center bg-white text-black py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
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
    phone: '',
    email: '',
    institution: '',
    motivation: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const canGoToStep1 = !!selectedDivision;

  function validateStep2() {
    const errs: typeof errors = {};
    if (!formData.full_name || formData.full_name.trim().length < 3) {
      errs.full_name = 'Nama lengkap minimal 3 karakter';
    }
    if (!formData.phone || !/^(\+62|62|0)[0-9]{8,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      errs.phone = 'Format nomor HP tidak valid (contoh: 08123456789)';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Format email tidak valid';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (step === 0 && canGoToStep1) setStep(1);
    if (step === 1 && validateStep2()) setStep(2);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const regId = `REG-${Date.now().toString(36).toUpperCase()}`;
    setRegistrationId(regId);
    setIsSubmitting(false);
    setSuccessModalOpen(true);
  }

  // Common input styling
  const inputClass = "w-full bg-white border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:outline-none focus:ring-0 focus:border-[#0038FF] shadow-[4px_4px_0_0_black] focus:shadow-[2px_2px_0_0_#0038FF] transition-all";
  const labelClass = "block text-xs font-black uppercase mb-2";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 bg-white border-[3px] border-black shadow-[4px_4px_0_0_black] inline-block px-4 py-2 rounded-xl">
        <Breadcrumb>
          <BreadcrumbList className="font-bold text-black uppercase tracking-wider text-[10px] sm:text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/proker/${slug}`}>{proker.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pendaftaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="bg-[#F8F9FA] border-[4px] border-black shadow-[8px_8px_0_0_black] rounded-[2rem] p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase text-center leading-tight mb-2">
          Daftar ke {proker.title}
        </h1>
        <p className="text-sm font-bold text-black/60 text-center uppercase mb-10">
          Pendaftaran gratis & tanpa login. Cukup isi data dirimu.
        </p>

        <StepIndicator current={step} />

        {/* ── Step 0: Pilih Divisi ─────────── */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-black text-xl uppercase text-center mb-6">
              Pilih Divisi yang Kamu Minati
            </h2>
            <div className="grid gap-4">
              {proker.divisions?.map((div) => {
                const isFull = div.filled_quota >= div.quota;
                const isSelected = selectedDivision?.id === div.id;
                return (
                  <button
                    key={div.id}
                    onClick={() => !isFull && setSelectedDivision(div)}
                    disabled={isFull}
                    className={`w-full text-left rounded-2xl border-[3px] p-6 transition-all duration-300 ${
                      isSelected
                        ? 'border-black bg-[#CCFF00] shadow-[6px_6px_0_0_black] -translate-y-1'
                        : isFull
                        ? 'border-black/20 bg-gray-100 opacity-60 cursor-not-allowed'
                        : 'border-black bg-white hover:bg-[#CCFF00]/50 shadow-[4px_4px_0_0_black] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_black] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-black text-xl uppercase text-black">
                          {div.name}
                        </p>
                        <p className="text-sm font-bold text-black/70 mt-1 line-clamp-2">
                          {div.description}
                        </p>
                      </div>
                      <div className="shrink-0 mt-1">
                        {isSelected ? (
                          <div className="w-8 h-8 rounded-full bg-[#0038FF] border-[2px] border-black flex items-center justify-center">
                            <CheckCheck className="w-5 h-5 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-[3px] border-black bg-white" />
                        )}
                      </div>
                    </div>
                    <QuotaBar filled={div.filled_quota} total={div.quota} showText={false} size="sm" />
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <button
                onClick={handleNext}
                disabled={!canGoToStep1}
                className="w-full bg-[#0038FF] disabled:opacity-50 text-white py-4 rounded-xl border-[3px] border-black font-black uppercase text-lg shadow-[6px_6px_0_0_black] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-black transition-all flex justify-center items-center"
              >
                Lanjut Isi Data
                <ChevronRight className="w-6 h-6 ml-2" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Isi Data ─────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-black text-xl uppercase text-center mb-6">
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
                {errors.full_name && <p className="text-red-500 text-xs font-bold mt-2 uppercase">{errors.full_name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  {errors.phone && <p className="text-red-500 text-xs font-bold mt-2 uppercase">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email (Opsional)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-black/40" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`${inputClass} pl-12`}
                      placeholder="budi@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-bold mt-2 uppercase">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Asal Institusi/Fakultas (Opsional)</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 w-5 h-5 text-black/40" />
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={`${inputClass} pl-12`}
                    placeholder="Fakultas Ilmu Komputer"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Alasan Bergabung *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/40" />
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className={`${inputClass} pl-12 min-h-[120px]`}
                    placeholder="Saya ingin belajar dan berkontribusi di bidang ini..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(0)}
                className="bg-white text-black px-6 py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#0038FF] text-white py-4 rounded-xl border-[3px] border-black font-black uppercase text-lg shadow-[6px_6px_0_0_black] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-black transition-all flex justify-center items-center"
              >
                Review Data
                <ChevronRight className="w-6 h-6 ml-2" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Konfirmasi ───────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-[#CCFF00] border-[3px] border-black rounded-[1.5rem] p-6 shadow-[6px_6px_0_0_black]">
              <h3 className="font-black text-xl uppercase mb-4 border-b-[3px] border-black pb-2">Review Pendaftaran</h3>
              
              <div className="space-y-4 font-bold text-sm">
                <div>
                  <span className="block text-[10px] uppercase text-black/60 mb-1">Pilihan Divisi</span>
                  <span className="inline-block bg-white border-[2px] border-black px-3 py-1 rounded-md">{selectedDivision?.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block text-[10px] uppercase text-black/60 mb-1">Nama Lengkap</span>
                    <span>{formData.full_name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-black/60 mb-1">No. WhatsApp</span>
                    <span>{formData.phone}</span>
                  </div>
                  {formData.email && (
                    <div>
                      <span className="block text-[10px] uppercase text-black/60 mb-1">Email</span>
                      <span className="break-all">{formData.email}</span>
                    </div>
                  )}
                  {formData.institution && (
                    <div className="col-span-2">
                      <span className="block text-[10px] uppercase text-black/60 mb-1">Institusi</span>
                      <span>{formData.institution}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="bg-white text-black px-6 py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all flex items-center justify-center disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-[#FF3366] text-white py-4 rounded-xl border-[3px] border-black font-black uppercase text-lg shadow-[6px_6px_0_0_black] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-black transition-all flex justify-center items-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" /> MENGIRIM...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran
                    <CheckCircle2 className="w-6 h-6 ml-2" strokeWidth={3} />
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
