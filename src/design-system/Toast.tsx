import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { create } from 'zustand';
import { cn } from '@/utils/cn';

type ToastKind = 'success' | 'error' | 'info';
interface ToastItem { id: number; kind: ToastKind; title: string; body?: string }

const useToasts = create<{ items: ToastItem[]; push: (t: Omit<ToastItem, 'id'>) => void; drop: (id: number) => void }>((set) => ({
  items: [],
  push: (t) => set((s) => ({ items: [...s.items.slice(-2), { ...t, id: Date.now() + Math.random() }] })),
  drop: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));

/** Fire a toast from anywhere: toast.success('Saved'). */
export const toast = {
  success: (title: string, body?: string) => useToasts.getState().push({ kind: 'success', title, body }),
  error: (title: string, body?: string) => useToasts.getState().push({ kind: 'error', title, body }),
  info: (title: string, body?: string) => useToasts.getState().push({ kind: 'info', title, body }),
};

const icon = {
  success: <CheckCircle2 className="h-6 w-6 text-ok-ink" />,
  error: <AlertTriangle className="h-6 w-6 text-bad-ink" />,
  info: <Info className="h-6 w-6 text-accent-ink" />,
};

const ToastCard: React.FC<{ t: ToastItem }> = ({ t }) => {
  const drop = useToasts((s) => s.drop);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setLeaving(true), 4600);
    const b = setTimeout(() => drop(t.id), 5000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [t.id, drop]);
  return (
    <div
      role={t.kind === 'error' ? 'alert' : 'status'}
      className={cn('glass-strong pointer-events-auto flex w-full items-start gap-3 rounded-2xl p-4 transition-all duration-300', leaving ? 'translate-y-2 opacity-0' : 'rc-pop')}
    >
      {icon[t.kind]}
      <div className="flex-1">
        <p className="font-heading font-semibold">{t.title}</p>
        {t.body && <p className="text-sm text-ink-2">{t.body}</p>}
      </div>
      <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-hover" onClick={() => drop(t.id)} aria-label="Dismiss message">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export const ToastViewport: React.FC = () => {
  const items = useToasts((s) => s.items);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-3 bottom-24 z-[130] mx-auto flex max-w-md flex-col gap-2 lg:bottom-6 lg:left-auto lg:right-6">
      {items.map((t) => <ToastCard key={t.id} t={t} />)}
    </div>
  );
};
