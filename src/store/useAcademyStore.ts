import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AcademyState {
  completedLabIds: string[];
  version: number;
  completeLab: (labId: string) => void;
  isLabCompleted: (labId: string) => boolean;
  resetData: () => void;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      completedLabIds: [],
      version: 1,

      completeLab: (labId) =>
        set((s) => ({
          completedLabIds: s.completedLabIds.includes(labId)
            ? s.completedLabIds
            : [...s.completedLabIds, labId],
        })),
      
      isLabCompleted: (labId) => get().completedLabIds.includes(labId),
      
      resetData: () => set({ completedLabIds: [] }),
    }),
    {
      name: 'rc_academy',
      version: 1,
    }
  )
);
