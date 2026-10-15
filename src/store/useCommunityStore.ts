import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Post, Comment, Evidence, Contributor } from '@/types';
import postsData from '@/data/posts.json';
import contributorsData from '@/data/contributors.json';

interface CommunityState {
  posts: Post[];
  contributors: Contributor[];
  savedPostIds: string[];
  version: number;

  addPost: (post: Post) => void;
  addComment: (postId: string, comment: Comment) => void;
  addEvidence: (postId: string, evidence: Evidence) => void;
  toggleSavePost: (postId: string) => void;
  getPost: (postId: string) => Post | undefined;
  getContributor: (id: string) => Contributor | undefined;
  resetData: () => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: postsData as Post[],
      contributors: contributorsData as Contributor[],
      savedPostIds: [],
      version: 1,

      addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
      
      addComment: (postId, comment) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
          ),
        })),
      
      addEvidence: (postId, evidence) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId ? { ...p, evidence: [...p.evidence, evidence] } : p
          ),
        })),
      
      toggleSavePost: (postId) =>
        set((s) => ({
          savedPostIds: s.savedPostIds.includes(postId)
            ? s.savedPostIds.filter((id) => id !== postId)
            : [...s.savedPostIds, postId],
        })),
      
      getPost: (postId) => get().posts.find((p) => p.id === postId),
      getContributor: (id) => get().contributors.find((c) => c.id === id),
      
      resetData: () => set({
        posts: postsData as Post[],
        contributors: contributorsData as Contributor[],
        savedPostIds: [],
      }),
    }),
    {
      name: 'rc_community',
      version: 1,
    }
  )
);
