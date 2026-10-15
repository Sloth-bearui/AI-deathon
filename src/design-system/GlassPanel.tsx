import React from 'react';
import { cn } from '@/utils/cn';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  glow = false,
}) => {
  return (
    <div
      className={cn(
        'glass rounded-glass p-6',
        glow && 'animate-glow-pulse',
        className
      )}
    >
      {children}
    </div>
  );
};
