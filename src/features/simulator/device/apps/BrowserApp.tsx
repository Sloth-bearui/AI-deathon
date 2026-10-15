import React from 'react';
import type { ScenarioNode, ScenarioAction } from '@/types';
import { Lock, AlertCircle, RefreshCw, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  node: ScenarioNode;
  onAction: (action: ScenarioAction) => void;
}

export const BrowserApp: React.FC<Props> = ({ node, onAction }) => {
  const page = node.page || {
    url: 'https://example-insecure.com',
    secure: false,
    heading: 'Web Page',
    body: 'Sample web page content',
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white text-slate-900">
      {/* Browser Fake Address Bar */}
      <div className="p-2.5 bg-slate-100 border-b border-slate-200 space-y-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-slate-500" />
          <div className="flex-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-300 text-xs text-slate-700">
            {page.secure ? (
              <Lock className="h-3 w-3 text-emerald-600" />
            ) : (
              <AlertCircle className="h-3 w-3 text-red-500" />
            )}
            <span className="truncate font-mono text-[11px]">{page.url}</span>
          </div>
          <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
        </div>
      </div>

      {/* Browser Viewport Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="font-heading text-sm font-bold text-slate-900 mb-1">{page.heading}</h3>
          <p className="text-slate-600 whitespace-pre-wrap">{page.body}</p>
        </div>

        {page.fields && page.fields.length > 0 && (
          <div className="space-y-2 p-3 rounded-xl bg-red-50/70 border border-red-200">
            <span className="font-semibold text-[11px] text-red-700 block">Requested Sensitive Fields:</span>
            {page.fields.map((f, i) => (
              <div key={i} className="p-2 rounded bg-white border border-slate-200 text-slate-500 text-[11px]">
                {f}: [ •••••••••••• ]
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Choices */}
      {node.actions && node.actions.length > 0 && (
        <div className="p-3 bg-slate-100 border-t border-slate-200 space-y-2 shrink-0">
          <span className="text-[10px] uppercase font-semibold text-slate-600 block">
            What will you do?
          </span>
          <div className="space-y-1.5">
            {node.actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onAction(act)}
                className="w-full text-left p-2.5 rounded-xl text-xs font-semibold bg-white text-slate-800 hover:bg-teal-600 hover:text-white transition-colors border border-slate-300 shadow-sm"
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
