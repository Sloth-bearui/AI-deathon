import React from 'react';
import type { ScenarioNode, ScenarioAction } from '@/types';
import { Phone, PhoneCall, UserCheck } from 'lucide-react';

interface Props {
  node: ScenarioNode;
  onAction: (action: ScenarioAction) => void;
}

export const PhoneApp: React.FC<Props> = ({ node, onAction }) => {
  const screen = node.screen || {
    heading: 'Phone Call',
    body: 'Connecting call...',
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-950 text-white">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
        <Phone className="h-4 w-4 text-emerald-400" />
        <span className="font-heading font-bold text-sm">Phone Dialer</span>
      </div>

      {/* Call Display */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500/20 border-2 border-emerald-500 animate-pulse">
          <PhoneCall className="h-8 w-8 text-emerald-400" />
        </div>

        <div>
          <h3 className="font-heading text-lg font-bold text-white">{screen.heading}</h3>
          <p className="text-xs text-slate-300 max-w-xs mt-2 whitespace-pre-wrap leading-relaxed">
            {screen.body}
          </p>
        </div>
      </div>

      {/* Actions */}
      {node.actions && node.actions.length > 0 && (
        <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block text-center">
            Next Action:
          </span>
          <div className="space-y-1.5">
            {node.actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onAction(act)}
                className="w-full text-center p-3 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md"
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
