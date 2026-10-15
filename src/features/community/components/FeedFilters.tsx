import React from 'react';
import type { PostType, ReportStatus, Lang } from '@/types';
import { Tag } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { Search, Filter, ArrowUpDown, X, Layers, ShieldCheck, Smartphone } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilter: PostType | 'all';
  onTypeChange: (t: PostType | 'all') => void;
  statusFilter: ReportStatus | 'all';
  onStatusChange: (s: ReportStatus | 'all') => void;
  langFilter: Lang | 'all';
  onLangChange: (l: Lang | 'all') => void;
  platformFilter: string | 'all';
  onPlatformChange: (p: string | 'all') => void;
  sortBy: 'newest' | 'highest-relevance' | 'lowest-relevance' | 'evidence';
  onSortChange: (sb: 'newest' | 'highest-relevance' | 'lowest-relevance' | 'evidence') => void;
  totalCount: number;
}

export const FeedFilters: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  langFilter,
  onLangChange,
  platformFilter,
  onPlatformChange,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const types: { value: PostType | 'all'; label: string }[] = [
    { value: 'all', label: isHi ? 'सभी प्रारूप' : 'All Formats' },
    { value: 'forward', label: isHi ? 'व्हाट्सएप फॉरवर्ड' : 'WhatsApp Forwards' },
    { value: 'image', label: isHi ? 'तस्वीरें' : 'Images' },
    { value: 'video', label: isHi ? 'वीडियो' : 'Videos' },
    { value: 'text', label: isHi ? 'टेक्स्ट दावे' : 'Text Claims' },
  ];

  const statuses: { value: ReportStatus | 'all'; label: string }[] = [
    { value: 'all', label: isHi ? 'सभी स्थिति' : 'All Status' },
    { value: 'well-supported', label: isHi ? '✓ सत्यापित सत्य (Well Supported)' : '✓ Verified Supported (80+)' },
    { value: 'contradicted', label: isHi ? '❌ फर्जी / अपुष्ट (Unsupported)' : '❌ Debunked / Unsupported' },
    { value: 'potentially-misleading', label: isHi ? '⚠️ भ्रामक (Misleading)' : '⚠️ Misleading (Weak)' },
    { value: 'needs-more-evidence', label: isHi ? '⏳ जांच जारी' : '⏳ Under Review' },
  ];

  const platforms = [
    { value: 'all', label: isHi ? 'सभी प्लेटफॉर्म' : 'All Platforms' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'sms', label: 'SMS' },
    { value: 'x', label: 'Twitter/X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'youtube', label: 'YouTube' },
  ];

  const sortOptions: { value: 'newest' | 'highest-relevance' | 'lowest-relevance' | 'evidence'; label: string }[] = [
    { value: 'newest', label: isHi ? 'नवीनतम पहले' : 'Newest First' },
    { value: 'highest-relevance', label: isHi ? 'उच्चतम प्रासंगिकता (सत्यापित पहले)' : 'Highest Score (Supported First)' },
    { value: 'lowest-relevance', label: isHi ? 'न्यूनतम प्रासंगिकता (फर्जी पहले)' : 'Lowest Score (Debunked First)' },
    { value: 'evidence', label: isHi ? 'सर्वाधिक साक्ष्य' : 'Most Evidence Items' },
  ];

  const hasActiveFilters =
    searchQuery !== '' ||
    typeFilter !== 'all' ||
    statusFilter !== 'all' ||
    langFilter !== 'all' ||
    platformFilter !== 'all' ||
    sortBy !== 'newest';

  const resetFilters = () => {
    onSearchChange('');
    onTypeChange('all');
    onStatusChange('all');
    onLangChange('all');
    onPlatformChange('all');
    onSortChange('newest');
  };

  return (
    <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-surface/40 border border-line backdrop-blur-md" data-tour="filters">
      {/* Top Search & Sort Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="feed-search" className="sr-only">
            {isHi ? 'दावे खोजें' : 'Search community claims'}
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-3" aria-hidden />
          <input
            id="feed-search"
            type="search"
            placeholder={isHi ? "दावे, वायरल कीवर्ड (जैसे RBI, 5G, KYC, लॉटरी) खोजें..." : "Search by keyword, claim, or viral topic (e.g. RBI, UPI, 5G)..."}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="field pl-12 pr-10 text-base w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-hover text-ink-3 hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs uppercase font-bold text-ink-3 flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="h-4 w-4 text-accent" />
            {isHi ? 'क्रमबद्ध:' : 'Sort By:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="field py-2 px-3 text-xs sm:text-sm font-semibold bg-raised border border-line rounded-xl focus:border-accent"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Status Filter Chips (Prominent & High-Contrast) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs uppercase font-bold text-ink-3 mr-1 flex items-center gap-1 shrink-0">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          {isHi ? 'स्थिति:' : 'Status:'}
        </span>
        {statuses.map((s) => (
          <Tag
            key={s.value}
            active={statusFilter === s.value}
            onClick={() => onStatusChange(s.value)}
            className="text-xs shrink-0 cursor-pointer font-semibold"
          >
            {s.label}
          </Tag>
        ))}
      </div>

      {/* Row 3: Platform & Format Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-line/50 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs uppercase font-semibold text-ink-3 mr-1 flex items-center gap-1 shrink-0">
            <Smartphone className="h-3.5 w-3.5" />
            {isHi ? 'प्लेटफ़ॉर्म:' : 'Platform:'}
          </span>
          {platforms.map((p) => (
            <Tag
              key={p.value}
              active={platformFilter === p.value}
              onClick={() => onPlatformChange(p.value)}
              className="text-xs shrink-0 cursor-pointer"
            >
              {p.label}
            </Tag>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-3 font-mono">
            {isHi ? `${totalCount} दावे प्रदर्शित` : `Showing ${totalCount} claims`}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-accent-ink hover:underline font-bold px-2 py-1 rounded bg-accent/10 border border-accent/20"
            >
              {isHi ? 'फ़िल्टर रीसेट करें' : 'Reset filters'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
