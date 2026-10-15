import React from 'react';
import type { ScenarioNode, ScenarioAction } from '@/types';
import { ArrowLeft, MoreVertical, ShieldAlert } from 'lucide-react';

interface Props {
  node: ScenarioNode;
  onAction: (action: ScenarioAction) => void;
  showRedFlags?: boolean;
}

export const MessagesApp: React.FC<Props> = ({ node, onAction, showRedFlags }) => {
  const thread = node.thread || {
    contact: 'Unknown Sender',
    number: '+91-9876XXXXXX',
    messages: [{ from: 'Unknown', body: 'No message content', time: '10:00 AM' }],
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#0b1324] text-white">
      {/* Messages App Header */}
      <div className="p-3 bg-[#111c33] border-b border-line/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 text-slate-300" />
          <div className="grid h-8 w-8 place-items-center rounded-full bg-accent/20 text-accent-ink font-bold text-xs">
            {thread.contact.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white truncate max-w-[150px]">{thread.contact}</h4>
            {thread.number && <p className="text-[10px] text-slate-400">{thread.number}</p>}
          </div>
        </div>
        <MoreVertical className="h-4 w-4 text-slate-400" />
      </div>

      {/* Message Chat Bubble Stream */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
        {thread.messages.map((m, idx) => {
          const isMe = m.from === 'You';
          return (
            <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  isMe
                    ? 'bg-accent text-accent-on rounded-br-none font-medium'
                    : 'bg-[#182644] text-slate-100 rounded-bl-none border border-slate-700/60 shadow-sm'
                }`}
              >
                {m.body}
                <div className={`text-[9px] mt-1 text-right ${isMe ? 'text-accent-on/70' : 'text-slate-400'}`}>
                  {m.time}
                </div>
              </div>

              {/* Red flag indicators highlighted when requested by coach */}
              {showRedFlags && m.redFlags && m.redFlags.length > 0 && (
                <div className="mt-1.5 p-2 rounded-xl bg-red-950/70 border border-red-500/40 text-[11px] text-red-200 space-y-1">
                  <span className="font-semibold flex items-center gap-1 text-red-300">
                    <ShieldAlert className="h-3 w-3" /> Red Flags Identified:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {m.redFlags.map((rf, rfi) => (
                      <li key={rfi}>{rf}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Decision Choices */}
      {node.actions && node.actions.length > 0 && (
        <div className="p-3 bg-[#0d162a] border-t border-line/40 space-y-2">
          <span className="text-[10px] uppercase font-semibold text-accent-ink block">
            What will you do?
          </span>
          <div className="space-y-1.5">
            {node.actions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onAction(act)}
                className="w-full text-left p-2.5 rounded-xl text-xs font-semibold bg-[#162444] text-white hover:bg-accent hover:text-accent-on transition-colors border border-slate-700/60"
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
