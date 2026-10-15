import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'verified' | 'caution' | 'danger' | 'info' | 'success' | 'error' | 'warning';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
  verified: 'bg-status-verified/15 text-status-verified',
  success: 'bg-emerald-400/15 text-emerald-400',
  caution: 'bg-status-caution/15 text-status-caution',
  warning: 'bg-amber-400/15 text-amber-400',
  danger: 'bg-status-danger/15 text-status-danger',
  error: 'bg-red-400/15 text-red-400',
  info: 'bg-status-info/15 text-status-info',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full',
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {children}
    </span>
  );
};
