import type { Investigation, InvestigationStep, SourceRow, ReportStatus, FactorScores } from '@/types';
import investigationsData from '@/data/investigations.json';

export interface RunInvestigationOptions {
  onStepStart?: (stepKey: string, stepIndex: number) => void;
  onStepComplete?: (step: InvestigationStep, stepIndex: number) => void;
}

export const DEFAULT_INVESTIGATION_STEPS: Omit<InvestigationStep, 'finding' | 'tone'>[] = [
  {
    key: 'claim',
    label: 'Claim Extraction',
    description: 'Isolate verifiable factual statements, dates, entities and locations from the claim.',
  },
  {
    key: 'reverse-image',
    label: 'Reverse Media Search',
    description: 'Query open image indexes and perceptual hashing to find the earliest occurrence.',
  },
  {
    key: 'metadata',
    label: 'Metadata & EXIF Inspection',
    description: 'Inspect file headers, camera metadata, compression artifacts, and creation timestamps.',
  },
  {
    key: 'source-trace',
    label: 'Official Source Trace',
    description: 'Cross-reference verified regulatory gazettes, official domain portals, and press archives.',
  },
  {
    key: 'fact-check',
    label: 'Fact-Check Aggregation',
    description: 'Compare findings against certified IFCN fact-checking databases and archive records.',
  },
];

/**
 * Runs a simulated step-by-step OSINT investigation workflow with realistic delay intervals.
 * All findings are clearly simulated demonstrations.
 */
export async function runSimulatedInvestigation(
  postId: string,
  claimText: string,
  callbacks?: RunInvestigationOptions
): Promise<Investigation> {
  // Check if we have pre-authored investigation data for this post
  const existing = (investigationsData as any[]).find((inv) => inv.postId === postId);

  if (existing) {
    const steps: InvestigationStep[] = existing.steps || [];
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      callbacks?.onStepStart?.(step.key, i);
      await new Promise((res) => setTimeout(res, 600));
      callbacks?.onStepComplete?.(step, i);
    }
    return existing as Investigation;
  }

  // Generate dynamic simulated investigation for user-submitted claims
  const steps: InvestigationStep[] = [
    {
      key: 'claim',
      label: 'Claim Extraction',
      description: 'Extracted core verifiable statements from input claim.',
      finding: `Isolated 1 verifiable assertion: "${claimText.slice(0, 100)}..."`,
      tone: 'neutral',
      sources: [{ name: 'Grammatical Entity Parser', url: '#' }],
    },
    {
      key: 'reverse-image',
      label: 'Reverse Media Search',
      description: 'Checked visual components against digital media archives.',
      finding: 'Visual elements show match patterns across social messaging channels since early 2026.',
      tone: 'neutral',
      sources: [{ name: 'Simulated Image Index', url: '#' }],
    },
    {
      key: 'metadata',
      label: 'Metadata & Compression Check',
      description: 'Analyzed EXIF headers, encoding timestamps, and platform compressions.',
      finding: 'No authentic cryptographic camera signatures detected. File indicates repeated re-encoding.',
      tone: 'inconclusive',
      sources: [{ name: 'Header Analysis Tool', url: '#' }],
    },
    {
      key: 'source-trace',
      label: 'Official Source Trace',
      description: 'Queried authoritative registries and official gazettes.',
      finding: 'No corresponding notifications, circulars, or press advisories found on official government or institutional portals.',
      tone: 'contradicts',
      sources: [{ name: 'National Press & Gazette Index', url: '#' }],
    },
    {
      key: 'fact-check',
      label: 'Fact-Check Database Match',
      description: 'Queried independent fact-checking records.',
      finding: 'Similar claims share rhetorical structures of previously debunked viral chains.',
      tone: 'contradicts',
      sources: [{ name: 'Independent Verification Archive', url: '#' }],
    },
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    callbacks?.onStepStart?.(step.key, i);
    await new Promise((res) => setTimeout(res, 600));
    callbacks?.onStepComplete?.(step, i);
  }

  const investigation: Investigation = {
    id: `inv-${Date.now()}`,
    postId,
    extractedClaims: [claimText],
    steps,
    status: 'potentially-misleading',
    summary: 'The claim relies on unverified chain-forwarded messaging without confirmation in official portals.',
    limitations: [
      'Simulated demonstration based on client-side analysis algorithms.',
      'Private messaging channels cannot be crawled directly.',
      'Local regional language nuances may require human context evaluation.',
    ],
    nextSteps: [
      'Request primary source documentation or original uncompressed media.',
      'Check local press releases and official departmental Twitter/X accounts.',
      'Avoid resharing until verified by certified independent fact-checkers.',
    ],
    timeline: [
      { date: new Date().toISOString(), label: 'Simulated automated investigation executed.' },
    ],
    sourceComparison: [
      {
        source: 'Official Institutional Registry',
        kind: 'official',
        date: 'Recent',
        says: 'No active notice or announcement matching this description.',
        matchesClaim: 'no',
      },
      {
        source: 'Viral Social Forward',
        kind: 'social',
        date: 'Recent',
        says: 'Anonymous urgent call to action without verifiable attribution.',
        matchesClaim: 'yes',
      },
    ],
    evidence: [
      {
        stance: 'contradicts',
        title: 'Absence of Official Press Release',
        summary: 'Searched primary portals and regulatory announcements; zero matching records found.',
        sourceName: 'Official Gazette Search',
        sourceKind: 'official',
        simulated: true,
      },
    ],
    factorDelta: {
      evidence: 25,
      source: 15,
      corroboration: 20,
      reproducibility: 30,
    },
  };

  return investigation;
}
