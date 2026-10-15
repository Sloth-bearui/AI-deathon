import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Post, EvidenceItem, Comment, FactorScores, PostType, ReportStatus, Lang } from '@/types';
import { mockApi } from '@/services/mockApi';

interface CommunityState {
  posts: Post[];
  evidenceByPostId: Record<string, EvidenceItem[]>;
  commentsByPostId: Record<string, Comment[]>;
  savedPostIds: string[];
  searchQuery: string;
  typeFilter: PostType | 'all';
  statusFilter: ReportStatus | 'all';
  langFilter: Lang | 'all';
  platformFilter: string | 'all';
  sortBy: 'newest' | 'highest-relevance' | 'lowest-relevance' | 'evidence';

  // Actions
  init: () => Promise<void>;
  setSearchQuery: (q: string) => void;
  setTypeFilter: (type: PostType | 'all') => void;
  setStatusFilter: (status: ReportStatus | 'all') => void;
  setLangFilter: (lang: Lang | 'all') => void;
  setPlatformFilter: (platform: string | 'all') => void;
  setSortBy: (sortBy: 'newest' | 'highest-relevance' | 'lowest-relevance' | 'evidence') => void;
  addPost: (post: Omit<Post, 'id' | 'date' | 'scoreHistory'>) => Post;
  addEvidence: (postId: string, evidence: Omit<EvidenceItem, 'id' | 'postId' | 'date'>) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'postId' | 'date'>) => void;
  toggleSavePost: (postId: string) => void;
  applyInvestigationFindings: (postId: string, factorDelta: Partial<FactorScores>, newEvidence: Omit<EvidenceItem, 'id' | 'postId' | 'date' | 'contributorId'>[]) => void;
  reset: () => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: [],
      evidenceByPostId: {
        'post-001': [
          {
            id: 'ev-1',
            postId: 'post-001',
            contributorId: 'contrib-001',
            stance: 'contradicts',
            title: 'RBI Press Release Archive Search (Oct 2026)',
            summary: 'Searched the official press archive at rbi.org.in. No circulars or gazettes indicate recalling ₹500 currency notes.',
            sourceName: 'Reserve Bank of India Official Portal',
            sourceUrl: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
            sourceKind: 'official',
            date: '2026-10-14T09:10:00Z',
          },
        ],
        'post-002': [
          {
            id: 'ev-2',
            postId: 'post-002',
            contributorId: 'contrib-002',
            stance: 'contradicts',
            title: 'Delhi Metro Rail Corporation Route Map Review',
            summary: 'DMRC official network map confirmed the operational boundary terminates at Ballabhgarh / Samaypur Badli, not Agra.',
            sourceName: 'DMRC Route Information',
            sourceUrl: 'https://www.delhimetrorail.com',
            sourceKind: 'official',
            date: '2026-10-13T16:00:00Z',
          },
        ],
      },
      commentsByPostId: {
        'post-001': [
          {
            id: 'c-1',
            postId: 'post-001',
            contributorId: 'contrib-002',
            kind: 'comment',
            body: 'My family group received this exact forward 3 days ago. Glad this has been flagged with primary RBI sources.',
            date: '2026-10-14T10:15:00Z',
          },
        ],
      },
      savedPostIds: [],
      searchQuery: '',
      typeFilter: 'all',
      statusFilter: 'all',
      langFilter: 'all',
      platformFilter: 'all',
      sortBy: 'newest',

      init: async () => {
        if (get().posts.length === 0) {
          const loaded = await mockApi.getPosts();
          set({ posts: loaded });
        }
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setLangFilter: (langFilter) => set({ langFilter }),
      setPlatformFilter: (platformFilter) => set({ platformFilter }),
      setSortBy: (sortBy) => set({ sortBy }),

      addPost: (data) => {
        const id = `post-${Date.now()}`;
        const newPost: Post = {
          ...data,
          id,
          date: new Date().toISOString(),
          scoreHistory: [
            {
              id: `sh-${Date.now()}`,
              date: new Date().toISOString(),
              score: data.factors ? Math.round(
                data.factors.evidence * 0.35 +
                data.factors.source * 0.30 +
                data.factors.corroboration * 0.20 +
                data.factors.reproducibility * 0.15
              ) : null,
              reason: 'Claim submitted to the community for open evidence collection.',
            },
          ],
          local: true,
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));

        return newPost;
      },

      addEvidence: (postId, data) => {
        const item: EvidenceItem = {
          ...data,
          id: `ev-${Date.now()}`,
          postId,
          date: new Date().toISOString(),
        };

        set((state) => {
          const current = state.evidenceByPostId[postId] || [];
          const updatedPosts = state.posts.map((p) => {
            if (p.id !== postId) return p;
            const curFactors = p.factors || { evidence: 30, source: 25, corroboration: 20, reproducibility: 20 };
            const delta = data.stance === 'supports' ? 12 : -10;
            const newFactors = {
              ...curFactors,
              evidence: Math.max(0, Math.min(100, curFactors.evidence + delta)),
              corroboration: Math.min(100, curFactors.corroboration + 10),
            };
            const newScore = Math.round(
              newFactors.evidence * 0.35 +
              newFactors.source * 0.30 +
              newFactors.corroboration * 0.20 +
              newFactors.reproducibility * 0.15
            );
            return {
              ...p,
              factors: newFactors,
              scoreHistory: [
                ...p.scoreHistory,
                {
                  id: `sh-${Date.now()}`,
                  date: new Date().toISOString(),
                  score: newScore,
                  reason: `New evidence added: "${data.title}" (${data.sourceKind})`,
                },
              ],
            };
          });

          return {
            evidenceByPostId: { ...state.evidenceByPostId, [postId]: [item, ...current] },
            posts: updatedPosts,
          };
        });
      },

      addComment: (postId, data) => {
        const item: Comment = {
          ...data,
          id: `c-${Date.now()}`,
          postId,
          date: new Date().toISOString(),
        };

        set((state) => {
          const current = state.commentsByPostId[postId] || [];
          return {
            commentsByPostId: { ...state.commentsByPostId, [postId]: [item, ...current] },
          };
        });
      },

      toggleSavePost: (postId) => {
        set((state) => {
          const exists = state.savedPostIds.includes(postId);
          return {
            savedPostIds: exists
              ? state.savedPostIds.filter((id) => id !== postId)
              : [...state.savedPostIds, postId],
          };
        });
      },

      applyInvestigationFindings: (postId, factorDelta, newEvidence) => {
        set((state) => {
          const post = state.posts.find((p) => p.id === postId);
          if (!post) return state;

          const baseFactors = post.factors || { evidence: 20, source: 20, corroboration: 20, reproducibility: 20 };
          const updatedFactors: FactorScores = {
            evidence: Math.max(0, Math.min(100, (baseFactors.evidence || 0) + (factorDelta.evidence || 0))),
            source: Math.max(0, Math.min(100, (baseFactors.source || 0) + (factorDelta.source || 0))),
            corroboration: Math.max(0, Math.min(100, (baseFactors.corroboration || 0) + (factorDelta.corroboration || 0))),
            reproducibility: Math.max(0, Math.min(100, (baseFactors.reproducibility || 0) + (factorDelta.reproducibility || 0))),
          };

          const newScore = Math.round(
            updatedFactors.evidence * 0.35 +
            updatedFactors.source * 0.30 +
            updatedFactors.corroboration * 0.20 +
            updatedFactors.reproducibility * 0.15
          );

          const createdEvItems: EvidenceItem[] = newEvidence.map((ev, i) => ({
            ...ev,
            id: `ev-sim-${Date.now()}-${i}`,
            postId,
            contributorId: 'system-osint',
            date: new Date().toISOString(),
          }));

          const updatedPosts = state.posts.map((p) => {
            if (p.id !== postId) return p;
            return {
              ...p,
              factors: updatedFactors,
              status: (newScore >= 80 ? 'well-supported' : newScore < 25 ? 'contradicted' : 'potentially-misleading') as ReportStatus,
              scoreHistory: [
                ...p.scoreHistory,
                {
                  id: `sh-inv-${Date.now()}`,
                  date: new Date().toISOString(),
                  score: newScore,
                  reason: 'Simulated OSINT verification workflow completed by community rules.',
                  delta: factorDelta,
                },
              ],
            };
          });

          const currentEv = state.evidenceByPostId[postId] || [];
          return {
            posts: updatedPosts,
            evidenceByPostId: {
              ...state.evidenceByPostId,
              [postId]: [...createdEvItems, ...currentEv],
            },
          };
        });
      },

      reset: () => {
        set({
          posts: [],
          evidenceByPostId: {},
          commentsByPostId: {},
          savedPostIds: [],
          searchQuery: '',
          typeFilter: 'all',
          statusFilter: 'all',
          langFilter: 'all',
          platformFilter: 'all',
          sortBy: 'newest',
        });
        get().init();
      },
    }),
    {
      name: 'rc_community',
      version: 3,
    }
  )
);

// Auto-seed posts on first load
useCommunityStore.getState().init();
