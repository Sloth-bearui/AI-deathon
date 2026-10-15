import React from 'react';
import type { ScoreEvent } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { History, ArrowRight } from 'lucide-react';

interface Props {
  history: ScoreEvent[];
}

export const ScoreHistoryList: React.FC<Props> = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-5 border-t border-line pt-4">
      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-3 font-heading mb-3">
        <History className="h-4 w-4" /> Score Revision History
      </h4>
      <ol className="space-y-2.5">
        {history.map((item) => (
          <li key={item.id} className="text-sm rounded-xl border border-line bg-surface/40 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium text-ink">{item.reason}</p>
              <p className="text-xs text-ink-3">{formatDate(item.date)}</p>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-accent-ink shrink-0 bg-surface px-2.5 py-1 rounded-lg">
              <span>{item.score !== null ? `${item.score} pts` : 'Pending'}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
