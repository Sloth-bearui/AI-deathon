import React from 'react';
import type { Contributor } from '@/types';
import { GlassPanel, Tag } from '@/design-system';
import { formatDate } from '@/utils/formatDate';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';

interface Props {
  contributor: Contributor;
}

export const ContributorSummary: React.FC<Props> = ({ contributor }) => {
  return (
    <GlassPanel className="p-6 sm:p-8 border border-line">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Generative Avatar */}
        <div
          className="grid h-20 w-20 place-items-center rounded-2xl border-2 border-accent/40 shadow-glow shrink-0"
          style={{
            backgroundColor: `hsl(${contributor.avatarHue}, 60%, 25%)`,
            color: `hsl(${contributor.avatarHue}, 90%, 75%)`,
          }}
        >
          <span className="font-heading text-3xl font-extrabold uppercase">
            {contributor.name.slice(0, 2)}
          </span>
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink">
              {contributor.name}
            </h1>
            <span className="font-mono text-sm text-ink-3">
              {contributor.handle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-ink-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {contributor.city}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Joined {formatDate(contributor.joined)}
            </span>
          </div>

          <p className="text-sm text-ink-2 pt-1 max-w-2xl leading-relaxed">
            {contributor.bio}
          </p>

          {contributor.focusAreas && contributor.focusAreas.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {contributor.focusAreas.map((area) => (
                <Tag key={area} className="text-xs px-2.5 py-0.5">
                  {area}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};
