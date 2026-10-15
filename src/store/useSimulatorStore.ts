import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SimulatorState {
  completedScenarios: string[];
  version: number;

  completeScenario: (scenarioId: string) => void;
  resetScenario: (scenarioId: string) => void;
  resetData: () => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      completedScenarios: [],
      version: 2,

      completeScenario: (scenarioId) =>
        set((s) => ({
          completedScenarios: s.completedScenarios.includes(scenarioId)
            ? s.completedScenarios
            : [...s.completedScenarios, scenarioId],
        })),

      resetScenario: (scenarioId) =>
        set((s) => ({
          completedScenarios: s.completedScenarios.filter((id) => id !== scenarioId),
        })),

      resetData: () => set({ completedScenarios: [] }),
    }),
    {
      name: 'rc_simulator',
      version: 2,
    }
  )
);
