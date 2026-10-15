import React from 'react';
import type { ScenarioNode, ScenarioAction } from '@/types';
import { Settings, Shield, AlertTriangle } from 'lucide-react';

interface Props {
  node: ScenarioNode;
  onAction: (action: ScenarioAction) => void;
}

export const SettingsApp: React.FC<Props> = ({ node, onAction }) => {
  const screen = node.screen || {
    heading: 'Security & Permissions',
    body: 'Review system permissions and application sources.',
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-white">
      {/* Header */}
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <Settings className="h-5 w-5 text-slate-300" />
        <span className="font-heading font-bold text-sm">System Settings</span>
      </div>

      {/* Settings Screen */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
        <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <AlertTriangle className="h-4 w-4" />
            <span>{screen.heading}</span>
          </div>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{screen.body}</p>
        </div>

        {screen.items && screen.items.length > 0 && (
          <div className="space-y-2">
            {screen.items.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between text-slate-200">
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {node.actions && node.actions.length > 0 && (
        <div className="p-3 bg-slate-800 border-t border-slate-700 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">
            System Permission Action:
          </span>
          <div className="space-y-1.5">
            {node.actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onAction(act)}
                className="w-full text-left p-2.5 rounded-xl text-xs font-semibold bg-slate-700 text-white hover:bg-accent hover:text-accent-on transition-colors border border-slate-600"
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
