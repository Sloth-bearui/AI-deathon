import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Contributor, Contribution } from '@/types';
import { mockApi } from '@/services/mockApi';
import { ContributorSummary } from '../components/ContributorSummary';
import { ReliabilityPanel } from '../components/ReliabilityPanel';
import { ContributionHistory } from '../components/ContributionHistory';
import { Button, EmptyState, SkeletonList } from '@/design-system';
import { ArrowLeft, UserX } from 'lucide-react';

export const ContributorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contributor, setContributor] = useState<Contributor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const data = await mockApi.getContributorById(id);
      setContributor(data || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="container-page py-10">
        <SkeletonList count={2} />
      </div>
    );
  }

  if (!contributor) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={<UserX />}
          title="Contributor Profile Not Found"
          description="We could not find the requested contributor in the verified directory."
          action={<Button to="/community" icon={<ArrowLeft />}>Back to Community</Button>}
        />
      </div>
    );
  }

  const sampleContributions: Contribution[] = [
    {
      id: 'c-1',
      contributorId: contributor.id,
      postId: 'post-001',
      kind: 'evidence',
      summary: 'Added primary RBI press release archive verification link for ₹500 currency recall claim.',
      date: '2026-10-14T09:10:00Z',
    },
    {
      id: 'c-2',
      contributorId: contributor.id,
      postId: 'post-002',
      kind: 'evidence',
      summary: 'Cross-checked official Delhi Metro Rail Corporation network map.',
      date: '2026-10-13T16:00:00Z',
    },
    {
      id: 'c-3',
      contributorId: contributor.id,
      postId: 'post-004',
      kind: 'submitted',
      summary: 'Submitted viral free laptop forward for public scrutiny.',
      date: '2026-10-11T16:45:00Z',
    },
  ];

  return (
    <div className="container-page space-y-8">
      <div>
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-3 hover:text-accent-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Community</span>
        </Link>
      </div>

      {/* 1. Contributor Bio & Summary */}
      <ContributorSummary contributor={contributor} />

      {/* 2. Reliability Panel (with explicit note) */}
      <ReliabilityPanel contributor={contributor} />

      {/* 3. Contribution History */}
      <ContributionHistory contributions={sampleContributions} />
    </div>
  );
};

export default ContributorProfilePage;
