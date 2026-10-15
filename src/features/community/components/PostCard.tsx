import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '@/types';
import { Card, Tag } from '@/design-system';
import { RelevancePointBadge } from '../scoring/RelevancePointBadge';
import { ContributorLabel } from './ContributorLabel';
import { formatDate } from '@/utils/formatDate';
import { calculateRelevance } from '../scoring/calculateRelevance';
import {
  FileText,
  Image as ImageIcon,
  Video,
  CornerDownRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const platformIcons: Record<string, string> = {
  whatsapp: '💬 WhatsApp',
  x: '𝕏 Twitter/X',
  facebook: '📘 Facebook',
  telegram: '✈️ Telegram',
  youtube: '▶️ YouTube',
  sms: '📱 SMS',
  website: '🌐 Web',
};

const typeIcons: Record<string, React.ReactNode> = {
  text: <FileText className="h-4 w-4" />,
  image: <ImageIcon className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  forward: <CornerDownRight className="h-4 w-4" />,
};

interface Props {
  post: Post;
  contributorName?: string;
}

export const PostCard: React.FC<Props> = ({ post, contributorName }) => {
  const calc = calculateRelevance(post.factors);
  const isUnsupported = calc.band === 'unsupported';
  const isWellSupported = calc.band === 'well-supported';

  return (
    <Link
      to={`/community/post/${post.id}`}
      data-tour="post"
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-glass h-full"
    >
      <Card
        interactive
        className={cn(
          'h-full flex flex-col justify-between overflow-hidden p-5 sm:p-6 transition-all duration-300 relative',
          isUnsupported && 'group-hover:border-rose-500/50 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.18)]',
          isWellSupported && 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.18)]',
          !isUnsupported && !isWellSupported && 'group-hover:border-accent/50 group-hover:shadow-glow',
        )}
      >
        <div className="space-y-4">
          {/* Top Prominent Row: High-Visibility Relevance Badge + Platform */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <RelevancePointBadge factors={post.factors} size="sm" />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface/80 border border-line text-ink-3">
              {platformIcons[post.platform] || post.platform}
            </span>
          </div>

          {/* Media preview thumbnail if applicable */}
          {post.media && (
            <div className="relative h-44 w-full rounded-xl overflow-hidden border border-line bg-surface/50 group-hover:border-accent/30 transition-colors">
              <img
                src={post.media}
                alt={post.mediaAlt || post.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Title & Central Claim */}
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-3 mb-1.5">
              <span className="flex items-center gap-1 capitalize font-medium">
                {typeIcons[post.type]}
                {post.type}
              </span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <h3 className="font-heading text-xl font-bold text-ink leading-snug group-hover:text-accent-ink transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-ink-2 mt-2 line-clamp-3 leading-relaxed">
              "{post.claim}"
            </p>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} className="text-xs px-2.5 py-0.5">
                  #{tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Contributor + View Details Indicator */}
        <div className="pt-4 mt-4 border-t border-line flex items-center justify-between gap-3 text-xs">
          <ContributorLabel contributorId={post.contributorId} name={contributorName} />
          <span className="text-accent-ink font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Investigate →
          </span>
        </div>
      </Card>
    </Link>
  );
};
