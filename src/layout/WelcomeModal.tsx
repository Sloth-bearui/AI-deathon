import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefsStore } from '@/store/usePrefsStore';
import { Button } from '@/design-system';

const SCALES = [0.85, 1, 1.15, 1.3, 1.5];
const SCALE_LABELS = ['Small', 'Default', 'Large', 'Larger', 'Largest'];

export const WelcomeModal: React.FC = () => {
  const { welcomeCompleted, completeWelcome, setTextScale } = usePrefsStore();
  const [selectedScale, setSelectedScale] = useState(1);

  if (welcomeCompleted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="glass rounded-glass p-8 max-w-md w-full text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 20 }}
        >
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-6">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z" stroke="#2DD4BF" strokeWidth="2.5" fill="none" opacity="0.9"/>
              <circle cx="30" cy="28" r="12" stroke="#2DD4BF" strokeWidth="2.5" fill="none"/>
              <line x1="39" y1="37" x2="48" y2="46" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round"/>
              <polyline points="24,28 28,33 36,23" stroke="#34D399" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="font-heading text-2xl font-bold mb-2">Welcome to Reality Check</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Pick a text size that feels comfortable. You can always change this later.
          </p>

          {/* Text size selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SCALES.map((scale, i) => (
              <button
                key={scale}
                onClick={() => {
                  setSelectedScale(scale);
                  setTextScale(scale);
                }}
                className={`px-4 py-3 rounded-card transition-all duration-200 min-h-[56px] ${
                  selectedScale === scale
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-transparent hover:border-[var(--color-border)]'
                }`}
                style={{ fontSize: `${scale}rem` }}
              >
                {SCALE_LABELS[i]}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="glass rounded-card p-4 mb-8 text-left">
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Preview:</p>
            <p>This is how text will look at your chosen size.</p>
          </div>

          <Button size="lg" className="w-full" onClick={completeWelcome}>
            Get started
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
