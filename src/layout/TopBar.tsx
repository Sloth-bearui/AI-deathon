import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Menu } from 'lucide-react';
import { AccessibilityBar } from './AccessibilityBar';
import { cn } from '@/utils/cn';

export const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const [showAccessibility, setShowAccessibility] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 glass border-b border-[var(--glass-border)]">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z" stroke="#2DD4BF" strokeWidth="2.5" fill="none" opacity="0.9"/>
                <circle cx="30" cy="28" r="12" stroke="#2DD4BF" strokeWidth="2.5" fill="none"/>
                <line x1="39" y1="37" x2="48" y2="46" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round"/>
                <polyline points="24,28 28,33 36,23" stroke="#34D399" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-sm">{t('app_name')}</span>
          </div>

          {/* Desktop: show page title area or spacer */}
          <div className="hidden lg:block" />

          {/* Accessibility toggle */}
          <button
            onClick={() => setShowAccessibility(!showAccessibility)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-button text-sm transition-colors min-h-[44px]',
              showAccessibility
                ? 'bg-accent/15 text-accent'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]'
            )}
            aria-label={t('nav.settings')}
            aria-expanded={showAccessibility}
          >
            <Settings size={20} />
            <span className="hidden sm:inline">{t('nav.settings')}</span>
          </button>
        </div>
      </header>

      {/* Accessibility panel */}
      {showAccessibility && (
        <div className="animate-slide-down">
          <AccessibilityBar onClose={() => setShowAccessibility(false)} />
        </div>
      )}
    </>
  );
};
