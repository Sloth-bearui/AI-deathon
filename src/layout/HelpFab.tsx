import React, { useState } from 'react';
import { HelpCircle, X, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const pageHelp: Record<string, { title: string; steps: string[] }> = {
  '/': {
    title: 'Welcome to Reality Check',
    steps: [
      'Pick one of the three actions to get started.',
      'Each card takes you to a different section of the platform.',
      'You can change text size, theme, and language from the settings bar above.',
    ],
  },
  '/community': {
    title: 'Community Feed',
    steps: [
      'Browse claims submitted by the community.',
      'Use filters to narrow down by type or status.',
      'Click "Check something" to submit a new claim.',
      'Click any post to see its investigation and evidence.',
    ],
  },
  '/academy': {
    title: 'Reality Check Academy',
    steps: [
      'Choose a learning module that interests you.',
      'Each module has interactive steps and a checklist.',
      'Take your time — there is no rush or scoring.',
    ],
  },
  '/practice': {
    title: 'Phone Practice',
    steps: [
      'Pick a scenario to practice handling scam situations.',
      'The phone simulator is safe — nothing real happens.',
      'Make choices and see what happens. You can always try again.',
    ],
  },
};

export const HelpFab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const help = pageHelp[basePath] || pageHelp['/'];

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 lg:bottom-6 right-4 z-40',
          'w-14 h-14 rounded-full',
          'bg-gradient-to-r from-accent to-accent-light text-base-DEFAULT',
          'shadow-lg shadow-accent/20',
          'flex items-center justify-center',
          'hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5',
          'transition-all duration-200',
          'focus-visible:ring-2 focus-visible:ring-accent/50'
        )}
        aria-label="Help me"
      >
        <HelpCircle size={24} />
      </button>

      {/* Help Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 lg:right-4 lg:bottom-4 lg:left-auto lg:w-96 z-50 glass rounded-t-glass lg:rounded-glass p-6 max-h-[80vh] overflow-y-auto"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-lg">{help?.title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-hover)]"
                  aria-label="Close help"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {help?.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-[var(--color-text-secondary)]">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
