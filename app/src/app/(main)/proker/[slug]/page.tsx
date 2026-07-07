'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { faqItems } from '@/lib/mock-data';
import { DivisionCard } from '@/components/public/DivisionCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDatetime(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DetailProkerPage({ params }: PageProps) {
  const { slug } = use(params);
  const [draftProker, setDraftProker] = useState<any>(null);
  const [prokers, setProkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug === 'preview') {
      const draft = localStorage.getItem('proker_preview');
      if (draft) setDraftProker(JSON.parse(draft));
      setLoading(false);
    } else {
      fetch('/api/prokers')
        .then(res => res.json())
        .then(data => {
          setProkers(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Memuat data...</div>;

  let _proker = prokers.find((p) => p.slug === slug);

  if (slug === 'preview') {
    if (draftProker) {
      _proker = draftProker;
    } else {
      return <div className="min-h-screen flex items-center justify-center font-bold">Memuat Preview...</div>;
    }
  } else if (!_proker) {
    notFound();
  }

  // Safe checks since proker is now guaranteed if we pass the block above
  const proker = _proker as any;

  const totalQuota = proker.divisions?.reduce((sum: number, d: any) => sum + d.quota, 0) ?? 0;
  const totalFilled = proker.divisions?.reduce((sum: number, d: any) => sum + (d.filled_quota || 0), 0) ?? 0;
  const divCount = proker.divisions?.length ?? 0;
  const isOpen = proker.status === 'ongoing';
  const benefits = proker.benefits ? proker.benefits.split('\n').filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ── Hero Banner ──────────────────── */}
      <div className="relative h-64 md:h-[350px] overflow-hidden">
        {proker.banner_url ? (
          <Image
            src={proker.banner_url}
            alt={`Banner ${proker.title}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="#ffffff" fillOpacity="0.1" fillRule="evenodd"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/40 to-transparent" />
      </div>

      {/* ── Content ──────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 -mt-32 md:-mt-40 relative z-10 pb-20">

        {/* Breadcrumb */}
        <div className="mb-6 bg-white/80 backdrop-blur-md border border-black/5 shadow-sm inline-block px-4 py-2 rounded-xl">
          <Breadcrumb>
            <BreadcrumbList className="font-semibold text-gray-500 text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-[#0038FF]">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/#proker" className="hover:text-[#0038FF]">Proker</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900">{proker.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <StatusBadge status={proker.status} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {proker.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {proker.description || 'Tidak ada deskripsi yang tersedia.'}
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-sm">
              <Tabs defaultValue="divisi" className="w-full">
                <TabsList className="w-full justify-start bg-gray-100/50 p-1.5 mb-8 rounded-2xl flex-wrap !h-auto border border-black/5 shadow-inner">
                  <TabsTrigger 
                    value="divisi" 
                    className="rounded-xl flex-1 whitespace-nowrap data-[state=active]:bg-[#CCFF00] data-[state=active]:text-black data-[state=active]:border-black/10 data-[state=active]:shadow-none text-gray-500 py-3 px-6 font-bold uppercase tracking-wider border-2 border-transparent transition-all !h-auto"
                  >
                    Pilihan Divisi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="info" 
                    className="rounded-xl flex-1 whitespace-nowrap data-[state=active]:bg-[#CCFF00] data-[state=active]:text-black data-[state=active]:border-black/10 data-[state=active]:shadow-none text-gray-500 py-3 px-6 font-bold uppercase tracking-wider border-2 border-transparent transition-all !h-auto"
                  >
                    Benefit & Info Singkat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dokumentasi" 
                    className="rounded-xl flex-1 whitespace-nowrap data-[state=active]:bg-[#CCFF00] data-[state=active]:text-black data-[state=active]:border-black/10 data-[state=active]:shadow-none text-gray-500 py-3 px-6 font-bold uppercase tracking-wider border-2 border-transparent transition-all !h-auto"
                  >
                    Dokumentasi
                  </TabsTrigger>
                </TabsList>

                {/* Tab: Divisi */}
                <TabsContent value="divisi" className="mt-0 focus-visible:outline-none">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Divisi Tersedia</h2>
                  {proker.divisions && proker.divisions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proker.divisions.map((div: any) => (
                        <DivisionCard
                          key={div.id}
                          division={div}
                          prokerSlug={proker.slug}
                          registrationClose={proker.registration_close}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
                      <p className="text-gray-500 font-medium">Belum ada divisi yang dibuka untuk proker ini.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Tab: Info & Benefits */}
                <TabsContent value="info" className="mt-0 focus-visible:outline-none">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Benefit Mengikuti {proker.title}</h2>
                  {benefits.length > 0 ? (
                    <ul className="space-y-4">
                      {benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic bg-gray-50 p-6 rounded-xl text-center">Benefit belum ditambahkan oleh admin.</p>
                  )}
                </TabsContent>

                {/* Tab: Dokumentasi */}
                <TabsContent value="dokumentasi" className="mt-0 focus-visible:outline-none">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Dokumentasi Kegiatan</h2>
                  {proker.documentation && proker.documentation.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {proker.documentation.map((doc: any, i: number) => (
                        <div key={i} className="relative aspect-video rounded-2xl overflow-hidden group border border-gray-100">
                          <Image
                            src={doc.url}
                            alt={doc.caption || `Galeri ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-10 flex flex-col items-center justify-center border border-dashed border-gray-200 text-center">
                      <ImageIcon className="w-10 h-10 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">Belum ada dokumentasi untuk proker ini.</p>
                    </div>
                  )}
                </TabsContent>

              </Tabs>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-sm mt-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Pertanyaan Umum (FAQ)</h2>
              <Accordion className="w-full">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-800 text-base py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 border border-black/5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Informasi Penting</h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Pelaksanaan</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(proker.start_date)} - {formatDate(proker.end_date)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Tutup Pendaftaran</p>
                    <p className="font-medium text-gray-900">
                      {formatDatetime(proker.registration_close)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Kuota Tersedia</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden w-24">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${totalQuota > 0 ? (totalFilled / totalQuota) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-900 text-xs">{totalFilled}/{totalQuota}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{divCount} divisi dibuka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="bg-[#0038FF] rounded-[2rem] p-6 text-white text-center shadow-lg">
              <h3 className="font-bold text-lg mb-2">Siap Bergabung?</h3>
              <p className="text-white/80 text-sm mb-6">
                Jangan lewatkan kesempatan untuk berkontribusi di {proker.title}.
              </p>
              
              {isOpen ? (
                <Link 
                  href={`/proker/${proker.slug}/daftar`}
                  className="flex items-center justify-center w-full bg-white text-[#0038FF] py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors group"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button 
                  disabled
                  className="w-full bg-white/20 text-white/60 py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  Pendaftaran Ditutup
                </button>
              )}
            </div>

            {/* Registration Check */}
            <Link 
              href="/cek-status"
              className="flex items-center justify-between bg-white rounded-2xl p-4 border border-black/5 shadow-sm hover:border-blue-200 transition-colors group"
            >
              <div>
                <p className="font-bold text-gray-900 text-sm">Sudah mendaftar?</p>
                <p className="text-xs text-gray-500 mt-0.5">Cek status seleksi kamu</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
