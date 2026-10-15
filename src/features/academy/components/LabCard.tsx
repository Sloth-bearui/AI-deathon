import React from 'react';
import { Link } from 'react-router-dom';
import type { Lab } from '@/types';
import { Card, Badge, Button } from '@/design-system';
import { useAcademyStore } from '@/store/useAcademyStore';
import { Clock, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

interface Props {
  lab: Lab;
}

export const LabCard: React.FC<Props> = ({ lab }) => {
  const isDone = useAcademyStore((s) => s.isLabCompleted(lab.slug) || s.isLabCompleted(lab.id));

  const categoryLabels: Record<string, string> = {
    scams: 'Scam Awareness',
    banking: 'UPI & Banking',
    'ai-media': 'AI & Deepfakes',
    device: 'Phone Security',
    'ai-literacy': 'AI Literacy',
  };

  return (
    <Card
      interactive
      className="h-full flex flex-col justify-between p-6 space-y-4 border transition-all duration-300 hover:border-accent/50"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <Badge tone="accent" size="sm">
            {categoryLabels[lab.category] || lab.category}
          </Badge>

          {isDone && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ok-ink">
              <CheckCircle2 className="h-4 w-4" /> Completed
            </span>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold text-ink leading-snug">
          {lab.title}
        </h3>

        <p className="text-sm text-ink-2 leading-relaxed line-clamp-3">
          {lab.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-ink-3">
        <span className="flex items-center gap-1 font-medium">
          <Clock className="h-3.5 w-3.5" /> ~{lab.minutes} mins
        </span>

        <Button
          to={`/academy/${lab.slug}`}
          variant={isDone ? 'secondary' : 'primary'}
          size="sm"
          iconRight={<ArrowRight />}
        >
          {isDone ? 'Review Lesson' : 'Start Lesson'}
        </Button>
      </div>
    </Card>
  );
};
