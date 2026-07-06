import Link from 'next/link';
import { Division } from '@/types';
import { QuotaBar } from '@/components/ui/QuotaBar';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface DivisionCardProps {
  division: Division;
  prokerSlug: string;
  registrationClose?: string | null;
}

export function DivisionCard({ division, prokerSlug, registrationClose }: DivisionCardProps) {
  const isFull = division.filled_quota >= division.quota;
  const isExpired = registrationClose
    ? new Date(registrationClose) < new Date()
    : false;
  const isDisabled = isFull || isExpired;

  const sisa = division.quota - division.filled_quota;


  return (
    <article
      className={`bg-white rounded-2xl border border-black/5 p-6 space-y-4 transition-all duration-300 ${
        isDisabled
          ? 'opacity-70'
          : 'hover:-translate-y-1 hover:shadow-lg hover:border-blue-100'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-snug">
            {division.name}
          </h3>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {division.description}
      </p>

      {/* Quota */}
      <div className="pt-2">
        <QuotaBar
          filled={division.filled_quota}
          total={division.quota}
          size="sm"
        />
      </div>

      {/* Details/Tasks summary */}
      {division.tasks && division.tasks.length > 0 && (
        <ul className="pt-3 space-y-2">
          {division.tasks.slice(0, 2).map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="leading-tight">{task}</span>
            </li>
          ))}
          {division.tasks.length > 2 && (
            <li className="text-[10px] font-semibold text-blue-600 pl-6">
              + {division.tasks.length - 2} Tugas Lainnya
            </li>
          )}
        </ul>
      )}

      {/* Action */}
      {!isDisabled && (
        <div className="pt-4 w-full">
          <Link
            href={`/proker/${prokerSlug}/daftar?divisi=${division.id}`}
            className="flex items-center justify-center w-full bg-[#0038FF] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:bg-blue-700 transition-all group"
          >
            Pilih Divisi
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </article>
  );
}
