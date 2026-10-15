import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'quiet' | 'cyber';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  technicalCode?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };
type LinkProps = BaseProps & { to: string; onClick?: () => void; 'aria-label'?: string; id?: string };

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[#5546F0] to-[#6C5CE7] text-white font-bold shadow-[0_4px_16px_rgba(85,70,240,0.28)] hover:shadow-[0_8px_24px_rgba(85,70,240,0.38)] hover:-translate-y-0.5 border border-[#5546F0]/20',
  cyber:
    'bg-[#F5F6FF] text-[#5546F0] border-2 border-[#5546F0]/30 shadow-[0_4px_14px_rgba(85,70,240,0.12)] hover:border-[#5546F0] hover:text-[#5546F0] hover:bg-[#5546F0]/10 hover:-translate-y-0.5 font-mono',
  secondary:
    'bg-white text-[#111B3C] border border-[#E8EAF4] shadow-sm hover:border-[#5546F0]/40 hover:text-[#5546F0] hover:bg-[#F5F6FF] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(85,70,240,0.1)]',
  ghost: 'text-[#596784] hover:text-[#5546F0] hover:bg-[#F5F6FF] border border-transparent hover:border-[#E8EAF4]',
  quiet: 'bg-[#F5F6FF] text-[#111B3C] hover:bg-[#E8EAF4]/60 border border-[#E8EAF4]',
  danger:
    'bg-rose-500/10 text-rose-600 border border-rose-200 shadow-sm hover:bg-rose-500/20 hover:border-rose-300 hover:shadow-[0_4px_12px_rgba(244,63,94,0.2)]',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[46px] px-4 text-sm gap-2',
  md: 'min-h-[54px] px-6 text-base gap-2.5',
  lg: 'min-h-[62px] px-8 text-lg gap-3',
};

const base =
  'relative group inline-flex select-none items-center justify-center rounded-xl font-heading font-bold tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 overflow-hidden active:scale-[0.98]';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps | LinkProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    loading,
    fullWidth,
    className,
    technicalCode,
    children,
    ...rest
  } = props;

  const cls = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const inner = (
    <>
      {/* Subtle laser sweep sheen on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

      {technicalCode && (
        <span className="font-mono text-[11px] opacity-70 tracking-tighter mr-1 uppercase">
          [{technicalCode}]
        </span>
      )}

      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
      ) : (
        icon && <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5" aria-hidden>{icon}</span>
      )}

      <span>{children}</span>

      {iconRight && <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5" aria-hidden>{iconRight}</span>}
    </>
  );

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as LinkProps;
    return (
      <Link to={to} className={cls} {...(linkRest as object)}>
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref} type="button" className={cls} {...(rest as ButtonProps)}>
      {inner}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
