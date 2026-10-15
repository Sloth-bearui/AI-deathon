import React from 'react';
import type { Contributor } from '@/types';
import { GlassPanel, Badge, type Tone } from '@/design-system';
import { ShieldCheck, Info, CheckCircle2, FileCheck, Layers } from 'lucide-react';

interface Props {
  contributor: Contributor;
}

export const ReliabilityPanel: React.FC<Props> = ({ contributor }) => {
  const descriptorConfig: Record<string, { label: string; tone: Tone }> = {
    new: { label: 'New Contributor', tone: 'neutral' },
    developing: { label: 'Developing Track Record', tone: 'accent' },
    established: { label: 'Established Contributor', tone: 'ok' },
  };

  const currentDesc = descriptorConfig[contributor.descriptor] || descriptorConfig.developing;

  return (
    <GlassPanel
      title="Contributor Reliability & Activity"
      subtitle="Evaluated on historical cross-corroboration of submitted evidence."
      icon={<ShieldCheck />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-line bg-surface/50">
          <span className="text-xs uppercase font-semibold text-ink-3 tracking-wider block mb-1">
            Reliability Status
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Badge tone={currentDesc.tone} size="md">
              {currentDesc.label}
            </Badge>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-line bg-surface/50">
          <span className="text-xs uppercase font-semibold text-ink-3 tracking-wider block mb-1">
            Reports Reviewed
          </span>
          <p className="font-heading text-2xl font-bold text-ink mt-1">
            {contributor.reportsReviewed}
          </p>
          <span className="text-xs text-ink-3">Independent fact inquiries</span>
        </div>

        <div className="p-4 rounded-xl border border-line bg-surface/50">
          <span className="text-xs uppercase font-semibold text-ink-3 tracking-wider block mb-1">
            Corroborated Later
          </span>
          <p className="font-heading text-2xl font-bold text-ok-ink mt-1">
            {contributor.laterCorroborated}
          </p>
          <span className="text-xs text-ink-3">Independently corroborated findings</span>
        </div>
      </div>

      {/* HARD REQUIREMENT: Plain words explicit note */}
      <div className="p-4 rounded-xl border border-line bg-surface/80 flex items-start gap-3 text-sm text-ink-2">
        <Info className="h-5 w-5 text-accent-ink shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink font-semibold">Important Principle:</strong> A contributor's reliability history
          is displayed for peer transparency only. <em>This does not change the score of any post.</em> Every post stands
          or falls strictly on its own verified primary evidence.
        </p>
      </div>
    </GlassPanel>
  );
};
