import React from 'react';
import type { ActionLogEntry } from '../engine/scenarioEngine';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface Props {
  history: ActionLogEntry[];
}

export const ActionTimeline: React.FC<Props> = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-ink-3 flex items-center gap-1.5">
        <Clock className="h-4 w-4" /> Timeline of Your Choices
      </h4>

      <ol className="relative border-l border-line ml-3 space-y-4">
        {history.map((entry, idx) => {
          const isSafe = entry.safer;
          return (
            <li key={idx} className="ml-5 relative">
              {/* Dot */}
              <span
                className={`absolute -left-7 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${
                  isSafe
                    ? 'border-ok bg-ok/20 text-ok-ink'
                    : 'border-warn bg-warn/20 text-warn-ink'
                }`}
              >
                {isSafe ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              </span>

              <div className="p-3.5 rounded-xl border border-line bg-surface/50 space-y-1">
                <div className="flex items-center justify-between text-xs text-ink-3">
                  <span className="font-semibold text-ink">{entry.label}</span>
                  <span>{entry.timestamp}</span>
                </div>
                {entry.commentary && (
                  <p className="text-xs text-ink-2 leading-relaxed">{entry.commentary}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
