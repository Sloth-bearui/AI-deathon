import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Outcome } from '@/types';

interface SimulatorState {
  completedScenarioIds: string[];
  lastActiveScenarioId: string | null;
  scenarioOutcomes: Record<string, Outcome>;
  markScenarioCompleted: (id: string, outcome: Outcome) => void;
  setLastActiveScenario: (id: string) => void;
  reset: () => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      completedScenarioIds: [],
      lastActiveScenarioId: 'scenario-001',
      scenarioOutcomes: {},

      markScenarioCompleted: (id, outcome) => {
        set((state) => ({
          completedScenarioIds: state.completedScenarioIds.includes(id)
            ? state.completedScenarioIds
            : [...state.completedScenarioIds, id],
          scenarioOutcomes: {
            ...state.scenarioOutcomes,
            [id]: outcome,
          },
        }));
      },

      setLastActiveScenario: (id) => set({ lastActiveScenarioId: id }),

      reset: () =>
        set({
          completedScenarioIds: [],
          lastActiveScenarioId: 'scenario-001',
          scenarioOutcomes: {},
        }),
    }),
    {
      name: 'rc_simulator',
      version: 3,
    }
  )
);
