import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <div className="w-full h-8 px-5 pt-1 flex items-center justify-between text-xs text-ink font-medium select-none shrink-0 z-20">
      <span className="font-semibold tracking-tight">9:41</span>
      
      {/* Notch */}
      <div className="h-4 w-28 bg-black/60 rounded-full mx-auto -mt-1 hidden sm:block" />

      <div className="flex items-center gap-1.5 text-ink-2">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  );
};
