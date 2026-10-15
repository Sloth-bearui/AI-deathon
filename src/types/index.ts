// ===== Core Types for Reality Check =====

// === Community / Posts ===
export type PostType = 'text' | 'image' | 'video' | 'forward';
export type PostStatus = 'unverified' | 'investigating' | 'verified' | 'misleading' | 'needs-evidence';
export type InvestigationStatus = 'well-supported' | 'needs-more-evidence' | 'potentially-misleading' | 'contradicted';

export interface Post {
  id: string;
  title: string;
  claim: string;
  content: string;
  type: PostType;
  status: PostStatus;
  mediaUrl?: string;
  mediaSvg?: string;
  sourceUrl?: string;
  sourcePlatform?: 'whatsapp' | 'twitter' | 'facebook' | 'telegram' | 'youtube' | 'website' | 'other';
  language: 'en' | 'hi';
  contributorId: string;
  dateSubmitted: string;
  dateUpdated?: string;
  relevanceScore?: number;
  investigationId?: string;
  tags: string[];
  comments: Comment[];
  evidence: Evidence[];
  saved?: boolean;
}

export interface Comment {
  id: string;
  contributorId: string;
  content: string;
  date: string;
  type: 'comment' | 'evidence' | 'correction';
}

export interface Evidence {
  id: string;
  contributorId: string;
  type: 'supporting' | 'contradicting' | 'contextual';
  title: string;
  description: string;
  sourceUrl?: string;
  date: string;
}

// === Relevance Score (community only) ===
export interface RelevanceBreakdown {
  evidenceStrength: number;    // 0-100, weight 35%
  sourceCredibility: number;   // 0-100, weight 30%
  corroboration: number;       // 0-100, weight 20%
  reproducibility: number;     // 0-100, weight 15%
}

export interface ScoreHistoryEntry {
  date: string;
  score: number;
  reason: string;
}

export type RelevanceBand = 'well-supported' | 'partly-supported' | 'weakly-supported' | 'unsupported' | 'not-enough-evidence';

// === Contributors ===
export type ReliabilityLevel = 'new' | 'developing' | 'established';

export interface Contributor {
  id: string;
  name: string;
  joinDate: string;
  avatarColor: string;
  reportsReviewed: number;
  corroboratedLater: number;
  totalContributions: number;
  reliabilityLevel: ReliabilityLevel;
  bio: string;
  contributions: ContributionEntry[];
}

export interface ContributionEntry {
  id: string;
  postId: string;
  type: 'submitted' | 'evidence' | 'comment' | 'investigation';
  title: string;
  date: string;
}

// === Investigations ===
export interface InvestigationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'complete' | 'skipped';
  finding?: string;
  findingType?: 'supporting' | 'contradicting' | 'neutral' | 'inconclusive';
  sources?: string[];
  duration?: number;
}

export interface Investigation {
  id: string;
  postId: string;
  claim: string;
  status: InvestigationStatus;
  dateStarted: string;
  dateCompleted?: string;
  steps: InvestigationStep[];
  summary: string;
  limitations: string[];
  recommendedSteps: string[];
  disclaimer: string;
}

// === Academy ===
export type LabCategory = 'scam-awareness' | 'digital-banking' | 'ai-media' | 'device-security' | 'ai-literacy';

export interface Lab {
  id: string;
  title: string;
  description: string;
  category: LabCategory;
  estimatedMinutes: number;
  icon: string;
  completed?: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'intro' | 'interactive' | 'reflection' | 'checklist';
  content: string;
}

// === Phone Simulator ===
export type ScenarioDifficulty = 'gentle' | 'standard';
export type ScenarioOutcome = 'safe' | 'recovered' | 'compromised';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: ScenarioDifficulty;
  category: string;
  startNodeId: string;
  nodes: ScenarioNode[];
}

export interface ScenarioNode {
  id: string;
  type: 'notification' | 'message' | 'browser' | 'bank' | 'call' | 'settings' | 'outcome';
  app?: string;
  content: NodeContent;
  actions: ScenarioAction[];
  flags?: Record<string, boolean>;
}

export interface NodeContent {
  title?: string;
  body: string;
  sender?: string;
  url?: string;
  image?: string;
  metadata?: Record<string, string>;
}

export interface ScenarioAction {
  id: string;
  label: string;
  nextNodeId: string;
  isSafe?: boolean;
  flagsSet?: Record<string, boolean>;
  commentary?: string;
}

// === Preferences ===
export interface UserPrefs {
  theme: 'dark' | 'light';
  textScale: number;
  calmMode: boolean;
  language: 'en' | 'hi';
  welcomeCompleted: boolean;
  version: number;
}
