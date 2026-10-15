import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

type ToastType = 'success' | 'error' | 'info';

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

let addToastFn: ((message: string, type?: ToastType) => void) | null = null;

export function toast(message: string, type: ToastType = 'info') {
  addToastFn?.(message, type);
}

const icons = {
  success: <CheckCircle size={20} className="text-status-verified" />,
  error: <AlertCircle size={20} className="text-status-danger" />,
  info: <Info size={20} className="text-accent" />,
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    addToastFn = (message, type = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => { addToastFn = null; };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={cn('glass rounded-card p-4 flex items-start gap-3 shadow-lg')}
          >
            {icons[t.type]}
            <p className="flex-1 text-sm">{t.message}</p>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="shrink-0 p-1 rounded hover:bg-[var(--color-hover)]"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
