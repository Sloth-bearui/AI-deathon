import React from 'react';
import type { FactorScores, ScoreEvent } from '@/types';
import { calculateRelevance } from './calculateRelevance';
import { HowCalculated } from './HowCalculated';
import { ScoreHistoryList } from './ScoreHistoryList';
import { GlassPanel } from '@/design-system';
import { Scale, BarChart2 } from 'lucide-react';

interface Props {
  factors: FactorScores | null;
  history?: ScoreEvent[];
}

export const RelevanceBreakdownPanel: React.FC<Props> = ({ factors, history = [] }) => {
  const calc = calculateRelevance(factors);

  const factorBars = [
    { label: 'Evidence strength', weight: '35%', value: factors?.evidence ?? 0, color: 'bg-emerald-400' },
    { label: 'Source credibility', weight: '30%', value: factors?.source ?? 0, color: 'bg-teal-400' },
    { label: 'Independent corroboration', weight: '20%', value: factors?.corroboration ?? 0, color: 'bg-sky-400' },
    { label: 'Reproducibility', weight: '15%', value: factors?.reproducibility ?? 0, color: 'bg-indigo-400' },
  ];

  return (
    <GlassPanel
      title="Relevance Point Breakdown"
      subtitle="Evaluated strictly on evidence quality, source authenticity, and independent verification."
      icon={<Scale />}
      className="border border-accent/20"
      data-tour="breakdown"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-line">
        <div className="flex items-center gap-5">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-surface border border-accent/40 shadow-glow">
            <span className="font-heading text-4xl font-extrabold text-accent-ink">
              {calc.score !== null ? calc.score : '—'}
            </span>
            <span className="text-xs uppercase tracking-widest text-ink-3 -mt-2">out of 100</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-accent-ink block mb-0.5">
              Current Verdict Band
            </span>
            <h3 className="font-heading text-2xl font-bold text-ink">{calc.bandLabel}</h3>
            <p className="text-sm text-ink-3 mt-0.5">
              {calc.score !== null
                ? 'Calculated from weighted independent verification factors.'
                : 'Awaiting primary sources and cross-verification from investigators.'}
            </p>
          </div>
        </div>

        <div className="text-xs text-ink-3 bg-surface/60 rounded-xl p-3 border border-line max-w-xs">
          <p className="font-semibold text-ink mb-1 flex items-center gap-1.5">
            <BarChart2 className="h-3.5 w-3.5 text-accent-ink" /> Neutral Factor Weights
          </p>
          Evidence 35% + Source 30% + Corroboration 20% + Reproducibility 15%. Contributor reputation and upvotes are never added.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {factorBars.map((bar) => (
          <div key={bar.label} className="rounded-xl border border-line bg-surface/40 p-3.5 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-ink">{bar.label} <span className="text-ink-3 text-xs">({bar.weight})</span></span>
              <span className="font-mono font-bold text-ink">{factors ? `${bar.value}/100` : '—'}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
              <div
                className={`h-full rounded-full ${bar.color} transition-all duration-700 ease-out`}
                style={{ width: `${factors ? Math.min(100, Math.max(0, bar.value)) : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <HowCalculated />

      {history.length > 0 && <ScoreHistoryList history={history} />}
    </GlassPanel>
  );
};
