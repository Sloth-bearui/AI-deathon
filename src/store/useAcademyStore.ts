import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import labsData from '@/data/labs.json';

export interface AcademyModule {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  steps: number;
}

// Transform labs.json into module format
function transformModules(raw: typeof labsData): AcademyModule[] {
  const difficultyMap: Record<string, string> = {
    'scam-awareness': 'beginner',
    'digital-banking': 'beginner',
    'ai-media': 'intermediate',
    'device-security': 'beginner',
    'ai-literacy': 'intermediate',
  };

  return raw.map((lab: any) => ({
    id: lab.id === 'lab-001' ? 'reverse-image' :
        lab.id === 'lab-002' ? 'url-anatomy' :
        lab.id === 'lab-003' ? 'deepfake-detection' :
        lab.id === 'lab-004' ? 'privacy-settings' :
        lab.id === 'lab-005' ? 'social-engineering' :
        lab.id === 'lab-006' ? 'password-hygiene' : lab.id,
    title: lab.title,
    description: lab.description,
    difficulty: difficultyMap[lab.category] || 'beginner',
    duration: `${lab.estimatedMinutes} min`,
    steps: lab.lessons?.length || 4,
  }));
}

interface AcademyState {
  modules: AcademyModule[];
  completedSteps: Record<string, number[]>; // moduleId -> array of completed step indices
  version: number;

  completeStep: (moduleId: string, stepIndex: number) => void;
  getModuleProgress: (moduleId: string) => number;
  resetData: () => void;
}

const seedModules = transformModules(labsData as any);

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      modules: seedModules,
      completedSteps: {},
      version: 2,

      completeStep: (moduleId, stepIndex) =>
        set((s) => {
          const existing = s.completedSteps[moduleId] || [];
          if (existing.includes(stepIndex)) return s;
          return {
            completedSteps: {
              ...s.completedSteps,
              [moduleId]: [...existing, stepIndex],
            },
          };
        }),

      getModuleProgress: (moduleId) => {
        const state = get();
        const mod = state.modules.find((m) => m.id === moduleId);
        if (!mod) return 0;
        const completed = state.completedSteps[moduleId]?.length || 0;
        return Math.round((completed / mod.steps) * 100);
      },

      resetData: () => set({ completedSteps: {} }),
    }),
    {
      name: 'rc_academy',
      version: 2,
    }
  )
);
