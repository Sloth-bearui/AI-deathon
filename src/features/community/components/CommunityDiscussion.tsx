import React, { useState } from 'react';
import type { Comment, CommentKind, EvidenceItem } from '@/types';
import { GlassPanel, Button, toast } from '@/design-system';
import { formatDate } from '@/utils/formatDate';
import { useCommunityStore } from '@/store/useCommunityStore';
import { MessageSquare, Send, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface Props {
  postId: string;
  comments: Comment[];
  evidenceList: EvidenceItem[];
}

export const CommunityDiscussion: React.FC<Props> = ({ postId, comments, evidenceList }) => {
  const addComment = useCommunityStore((s) => s.addComment);
  const [body, setBody] = useState('');
  const [kind, setKind] = useState<CommentKind>('comment');
  const [linkedEvidenceId, setLinkedEvidenceId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    addComment(postId, {
      body,
      kind,
      evidenceId: linkedEvidenceId || undefined,
      contributorId: 'contrib-001',
    });

    toast.success('Response posted', 'Your input has been added to the community log.');
    setBody('');
    setLinkedEvidenceId('');
  };

  return (
    <GlassPanel
      title={`Community Discussion & Corrections (${comments.length})`}
      subtitle="Contextual observations and peer corrections. Comments never alter post relevance scores."
      icon={<MessageSquare />}
      data-tour="discussion"
    >
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-line bg-surface/40 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 text-xs font-semibold">
            {[
              { value: 'comment', label: 'Comment' },
              { value: 'correction', label: 'Correction' },
              { value: 'question', label: 'Clarification Question' },
            ].map((k) => (
              <button
                key={k.value}
                type="button"
                onClick={() => setKind(k.value as CommentKind)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  kind === k.value
                    ? 'border-accent bg-accent/20 text-accent-ink'
                    : 'border-line bg-surface text-ink-3 hover:text-ink'
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          {evidenceList.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-ink-3">
              <LinkIcon className="h-3 w-3" />
              <select
                value={linkedEvidenceId}
                onChange={(e) => setLinkedEvidenceId(e.target.value)}
                className="bg-surface border border-line rounded px-2 py-1 text-xs text-ink"
              >
                <option value="">Link to specific evidence...</option>
                {evidenceList.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <textarea
          rows={3}
          placeholder={
            kind === 'correction'
              ? 'Provide clear correction with verifiable reference...'
              : 'Add your insight, question or local context...'
          }
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="field min-h-[72px] resize-y"
          required
        />

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-ink-3 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" /> Peer discussion is civil and evidence-based.
          </p>
          <Button type="submit" size="sm" variant="primary" iconRight={<Send />}>
            Post Response
          </Button>
        </div>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p className="text-center py-6 text-sm text-ink-3">
          No comments yet. Be the first to share additional context or questions.
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => {
            const linkedEv = evidenceList.find((e) => e.id === c.evidenceId);
            return (
              <div key={c.id} className="p-4 rounded-xl border border-line bg-surface/50 space-y-2">
                <div className="flex items-center justify-between text-xs text-ink-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">Community Member</span>
                    <span className="capitalize px-1.5 py-0.5 rounded bg-surface border border-line text-[11px]">
                      {c.kind}
                    </span>
                  </div>
                  <time dateTime={c.date}>{formatDate(c.date)}</time>
                </div>

                {linkedEv && (
                  <div className="text-xs text-accent-ink bg-accent/10 border border-accent/20 rounded px-2.5 py-1 inline-flex items-center gap-1.5">
                    <LinkIcon className="h-3 w-3" />
                    <span>Referencing: <strong>{linkedEv.title}</strong></span>
                  </div>
                )}

                <p className="text-sm text-ink-2 leading-relaxed whitespace-pre-wrap">
                  {c.body}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </GlassPanel>
  );
};
