import type { Scenario, ScenarioNode, Outcome } from '@/types';

export function resolveOutcome(node: ScenarioNode | undefined, flags: Record<string, boolean>): Outcome {
  if (node?.end) return node.end;
  if (flags.sharedOtp || flags.enteredPin || (flags.installedApp && flags.sharedDetails)) {
    return 'compromised';
  }
  if (flags.tappedLink && (flags.checkedSender || flags.blockedSender)) {
    return 'recovered';
  }
  return 'safe';
}
