import React from 'react';
import { PracticeRibbon } from './PracticeRibbon';
import { StatusBar } from './StatusBar';

interface Props {
  children: React.ReactNode;
  onHomeClick?: () => void;
}

export const PhoneFrame: React.FC<Props> = ({ children, onHomeClick }) => {
  return (
    <div className="relative mx-auto w-full max-w-[380px] h-[720px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-[4px] border-slate-600 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden">
      {/* Outer physical volume and power mock keys */}
      <div className="absolute -left-[7px] top-28 w-[3px] h-12 bg-slate-600 rounded-l" />
      <div className="absolute -left-[7px] top-44 w-[3px] h-12 bg-slate-600 rounded-l" />
      <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-slate-600 rounded-r" />

      {/* Screen Display Bezel */}
      <div className="relative w-full h-full rounded-[40px] bg-[#070d18] border border-white/5 overflow-hidden flex flex-col shadow-inner">
        <PracticeRibbon />
        <StatusBar />

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative scrollbar-none">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="w-full h-6 flex items-center justify-center shrink-0 z-30 pb-1">
          <button
            type="button"
            onClick={onHomeClick}
            className="w-32 h-1.5 bg-slate-400/60 rounded-full hover:bg-accent transition-colors"
            aria-label="Home indicator bar — tap to go to Home Screen"
          />
        </div>
      </div>
    </div>
  );
};
