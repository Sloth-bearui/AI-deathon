import React from 'react';
import { AlertTriangle, SearchX } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: 'empty' | 'error';
  className?: string;
}

/** Used for empty lists AND errors. Errors must say what happened and what to do next. */
export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, tone = 'empty', className }) => (
  <div
    role={tone === 'error' ? 'alert' : undefined}
    className={cn('glass flex flex-col items-center rounded-glass px-6 py-12 text-center', className)}
  >
    <span
      className={cn(
        'mb-5 grid h-16 w-16 place-items-center rounded-2xl [&>svg]:h-8 [&>svg]:w-8',
        tone === 'error' ? 'bg-bad/12 text-bad-ink' : 'bg-accent/12 text-accent-ink',
      )}
      aria-hidden
    >
      {icon ?? (tone === 'error' ? <AlertTriangle /> : <SearchX />)}
    </span>
    <h2 className="text-2xl font-semibold">{title}</h2>
    {description && <p className="mt-2 max-w-md text-ink-2">{description}</p>}
    {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
  </div>
);
