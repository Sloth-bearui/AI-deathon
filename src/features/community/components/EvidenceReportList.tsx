import React, { useState } from 'react';
import type { EvidenceItem, EvidenceStance, SourceKind } from '@/types';
import { EvidenceCard } from './EvidenceCard';
import { GlassPanel, Button, Modal, Tag, toast } from '@/design-system';
import { useCommunityStore } from '@/store/useCommunityStore';
import { ShieldCheck, Plus, Filter } from 'lucide-react';

interface Props {
  postId: string;
  items: EvidenceItem[];
}

export const EvidenceReportList: React.FC<Props> = ({ postId, items }) => {
  const addEvidence = useCommunityStore((s) => s.addEvidence);
  const [filter, setFilter] = useState<EvidenceStance | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // Add Evidence Form
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stance, setStance] = useState<EvidenceStance>('contradicts');
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceKind, setSourceKind] = useState<SourceKind>('official');

  const filteredItems = filter === 'all' ? items : items.filter((i) => i.stance === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !sourceName.trim()) {
      toast.error('Required fields missing', 'Please provide a title, findings summary, and source attribution.');
      return;
    }

    addEvidence(postId, {
      title,
      summary,
      stance,
      sourceName,
      sourceUrl: sourceUrl || undefined,
      sourceKind,
      contributorId: 'contrib-001',
    });

    toast.success('Evidence submitted', 'Your verifiable source was added to the public record.');
    setModalOpen(false);
    setTitle('');
    setSummary('');
    setSourceName('');
    setSourceUrl('');
  };

  return (
    <GlassPanel
      title={`Verified Evidence Reports (${items.length})`}
      subtitle="Documented primary records, gazettes, fact-checks and context links."
      icon={<ShieldCheck />}
      actions={
        <Button
          size="sm"
          variant="secondary"
          icon={<Plus />}
          onClick={() => setModalOpen(true)}
        >
          Add Evidence
        </Button>
      }
    >
      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
        <span className="uppercase font-semibold text-ink-3 mr-1 flex items-center gap-1">
          <Filter className="h-3 w-3" /> Stance:
        </span>
        <Tag active={filter === 'all'} onClick={() => setFilter('all')}>All ({items.length})</Tag>
        <Tag active={filter === 'contradicts'} onClick={() => setFilter('contradicts')}>
          Contradicting ({items.filter((i) => i.stance === 'contradicts').length})
        </Tag>
        <Tag active={filter === 'supports'} onClick={() => setFilter('supports')}>
          Supporting ({items.filter((i) => i.stance === 'supports').length})
        </Tag>
        <Tag active={filter === 'context'} onClick={() => setFilter('context')}>
          Contextual ({items.filter((i) => i.stance === 'context').length})
        </Tag>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-line bg-surface/30 text-ink-2 text-sm">
          No evidence records found under this filter. Tap "Add Evidence" to contribute a source.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <EvidenceCard key={item.id} evidence={item} />
          ))}
        </div>
      )}

      {/* Add Evidence Modal */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Contribute Verifiable Evidence"
        description="Submit primary sources, archives, or official refutations. Unverified assertions are rejected."
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Stance towards the central claim *</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'contradicts', label: 'Contradicts' },
                { value: 'supports', label: 'Supports' },
                { value: 'context', label: 'Adds Context' },
              ].map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStance(s.value as EvidenceStance)}
                  className={`p-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    stance === s.value
                      ? 'border-accent bg-accent/20 text-accent-ink shadow-sm'
                      : 'border-line bg-surface/50 text-ink-2 hover:border-accent/40'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ev-title" className="label">Evidence Headline *</label>
            <input
              id="ev-title"
              type="text"
              placeholder="e.g. Official RBI Press Notification No. 182/2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
              required
            />
          </div>

          <div>
            <label htmlFor="ev-summary" className="label">Factual Summary of Finding *</label>
            <textarea
              id="ev-summary"
              rows={3}
              placeholder="What specifically did the document or archive reveal?"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="field min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="ev-source" className="label">Source Name *</label>
              <input
                id="ev-source"
                type="text"
                placeholder="e.g. Press Information Bureau"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="field"
                required
              />
            </div>

            <div>
              <label htmlFor="ev-kind" className="label">Source Type</label>
              <select
                id="ev-kind"
                value={sourceKind}
                onChange={(e) => setSourceKind(e.target.value as SourceKind)}
                className="field"
              >
                <option value="official">Official Government / Institutional</option>
                <option value="fact-checker">Certified Fact-Checker</option>
                <option value="established-media">Established Mainstream Press</option>
                <option value="archive">Archival Repository</option>
                <option value="eyewitness">Direct Eyewitness</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="ev-url" className="label">Direct Link (URL)</label>
            <input
              id="ev-url"
              type="url"
              placeholder="https://..."
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="field"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-line">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Evidence</Button>
          </div>
        </form>
      </Modal>
    </GlassPanel>
  );
};
