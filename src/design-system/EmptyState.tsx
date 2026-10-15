import React from 'react';
import { cn } from '@/utils/cn';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4 text-[var(--color-text-muted)]">
        {icon || <SearchX size={28} />}
      </div>
      <h3 className="text-lg font-heading font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-[var(--color-text-secondary)] max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
