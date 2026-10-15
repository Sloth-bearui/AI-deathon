import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PracticeRibbon: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#5546F0]/15 via-[#6C5CE7]/20 to-[#5546F0]/15 border-b border-[#5546F0]/25 py-1.5 px-3 text-center text-xs font-semibold text-[#5546F0] flex items-center justify-center gap-1.5 select-none shrink-0">
      <ShieldCheck className="h-3.5 w-3.5 text-[#5546F0]" />
      <span>Safe Practice Phone • Fictional environment, zero risk</span>
    </div>
  );
};
