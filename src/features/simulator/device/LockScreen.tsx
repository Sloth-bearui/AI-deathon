import React from 'react';
import { Lock, ChevronUp } from 'lucide-react';

interface Props {
  onUnlock: () => void;
  notificationText?: string;
}

export const LockScreen: React.FC<Props> = ({ onUnlock, notificationText }) => {
  return (
    <div
      onClick={onUnlock}
      className="flex-1 flex flex-col justify-between items-center py-12 px-6 select-none cursor-pointer text-center animate-fade-in"
    >
      <div className="space-y-2 pt-6">
        <Lock className="h-5 w-5 mx-auto text-ink-3" />
        <h2 className="font-heading text-5xl font-extrabold text-ink tracking-tight">09:41</h2>
        <p className="text-sm font-medium text-ink-2">Thursday, 15 October</p>
      </div>

      {notificationText && (
        <div className="w-full glass-strong rounded-2xl p-4 border border-accent/40 text-left space-y-1">
          <p className="text-xs font-semibold text-accent-ink">Message Preview</p>
          <p className="text-xs text-ink-2 truncate">{notificationText}</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-1 text-xs text-ink-3 animate-bounce">
        <ChevronUp className="h-5 w-5" />
        <span>Swipe up or tap to unlock</span>
      </div>
    </div>
  );
};
