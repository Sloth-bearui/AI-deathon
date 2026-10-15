import { useCallback } from 'react';
import { TEXT_SCALES, usePrefsStore } from '@/store/usePrefsStore';

/** Steps text size through 90% → 150%. The root font-size drives every rem. */
export function useTextScale() {
  const scale = usePrefsStore((s) => s.textScale);
  const set = usePrefsStore((s) => s.setTextScale);
  const idx = TEXT_SCALES.findIndex((v) => Math.abs(v - scale) < 0.01);
  const i = idx === -1 ? 1 : idx;

  const increase = useCallback(() => set(TEXT_SCALES[Math.min(TEXT_SCALES.length - 1, i + 1)]), [i, set]);
  const decrease = useCallback(() => set(TEXT_SCALES[Math.max(0, i - 1)]), [i, set]);

  return {
    scale,
    percent: Math.round(scale * 100),
    canIncrease: i < TEXT_SCALES.length - 1,
    canDecrease: i > 0,
    increase,
    decrease,
    set,
  };
}
