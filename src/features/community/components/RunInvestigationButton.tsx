import React from 'react';
import { Button } from '@/design-system';
import { Cpu, RotateCcw } from 'lucide-react';

interface Props {
  isRunning: boolean;
  isCompleted: boolean;
  onRun: () => void;
}

export const RunInvestigationButton: React.FC<Props> = ({ isRunning, isCompleted, onRun }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-surface to-surface/80 shadow-soft">
      <div>
        <h3 className="font-heading text-lg font-bold text-ink flex items-center gap-2">
          <Cpu className="h-5 w-5 text-accent-ink" /> Simulated OSINT Workflow Engine
        </h3>
        <p className="text-xs sm:text-sm text-ink-2 mt-0.5">
          Execute automated source-tracing, reverse media checks, and fact-checking comparisons.
        </p>
      </div>

      <Button
        variant="primary"
        size="md"
        loading={isRunning}
        onClick={onRun}
        icon={isCompleted ? <RotateCcw /> : <Cpu />}
        className="shrink-0 w-full sm:w-auto"
        id="run-investigation-btn"
      >
        {isRunning ? 'Investigating...' : isCompleted ? 'Re-run Demo Scan' : 'Run Investigation'}
      </Button>
    </div>
  );
};
