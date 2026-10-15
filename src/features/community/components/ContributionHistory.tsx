import React from 'react';
import type { Contribution } from '@/types';
import { GlassPanel } from '@/design-system';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router-dom';
import { FileText, CornerDownRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface Props {
  contributions: Contribution[];
}

export const ContributionHistory: React.FC<Props> = ({ contributions }) => {
  const kindIcons = {
    submitted: <CornerDownRight className="h-4 w-4 text-accent-ink" />,
    evidence: <ShieldCheck className="h-4 w-4 text-ok-ink" />,
    correction: <FileText className="h-4 w-4 text-warn-ink" />,
    comment: <MessageSquare className="h-4 w-4 text-ink-3" />,
  };

  return (
    <GlassPanel
      title={`Contribution History (${contributions.length})`}
      subtitle="Public record of submitted claims, verified evidence links, and peer corrections."
    >
      {contributions.length === 0 ? (
        <p className="text-sm text-ink-3 py-4 text-center">No recent contributions on file.</p>
      ) : (
        <div className="space-y-3">
          {contributions.map((c) => (
            <Link
              key={c.id}
              to={`/community/post/${c.postId}`}
              className="block p-4 rounded-xl border border-line bg-surface/40 hover:bg-surface/80 hover:border-accent/40 transition-all group"
            >
              <div className="flex items-center justify-between gap-3 text-xs text-ink-3 mb-1.5">
                <div className="flex items-center gap-1.5 capitalize font-semibold text-ink">
                  {kindIcons[c.kind] || kindIcons.comment}
                  <span>{c.kind}</span>
                </div>
                <time dateTime={c.date}>{formatDate(c.date)}</time>
              </div>

              <p className="font-heading text-base font-semibold text-ink group-hover:text-accent-ink transition-colors">
                {c.summary}
              </p>
            </Link>
          ))}
        </div>
      )}
    </GlassPanel>
  );
};
