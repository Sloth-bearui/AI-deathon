import { useState, useCallback } from 'react';
import type { Scenario, ScenarioAction } from '@/types';
import { createInitialScenarioState, transitionScenario, type ScenarioState } from './scenarioEngine';
import { useSimulatorStore } from '@/store/useSimulatorStore';

export function useScenario(scenario: Scenario) {
  const [state, setState] = useState<ScenarioState>(() => createInitialScenarioState(scenario));
  const [hintLevel, setHintLevel] = useState<'none' | 'nudge' | 'explain' | 'showMe'>('none');
  const markCompleted = useSimulatorStore((s) => s.markScenarioCompleted);

  const currentNode = state.scenario.nodes.find((n) => n.id === state.currentNodeId);

  const performAction = useCallback((action: ScenarioAction) => {
    setState((prev) => {
      const next = transitionScenario(prev, action);
      if (next.isFinished && next.outcome) {
        markCompleted(next.scenario.id, next.outcome);
      }
      return next;
    });
    setHintLevel('none'); // reset hint on action
  }, [markCompleted]);

  const reset = useCallback(() => {
    setState(createInitialScenarioState(scenario));
    setHintLevel('none');
  }, [scenario]);

  const switchApp = useCallback((appId: string) => {
    setState((prev) => ({ ...prev, activeApp: appId }));
  }, []);

  return {
    state,
    currentNode,
    performAction,
    reset,
    switchApp,
    hintLevel,
    setHintLevel,
  };
}
