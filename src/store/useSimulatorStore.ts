import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScenarioOutcome } from '@/types';

interface SimulatorState {
  currentScenarioId: string | null;
  currentNodeId: string | null;
  flags: Record<string, boolean>;
  actionHistory: { nodeId: string; actionId: string; label: string }[];
  completedScenarios: Record<string, ScenarioOutcome>;
  version: number;

  startScenario: (scenarioId: string, startNodeId: string) => void;
  navigateToNode: (nodeId: string, actionId: string, label: string, flags?: Record<string, boolean>) => void;
  completeScenario: (scenarioId: string, outcome: ScenarioOutcome) => void;
  resetScenario: () => void;
  resetData: () => void;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      currentScenarioId: null,
      currentNodeId: null,
      flags: {},
      actionHistory: [],
      completedScenarios: {},
      version: 1,

      startScenario: (scenarioId, startNodeId) =>
        set({
          currentScenarioId: scenarioId,
          currentNodeId: startNodeId,
          flags: {},
          actionHistory: [],
        }),

      navigateToNode: (nodeId, actionId, label, newFlags) =>
        set((s) => ({
          currentNodeId: nodeId,
          flags: { ...s.flags, ...newFlags },
          actionHistory: [...s.actionHistory, { nodeId: s.currentNodeId!, actionId, label }],
        })),

      completeScenario: (scenarioId, outcome) =>
        set((s) => ({
          completedScenarios: { ...s.completedScenarios, [scenarioId]: outcome },
        })),

      resetScenario: () =>
        set({
          currentScenarioId: null,
          currentNodeId: null,
          flags: {},
          actionHistory: [],
        }),

      resetData: () =>
        set({
          currentScenarioId: null,
          currentNodeId: null,
          flags: {},
          actionHistory: [],
          completedScenarios: {},
        }),
    }),
    {
      name: 'rc_simulator',
      version: 1,
    }
  )
);
