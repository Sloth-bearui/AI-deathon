import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Type, Settings } from 'lucide-react';
import { Modal } from '@/design-system';
import { AccessibilityBar } from './AccessibilityBar';
import { Logo } from './Sidebar';

/** Sticky top bar. Desktop: inline accessibility toolbar. Mobile: logo + "Display" sheet + settings. */
export const TopBar: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 lg:px-6">
      <div className="glass flex items-center justify-between gap-3 rounded-[22px] px-3 py-2 lg:justify-end lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-0">
        <Link to="/" className="rounded-xl px-1 lg:hidden" aria-label={`${t('app.name')} — ${t('nav.home')}`}>
          <Logo compact />
        </Link>

        <div className="hidden lg:block">
          <AccessibilityBar />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            data-tour="a11y"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-3 font-heading font-semibold text-ink hover:bg-hover"
          >
            <Type className="h-5 w-5" aria-hidden /> {t('a11y.display')}
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label={t('nav.settings')}
            className="grid min-h-[48px] min-w-[48px] place-items-center rounded-xl text-ink-2 hover:bg-hover hover:text-ink"
          >
            <Settings className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen} title={t('a11y.display')} variant="sheet" size="sm">
        <AccessibilityBar layout="stack" />
      </Modal>
    </header>
  );
};
