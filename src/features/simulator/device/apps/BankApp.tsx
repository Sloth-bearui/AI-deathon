import React from 'react';
import type { ScenarioNode, ScenarioAction } from '@/types';
import { Landmark, ArrowUpRight, ShieldAlert, CreditCard } from 'lucide-react';

interface Props {
  node: ScenarioNode;
  onAction: (action: ScenarioAction) => void;
}

export const BankApp: React.FC<Props> = ({ node, onAction }) => {
  const screen = node.screen || {
    heading: 'Nova Bank Mobile',
    body: 'Welcome to your secure mobile banking dashboard.',
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#081524] text-white">
      {/* Header */}
      <div className="p-4 bg-[#0d2138] border-b border-teal-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-teal-400" />
          <span className="font-heading font-bold text-sm text-teal-300">Nova Bank</span>
        </div>
        <span className="text-[10px] text-teal-200/70 font-mono">A/C: •• 8912</span>
      </div>

      {/* Screen Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
        {/* Balance Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-700/40 via-teal-900/40 to-slate-900 border border-teal-500/30 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-teal-200/80">Available Savings Balance</span>
          <p className="font-heading text-2xl font-bold text-white">₹24,850.00</p>
        </div>

        {/* Dynamic Screen Notice */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
          <h4 className="font-semibold text-teal-300 text-xs">{screen.heading}</h4>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{screen.body}</p>
        </div>
      </div>

      {/* Action Choices */}
      {node.actions && node.actions.length > 0 && (
        <div className="p-3 bg-[#0a182b] border-t border-teal-500/20 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-teal-400 block">
            Banking Decision:
          </span>
          <div className="space-y-1.5">
            {node.actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onAction(act)}
                className="w-full text-left p-2.5 rounded-xl text-xs font-semibold bg-[#132d4e] text-white hover:bg-teal-500 hover:text-slate-950 transition-colors border border-teal-500/30 shadow-sm"
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
