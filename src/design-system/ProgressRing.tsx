import React from 'react';

interface ProgressRingProps {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  label: string;
  colorVar?: string;
}

/** Hand-built SVG ring. Generic primitive (e.g. task progress); carries no grading meaning. */
export const ProgressRing: React.FC<ProgressRingProps> = ({ value, size = 96, stroke = 8, children, label, colorVar = '--c-accent' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`pr-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`rgb(var(${colorVar}))`} />
            <stop offset="100%" stopColor="rgb(var(--c-accent-2))" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#pr-${size})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
};
