import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
  technical?: boolean;
  as?: any;
}

/** Frosted glass card with 20px radius, luminous hairline border, and optional technical corner ticks. */
export const Card: React.FC<CardProps> = ({
  interactive,
  padded = true,
  technical = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}) => (
  <Tag
    className={cn(
      'glass rounded-glass relative',
      padded && 'p-5 sm:p-6',
      interactive &&
        'transition-all duration-300 hover:-translate-y-1 hover:border-[#5546F0]/40 hover:shadow-lift focus-within:border-[#5546F0]/50',
      technical &&
        'border border-[#E8EAF4] shadow-sm before:absolute before:top-2 before:left-2 before:text-[10px] before:font-mono before:text-[#5546F0]/30 before:content-["+"] after:absolute after:bottom-2 after:right-2 after:text-[10px] after:font-mono after:text-[#5546F0]/30 after:content-["+"]',
      className,
    )}
    {...(rest as any)}
  >
    {children}
  </Tag>
);

export default Card;
