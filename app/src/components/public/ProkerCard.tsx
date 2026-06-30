import Link from 'next/link';
import Image from 'next/image';
import { Proker } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Calendar, Users, ArrowRight } from 'lucide-react';

interface ProkerCardProps {
  proker: Proker;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ProkerCard({ proker }: ProkerCardProps) {
  const totalQuota = proker.divisions?.reduce((sum, d) => sum + d.quota, 0) ?? 0;
  const totalFilled = proker.divisions?.reduce((sum, d) => sum + d.filled_quota, 0) ?? 0;
  const divCount = proker.divisions?.length ?? 0;
  const isOpen = proker.status === 'ongoing';

  return (
    <article className="bg-[#F8F9FA] rounded-[2rem] p-6 flex flex-col relative h-full min-h-[360px] border-[3px] border-black hover:-translate-y-2 hover:shadow-[8px_8px_0_0_black] transition-all duration-300 overflow-hidden group">
      {/* Banner */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gray-200 overflow-hidden rounded-t-[1.75rem] border-b-[3px] border-black">
        {proker.banner_url ? (
          <Image
            src={proker.banner_url}
            alt={`Banner ${proker.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#0038FF] flex items-center justify-center opacity-90">
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="#CCFF00" fillOpacity="0.4" fillRule="evenodd"/>
            </svg>
          </div>
        )}
      </div>

      {/* Status Badge overlay */}
      <div className="absolute top-4 left-4 z-10">
        <StatusBadge status={proker.status} />
      </div>

      {/* Content */}
      <div className="relative mt-24 pt-4 flex-1 flex flex-col bg-[#F8F9FA] rounded-t-[2rem]">
        <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black line-clamp-2">
          {proker.title}
        </h3>
        
        <div className="mt-2 space-y-2 text-sm font-bold text-black/70 mb-auto">
          <p className="flex items-center gap-2">
            <span className="text-xl">📅</span> {formatDate(proker.start_date)} - {formatDate(proker.end_date)}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-xl">👥</span> {divCount} Divisi · {totalFilled}/{totalQuota} Pendaftar
          </p>
        </div>
        
        {/* Action Pill */}
        <div className="w-full mt-6">
          <Link 
            href={`/proker/${proker.slug}`} 
            className={`flex items-center justify-center w-full rounded-full py-3.5 font-black text-sm uppercase transition-colors border-[2px] border-black shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
              isOpen ? 'bg-[#CCFF00] text-black hover:bg-black hover:text-white' : 'bg-[#0038FF] text-white hover:bg-[#CCFF00] hover:text-black'
            }`}
            style={{ pointerEvents: proker.status === 'cancelled' ? 'none' : 'auto', opacity: proker.status === 'cancelled' ? 0.5 : 1 }}
          >
            {proker.status === 'ongoing' && 'Daftar Sekarang'}
            {proker.status === 'upcoming' && 'Lihat Detail'}
            {proker.status === 'completed' && 'Dokumentasi'}
            {proker.status === 'cancelled' && 'Dibatalkan'}
            <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </article>
  );
}
