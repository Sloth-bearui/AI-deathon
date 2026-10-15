import type { Scenario, ScenarioNode, ScenarioAction, ScenarioFlags, Outcome } from '@/types';
import { resolveOutcome } from './outcomeResolver';

export interface ActionLogEntry {
  actionId: string;
  label: string;
  commentary: string;
  safer?: boolean;
  timestamp: string;
}

export interface ScenarioState {
  scenario: Scenario;
  currentNodeId: string;
  flags: ScenarioFlags;
  history: ActionLogEntry[];
  isFinished: boolean;
  outcome?: Outcome;
  activeApp: string;
}

export function createInitialScenarioState(scenario: Scenario): ScenarioState {
  const startId = scenario.start || scenario.nodes[0]?.id || 'node-001';
  const startNode = scenario.nodes.find((n) => n.id === startId) || scenario.nodes[0];

  return {
    scenario,
    currentNodeId: startId,
    flags: {},
    history: [],
    isFinished: Boolean(startNode?.end),
    outcome: startNode?.end,
    activeApp: startNode?.app || 'messages',
  };
}

export function transitionScenario(
  state: ScenarioState,
  action: ScenarioAction
): ScenarioState {
  const nextNode = state.scenario.nodes.find((n) => n.id === action.next);
  const newFlags: ScenarioFlags = {
    ...state.flags,
    ...(action.set || {}),
  };

  const logEntry: ActionLogEntry = {
    actionId: action.id,
    label: action.label,
    commentary: action.commentary,
    safer: action.safer,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const isFinished = Boolean(nextNode?.end);
  const outcome = isFinished ? resolveOutcome(nextNode, newFlags as Record<string, boolean>) : undefined;

  return {
    ...state,
    currentNodeId: action.next,
    flags: newFlags,
    history: [...state.history, logEntry],
    isFinished,
    outcome,
    activeApp: nextNode?.app || state.activeApp,
  };
}
