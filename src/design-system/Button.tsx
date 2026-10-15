import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  className,
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-accent to-accent-light text-base-DEFAULT hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'glass glass-hover text-[var(--color-text)] hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]',
    danger: 'bg-status-danger/10 text-status-danger border border-status-danger/20 hover:bg-status-danger/20',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm rounded-button',
    md: 'h-12 px-6 text-base rounded-button min-h-[56px]',
    lg: 'h-14 px-8 text-lg rounded-button min-h-[56px]',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
