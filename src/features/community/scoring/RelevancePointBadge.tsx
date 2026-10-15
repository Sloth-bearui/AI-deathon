import React from 'react';
import type { FactorScores } from '@/types';
import { calculateRelevance, getRelevanceBand } from './calculateRelevance';
import { usePrefsStore } from '@/store/usePrefsStore';
import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  factors?: FactorScores | null;
  score?: number | null;
  size?: 'sm' | 'md' | 'lg';
  showPoints?: boolean;
  className?: string;
}

export const RelevancePointBadge: React.FC<Props> = ({
  factors,
  score: directScore,
  size = 'md',
  showPoints = true,
  className,
}) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const calc = factors !== undefined ? calculateRelevance(factors) : {
    score: directScore ?? null,
    band: getRelevanceBand(directScore ?? null).band,
    bandLabel: getRelevanceBand(directScore ?? null).label,
  };

  const getBadgeStyle = () => {
    switch (calc.band) {
      case 'well-supported':
        return {
          container: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/60 shadow-[0_0_16px_rgba(16,185,129,0.35)]',
          dot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />,
          labelEn: 'VERIFIED SUPPORTED',
          labelHi: 'सत्यापित साक्ष्य',
        };
      case 'unsupported':
        return {
          container: 'bg-rose-500/25 text-rose-100 border-rose-500/80 shadow-[0_0_18px_rgba(244,63,94,0.4)] ring-1 ring-rose-400/40',
          dot: 'bg-rose-400 animate-ping shadow-[0_0_8px_#f43f5e]',
          icon: <XCircle className="h-4 w-4 text-rose-300 shrink-0" />,
          labelEn: 'DEBUNKED / UNSUPPORTED',
          labelHi: 'फर्जी / अपुष्ट दावा',
        };
      case 'weakly-supported':
        return {
          container: 'bg-amber-500/20 text-amber-200 border-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.25)]',
          dot: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
          icon: <AlertTriangle className="h-4 w-4 text-amber-300 shrink-0" />,
          labelEn: 'WEAK EVIDENCE',
          labelHi: 'कमजोर साक्ष्य',
        };
      case 'partly-supported':
        return {
          container: 'bg-[#5546F0]/15 text-[#5546F0] dark:text-[#c7d2fe] border-[#5546F0]/40 shadow-[0_0_14px_rgba(85,70,240,0.15)]',
          dot: 'bg-[#5546F0] shadow-[0_0_8px_#5546F0]',
          icon: <CheckCircle2 className="h-4 w-4 text-[#5546F0] dark:text-[#c7d2fe] shrink-0" />,
          labelEn: 'PARTLY SUPPORTED',
          labelHi: 'आंशिक समर्थित',
        };
      case 'not-enough-evidence':
      default:
        return {
          container: 'bg-slate-800/60 text-slate-300 border-slate-600/50 shadow-sm',
          dot: 'bg-slate-400',
          icon: <Clock className="h-4 w-4 text-slate-400 shrink-0" />,
          labelEn: 'EVIDENCE PENDING',
          labelHi: 'जांच जारी / साक्ष्य बाकी',
        };
    }
  };

  const style = getBadgeStyle();
  const label = isHi ? style.labelHi : style.labelEn;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border font-bold tracking-wide uppercase transition-all duration-300',
        size === 'lg' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-[11px]',
        style.container,
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', style.dot)} />
      </span>
      {style.icon}
      <span>{label}</span>
      {showPoints && calc.score !== null && (
        <span className="font-mono ml-1 px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-white font-extrabold text-[11px]">
          {calc.score} pts
        </span>
      )}
    </span>
  );
};
