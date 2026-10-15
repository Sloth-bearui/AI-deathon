import React from 'react';
import type { ScenarioNode } from '@/types';
import { GlassPanel, Button } from '@/design-system';
import { HelpCircle, Lightbulb, Compass, Eye, ShieldCheck } from 'lucide-react';

interface Props {
  node?: ScenarioNode;
  hintLevel: 'none' | 'nudge' | 'explain' | 'showMe';
  onSetHintLevel: (lvl: 'none' | 'nudge' | 'explain' | 'showMe') => void;
  className?: string;
}

export const GuidanceCoach: React.FC<Props> = ({
  node,
  hintLevel,
  onSetHintLevel,
  className,
}) => {
  const hints = node?.hints || {
    nudge: 'Look closely at who sent the message and check the spelling of any links.',
    explain: 'Official organizations use registered alphanumeric sender IDs, not personal phone numbers.',
    showMe: 'Inspect the sender address or close the window safely.',
  };

  return (
    <GlassPanel
      title="Guidance Coach"
      subtitle="Friendly hints without giving away the answer. You can ask for more help anytime."
      icon={<Compass />}
      className={className}
      data-tour="coach"
    >
      <div className="space-y-4">
        {/* Hint Level Selection Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant={hintLevel === 'nudge' ? 'primary' : 'secondary'}
            onClick={() => onSetHintLevel(hintLevel === 'nudge' ? 'none' : 'nudge')}
            icon={<Lightbulb />}
          >
            Nudge
          </Button>

          <Button
            size="sm"
            variant={hintLevel === 'explain' ? 'primary' : 'secondary'}
            onClick={() => onSetHintLevel(hintLevel === 'explain' ? 'none' : 'explain')}
            icon={<HelpCircle />}
          >
            Explain
          </Button>

          <Button
            size="sm"
            variant={hintLevel === 'showMe' ? 'primary' : 'secondary'}
            onClick={() => onSetHintLevel(hintLevel === 'showMe' ? 'none' : 'showMe')}
            icon={<Eye />}
          >
            Show me
          </Button>
        </div>

        {/* Revealed Hint Card */}
        {hintLevel !== 'none' ? (
          <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 space-y-2 animate-fade-in text-sm text-ink-2">
            <div className="flex items-center gap-1.5 font-semibold text-accent-ink text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {hintLevel === 'nudge' && 'Gentle Clue'}
                {hintLevel === 'explain' && 'Why This Matters'}
                {hintLevel === 'showMe' && 'Recommended Path'}
              </span>
            </div>
            <p className="leading-relaxed">
              {hintLevel === 'nudge' && hints.nudge}
              {hintLevel === 'explain' && hints.explain}
              {hintLevel === 'showMe' && hints.showMe}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-line bg-surface/30 text-xs text-ink-3 text-center">
            Need assistance? Tap <strong>Nudge</strong> for a subtle clue, <strong>Explain</strong> for the logic, or <strong>Show me</strong> for the safe action.
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
