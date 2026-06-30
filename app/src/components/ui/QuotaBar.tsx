interface QuotaBarProps {
  filled: number;
  total: number;
  showText?: boolean;
  size?: 'sm' | 'default';
}

export function QuotaBar({ filled, total, showText = true, size = 'default' }: QuotaBarProps) {
  const percentage = total === 0 ? 0 : Math.min((filled / total) * 100, 100);
  const isFull = filled >= total;
  const isNearFull = percentage >= 80;

  const barClass = isFull
    ? 'bg-red-500'
    : isNearFull
    ? 'bg-orange-500'
    : 'bg-green-500';

  const sisa = total - filled;

  const textColor = isFull
    ? 'text-red-600'
    : isNearFull
    ? 'text-orange-600'
    : 'text-gray-900';

  return (
    <div className="space-y-1.5">
      {showText && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-gray-500">Kuota terisi</span>
          <span className={`${textColor}`}>
            {isFull ? 'Penuh' : `Sisa ${sisa} slot`}
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-100 rounded-full overflow-hidden ${
          size === 'sm' ? 'h-2' : 'h-3'
        }`}
        role="progressbar"
        aria-valuenow={filled}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Kuota: ${filled} dari ${total}`}
      >
        <div
          className={`h-full transition-all duration-700 ease-out rounded-full ${barClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <p className="text-xs font-medium text-gray-500">
          {filled} / {total} peserta
        </p>
      )}
    </div>
  );
}
