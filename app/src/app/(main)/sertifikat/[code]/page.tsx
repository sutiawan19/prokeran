'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  XCircle,
  Download,
  Share2,
  QrCode,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{ code: string }>;
}

// Mock certificate data
const mockCertificates: Record<string, {
  valid: boolean;
  name?: string;
  proker?: string;
  division?: string;
  period?: string;
  issuedAt?: string;
}> = {
  'UKM-PSB-K7X2M': {
    valid: true,
    name: 'Budi Santoso',
    proker: 'Pekan Seni & Budaya UKM 2025',
    division: 'Tim Dokumentasi',
    period: '1–7 November 2025',
    issuedAt: '2025-11-15',
  },
};

export default function SertifikatPage({ params }: PageProps) {
  const { code } = use(params);
  const cert = mockCertificates[code];

  if (!cert || !cert.valid) {
    return (
      <div className="min-h-screen bg-[#FF3366] flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full bg-white rounded-[2rem] border-[4px] border-black shadow-[12px_12px_0_0_black] p-8 md:p-10 text-center">
          <div className="w-24 h-24 rounded-full bg-black border-[4px] border-black flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-[#FF3366]" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-black uppercase mb-4 leading-tight">
            Sertifikat<br/>Tidak Valid
          </h1>
          <div className="bg-gray-100 border-[3px] border-black p-4 rounded-xl mb-4">
            <p className="text-sm font-bold uppercase text-black/60">Kode Pencarian</p>
            <p className="font-mono text-xl font-black tracking-widest">{code}</p>
          </div>
          <p className="text-xs font-bold text-black/70 mb-8 uppercase leading-relaxed">
            Sertifikat mungkin belum digenerate, atau kode tidak valid. Hubungi admin UKM jika kamu yakin sertifikat sudah diterbitkan.
          </p>
          <Link 
            href="/"
            className="flex items-center justify-center w-full bg-white text-black py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-[#CCFF00] transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={3} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const issuedDate = cert.issuedAt
    ? new Date(cert.issuedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Valid badge */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#CCFF00] border-[3px] border-black text-black text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_0_black] rotate-2">
            <CheckCircle className="w-5 h-5" strokeWidth={3} />
            Sertifikat Terverifikasi
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="rounded-[2rem] border-[4px] border-black bg-white shadow-[12px_12px_0_0_black] overflow-hidden mb-10 relative">
          {/* Certificate design */}
          <div className="relative p-10 sm:p-16 text-center min-h-[500px] flex flex-col justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]">
            
            {/* Decorative corners */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-[4px] border-l-[4px] border-black" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-[4px] border-r-[4px] border-black" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-[4px] border-l-[4px] border-black" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-[4px] border-r-[4px] border-black" />

            <div className="absolute inset-0 border-[16px] border-[#0038FF]/10 pointer-events-none m-6" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full bg-[#CCFF00] border-[4px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_black] -rotate-6">
                <Award className="w-10 h-10 text-black" strokeWidth={3} />
              </div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0038FF] mb-4">
                UKM PROKERAN YUK
              </p>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-black mb-10 leading-tight">
                Sertifikat<br/>Partisipasi
              </h2>

              <p className="text-xs font-bold uppercase text-black/60 mb-2">Diberikan kepada:</p>
              <h3 className="text-4xl sm:text-5xl font-black uppercase text-[#FF3366] mb-8 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                {cert.name}
              </h3>

              <div className="w-24 h-[4px] bg-black mb-8" />

              <p className="text-sm font-bold uppercase text-black/80 leading-relaxed max-w-lg mx-auto">
                Atas partisipasi sebagai{' '}
                <span className="font-black text-black border-b-2 border-[#0038FF] px-1">{cert.division}</span>{' '}
                dalam program kerja{' '}
                <span className="font-black text-black border-b-2 border-[#0038FF] px-1">{cert.proker}</span>{' '}
                periode <span className="font-black text-black">{cert.period}</span>
              </p>

              <div className="mt-12 flex items-end justify-between w-full max-w-lg mx-auto px-4">
                <div className="text-center">
                  <div className="w-32 h-[3px] bg-black mb-2" />
                  <p className="text-[10px] font-black uppercase text-black/60">Ketua Pelaksana</p>
                </div>

                {/* QR Code placeholder */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-white border-[3px] border-black flex items-center justify-center p-2">
                    <QrCode className="w-full h-full text-black" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-black/60 mt-2">Scan for info</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span>Terbit: {issuedDate}</span>
            <span>Kode: {code}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button 
            className="flex items-center justify-center bg-[#0038FF] text-white py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-[#CCFF00] hover:text-black transition-all"
            onClick={() => toast.info('Download PDF — fitur ini memerlukan koneksi backend.')}
          >
            <Download className="w-5 h-5 mr-2" strokeWidth={3} />
            Download PDF
          </button>
          <button 
            className="flex items-center justify-center bg-white text-black py-4 rounded-xl border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-black hover:text-white transition-all"
            onClick={() => {
              navigator.share?.({
                title: `Sertifikat ${cert.name}`,
                url: window.location.href,
              }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link berhasil disalin!');
              });
            }}
          >
            <Share2 className="w-5 h-5 mr-2" strokeWidth={3} />
            Bagikan
          </button>
        </div>

        {/* Verification info */}
        <div className="rounded-[1.5rem] bg-white border-[3px] border-black shadow-[6px_6px_0_0_black] p-6 md:p-8">
          <h3 className="font-black text-xl uppercase mb-6 border-b-[3px] border-black pb-4">
            Informasi Verifikasi
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Kode Sertifikat', value: code },
              { label: 'Penerima', value: cert.name },
              { label: 'Program Kerja', value: cert.proker },
              { label: 'Divisi', value: cert.division },
              { label: 'Tanggal Terbit', value: issuedDate },
              { label: 'Status', value: 'VALID & TERVERIFIKASI', color: 'text-emerald-600' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4 border-b-[2px] border-black/10 pb-4 last:border-0 last:pb-0">
                <span className="text-xs font-black uppercase text-black/50 w-40 shrink-0 mb-1 sm:mb-0">{item.label}</span>
                <span className={`text-sm font-bold uppercase ${item.color || 'text-black'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center justify-center bg-transparent text-black px-6 py-3 rounded-full border-[3px] border-black font-black uppercase shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-black hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={3} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
