import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, XCircle, AlertTriangle, HelpCircle, Eye,
  ThumbsUp, ThumbsDown, MessageSquare, Share2, ExternalLink, Clock,
  User, Shield, Link2, FileText, Flag
} from 'lucide-react';
import { Card, Button, Badge, GlassPanel, Stepper, Accordion } from '@/design-system';
import { useCommunityStore } from '@/store/useCommunityStore';
import { cn } from '@/utils/cn';
import { formatDate, timeAgo } from '@/utils/formatDate';

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  verified_true: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', icon: CheckCircle2, label: 'Verified True' },
  verified_false: { color: 'text-red-400', bg: 'bg-red-400/10', icon: XCircle, label: 'Verified False' },
  misleading: { color: 'text-amber-400', bg: 'bg-amber-400/10', icon: AlertTriangle, label: 'Misleading' },
  unverified: { color: 'text-gray-400', bg: 'bg-gray-400/10', icon: HelpCircle, label: 'Unverified' },
  under_review: { color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Eye, label: 'Under Review' },
};

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { posts, upvotePost } = useCommunityStore();

  const post = useMemo(() => posts.find((p) => p.id === id), [posts, id]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="font-heading text-xl font-semibold mb-2">Post not found</h2>
        <Button variant="ghost" onClick={() => navigate('/community')}>
          <ArrowLeft size={16} /> Back to feed
        </Button>
      </div>
    );
  }

  const sc = statusConfig[post.status] || statusConfig.unverified;
  const StatusIcon = sc.icon;

  const investigationSteps = [
    { label: 'Claim Submitted', completed: true },
    { label: 'Source Analysis', completed: post.status !== 'unverified' },
    { label: 'Cross-referencing', completed: ['verified_true', 'verified_false', 'misleading'].includes(post.status) },
    { label: 'Verdict Published', completed: ['verified_true', 'verified_false', 'misleading'].includes(post.status) },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => navigate('/community')}>
        <ArrowLeft size={16} /> {t('common.back')}
      </Button>

      {/* Verdict Banner */}
      <div className={cn('rounded-glass p-6', sc.bg)}>
        <div className="flex items-center gap-3">
          <StatusIcon size={32} className={sc.color} />
          <div>
            <div className={cn('font-heading text-2xl font-bold', sc.color)}>{sc.label}</div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Reviewed {timeAgo(post.updatedAt || post.createdAt)}
            </p>
          </div>
          {post.relevanceScore > 0 && (
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-accent">{post.relevanceScore}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Relevance Points</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim */}
          <Card className="p-6">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-3 flex-wrap">
              <span className="flex items-center gap-1"><User size={14} />{post.submitter}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={14} />{formatDate(post.createdAt)}</span>
              <Badge variant="default" className="ml-auto">{post.category}</Badge>
            </div>
            <h1 className="font-heading text-xl lg:text-2xl font-bold mb-3">{post.title}</h1>
            <blockquote className="border-l-4 border-accent/30 pl-4 py-2 bg-accent/5 rounded-r-card text-[var(--color-text-secondary)] italic mb-4">
              "{post.claim}"
            </blockquote>
            {post.sourceUrl && (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                <Link2 size={14} /> Source link <ExternalLink size={12} />
              </a>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                  #{tag}
                </span>
              ))}
            </div>
          </Card>

          {/* Investigation Process */}
          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={20} className="text-accent" /> Investigation Process
            </h2>
            <Stepper
              steps={investigationSteps.map((s) => s.label)}
              currentStep={investigationSteps.filter((s) => s.completed).length - 1}
            />
          </Card>

          {/* Evidence & Analysis */}
          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-accent" /> Evidence & Analysis
            </h2>
            <Accordion
              items={[
                {
                  title: 'Source Credibility',
                  content: post.sourceUrl
                    ? `The claim originated from ${post.sourceUrl}. Our analysis examined the domain's history, ownership, and publishing track record.`
                    : 'The claim was shared via social media or messaging platforms without a traceable source URL.',
                },
                {
                  title: 'Cross-reference Results',
                  content: 'The claim was cross-referenced against official government sources, established news outlets, and fact-checking databases. Multiple independent sources were consulted.',
                },
                {
                  title: 'Expert Commentary',
                  content: 'Community contributors with domain expertise reviewed the claim and provided analysis based on publicly available information.',
                },
                {
                  title: 'Methodology',
                  content: 'This verification followed standard OSINT methodology: source identification, content analysis, reverse image/video search (where applicable), cross-referencing, and expert review.',
                },
              ]}
            />
          </Card>

          {/* Comments section placeholder */}
          <Card className="p-6">
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-accent" /> Discussion ({post.comments})
            </h2>
            <div className="space-y-4">
              {/* Sample comments */}
              {[
                { author: 'FactFinder_IN', time: '2 hours ago', text: 'I checked the official RBI website and there is no such circular. This is a fabricated claim.' },
                { author: 'DigitalLiteracy', time: '5 hours ago', text: 'The WhatsApp forward is using an old press conference image. Reverse image search confirms it is from 2022.' },
              ].map((comment, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-card bg-[var(--color-surface)]">
                  <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <User size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-1">
                      <span className="font-medium text-[var(--color-text)]">{comment.author}</span>
                      <span>·</span>
                      <span>{comment.time}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add your analysis..."
                className="flex-1 px-4 py-2.5 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 min-h-[44px]"
              />
              <Button>Post</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <GlassPanel className="p-4 space-y-3">
            <h3 className="font-heading font-semibold text-sm mb-2">Actions</h3>
            <Button variant="secondary" className="w-full justify-start" onClick={() => upvotePost(post.id)}>
              <ThumbsUp size={16} /> Upvote ({post.upvotes})
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Share2 size={16} /> Share result
            </Button>
            <Button variant="ghost" className="w-full justify-start text-amber-400">
              <Flag size={16} /> Report
            </Button>
          </GlassPanel>

          {/* Relevance Score */}
          <GlassPanel className="p-4">
            <h3 className="font-heading font-semibold text-sm mb-3">Relevance Score</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Source quality</span>
                <span className="font-medium">{Math.floor(post.relevanceScore * 0.3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Community votes</span>
                <span className="font-medium">{Math.floor(post.relevanceScore * 0.25)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Evidence depth</span>
                <span className="font-medium">{Math.floor(post.relevanceScore * 0.25)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Recency</span>
                <span className="font-medium">{Math.floor(post.relevanceScore * 0.2)}</span>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div className="flex justify-between font-semibold text-accent">
                <span>Total</span>
                <span>{post.relevanceScore} RP</span>
              </div>
            </div>
          </GlassPanel>

          {/* Contributor Reliability */}
          <GlassPanel className="p-4">
            <h3 className="font-heading font-semibold text-sm mb-3">Contributor Reliability</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <User size={20} className="text-accent" />
              </div>
              <div>
                <div className="font-medium text-sm">{post.submitter}</div>
                <div className="text-xs text-[var(--color-text-muted)]">Community Member</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-card bg-[var(--color-surface)]">
                <div className="text-lg font-bold">87%</div>
                <div className="text-xs text-[var(--color-text-muted)]">Accuracy</div>
              </div>
              <div className="p-2 rounded-card bg-[var(--color-surface)]">
                <div className="text-lg font-bold">23</div>
                <div className="text-xs text-[var(--color-text-muted)]">Submissions</div>
              </div>
            </div>
          </GlassPanel>

          {/* Stats */}
          <GlassPanel className="p-4">
            <h3 className="font-heading font-semibold text-sm mb-3">Engagement</h3>
            <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <Eye size={14} /> {post.views.toLocaleString()} views
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp size={14} /> {post.upvotes} upvotes
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} /> {post.comments} comments
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
};
