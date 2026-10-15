import React from 'react';
import type { Post } from '@/types';
import { Card } from '@/design-system';
import { CornerDownRight, Quote } from 'lucide-react';

interface Props {
  post: Post;
}

export const MediaViewer: React.FC<Props> = ({ post }) => {
  return (
    <Card className="overflow-hidden border border-line bg-surface/40 p-0">
      {/* If there's an image or SVG illustration */}
      {post.media ? (
        <div className="relative max-h-[380px] w-full overflow-hidden bg-black/40 flex items-center justify-center">
          <img
            src={post.media}
            alt={post.mediaAlt || post.title}
            className="w-full h-auto max-h-[380px] object-contain"
          />
        </div>
      ) : null}

      {/* Raw message / quote text preview */}
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
          <Quote className="h-4 w-4 text-accent-ink" />
          <span>Original Message Transcript</span>
          {post.type === 'forward' && (
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-surface border border-line text-ink-3">
              <CornerDownRight className="h-3 w-3" /> Forwarded Many Times
            </span>
          )}
        </div>

        <div className="p-4 rounded-xl border border-line bg-surface/80 font-mono text-sm leading-relaxed text-ink-2 whitespace-pre-wrap select-all">
          {post.content}
        </div>

        {post.sourceUrl && (
          <div className="text-xs text-ink-3 pt-1">
            Linked destination: <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent-ink hover:underline break-all">{post.sourceUrl}</a>
          </div>
        )}
      </div>
    </Card>
  );
};
