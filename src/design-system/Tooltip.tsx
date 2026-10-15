import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const TooltipProvider = RadixTooltip.Provider;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
}) => {
  return (
    <RadixTooltip.Root delayDuration={300}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          className={cn(
            'z-50 px-3 py-2 text-sm glass rounded-lg',
            'animate-fade-in',
            'max-w-xs'
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-[var(--glass-bg)]" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};
