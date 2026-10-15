import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '@/types';

export const TEXT_SCALES = [0.9, 1, 1.15, 1.3, 1.5] as const;

interface PrefsState {
  theme: 'dark' | 'light';
  textScale: number;
  calmMode: boolean;
  language: Lang;
  welcomeDone: boolean;
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
  setTextScale: (s: number) => void;
  setCalmMode: (v: boolean) => void;
  setLanguage: (l: Lang) => void;
  setWelcomeDone: (v: boolean) => void;
  reset: () => void;
}

const defaults = { theme: 'light' as const, textScale: 1, calmMode: false, language: 'en' as Lang, welcomeDone: false };

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set, get) => ({
      ...defaults,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setTextScale: (textScale) => set({ textScale: Math.min(1.5, Math.max(0.9, textScale)) }),
      setCalmMode: (calmMode) => set({ calmMode }),
      setLanguage: (language) => set({ language }),
      setWelcomeDone: (welcomeDone) => set({ welcomeDone }),
      reset: () => set({ ...defaults, welcomeDone: true }),
    }),
    { name: 'rc_prefs', version: 1 },
  ),
);
