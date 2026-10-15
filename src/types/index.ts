// ===== Reality Check — shared types =====
// Shapes mirror what a future REST/GraphQL backend would return, so mockApi.ts
// can be swapped for real fetch calls without touching UI code.

export type Lang = 'en' | 'hi';

// ---------- Community ----------
export type PostType = 'text' | 'image' | 'video' | 'forward';
export type Platform = 'whatsapp' | 'facebook' | 'x' | 'youtube' | 'telegram' | 'instagram' | 'website' | 'sms';

/** Investigation status shown on the evidence report. */
export type ReportStatus =
  | 'well-supported'
  | 'needs-more-evidence'
  | 'potentially-misleading'
  | 'contradicted'
  | 'not-investigated';

export interface FactorScores {
  /** each 0–100 */
  evidence: number;
  source: number;
  corroboration: number;
  reproducibility: number;
}

export type RelevanceBand =
  | 'well-supported'
  | 'partly-supported'
  | 'weakly-supported'
  | 'unsupported'
  | 'not-enough-evidence';

export interface ScoreEvent {
  id: string;
  date: string;
  /** score after this event, or null when not enough evidence */
  score: number | null;
  reason: string;
  /** factor deltas applied by a defined rule */
  delta?: Partial<FactorScores>;
}

export type EvidenceStance = 'supports' | 'contradicts' | 'context';
export type SourceKind = 'official' | 'established-media' | 'fact-checker' | 'archive' | 'eyewitness' | 'social' | 'unknown';

export interface EvidenceItem {
  id: string;
  postId: string;
  contributorId: string;
  stance: EvidenceStance;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
  sourceKind: SourceKind;
  /** true when the evidence came from the simulated investigation, not a person */
  simulated?: boolean;
  date: string;
}

export type CommentKind = 'comment' | 'correction' | 'question';
export interface Comment {
  id: string;
  postId: string;
  contributorId: string;
  kind: CommentKind;
  body: string;
  /** links the comment to a specific evidence item */
  evidenceId?: string;
  date: string;
}

export interface Post {
  id: string;
  type: PostType;
  platform: Platform;
  language: Lang;
  title: string;
  claim: string;
  /** the original message / caption as received */
  content: string;
  media?: string;          // path in /public/media
  mediaAlt?: string;
  sourceUrl?: string;
  contributorId: string;
  date: string;
  tags: string[];
  status: ReportStatus;
  /** null = "Not enough evidence yet" */
  factors: FactorScores | null;
  scoreHistory: ScoreEvent[];
  investigationId?: string;
  /** user-submitted (local only) */
  local?: boolean;
}

export type ReliabilityDescriptor = 'new' | 'developing' | 'established';

export interface Contributor {
  id: string;
  name: string;
  handle: string;
  city: string;
  joined: string;
  bio: string;
  avatarHue: number;
  reportsReviewed: number;
  laterCorroborated: number;
  descriptor: ReliabilityDescriptor;
  focusAreas: string[];
}

export interface Contribution {
  id: string;
  contributorId: string;
  postId: string;
  kind: 'submitted' | 'evidence' | 'correction' | 'comment';
  summary: string;
  date: string;
}

// ---------- Investigation (simulated) ----------
export type StepKey = 'claim' | 'reverse-image' | 'metadata' | 'source-trace' | 'fact-check' | 'archive';
export type FindingTone = 'supports' | 'contradicts' | 'neutral' | 'inconclusive';

export interface InvestigationStep {
  key: StepKey;
  label: string;
  description: string;
  finding: string;
  tone: FindingTone;
  sources?: { name: string; url?: string }[];
}

export interface SourceRow {
  source: string;
  kind: SourceKind;
  date: string;
  says: string;
  matchesClaim: 'yes' | 'no' | 'partly' | 'unclear';
}

export interface TimelineEvent {
  date: string;
  label: string;
}

export interface Investigation {
  id: string;
  postId: string;
  extractedClaims: string[];
  steps: InvestigationStep[];
  sourceComparison: SourceRow[];
  timeline: TimelineEvent[];
  summary: string;
  status: ReportStatus;
  limitations: string[];
  nextSteps: string[];
  /** evidence created when the simulation runs */
  evidence: Omit<EvidenceItem, 'id' | 'postId' | 'date' | 'contributorId'>[];
  /** factor changes applied once, by rule "investigation-complete" */
  factorDelta: Partial<FactorScores>;
}

// ---------- Academy ----------
export type LabCategory = 'scams' | 'banking' | 'ai-media' | 'device' | 'ai-literacy';

export interface Lab {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: LabCategory;
  minutes: number;
  icon: string;
  /** component key in labs/registry */
  component: string;
  objectives: string[];
  checklist: string[];
  reflection: string[];
}

// ---------- Phone simulator ----------
export type AppId = 'messages' | 'browser' | 'bank' | 'settings' | 'phone' | 'home' | 'lock';
export type Difficulty = 'gentle' | 'standard';
export type Outcome = 'safe' | 'recovered' | 'compromised';

export interface ScenarioFlags {
  sharedOtp?: boolean;
  tappedLink?: boolean;
  checkedSender?: boolean;
  installedApp?: boolean;
  enteredPin?: boolean;
  reported?: boolean;
  calledBank?: boolean;
  blockedSender?: boolean;
  [k: string]: boolean | undefined;
}

export interface ScenarioMessage {
  from: string;
  body: string;
  time: string;
  /** visual hints the coach can highlight */
  redFlags?: string[];
}

export interface ScenarioAction {
  id: string;
  label: string;
  next: string;
  set?: ScenarioFlags;
  commentary: string;
  safer?: boolean;
}

export interface ScenarioNode {
  id: string;
  app: AppId;
  title?: string;
  /** for messages app */
  thread?: { contact: string; number?: string; messages: ScenarioMessage[] };
  /** for browser */
  page?: { url: string; secure: boolean; heading: string; body: string; fields?: string[] };
  /** for bank / settings / phone screens */
  screen?: { heading: string; body: string; items?: string[] };
  notification?: { app: AppId; from: string; body: string };
  actions: ScenarioAction[];
  hints: { nudge: string; explain: string; showMe: string };
  /** terminal node */
  end?: Outcome;
}

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  minutes: number;
  status: 'ready' | 'outline';
  start: string;
  nodes: ScenarioNode[];
  saferChoices: string[];
  recoverySteps: string[];
}
