import type { FactorScores, RelevanceBand } from '@/types';

export interface ScoreCalculation {
  score: number | null;
  band: RelevanceBand;
  bandLabel: string;
  weights: {
    evidence: number;
    source: number;
    corroboration: number;
    reproducibility: number;
  };
}

export const FACTOR_WEIGHTS = {
  evidence: 0.35,
  source: 0.30,
  corroboration: 0.20,
  reproducibility: 0.15,
} as const;

export function getRelevanceBand(score: number | null): { band: RelevanceBand; label: string } {
  if (score === null || score === undefined) {
    return { band: 'not-enough-evidence', label: 'Not enough evidence yet' };
  }
  if (score >= 80) return { band: 'well-supported', label: 'Well supported (80+)' };
  if (score >= 50) return { band: 'partly-supported', label: 'Partly supported (50–79)' };
  if (score >= 25) return { band: 'weakly-supported', label: 'Weakly supported (25–49)' };
  return { band: 'unsupported', label: 'Unsupported (<25)' };
}

export function calculateRelevance(factors: FactorScores | null): ScoreCalculation {
  if (!factors) {
    return {
      score: null,
      band: 'not-enough-evidence',
      bandLabel: 'Not enough evidence yet',
      weights: FACTOR_WEIGHTS,
    };
  }

  const raw =
    factors.evidence * FACTOR_WEIGHTS.evidence +
    factors.source * FACTOR_WEIGHTS.source +
    factors.corroboration * FACTOR_WEIGHTS.corroboration +
    factors.reproducibility * FACTOR_WEIGHTS.reproducibility;

  const score = Math.round(Math.max(0, Math.min(100, raw)));
  const { band, label } = getRelevanceBand(score);

  return {
    score,
    band,
    bandLabel: label,
    weights: FACTOR_WEIGHTS,
  };
}
