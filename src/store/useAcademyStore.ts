import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AcademyState {
  completedLabIds: string[];
  lastActiveLabSlug: string | null;
  toggleCompleteLab: (slugOrId: string) => void;
  setLastActiveLab: (slug: string) => void;
  isLabCompleted: (slugOrId: string) => boolean;
  reset: () => void;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      completedLabIds: [],
      lastActiveLabSlug: 'spot-phishing-messages',

      toggleCompleteLab: (slugOrId) => {
        set((state) => {
          const exists = state.completedLabIds.includes(slugOrId);
          return {
            completedLabIds: exists
              ? state.completedLabIds.filter((id) => id !== slugOrId)
              : [...state.completedLabIds, slugOrId],
          };
        });
      },

      setLastActiveLab: (slug) => set({ lastActiveLabSlug: slug }),

      isLabCompleted: (slugOrId) => get().completedLabIds.includes(slugOrId),

      reset: () => set({ completedLabIds: [], lastActiveLabSlug: 'spot-phishing-messages' }),
    }),
    {
      name: 'rc_academy',
      version: 3,
    }
  )
);
