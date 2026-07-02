'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockRegistrationResults } from '@/lib/mock-data';
import { StatusSearchResult } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  Loader2,
  Calendar,
  FolderOpen,
  Users,
  Download,
  MessageCircle,
  ArrowRight,
  Info,
  User,
  ClipboardList,
  CheckCircle2,
  Hourglass,
  SearchX,
  Hash,
} from 'lucide-react';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Result Card ───────────────────────────
function ResultCard({
  result,
  onClick,
}: {
  result: StatusSearchResult;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[1.5rem] border border-black/5 bg-white p-6 hover:-translate-y-1 hover:shadow-lg hover:border-blue-100 shadow-sm transition-all group"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-bold text-xl text-gray-900">
            {result.full_name}
          </p>
          <p className="text-sm font-medium text-gray-500 font-mono mt-1">
            <span className="inline-flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              {(result as any).registration_number ?? result.id}
            </span>
          </p>
        </div>
        <div className="shrink-0">
          <StatusBadge status={result.status} />
        </div>
      </div>

      <div className="space-y-3 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-5 h-5 text-blue-500 shrink-0" />
          <span className="font-medium">{result.proker_title}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-500 shrink-0" />
          <span className="font-medium">Divisi: {result.division_name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
          <span className="font-medium">Daftar: {formatDate(result.registered_at)}</span>
        </div>
      </div>

      {/* Action hints */}
      {result.status === 'accepted' && (
        <div className="flex flex-wrap gap-2 mb-4">
          {result.certificate_code && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide border border-green-200">
              <Download className="w-4 h-4" />
              Sertifikat tersedia
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide border border-blue-200">
            <MessageCircle className="w-4 h-4" />
            Join Grup WA
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mt-2 bg-blue-50 inline-block px-3 py-1.5 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
        <Info className="w-4 h-4" />
        Tap untuk detail
      </div>
    </button>
  );
}

// ── Detail Modal ──────────────────────────
function DetailModal({
  result,
  onClose,
}: {
  result: StatusSearchResult | null;
  onClose: () => void;
}) {
  if (!result) return null;

  return (
    <Dialog open={!!result} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-0 shadow-2xl rounded-[2rem] p-6 sm:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-100 pb-4">
            Detail Pendaftaran
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1rem] bg-blue-50 text-blue-500 flex items-center justify-center" aria-hidden="true">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-xl text-gray-900 mb-1">
                {result.full_name}
              </p>
              <StatusBadge status={result.status} size="sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden bg-[#F8F9FA]">
            {[
              { label: 'No. Pendaftaran', value: (result as any).registration_number ?? result.id },
              { label: 'Proker', value: result.proker_title },
              { label: 'Divisi', value: result.division_name },
              { label: 'Tanggal Daftar', value: formatDate(result.registered_at) },
              { label: 'Status Proker', value: result.proker_status },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4 px-5 py-4">
                <span className="text-xs font-semibold text-gray-500 w-32 shrink-0 mb-1 sm:mb-0">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Accepted actions */}
          {result.status === 'accepted' && (
            <div className="space-y-3 pt-2">
              {result.certificate_code && (
                <Link
                  href={`/sertifikat/${result.certificate_code}`}
                  className="flex items-center justify-center w-full bg-blue-50 text-blue-600 py-3 rounded-xl border border-blue-200 font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Sertifikat
                </Link>
              )}
              <a
                href="#"
                className="flex items-center justify-center w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Bergabung ke Grup WhatsApp
              </a>
            </div>
          )}

          {/* Pending info */}
          {result.status === 'pending' && (
            <div className="rounded-xl bg-orange-50 border border-orange-100 p-5">
              <p className="text-sm font-medium text-orange-800 leading-relaxed">
                <span className="font-bold block mb-1">Pendaftaranmu sedang diproses.</span>
                Admin akan meninjaunya dalam 1-3 hari kerja. Cek kembali halaman ini untuk update.
              </p>
            </div>
          )}

          {/* Rejected info */}
          {result.status === 'rejected' && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-5">
              <p className="text-sm font-medium text-red-800 leading-relaxed">
                <span className="font-bold block mb-1">Maaf, pendaftaranmu tidak diterima.</span>
                Kamu bisa mencoba mendaftar ke divisi atau proker lain yang masih tersedia.
              </p>
            </div>
          )}

          {/* Waitlist info */}
          {result.status === 'waitlist' && (
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
              <p className="text-sm font-medium text-blue-800 leading-relaxed">
                <span className="font-bold block mb-1">Kamu ada di daftar waitlist.</span>
                Kamu akan otomatis dipromosikan jika ada slot yang tersedia.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────
export default function CekStatusPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<StatusSearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<StatusSearchResult | null>(null);
  const [localRegs, setLocalRegs] = useState<any[]>([]);

  // Load registrations saved in localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('registrations') ?? '[]');
      setLocalRegs(stored);
    } catch (_) {}
  }, []);

  async function handleSearch() {
    const q = query.trim().toUpperCase();
    if (q.length < 3) return;
    setIsLoading(true);
    setHasSearched(false);
    await new Promise((r) => setTimeout(r, 800));

    // Search localStorage registrations first
    const localMatches = localRegs.filter(
      (r) => (r.registration_number ?? r.id ?? '').toUpperCase() === q
    );

    // Also search mock data by id
    const mockMatches = mockRegistrationResults.filter(
      (r) => r.id.toUpperCase() === q
    );

    // Merge, local takes priority
    const merged = [...localMatches, ...mockMatches];
    setResults(merged as StatusSearchResult[]);
    setHasSearched(true);
    setIsLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6 shadow-sm">
            <Search className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Cek Status Pendaftaran
          </h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            Masukkan nomor pendaftaran yang kamu terima setelah mendaftar.
          </p>
        </div>

        {/* Search box */}
        <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-8 md:p-10 mb-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="status-search" className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Pendaftaran
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="status-search"
                  type="search"
                  placeholder="Contoh: REG-M3K9XA"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.toUpperCase())}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#F8F9FA] border border-black/5 rounded-xl pl-12 pr-4 py-3.5 font-mono font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0038FF]/20 focus:border-[#0038FF] transition-all tracking-wider"
                  aria-label="Masukkan nomor pendaftaran"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={query.trim().length < 3 || isLoading}
              className="w-full flex items-center justify-center bg-[#0038FF] disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Mencari Data...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-3" />
                  Lacak Sekarang
                </>
              )}
            </button>
          </div>

          <p className="text-xs font-medium text-gray-400 text-center mt-6">
            Nomor pendaftaran diberikan saat kamu berhasil mendaftar.
          </p>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {results.length === 0 ? (
              <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-10 text-center flex flex-col items-center">
                <SearchX className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran tidak ditemukan</h3>
                <p className="text-sm font-medium text-gray-500 mb-8">
                  Nomor pendaftaran <span className="font-mono font-bold text-gray-700">{query}</span> tidak ditemukan. Pastikan nomor yang kamu masukkan sudah benar.
                </p>
                <Link
                  href="/#proker"
                  className="inline-flex items-center justify-center bg-[#0038FF] text-white px-8 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md hover:bg-blue-700 transition-all"
                >
                  Lihat Proker Aktif
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm font-bold text-gray-500 text-center mb-6">
                  Ditemukan {results.length} pendaftaran untuk "{query}"
                </p>
                {results.map((result, i) => (
                  <div key={result.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <ResultCard result={result} onClick={() => setSelectedResult(result)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial hints */}
        {!hasSearched && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <ClipboardList className="w-8 h-8 text-blue-500" />, title: 'Pending', desc: 'Sedang diproses admin' },
              { icon: <CheckCircle2 className="w-8 h-8 text-green-500" />, title: 'Diterima', desc: 'Download sertifikat' },
              { icon: <Hourglass className="w-8 h-8 text-orange-500" />, title: 'Waitlist', desc: 'Antrian peserta' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white border border-black/5 shadow-sm p-6 text-center flex flex-col items-center justify-center relative overflow-hidden hover:shadow-md transition-all">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4" aria-hidden="true">{item.icon}</span>
                <p className="text-lg font-bold text-gray-900">{item.title}</p>
                <p className="text-xs font-medium text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA to register */}
        <div className="text-center mt-16">
          <p className="text-sm font-semibold text-gray-500 mb-4">
            Belum mendaftar ke proker manapun?
          </p>
          <Link
            href="/#proker"
            className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-3.5 rounded-xl border border-gray-200 font-bold shadow-sm hover:border-[#0038FF] hover:text-[#0038FF] transition-all"
          >
            Jelajahi Proker
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <DetailModal result={selectedResult} onClose={() => setSelectedResult(null)} />
    </div>
  );
}
