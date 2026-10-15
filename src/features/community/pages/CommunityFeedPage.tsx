import React, { useState } from 'react';
import { useCommunityStore } from '@/store/useCommunityStore';
import { usePrefsStore } from '@/store/usePrefsStore';
import { FeedFilters } from '../components/FeedFilters';
import { PostCard } from '../components/PostCard';
import { SubmitPostModal } from '../components/SubmitPostModal';
import { Button, EmptyState } from '@/design-system';
import { Plus, SearchX } from 'lucide-react';
import { calculateRelevance } from '../scoring/calculateRelevance';

export const CommunityFeedPage: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const isHi = language === 'hi';

  const posts = useCommunityStore((s) => s.posts);
  const evidenceByPostId = useCommunityStore((s) => s.evidenceByPostId);
  const searchQuery = useCommunityStore((s) => s.searchQuery);
  const typeFilter = useCommunityStore((s) => s.typeFilter);
  const statusFilter = useCommunityStore((s) => s.statusFilter);
  const langFilter = useCommunityStore((s) => s.langFilter);
  const platformFilter = useCommunityStore((s) => s.platformFilter);
  const sortBy = useCommunityStore((s) => s.sortBy);

  const setSearchQuery = useCommunityStore((s) => s.setSearchQuery);
  const setTypeFilter = useCommunityStore((s) => s.setTypeFilter);
  const setStatusFilter = useCommunityStore((s) => s.setStatusFilter);
  const setLangFilter = useCommunityStore((s) => s.setLangFilter);
  const setPlatformFilter = useCommunityStore((s) => s.setPlatformFilter);
  const setSortBy = useCommunityStore((s) => s.setSortBy);

  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  // Filter posts logic
  const filteredPosts = posts.filter((p) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.claim.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Type match
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;

    // Status match
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;

    // Language match
    if (langFilter !== 'all' && p.language !== langFilter) return false;

    // Platform match
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false;

    return true;
  });

  // Sort posts logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const scoreA = calculateRelevance(a.factors).score ?? -1;
    const scoreB = calculateRelevance(b.factors).score ?? -1;

    switch (sortBy) {
      case 'highest-relevance':
        return scoreB - scoreA;
      case 'lowest-relevance':
        return scoreA - scoreB;
      case 'evidence': {
        const evCountA = (evidenceByPostId[a.id] || []).length;
        const evCountB = (evidenceByPostId[b.id] || []).length;
        return evCountB - evCountA;
      }
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div className="container-page space-y-8">
      {/* Top Banner & Submit Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div>
          <span className="eyebrow block mb-1">
            {isHi ? 'सामुदायिक सत्यापन नेटवर्क' : 'Peer Verification Network'}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink">
            {isHi ? 'सामुदायिक दावे और OSINT फ़ीड' : 'Community Claims & OSINT Feed'}
          </h1>
          <p className="text-sm text-ink-2 mt-1 max-w-xl leading-relaxed">
            {isHi
              ? 'पारदर्शी, साक्ष्य-आधारित प्रासंगिकता अंकों के साथ वायरल समाचार, व्हाट्सएप फॉरवर्ड और संदिग्ध दावों की पड़ताल करें।'
              : 'Examine viral news, WhatsApp forwards, images, and suspicious claims with transparent, evidence-based relevance points.'}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={<Plus />}
          onClick={() => setSubmitModalOpen(true)}
          data-tour="check"
          className="shrink-0 w-full sm:w-auto shadow-lift hover:scale-[1.02] transition-transform"
        >
          {isHi ? 'दावा जांचें / सबमिट करें' : 'Check Something'}
        </Button>
      </div>

      {/* Filter and Search Bar with Sorting */}
      <FeedFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        langFilter={langFilter}
        onLangChange={setLangFilter}
        platformFilter={platformFilter}
        onPlatformChange={setPlatformFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={sortedPosts.length}
      />

      {/* Post Grid */}
      {sortedPosts.length === 0 ? (
        <EmptyState
          icon={<SearchX />}
          title={isHi ? "आपके फ़िल्टर से कोई दावा मेल नहीं खाता" : "No claims match your current filters"}
          description={
            isHi
              ? "सभी सामुदायिक सबमिशन देखने के लिए अपनी खोज शर्तों को साफ़ करने या अपने फ़िल्टर बदलने का प्रयास करें।"
              : "Try clearing your search terms or expanding your filter criteria to see all community submissions."
          }
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setStatusFilter('all');
                setLangFilter('all');
                setPlatformFilter('all');
                setSortBy('newest');
              }}
            >
              {isHi ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Submit Claim Modal */}
      <SubmitPostModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
      />
    </div>
  );
};

export default CommunityFeedPage;
