import React, { useState } from 'react';
import type { Post, PostType, Platform } from '@/types';
import { Modal, Stepper, Button, toast } from '@/design-system';
import { useCommunityStore } from '@/store/useCommunityStore';
import { Check, ArrowRight, ArrowLeft, Upload, FileText, CornerDownRight, Image as ImageIcon, Video } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (postId: string) => void;
}

export const SubmitPostModal: React.FC<Props> = ({ open, onOpenChange, onSuccess }) => {
  const addPost = useCommunityStore((s) => s.addPost);
  const [step, setStep] = useState(0);

  // Form State
  const [type, setType] = useState<PostType>('forward');
  const [platform, setPlatform] = useState<Platform>('whatsapp');
  const [title, setTitle] = useState('');
  const [claim, setClaim] = useState('');
  const [content, setContent] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const steps = ['Format & Platform', 'Claim & Evidence', 'Review & Submit'];

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      if (!title.trim() || !claim.trim()) {
        toast.error('Required fields missing', 'Please provide a clear title and the central claim to check.');
        return;
      }
      setStep(2);
    } else {
      // Submit
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
        .filter(Boolean);

      const newPost = addPost({
        title,
        claim,
        content: content || claim,
        type,
        platform,
        language: 'en',
        contributorId: 'contrib-001',
        sourceUrl: sourceUrl || undefined,
        tags: tags.length > 0 ? tags : ['unverified-claim'],
        status: 'needs-more-evidence',
        factors: null, // "Not enough evidence yet" until community investigates
        media: type === 'image' ? '/media/delhi-metro-fake.svg' : undefined,
      });

      toast.success('Claim submitted to community', 'Your claim is now listed for open verification.');
      onOpenChange(false);
      setStep(0);
      setTitle('');
      setClaim('');
      setContent('');
      onSuccess?.(newPost.id);
    }
  };

  const platforms: { value: Platform; label: string }[] = [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'sms', label: 'SMS' },
    { value: 'x', label: 'Twitter / X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'website', label: 'Website' },
  ];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Check Something Suspicious"
      description="Submit a viral message, claim, or link for community OSINT verification."
      size="lg"
    >
      <div className="space-y-6">
        <Stepper steps={steps} current={step} />

        {/* Step 1: Format & Platform */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="label">What kind of content are you checking?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'forward', label: 'Viral Forward', icon: <CornerDownRight /> },
                  { value: 'image', label: 'Suspicious Image', icon: <ImageIcon /> },
                  { value: 'video', label: 'Video / Clip', icon: <Video /> },
                  { value: 'text', label: 'Text / News', icon: <FileText /> },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setType(item.value as PostType)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all min-h-[90px] ${
                      type === item.value
                        ? 'border-accent bg-accent/15 text-accent-ink shadow-glow'
                        : 'border-line bg-surface/50 text-ink-2 hover:border-accent/40'
                    }`}
                  >
                    <span className="[&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Where did you see or receive it?</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPlatform(p.value)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      platform === p.value
                        ? 'border-accent bg-accent/20 text-accent-ink shadow-sm'
                        : 'border-line bg-surface/40 text-ink-2 hover:border-accent/40'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Claim & Evidence */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label htmlFor="post-title" className="label">Short Headline *</label>
              <input
                id="post-title"
                type="text"
                placeholder="e.g. WhatsApp forward claims RBI is recalling all ₹500 notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field"
                required
              />
            </div>

            <div>
              <label htmlFor="post-claim" className="label">The Specific Claim being made *</label>
              <textarea
                id="post-claim"
                rows={2}
                placeholder="State the core assertion in 1-2 factual sentences."
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="field min-h-[72px] resize-none"
                required
              />
            </div>

            <div>
              <label htmlFor="post-content" className="label">Full Message / Text as received</label>
              <textarea
                id="post-content"
                rows={3}
                placeholder="Paste the raw WhatsApp text or post caption here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="field min-h-[96px] resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="post-source" className="label">Source Link (Optional)</label>
                <input
                  id="post-source"
                  type="url"
                  placeholder="https://..."
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="post-tags" className="label">Tags (comma-separated)</label>
                <input
                  id="post-tags"
                  type="text"
                  placeholder="banking, currency, scam"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Transparency notice */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl border border-line bg-surface/50 space-y-2">
              <span className="eyebrow block">Submission Preview</span>
              <h4 className="font-heading text-lg font-bold text-ink">{title}</h4>
              <p className="text-sm text-ink-2 italic">"{claim}"</p>
              <div className="flex gap-2 text-xs text-ink-3 pt-2">
                <span className="capitalize">{platform}</span> • <span>{type}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 text-sm text-ink-2 space-y-2">
              <p className="font-semibold text-accent-ink">⚖️ Transparency Notice</p>
              <p>
                Submitting a claim marks it as <strong>Needs More Evidence</strong>. Relevance points will start at neutral.
                Only verified, corroborated primary sources added by community researchers can increase or decrease the score.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-line">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)} icon={<ArrowLeft />}>
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            onClick={handleNext}
            iconRight={step === 2 ? <Check /> : <ArrowRight />}
          >
            {step === 2 ? 'Submit for Verification' : 'Continue'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
