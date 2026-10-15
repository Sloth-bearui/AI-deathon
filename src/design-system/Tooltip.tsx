import React from 'react';
import * as RT from '@radix-ui/react-tooltip';

export const TooltipProvider = RT.Provider;

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/** Supplementary hint only — never the sole carrier of information. */
export const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'top' }) => (
  <RT.Root delayDuration={250}>
    <RT.Trigger asChild>{children}</RT.Trigger>
    <RT.Portal>
      <RT.Content
        side={side}
        sideOffset={8}
        className="rc-pop z-[120] max-w-xs rounded-xl border border-line bg-raised px-3 py-2 text-sm text-ink shadow-lift"
      >
        {content}
        <RT.Arrow className="fill-[rgb(var(--c-raised))]" />
      </RT.Content>
    </RT.Portal>
  </RT.Root>
);
