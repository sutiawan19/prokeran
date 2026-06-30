import { RegistrationStatus, ProkerStatus } from '@/types';
import {
  Clock,
  CheckCircle,
  XCircle,
  Clock3,
  Trophy,
  CalendarClock,
  Zap,
} from 'lucide-react';

interface StatusBadgeProps {
  status: RegistrationStatus | ProkerStatus;
  size?: 'sm' | 'default';
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  // Registration statuses
  pending: {
    label: 'Menunggu Review',
    icon: Clock,
    className: 'bg-[#0038FF] text-white border-white/20',
  },
  accepted: {
    label: 'Diterima',
    icon: CheckCircle,
    className: 'bg-[#CCFF00] text-black border-black/10',
  },
  rejected: {
    label: 'Tidak Diterima',
    icon: XCircle,
    className: 'bg-[#FF3366] text-white border-black/10',
  },
  waitlist: {
    label: 'Waitlist',
    icon: Clock3,
    className: 'bg-white text-black border-black/10',
  },
  // Proker statuses
  upcoming: {
    label: 'Akan Datang',
    icon: CalendarClock,
    className: 'bg-[#0038FF] text-white border-white/20',
  },
  ongoing: {
    label: 'Pendaftaran Buka',
    icon: Zap,
    className: 'bg-[#CCFF00] text-black border-black/10',
  },
  completed: {
    label: 'Selesai',
    icon: Trophy,
    className: 'bg-black text-white border-black/20',
  },
  cancelled: {
    label: 'Dibatalkan',
    icon: XCircle,
    className: 'bg-[#FF3366] text-white border-black/10',
  },
};

export function StatusBadge({ status, size = 'default' }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    icon: Clock,
    className: 'bg-gray-200 text-black border-black/10',
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border-2 ${config.className} ${
        size === 'sm'
          ? 'px-3 py-1 text-[10px]'
          : 'px-4 py-1.5 text-xs'
      }`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} strokeWidth={2.5} />
      {config.label}
    </span>
  );
}
