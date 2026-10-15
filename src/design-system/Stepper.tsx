import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StepperProps {
  steps: string[];
  current: number;
  label?: string;
  className?: string;
}

/** "Step 2 of 3" wayfinding. Not a score — just where you are in a flow. */
export const Stepper: React.FC<StepperProps> = ({ steps, current, label = 'Progress', className }) => (
  <nav aria-label={label} className={className}>
    <p className="sr-only">Step {current + 1} of {steps.length}: {steps[current]}</p>
    <ol className="flex items-center gap-2" aria-hidden>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className={cn('flex items-center gap-2', i < steps.length - 1 && 'flex-1')}>
            <span
              className={cn(
                'grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 font-heading font-bold transition-all duration-300',
                done && 'border-accent bg-accent text-accent-on',
                active && 'border-accent bg-accent/15 text-accent-ink shadow-glow',
                !done && !active && 'border-line text-ink-3',
              )}
            >
              {done ? <Check className="h-5 w-5" /> : i + 1}
            </span>
            <span className={cn('hidden text-sm font-semibold sm:inline', active ? 'text-ink' : 'text-ink-3')}>{s}</span>
            {i < steps.length - 1 && (
              <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-line">
                <span className="absolute inset-y-0 left-0 bg-accent transition-all duration-500" style={{ width: done ? '100%' : '0%' }} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
