import type { Post, Contributor, Investigation, Lab, Scenario, EvidenceItem, Comment, FactorScores } from '@/types';
import rawPosts from '@/data/posts.json';
import rawContributors from '@/data/contributors.json';
import rawInvestigations from '@/data/investigations.json';
import rawLabs from '@/data/labs.json';
import rawLessons from '@/data/lessons.json';

// Import all 6 scenario JSON files
import scenarioKyc from '@/data/scenarios/fake-kyc-sms.json';
import scenarioUpi from '@/data/scenarios/upi-collect-trick.json';
import scenarioParcel from '@/data/scenarios/parcel-link.json';
import scenarioFamily from '@/data/scenarios/family-emergency.json';
import scenarioAppUpdate from '@/data/scenarios/fake-app-update.json';
import scenarioLottery from '@/data/scenarios/whatsapp-lottery.json';

// Normalizers to guarantee TypeScript type compliance
function normalizePosts(): Post[] {
  return (rawPosts as any[]).map((p) => ({
    id: p.id,
    type: p.type || 'text',
    platform: p.platform || p.sourcePlatform || 'whatsapp',
    language: p.language || 'en',
    title: p.title || 'Untitled Claim',
    claim: p.claim || '',
    content: p.content || '',
    media: p.media || (p.type === 'image' ? '/media/delhi-metro-fake.svg' : undefined),
    mediaAlt: p.title,
    sourceUrl: p.sourceUrl,
    contributorId: p.contributorId || 'contrib-001',
    date: p.date || p.dateSubmitted || '2026-10-14T08:00:00Z',
    tags: p.tags || [],
    status: p.status === 'misleading' ? 'potentially-misleading' : (p.status || 'needs-more-evidence'),
    factors: p.factors || {
      evidence: p.relevanceScore || 20,
      source: Math.max(10, (p.relevanceScore || 20) - 5),
      corroboration: Math.max(10, (p.relevanceScore || 20) + 5),
      reproducibility: 30,
    },
    scoreHistory: p.scoreHistory || [
      {
        id: `sh-${p.id}-1`,
        date: p.dateSubmitted || '2026-10-14T08:30:00Z',
        score: p.relevanceScore || 20,
        reason: 'Initial community submission & automated preliminary source review.',
      },
    ],
    investigationId: p.investigationId,
  }));
}

function normalizeContributors(): Contributor[] {
  return (rawContributors as any[]).map((c) => ({
    id: c.id,
    name: c.name,
    handle: c.handle || `@${c.name.toLowerCase().replace(/\s+/g, '')}`,
    city: c.city || 'India',
    joined: c.joined || c.joinDate || '2026-06-01T00:00:00Z',
    bio: c.bio || '',
    avatarHue: c.avatarHue || (c.id === 'contrib-001' ? 174 : c.id === 'contrib-002' ? 199 : 38),
    reportsReviewed: c.reportsReviewed || 10,
    laterCorroborated: c.corroboratedLater || c.laterCorroborated || 8,
    descriptor: (c.reliabilityLevel || c.descriptor || 'developing') as any,
    focusAreas: c.focusAreas || ['Banking Safety', 'Media Verification'],
  }));
}

function normalizeLabs(): Lab[] {
  const categoryMap: Record<string, any> = {
    'scam-awareness': 'scams',
    'digital-banking': 'banking',
    'ai-media': 'ai-media',
    'device-security': 'device',
    'ai-literacy': 'ai-literacy',
  };

  return (rawLabs as any[]).map((l) => ({
    id: l.id,
    slug: l.slug || l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: l.title,
    summary: l.description,
    description: l.description,
    category: categoryMap[l.category] || 'scams',
    minutes: l.estimatedMinutes || 15,
    icon: l.icon || 'shield',
    component: l.id,
    objectives: [
      'Recognize deception markers in digital communication',
      'Learn verify-first habits before clicking or sharing',
      'Understand proper reporting and recovery mechanisms',
    ],
    checklist: [
      'Pause before responding to sudden urgency',
      'Inspect domain URLs and sender phone numbers',
      'Verify claims on official regulatory websites',
      'Never share bank OTPs or authorize unexpected UPI collect requests',
    ],
    reflection: [
      'Have you or a family member encountered a similar message recently?',
      'What immediate step will you take next time you see this warning pattern?',
    ],
  }));
}

const allScenarios: Scenario[] = [
  scenarioKyc as any,
  scenarioUpi as any,
  scenarioParcel as any,
  scenarioFamily as any,
  scenarioAppUpdate as any,
  scenarioLottery as any,
];

// In-memory data caches for fast interactive demos
let postsCache = normalizePosts();
let contributorsCache = normalizeContributors();
let labsCache = normalizeLabs();

export const mockApi = {
  // Posts
  getPosts: async (): Promise<Post[]> => {
    return [...postsCache];
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    return postsCache.find((p) => p.id === id);
  },

  createPost: async (post: Post): Promise<Post> => {
    postsCache = [post, ...postsCache];
    return post;
  },

  updatePostScore: async (postId: string, newFactors: Partial<FactorScores>, reason: string): Promise<Post | undefined> => {
    const post = postsCache.find((p) => p.id === postId);
    if (!post) return undefined;

    const currentFactors: FactorScores = post.factors || {
      evidence: 0,
      source: 0,
      corroboration: 0,
      reproducibility: 0,
    };

    const updatedFactors: FactorScores = { ...currentFactors, ...newFactors };
    post.factors = updatedFactors;

    const raw =
      updatedFactors.evidence * 0.35 +
      updatedFactors.source * 0.30 +
      updatedFactors.corroboration * 0.20 +
      updatedFactors.reproducibility * 0.15;
    const score = Math.round(raw);

    post.scoreHistory.push({
      id: `sh-${Date.now()}`,
      date: new Date().toISOString(),
      score,
      reason,
      delta: newFactors,
    });

    return { ...post };
  },

  // Contributors
  getContributors: async (): Promise<Contributor[]> => {
    return [...contributorsCache];
  },

  getContributorById: async (id: string): Promise<Contributor | undefined> => {
    return contributorsCache.find((c) => c.id === id);
  },

  // Labs
  getLabs: async (): Promise<Lab[]> => {
    return [...labsCache];
  },

  getLabBySlug: async (slug: string): Promise<Lab | undefined> => {
    return labsCache.find((l) => l.slug === slug || l.id === slug);
  },

  getLessonsForLab: async (labId: string) => {
    const labGroup = (rawLessons as any[]).find((lg) => lg.labId === labId);
    return labGroup?.lessons || [];
  },

  // Scenarios
  getScenarios: async (): Promise<Scenario[]> => {
    return allScenarios;
  },

  getScenarioById: async (id: string): Promise<Scenario | undefined> => {
    return allScenarios.find((s) => s.id === id || s.id === `scenario-${id}`);
  },
};
