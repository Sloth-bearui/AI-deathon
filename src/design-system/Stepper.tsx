import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                  isComplete && 'bg-accent text-base-DEFAULT',
                  isCurrent && 'bg-accent/20 text-accent border-2 border-accent',
                  !isComplete && !isCurrent && 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                )}
              >
                {isComplete ? <Check size={16} /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-sm hidden sm:inline',
                  isCurrent ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-muted)]'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 rounded transition-colors',
                  i < currentStep ? 'bg-accent' : 'bg-[var(--color-surface)]'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
