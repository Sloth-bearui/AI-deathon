import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPrefs } from '@/types';

interface PrefsState extends UserPrefs {
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  setTextScale: (scale: number) => void;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  setCalmMode: (calm: boolean) => void;
  toggleCalmMode: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  completeWelcome: () => void;
  resetAll: () => void;
}

const SCALES = [0.85, 1, 1.15, 1.3, 1.5];

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      textScale: 1,
      calmMode: false,
      language: 'en',
      welcomeCompleted: false,
      version: 1,

      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },
      setTextScale: (scale) => {
        document.documentElement.setAttribute('data-text-scale', String(scale));
        set({ textScale: scale });
      },
      increaseTextScale: () => {
        const curr = get().textScale;
        const idx = SCALES.indexOf(curr);
        if (idx < SCALES.length - 1) {
          const next = SCALES[idx + 1];
          document.documentElement.setAttribute('data-text-scale', String(next));
          set({ textScale: next });
        }
      },
      decreaseTextScale: () => {
        const curr = get().textScale;
        const idx = SCALES.indexOf(curr);
        if (idx > 0) {
          const next = SCALES[idx - 1];
          document.documentElement.setAttribute('data-text-scale', String(next));
          set({ textScale: next });
        }
      },
      setCalmMode: (calm) => {
        document.body.classList.toggle('calm-mode', calm);
        set({ calmMode: calm });
      },
      toggleCalmMode: () => {
        const next = !get().calmMode;
        document.body.classList.toggle('calm-mode', next);
        set({ calmMode: next });
      },
      setLanguage: (language) => set({ language }),
      completeWelcome: () => set({ welcomeCompleted: true }),
      resetAll: () => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-text-scale', '1');
        document.body.classList.remove('calm-mode');
        set({
          theme: 'dark',
          textScale: 1,
          calmMode: false,
          language: 'en',
          welcomeCompleted: false,
        });
      },
    }),
    {
      name: 'rc_prefs',
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
          document.documentElement.setAttribute('data-text-scale', String(state.textScale));
          document.body.classList.toggle('calm-mode', state.calmMode);
        }
      },
    }
  )
);
