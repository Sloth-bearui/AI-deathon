import React from 'react';
import type { SourceRow } from '@/types';
import { GlassPanel } from '@/design-system';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Columns } from 'lucide-react';

interface Props {
  rows: SourceRow[];
}

export const SourceComparisonTable: React.FC<Props> = ({ rows }) => {
  if (!rows || rows.length === 0) return null;

  const matchBadges: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    yes: { label: 'Corroborates', icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-ok-ink bg-ok/10 border-ok/30' },
    no: { label: 'Contradicts', icon: <XCircle className="h-4 w-4" />, color: 'text-bad-ink bg-bad/10 border-bad/30' },
    partly: { label: 'Partially Matches', icon: <AlertTriangle className="h-4 w-4" />, color: 'text-warn-ink bg-warn/10 border-warn/30' },
    unclear: { label: 'Inconclusive', icon: <HelpCircle className="h-4 w-4" />, color: 'text-ink-3 bg-surface border-line' },
  };

  return (
    <GlassPanel
      title="Source Comparison Matrix"
      subtitle="Comparing claims against official portals, news agencies, and independent registries."
      icon={<Columns />}
    >
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wider text-ink-3">
              <th className="py-3 px-4">Source Entity</th>
              <th className="py-3 px-4">Classification</th>
              <th className="py-3 px-4">Record Date</th>
              <th className="py-3 px-4">What The Source States</th>
              <th className="py-3 px-4">Relation To Claim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {rows.map((row, idx) => {
              const badge = matchBadges[row.matchesClaim] || matchBadges.unclear;
              return (
                <tr key={idx} className="hover:bg-hover/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-ink whitespace-nowrap">
                    {row.source}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-ink-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-surface border border-line">
                      {row.kind.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-ink-3 whitespace-nowrap text-xs">
                    {row.date}
                  </td>
                  <td className="py-3.5 px-4 text-ink-2 max-w-xs leading-relaxed">
                    {row.says}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                      {badge.icon}
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
};
