import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** "sheet" slides from the bottom on mobile and the right on desktop */
  variant?: 'dialog' | 'sheet';
  hideClose?: boolean;
  closeLabel?: string;
}

const widths = { sm: 'sm:max-w-md', md: 'sm:max-w-xl', lg: 'sm:max-w-3xl' };

/** Accessible dialog built on Radix (focus trap, Esc to close, aria wiring). */
export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  variant = 'dialog',
  hideClose,
  closeLabel = 'Close',
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="rc-overlay fixed inset-0 z-[80] bg-[rgb(3_7_18/0.6)] backdrop-blur-sm" />
      <Dialog.Content
        className={cn(
          'glass-strong fixed z-[90] flex max-h-[92dvh] w-full flex-col overflow-hidden focus:outline-none',
          variant === 'dialog' &&
            cn('rc-pop bottom-0 left-0 rounded-t-[28px] sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-glass', widths[size]),
          variant === 'sheet' &&
            'rc-sheet bottom-0 left-0 rounded-t-[28px] sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:max-w-md sm:rounded-none sm:rounded-l-[28px]',
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-4 pt-6">
          <div>
            <Dialog.Title className="font-heading text-2xl font-semibold">{title}</Dialog.Title>
            {description ? (
              <Dialog.Description className="mt-1 text-ink-2">{description}</Dialog.Description>
            ) : (
              <Dialog.Description className="sr-only">{typeof title === 'string' ? title : 'Dialog'}</Dialog.Description>
            )}
          </div>
          {!hideClose && (
            <Dialog.Close
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-hover hover:text-ink"
              aria-label={closeLabel}
            >
              <X className="h-6 w-6" />
            </Dialog.Close>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-line px-6 py-4">{footer}</div>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
