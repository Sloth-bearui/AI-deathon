import React from 'react';
import { cn } from '@/utils/cn';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

/** Filter chip (toggle button) or static tag when no onClick is given. */
export const Tag: React.FC<TagProps> = ({ children, active, onClick, icon, className, id }) => {
  const cls = cn(
    'inline-flex items-center gap-2 rounded-full border font-semibold transition-all duration-200',
    onClick ? 'min-h-[48px] px-4 text-base' : 'px-3 py-1 text-sm',
    active
      ? 'border-accent/60 bg-accent/15 text-accent-ink shadow-[0_0_0_1px_rgb(var(--c-accent)/0.25)]'
      : 'border-line bg-surface/60 text-ink-2 hover:border-accent/40 hover:text-ink',
    className,
  );
  const content = (
    <>
      {icon && <span className="[&>svg]:h-4 [&>svg]:w-4" aria-hidden>{icon}</span>}
      {children}
    </>
  );
  if (!onClick) return <span className={cls}>{content}</span>;
  return (
    <button id={id} type="button" className={cls} aria-pressed={!!active} onClick={onClick}>
      {content}
    </button>
  );
};
