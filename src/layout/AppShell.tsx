import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { SkeletonList, ToastViewport } from '@/design-system';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedBackground } from './AnimatedBackground';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { HelpFab } from './HelpFab';
import { WelcomeModal } from './WelcomeModal';
import { SettingsSheet } from './SettingsSheet';
import { ShelbyAdditionalNavbar } from './ShelbyAdditionalNavbar';

export const AppShell: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const outlet = useOutlet();
  const reduce = useReducedMotion();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Move focus to main content on route change so screen-reader users hear the new page.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const main = document.getElementById('main-content');
    if (main && document.activeElement && document.activeElement !== document.body) main.focus({ preventScroll: true });
    window.speechSynthesis?.cancel();
  }, [location.pathname]);

  return (
    <div className="relative min-h-dvh">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[200] -translate-y-24 rounded-xl bg-accent px-5 py-3 font-heading font-bold text-accent-on transition-transform focus:translate-y-0"
      >
        {t('nav.skip')}
      </a>
      <AnimatedBackground />
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
      <div className="lg:pl-[280px]">
        <TopBar onOpenSettings={() => setSettingsOpen(true)} />
        <main id="main-content" tabIndex={-1} className="pb-40 pt-4 focus:outline-none lg:pb-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Suspense fallback={<div className="container-page py-8"><SkeletonList count={3} /></div>}>{outlet}</Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav />
      <ShelbyAdditionalNavbar />
      <HelpFab />
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
      <WelcomeModal />
      <ToastViewport />
    </div>
  );
};
