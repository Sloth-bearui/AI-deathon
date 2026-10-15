import React from 'react';
import { cn } from '@/utils/cn';

interface GlassPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  as?: any;
  headingLevel?: 2 | 3;
}

/** A titled glass section. Used for page regions (breakdown, reliability, etc.). */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  title,
  subtitle,
  icon,
  actions,
  as: Tag = 'section',
  headingLevel = 2,
  className,
  children,
  ...rest
}) => {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Tag className={cn('glass rounded-glass p-5 sm:p-7', className)} {...rest}>
      {(title || actions) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {icon && (
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent-ink [&>svg]:h-5 [&>svg]:w-5" aria-hidden>
                {icon}
              </span>
            )}
            <div>
              {title && <H className="text-xl sm:text-2xl font-semibold">{title}</H>}
              {subtitle && <p className="mt-1 text-ink-2">{subtitle}</p>}
            </div>
          </div>
          {actions}
        </header>
      )}
      {children}
    </Tag>
  );
};
