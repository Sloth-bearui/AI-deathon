import React from 'react';
import type { ScenarioNode } from '@/types';
import { MessageSquare, Bell, ArrowRight } from 'lucide-react';

interface Props {
  node?: ScenarioNode;
  onOpen: () => void;
}

export const NotificationShade: React.FC<Props> = ({ node, onOpen }) => {
  if (!node?.notification && !node?.thread) return null;

  const title = node.notification?.from || node.thread?.contact || 'Incoming Message';
  const body = node.notification?.body || node.thread?.messages[0]?.body || 'Tap to view';

  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      className="mx-3 mt-2 p-3 rounded-2xl glass-strong border border-accent/40 shadow-lift cursor-pointer hover:border-accent transition-all animate-slide-down flex items-start gap-3"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent-ink shrink-0">
        <MessageSquare className="h-5 w-5" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between text-xs text-ink-3">
          <span className="font-semibold text-ink truncate">{title}</span>
          <span>now</span>
        </div>
        <p className="text-xs text-ink-2 truncate mt-0.5">{body}</p>
      </div>

      <ArrowRight className="h-4 w-4 text-accent-ink shrink-0 mt-2" />
    </div>
  );
};
