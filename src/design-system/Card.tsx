import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  onClick,
  as: Component = 'div',
}) => {
  return (
    <Component
      className={cn(
        'glass rounded-glass p-6',
        hover && 'glass-hover cursor-pointer transition-all duration-200 hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </Component>
  );
};
