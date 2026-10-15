import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Link2, Type, Image, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, Button, GlassPanel, Tabs } from '@/design-system';
import { useCommunityStore } from '@/store/useCommunityStore';
import { cn } from '@/utils/cn';

type SubmitType = 'text' | 'url' | 'image';

export const SubmitClaim: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addPost } = useCommunityStore();

  const [submitType, setSubmitType] = useState<SubmitType>('text');
  const [title, setTitle] = useState('');
  const [claim, setClaim] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [category, setCategory] = useState('social');
  const [tags, setTags] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['health', 'politics', 'finance', 'technology', 'social', 'scam'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    addPost({
      title: title || claim.slice(0, 60) + '...',
      claim,
      category,
      sourceUrl: submitType === 'url' ? sourceUrl : undefined,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      mediaType: submitType === 'image' ? 'image' : submitType === 'url' ? 'link' : 'text',
    });

    setSubmitted(true);
    setTimeout(() => navigate('/community'), 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <Card className="p-8 text-center max-w-md">
          <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="font-heading text-xl font-bold mb-2">Claim Submitted!</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Your claim has been submitted for community review. You'll be redirected shortly.
          </p>
          <Button variant="ghost" onClick={() => navigate('/community')}>
            Back to Feed
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/community')}>
        <ArrowLeft size={16} /> {t('common.back')}
      </Button>

      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">{t('community.submit_claim')}</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Share a claim, forward, or suspicious link for the community to investigate.
        </p>
      </div>

      {/* Submission type tabs */}
      <Tabs
        tabs={[
          { value: 'text', label: 'Text / Forward', icon: <Type size={16} /> },
          { value: 'url', label: 'URL / Link', icon: <Link2 size={16} /> },
          { value: 'image', label: 'Image / File', icon: <Image size={16} /> },
        ]}
        value={submitType}
        onChange={(v) => setSubmitType(v as SubmitType)}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title (optional) */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Title <span className="text-[var(--color-text-muted)]">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title for the claim..."
            className="w-full px-4 py-2.5 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 min-h-[44px]"
          />
        </div>

        {/* Claim text */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Claim / Message <span className="text-red-400">*</span>
          </label>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder={submitType === 'text'
              ? 'Paste the WhatsApp forward or type the claim here...'
              : submitType === 'url'
              ? 'What does this link claim?'
              : 'Describe what the image shows...'
            }
            rows={5}
            required
            className="w-full px-4 py-3 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 resize-y"
          />
        </div>

        {/* URL input */}
        {submitType === 'url' && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Source URL</label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 min-h-[44px]"
            />
          </div>
        )}

        {/* Image upload */}
        {submitType === 'image' && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Upload Image</label>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-card p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-[var(--color-text-muted)] mb-2" />
              <p className="text-sm text-[var(--color-text-secondary)]">Click or drag to upload</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">PNG, JPG, or GIF up to 10MB</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-2 rounded-button text-sm transition-colors min-h-[40px]',
                  category === cat
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border)]'
                )}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Tags <span className="text-[var(--color-text-muted)]">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="whatsapp, forward, upi, banking..."
            className="w-full px-4 py-2.5 rounded-button bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 min-h-[44px]"
          />
        </div>

        {/* Info banner */}
        <GlassPanel className="p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
          <div className="text-sm text-[var(--color-text-secondary)]">
            <p className="font-medium text-[var(--color-text)] mb-1">What happens next?</p>
            <p>Community members will review your submission, verify sources, and provide a verdict. You'll be notified when the investigation is complete.</p>
          </div>
        </GlassPanel>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" size="lg" className="flex-1 sm:flex-none" disabled={!claim.trim()}>
            Submit for Review
          </Button>
          <Button variant="ghost" onClick={() => navigate('/community')}>
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
