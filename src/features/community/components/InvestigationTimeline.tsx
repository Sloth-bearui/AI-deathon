import React from 'react';
import type { InvestigationStep } from '@/types';
import { Badge, type Tone } from '@/design-system';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Loader2, Search, FileCode, Landmark, Archive, ShieldCheck } from 'lucide-react';

interface Props {
  steps: InvestigationStep[];
  currentStepIndex: number;
  isRunning: boolean;
}

const toneMap: Record<string, { tone: Tone; icon: React.ReactNode }> = {
  supports: { tone: 'ok', icon: <CheckCircle2 className="h-4 w-4" /> },
  contradicts: { tone: 'bad', icon: <XCircle className="h-4 w-4" /> },
  neutral: { tone: 'accent', icon: <HelpCircle className="h-4 w-4" /> },
  inconclusive: { tone: 'warn', icon: <AlertTriangle className="h-4 w-4" /> },
};

const stepIcons: Record<string, React.ReactNode> = {
  claim: <Search className="h-4 w-4" />,
  'reverse-image': <Search className="h-4 w-4" />,
  metadata: <FileCode className="h-4 w-4" />,
  'source-trace': <Landmark className="h-4 w-4" />,
  'fact-check': <ShieldCheck className="h-4 w-4" />,
  archive: <Archive className="h-4 w-4" />,
};

export const InvestigationTimeline: React.FC<Props> = ({ steps, currentStepIndex, isRunning }) => {
  return (
    <div className="space-y-4" data-tour="investigate">
      <div className="flex items-center justify-between text-xs uppercase font-semibold text-ink-3">
        <span>Simulated Investigation Steps</span>
        <span className="text-accent-ink font-mono font-medium">Demonstration Mode</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex || (!isRunning && currentStepIndex === steps.length);
          const isCurrent = idx === currentStepIndex && isRunning;
          const toneInfo = step.tone ? toneMap[step.tone] : { tone: 'neutral' as Tone, icon: null };

          return (
            <div
              key={step.key || idx}
              className={`relative rounded-2xl border transition-all duration-300 p-4 sm:p-5 ${
                isCurrent
                  ? 'border-accent bg-accent/10 shadow-glow scanline'
                  : isDone
                  ? 'border-line bg-surface/50'
                  : 'border-line/40 bg-surface/20 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-xl border text-sm font-bold shrink-0 mt-0.5 ${
                      isDone
                        ? 'border-accent bg-accent/20 text-accent-ink'
                        : isCurrent
                        ? 'border-accent bg-accent text-accent-on animate-pulse'
                        : 'border-line bg-surface text-ink-3'
                    }`}
                  >
                    {isCurrent ? <Loader2 className="h-4 w-4 animate-spin" /> : stepIcons[step.key] || idx + 1}
                  </span>

                  <div>
                    <h4 className="font-heading text-base font-bold text-ink">
                      {step.label}
                    </h4>
                    <p className="text-xs text-ink-3 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                {isDone && step.tone && (
                  <Badge tone={toneInfo.tone} icon={toneInfo.icon} size="sm">
                    {step.tone.toUpperCase()}
                  </Badge>
                )}
              </div>

              {/* Reveal finding when completed or actively current */}
              {isDone && step.finding && (
                <div className="mt-3.5 pl-11 text-sm text-ink-2 bg-surface/80 rounded-xl p-3 border border-line animate-fade-in">
                  <p className="leading-relaxed">
                    <strong className="text-ink font-semibold">Finding:</strong> {step.finding}
                  </p>
                  {step.sources && step.sources.length > 0 && (
                    <div className="mt-2 text-xs text-ink-3 flex flex-wrap gap-2">
                      <span>Sources consulted:</span>
                      {step.sources.map((src) => (
                        <span key={src.name} className="text-accent-ink underline font-medium">
                          {src.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
