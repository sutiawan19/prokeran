import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-[2rem] border-[4px] border-black shadow-[8px_8px_0_0_black]">
      {/* Illustration */}
      <div className="mb-8">
        {icon ? (
          <div className="w-24 h-24 rounded-full bg-[#CCFF00] border-[4px] border-black flex items-center justify-center text-5xl shadow-[4px_4px_0_0_black] -rotate-6">
            {icon}
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#0038FF] border-[4px] border-black flex items-center justify-center shadow-[4px_4px_0_0_black] rotate-6">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              className="w-12 h-12 text-white"
              aria-hidden="true"
            >
              <rect x="12" y="20" width="56" height="40" rx="0" stroke="currentColor" strokeWidth="4" fill="none" />
              <path d="M24 36h32M24 44h20" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
            </svg>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-black uppercase text-black mb-4">
        {title}
      </h3>
      <p className="text-sm font-bold uppercase text-black/60 max-w-sm leading-relaxed mb-10">
        {description}
      </p>

      {(actionLabel && actionHref) && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center bg-[#0038FF] text-white px-8 py-4 rounded-xl border-[3px] border-black font-black uppercase text-lg shadow-[6px_6px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-black transition-all"
        >
          {actionLabel}
          <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
        </Link>
      )}
      {(actionLabel && onAction) && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center bg-[#CCFF00] text-black px-8 py-4 rounded-xl border-[3px] border-black font-black uppercase text-lg shadow-[6px_6px_0_0_black] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
        >
          {actionLabel}
          <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
