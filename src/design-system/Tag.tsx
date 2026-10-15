import React from 'react';
import { cn } from '@/utils/cn';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  active = false,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center px-3 py-1.5 text-sm rounded-full transition-all duration-200 min-h-[40px]',
        active
          ? 'bg-accent/20 text-accent border border-accent/30'
          : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-transparent hover:border-[var(--color-border)] hover:text-[var(--color-text)]',
        className
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
