import React from 'react';
import type { EvidenceItem } from '@/types';
import { Badge, type Tone } from '@/design-system';
import { formatDate } from '@/utils/formatDate';
import { CheckCircle2, XCircle, Info, ExternalLink, Bot, User } from 'lucide-react';

interface Props {
  evidence: EvidenceItem;
}

export const EvidenceCard: React.FC<Props> = ({ evidence }) => {
  const stanceConfig = {
    supports: { tone: 'ok' as Tone, label: 'Supports Claim', icon: <CheckCircle2 className="h-4 w-4" /> },
    contradicts: { tone: 'bad' as Tone, label: 'Contradicts Claim', icon: <XCircle className="h-4 w-4" /> },
    context: { tone: 'accent' as Tone, label: 'Contextual Information', icon: <Info className="h-4 w-4" /> },
  }[evidence.stance] || { tone: 'neutral' as Tone, label: 'Context', icon: <Info className="h-4 w-4" /> };

  return (
    <article className="rounded-2xl border border-line bg-surface/50 p-5 space-y-3 transition-colors hover:border-accent/40">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Badge tone={stanceConfig.tone} icon={stanceConfig.icon} size="sm">
            {stanceConfig.label}
          </Badge>

          <span className="capitalize px-2 py-0.5 rounded bg-surface border border-line text-ink-3">
            {evidence.sourceKind.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-ink-3">
          {evidence.simulated ? (
            <span className="inline-flex items-center gap-1 text-accent-ink font-mono text-[11px]">
              <Bot className="h-3 w-3" /> OSINT Engine
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-ink-3 text-[11px]">
              <User className="h-3 w-3" /> Contributor
            </span>
          )}
          <span>•</span>
          <time dateTime={evidence.date}>{formatDate(evidence.date)}</time>
        </div>
      </div>

      <h4 className="font-heading text-lg font-bold text-ink">
        {evidence.title}
      </h4>

      <p className="text-sm text-ink-2 leading-relaxed">
        {evidence.summary}
      </p>

      {/* Source citation */}
      <div className="pt-2 border-t border-line/50 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-ink-3 font-medium">Source: <strong className="text-ink-2">{evidence.sourceName}</strong></span>
        {evidence.sourceUrl && (
          <a
            href={evidence.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-ink hover:underline font-semibold"
          >
            <span>Inspect primary source</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
};
