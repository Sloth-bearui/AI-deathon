import React from 'react';
import type { Scenario, Outcome } from '@/types';
import type { ActionLogEntry } from '../engine/scenarioEngine';
import { ActionTimeline } from './ActionTimeline';
import { GlassPanel, Button, Badge, type Tone } from '@/design-system';
import { ShieldCheck, RotateCcw, ArrowRight, ShieldAlert, LifeBuoy, CheckCircle2 } from 'lucide-react';

interface Props {
  scenario: Scenario;
  outcome: Outcome;
  history: ActionLogEntry[];
  onRetry: () => void;
  onNextScenario?: () => void;
}

export const OutcomeScreen: React.FC<Props> = ({
  scenario,
  outcome,
  history,
  onRetry,
  onNextScenario,
}) => {
  const outcomeConfig: Record<Outcome, { title: string; badge: string; tone: Tone; desc: string; icon: React.ReactNode }> = {
    safe: {
      title: 'You Stayed Safe!',
      badge: 'Protected',
      tone: 'ok',
      desc: 'You identified the warning signs, avoided clicking deceptive links, and verified through independent channels.',
      icon: <CheckCircle2 className="h-8 w-8 text-ok-ink" />,
    },
    recovered: {
      title: 'Recovered in Time',
      badge: 'Safe Recovery',
      tone: 'accent',
      desc: 'You started down an uncertain path, but noticed the suspicious signals and safely closed the interaction before sharing sensitive data.',
      icon: <ShieldCheck className="h-8 w-8 text-accent-ink" />,
    },
    compromised: {
      title: 'Compromised (Simulation)',
      badge: 'Learning Opportunity',
      tone: 'bad',
      desc: 'In a real-life situation, this choice could have exposed confidential banking credentials. Remember: this was purely a safe practice test.',
      icon: <ShieldAlert className="h-8 w-8 text-bad-ink" />,
    },
  };

  const current = outcomeConfig[outcome] || outcomeConfig.safe;

  return (
    <GlassPanel className="p-6 sm:p-8 space-y-8 max-w-2xl mx-auto border border-accent/20 animate-fade-in">
      {/* Outcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-line">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-surface border border-line shrink-0 shadow-soft">
          {current.icon}
        </div>

        <div className="space-y-1">
          <Badge tone={current.tone} size="md">
            {current.badge}
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink">
            {current.title}
          </h2>
          <p className="text-sm text-ink-2 leading-relaxed">
            {current.desc}
          </p>
        </div>
      </div>

      {/* 1. What Happened Action Timeline */}
      <ActionTimeline history={history} />

      {/* 2. Safer Choices List */}
      {scenario.saferChoices && scenario.saferChoices.length > 0 && (
        <div className="p-4 rounded-xl border border-line bg-surface/50 space-y-2">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-ink flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> Safer Choices To Remember
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-2 leading-relaxed">
            {scenario.saferChoices.map((choice, i) => (
              <li key={i}>{choice}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Step-by-Step Emergency Recovery Guide */}
      {scenario.recoverySteps && scenario.recoverySteps.length > 0 && (
        <div className="p-4 rounded-xl border border-bad/30 bg-bad/10 space-y-2">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-bad-ink flex items-center gap-1.5">
            <LifeBuoy className="h-4 w-4" /> If This Ever Happens For Real: Step-by-Step Recovery
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-ink-2 leading-relaxed">
            {scenario.recoverySteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Navigation Controls: Try again & Next scenario (NO SCORES) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
        <Button
          variant="secondary"
          size="md"
          icon={<RotateCcw />}
          onClick={onRetry}
        >
          Try Again
        </Button>

        <div className="flex items-center gap-3">
          <Button
            to="/practice"
            variant="ghost"
            size="md"
          >
            All Scenarios
          </Button>

          {onNextScenario && (
            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowRight />}
              onClick={onNextScenario}
            >
              Next Scenario
            </Button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};
