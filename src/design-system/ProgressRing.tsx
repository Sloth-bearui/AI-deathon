import React from 'react';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = '#2DD4BF',
  label,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const offset = circumference * (1 - percent);

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className || ''}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-label={`${Math.round(percent * 100)}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="text-xl font-heading font-semibold" style={{ color }}>
        {Math.round(value)}
      </span>
      {label && <span className="text-xs text-[var(--color-text-muted)]">{label}</span>}
    </div>
  );
};
