import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, ArrowUpDown, Clock, TrendingUp, CheckCircle2, XCircle, HelpCircle, AlertTriangle, MessageSquare, ThumbsUp, Share2, Eye } from 'lucide-react';
import { Card, Button, Badge, Tag, GlassPanel, Tabs, EmptyState } from '@/design-system';
import { useCommunityStore } from '@/store/useCommunityStore';
import { cn } from '@/utils/cn';
import { timeAgo } from '@/utils/formatDate';
import type { Post } from '@/types';

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  verified_true: { color: 'text-emerald-400', icon: CheckCircle2, label: 'True' },
  verified_false: { color: 'text-red-400', icon: XCircle, label: 'False' },
  misleading: { color: 'text-amber-400', icon: AlertTriangle, label: 'Misleading' },
  unverified: { color: 'text-[var(--color-text-muted)]', icon: HelpCircle, label: 'Unverified' },
  under_review: { color: 'text-blue-400', icon: Eye, label: 'Under Review' },
};

const categoryFilters = ['all', 'health', 'politics', 'finance', 'technology', 'social', 'scam'];
const sortOptions = [
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'trending', label: 'Trending', icon: TrendingUp },
];

export const CommunityFeed: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { posts, searchQuery, setSearchQuery, activeFilter, setActiveFilter } = useCommunityStore();

  const [sortBy, setSortBy] = useState<'newest' | 'trending'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.claim.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result.sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments));
    }

    return result;
  }, [posts, searchQuery, activeFilter, sortBy]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold">{t('community.title')}</h1>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">{t('community.subtitle')}</p>
        </div>
        <Button onClick={() => navigate('/community/submit')} className="shrink-0">
          <Plus size={18} />
          {t('community.submit_claim')}
        </Button>
      </div>

      {/* Search & Filters */}
      <GlassPanel className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="search"
              placeholder={t('community.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all min-h-[44px]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'touch-target rounded-button border transition-colors flex items-center gap-2 px-3',
              showFilters ? 'border-accent/50 bg-accent/10 text-accent' : 'border-[var(--color-border)] hover:bg-[var(--color-hover)]'
            )}
            aria-label="Toggle filters"
          >
            <Filter size={18} />
            <span className="hidden sm:inline text-sm">Filters</span>
          </button>
        </div>

        {/* Filter tags */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-2">
                {categoryFilters.map((cat) => (
                  <Tag
                    key={cat}
                    label={cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    active={activeFilter === cat}
                    onClick={() => setActiveFilter(cat)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-[var(--color-text-muted)]" />
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value as 'newest' | 'trending')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full transition-colors',
                sortBy === opt.value ? 'bg-accent/15 text-accent font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              )}
            >
              {opt.label}
            </button>
          ))}
          <span className="text-xs text-[var(--color-text-muted)] ml-auto">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </GlassPanel>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          icon={<Search size={48} />}
          title="No claims found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} onClick={() => navigate(`/community/${post.id}`)} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

/* Post Card */
const PostCard: React.FC<{ post: Post; index: number; onClick: () => void }> = ({ post, index, onClick }) => {
  const sc = statusConfig[post.status] || statusConfig.unverified;
  const StatusIcon = sc.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card hover className="p-4 lg:p-5 cursor-pointer" onClick={onClick}>
        <div className="flex items-start gap-3">
          {/* Status indicator */}
          <div className={cn('mt-1 shrink-0', sc.color)}>
            <StatusIcon size={22} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-1.5 flex-wrap">
              <Badge variant={post.status === 'verified_true' ? 'success' : post.status === 'verified_false' ? 'error' : post.status === 'misleading' ? 'warning' : 'default'}>
                {sc.label}
              </Badge>
              <span>{post.submitter}</span>
              <span>·</span>
              <span>{timeAgo(post.createdAt)}</span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-semibold text-sm lg:text-base mb-1 line-clamp-2">{post.title}</h3>

            {/* Claim */}
            <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">{post.claim}</p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><ThumbsUp size={14} />{post.upvotes}</span>
              <span className="flex items-center gap-1"><MessageSquare size={14} />{post.comments}</span>
              <span className="flex items-center gap-1"><Eye size={14} />{post.views}</span>
              {post.relevanceScore > 0 && (
                <span className="flex items-center gap-1 text-accent ml-auto font-medium">
                  RP {post.relevanceScore}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
