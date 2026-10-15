import { useEffect, useState } from 'react';
import { usePrefsStore } from '@/store/usePrefsStore';

/** True when the OS asks for reduced motion OR the user enabled in-app Calm mode. */
export function useReducedMotion(): boolean {
  const calm = usePrefsStore((s) => s.calmMode);
  const [osReduce, setOsReduce] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const on = () => setOsReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return calm || !!osReduce;
}
