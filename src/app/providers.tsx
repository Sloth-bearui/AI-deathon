import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { TooltipProvider } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';

/** Mirrors preferences onto <html> (theme class, text scale, calm mode, lang). */
const PrefsEffect: React.FC = () => {
  const { theme, textScale, calmMode, language } = usePrefsStore();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('calm', calmMode);
    root.style.setProperty('--text-scale', String(textScale));
    root.lang = language === 'hi' ? 'hi' : 'en';
    if (i18n.language !== language) void i18n.changeLanguage(language);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B1220' : '#F7F9FC');
  }, [theme, textScale, calmMode, language]);
  return null;
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const calm = usePrefsStore((s) => s.calmMode);
  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion={calm ? 'always' : 'user'}>
        <TooltipProvider delayDuration={250}>
          <PrefsEffect />
          {children}
        </TooltipProvider>
      </MotionConfig>
    </I18nextProvider>
  );
};
