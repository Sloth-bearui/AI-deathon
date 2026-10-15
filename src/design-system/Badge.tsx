import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'verified' | 'caution' | 'danger' | 'info';
  className?: string;
}

const variantClasses = {
  default: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]',
  verified: 'bg-status-verified/15 text-status-verified',
  caution: 'bg-status-caution/15 text-status-caution',
  danger: 'bg-status-danger/15 text-status-danger',
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
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
