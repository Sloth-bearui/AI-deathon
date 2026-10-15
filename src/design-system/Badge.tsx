import React from 'react';
import { cn } from '@/utils/cn';

export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'bad' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface text-ink-2 border-line',
  accent: 'bg-accent/12 text-accent-ink border-accent/30',
  ok: 'bg-ok/12 text-ok-ink border-ok/35',
  warn: 'bg-warn/12 text-warn-ink border-warn/35',
  bad: 'bg-bad/12 text-bad-ink border-bad/35',
  info: 'bg-accent-2/12 text-ink border-accent-2/35',
};

interface BadgeProps {
  tone?: Tone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

/** Status pill. Always pair colour with an icon AND a text label. */
export const Badge: React.FC<BadgeProps> = ({ tone = 'neutral', icon, children, className, size = 'md' }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-semibold leading-none whitespace-nowrap',
      size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs',
      tones[tone],
      className,
    )}
  >
    {icon && <span className="[&>svg]:h-4 [&>svg]:w-4" aria-hidden>{icon}</span>}
    {children}
  </span>
);
