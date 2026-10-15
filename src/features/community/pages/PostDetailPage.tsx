import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCommunityStore } from '@/store/useCommunityStore';
import { ClaimHeader } from '../components/ClaimHeader';
import { MediaViewer } from '../components/MediaViewer';
import { RelevanceBreakdownPanel } from '../scoring/RelevanceBreakdownPanel';
import { RunInvestigationButton } from '../components/RunInvestigationButton';
import { InvestigationTimeline } from '../components/InvestigationTimeline';
import { EvidenceReportList } from '../components/EvidenceReportList';
import { SourceComparisonTable } from '../components/SourceComparisonTable';
import { CommunityDiscussion } from '../components/CommunityDiscussion';
import { Button, EmptyState, SkeletonList, toast } from '@/design-system';
import { runSimulatedInvestigation, DEFAULT_INVESTIGATION_STEPS } from '@/services/investigationEngine';
import type { Investigation, InvestigationStep } from '@/types';
import { ArrowLeft, User, ShieldAlert } from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const posts = useCommunityStore((s) => s.posts);
  const evidenceMap = useCommunityStore((s) => s.evidenceByPostId);
  const commentsMap = useCommunityStore((s) => s.commentsByPostId);
  const applyFindings = useCommunityStore((s) => s.applyInvestigationFindings);

  const post = posts.find((p) => p.id === id);
  const evidenceList = (id && evidenceMap[id]) || [];
  const commentsList = (id && commentsMap[id]) || [];

  // Investigation simulation state
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigationData, setInvestigationData] = useState<Investigation | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<InvestigationStep[]>(
    DEFAULT_INVESTIGATION_STEPS.map((s) => ({ ...s, finding: '', tone: 'neutral' }))
  );

  const handleRunInvestigation = async () => {
    if (!post || isInvestigating) return;

    setIsInvestigating(true);
    setCurrentStepIndex(0);

    try {
      const inv = await runSimulatedInvestigation(post.id, post.claim, {
        onStepStart: (key, idx) => {
          setCurrentStepIndex(idx);
        },
        onStepComplete: (step, idx) => {
          setSteps((prev) => {
            const next = [...prev];
            next[idx] = step;
            return next;
          });
        },
      });

      setInvestigationData(inv);
      setCurrentStepIndex(inv.steps.length);

      // Apply findings into community store rules (updating post score & creating simulated evidence)
      if (inv.factorDelta && inv.evidence) {
        applyFindings(post.id, inv.factorDelta, inv.evidence);
        toast.success('Investigation completed', 'Findings and source matches have updated the post relevance.');
      }
    } catch (err) {
      toast.error('Investigation failed', 'Could not complete the simulated scan.');
    } finally {
      setIsInvestigating(false);
    }
  };

  if (!post) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={<ShieldAlert />}
          title="Claim report not found"
          description="The requested post could not be located in the local community archive."
          action={<Button to="/community" icon={<ArrowLeft />}>Back to Community Feed</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-page space-y-8">
      {/* Back button link */}
      <div>
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-3 hover:text-accent-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Community Feed</span>
        </Link>
      </div>

      {/* 1. Claim Header */}
      <ClaimHeader post={post} />

      {/* 2. Media / Transcript Viewer */}
      <MediaViewer post={post} />

      {/* 3. Relevance Breakdown Panel (Score 0-100, 4 weighted factor bars, audit history) */}
      <RelevanceBreakdownPanel
        factors={post.factors}
        history={post.scoreHistory}
      />

      {/* 4. Simulated Investigation Trigger & Timeline */}
      <div className="space-y-4">
        <RunInvestigationButton
          isRunning={isInvestigating}
          isCompleted={Boolean(investigationData)}
          onRun={handleRunInvestigation}
        />

        <InvestigationTimeline
          steps={investigationData ? investigationData.steps : steps}
          currentStepIndex={currentStepIndex}
          isRunning={isInvestigating}
        />
      </div>

      {/* 5. Verified Evidence Report List */}
      <EvidenceReportList
        postId={post.id}
        items={evidenceList}
      />

      {/* 6. Source Comparison Table */}
      {investigationData?.sourceComparison && (
        <SourceComparisonTable rows={investigationData.sourceComparison} />
      )}

      {/* 7. Community Peer Discussion & Corrections */}
      <CommunityDiscussion
        postId={post.id}
        comments={commentsList}
        evidenceList={evidenceList}
      />

      {/* Contributor credit card */}
      <div className="p-4 rounded-xl border border-line bg-surface/30 flex items-center justify-between text-xs text-ink-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-accent-ink" />
          <span>Need to check author history?</span>
        </div>
        <Link
          to={`/community/contributor/${post.contributorId}`}
          className="font-semibold text-accent-ink hover:underline"
        >
          View Contributor Profile →
        </Link>
      </div>
    </div>
  );
};

export default PostDetailPage;
