import React from 'react';
import type { Post } from '@/types';
import { Badge, Button, toast } from '@/design-system';
import { formatDate } from '@/utils/formatDate';
import { useCommunityStore } from '@/store/useCommunityStore';
import { Share2, Bookmark, Check, ShieldAlert, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

interface Props {
  post: Post;
}

export const ClaimHeader: React.FC<Props> = ({ post }) => {
  const isSaved = useCommunityStore((s) => s.savedPostIds.includes(post.id));
  const toggleSave = useCommunityStore((s) => s.toggleSavePost);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard', 'Share this verified investigation report.');
    }
  };

  const statusConfig = {
    'well-supported': { tone: 'ok' as const, label: 'Well Supported by Evidence', icon: <CheckCircle2 className="h-4 w-4" /> },
    'potentially-misleading': { tone: 'warn' as const, label: 'Potentially Misleading', icon: <ShieldAlert className="h-4 w-4" /> },
    'contradicted': { tone: 'bad' as const, label: 'Contradicted by Facts', icon: <XCircle className="h-4 w-4" /> },
    'needs-more-evidence': { tone: 'neutral' as const, label: 'Needs More Evidence', icon: <HelpCircle className="h-4 w-4" /> },
    'not-investigated': { tone: 'neutral' as const, label: 'Not Yet Investigated', icon: <HelpCircle className="h-4 w-4" /> },
  }[post.status];

  return (
    <div className="space-y-4">
      {/* Top Status & Date row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone={statusConfig.tone} icon={statusConfig.icon}>
            {statusConfig.label}
          </Badge>
          <span className="text-xs uppercase font-semibold text-ink-3 tracking-wider px-2 py-1 rounded-md bg-surface border border-line">
            {post.platform}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toggleSave(post.id);
              toast.info(isSaved ? 'Removed from saved reports' : 'Saved to your bookmarked reports');
            }}
            icon={<Bookmark className={isSaved ? 'fill-current text-accent-ink' : ''} />}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleShare} icon={<Share2 />}>
            Share
          </Button>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink leading-tight">
        {post.title}
      </h1>

      {/* Primary Highlighted Claim Box */}
      <div className="p-4 sm:p-5 rounded-2xl border-l-4 border-l-accent border border-line bg-surface/60 space-y-1">
        <span className="eyebrow block text-xs">Primary Claim Under Review</span>
        <blockquote className="text-base sm:text-lg font-medium text-ink leading-relaxed">
          "{post.claim}"
        </blockquote>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-3 pt-1">
        <span>Submitted {formatDate(post.date)}</span>
        <span>Format: <strong className="capitalize text-ink-2">{post.type}</strong></span>
      </div>
    </div>
  );
};
