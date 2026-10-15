import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import postsData from '@/data/posts.json';
import contributorsData from '@/data/contributors.json';

// Adapted Post type for component consumption
export interface FeedPost {
  id: string;
  title: string;
  claim: string;
  category: string;
  status: string;
  submitter: string;
  createdAt: string;
  updatedAt?: string;
  sourceUrl?: string;
  mediaType: string;
  tags: string[];
  upvotes: number;
  comments: number;
  views: number;
  relevanceScore: number;
}

// Transform raw JSON to FeedPost format
function transformPosts(raw: typeof postsData): FeedPost[] {
  const categoryMap: Record<string, string> = {
    'banking': 'finance', 'currency': 'finance', 'government': 'politics', 'government-scheme': 'politics',
    'health': 'health', 'technology': 'technology', 'infrastructure': 'technology',
    'education': 'social', 'food': 'health', 'myths': 'health', 'vaccine': 'health', 'covid': 'health',
    'environment': 'social', 'identity': 'social', 'transport': 'technology',
    'scam': 'scam', 'phishing': 'scam', 'urgent-scam': 'scam', 'conspiracy': 'health',
  };

  const statusMap: Record<string, string> = {
    'misleading': 'verified_false',
    'unverified': 'unverified',
    'investigating': 'under_review',
    'verified': 'verified_true',
    'needs-evidence': 'under_review',
  };

  return raw.map((p: any) => {
    const mainTag = p.tags?.[0] || 'social';
    return {
      id: p.id,
      title: p.title,
      claim: p.claim,
      category: categoryMap[mainTag] || 'social',
      status: statusMap[p.status] || p.status,
      submitter: contributorsData.find((c: any) => c.id === p.contributorId)?.name || 'Anonymous',
      createdAt: p.dateSubmitted,
      updatedAt: p.dateSubmitted,
      sourceUrl: undefined,
      mediaType: p.type || 'text',
      tags: p.tags || [],
      upvotes: Math.floor(Math.random() * 120) + 5,
      comments: Array.isArray(p.comments) ? p.comments.length : 0,
      views: Math.floor(Math.random() * 3000) + 200,
      relevanceScore: p.relevanceScore || 0,
    };
  });
}

interface CommunityState {
  posts: FeedPost[];
  searchQuery: string;
  activeFilter: string;

  setSearchQuery: (q: string) => void;
  setActiveFilter: (f: string) => void;
  addPost: (data: Partial<FeedPost>) => void;
  upvotePost: (id: string) => void;
  resetData: () => void;
}

const seedPosts = transformPosts(postsData as any);

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: seedPosts,
      searchQuery: '',
      activeFilter: 'all',

      setSearchQuery: (q) => set({ searchQuery: q }),
      setActiveFilter: (f) => set({ activeFilter: f }),

      addPost: (data) => {
        const newPost: FeedPost = {
          id: `post-${Date.now()}`,
          title: data.title || 'Untitled Claim',
          claim: data.claim || '',
          category: data.category || 'social',
          status: 'unverified',
          submitter: 'You',
          createdAt: new Date().toISOString(),
          mediaType: data.mediaType || 'text',
          tags: data.tags || [],
          upvotes: 0,
          comments: 0,
          views: 0,
          relevanceScore: 0,
          sourceUrl: data.sourceUrl,
        };
        set((s) => ({ posts: [newPost, ...s.posts] }));
      },

      upvotePost: (id) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p
          ),
        })),

      resetData: () => set({ posts: seedPosts, searchQuery: '', activeFilter: 'all' }),
    }),
    {
      name: 'rc_community',
      version: 2,
    }
  )
);
