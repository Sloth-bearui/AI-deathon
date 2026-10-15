import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] glass rounded-glass p-8',
                  sizes[size],
                  className
                )}
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.2 }}
              >
                {title && (
                  <Dialog.Title className="text-xl font-heading font-semibold mb-1">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-[var(--color-text-secondary)] mb-6">
                    {description}
                  </Dialog.Description>
                )}
                {children}
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-hover)] transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
