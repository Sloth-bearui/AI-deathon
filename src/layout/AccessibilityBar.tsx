import React from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, Sun, Moon, Volume2, Wind, Globe } from 'lucide-react';
import { usePrefsStore } from '@/store/usePrefsStore';
import { Button } from '@/design-system';
import { cn } from '@/utils/cn';

interface AccessibilityBarProps {
  onClose?: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, textScale, calmMode, language, toggleTheme, increaseTextScale, decreaseTextScale, toggleCalmMode, setLanguage, resetAll } = usePrefsStore();

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const main = document.querySelector('main');
      if (main) {
        const text = main.textContent || '';
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 3000));
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="glass border-b border-[var(--glass-border)] px-4 lg:px-6 py-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Text size */}
        <div className="flex items-center gap-1">
          <button
            onClick={decreaseTextScale}
            className="touch-target rounded-button hover:bg-[var(--color-hover)] transition-colors"
            aria-label={t('accessibility.text_smaller')}
            disabled={textScale <= 0.85}
          >
            <Minus size={18} />
          </button>
          <span className="text-sm font-medium min-w-[2.5rem] text-center" aria-live="polite">
            {Math.round(textScale * 100)}%
          </span>
          <button
            onClick={increaseTextScale}
            className="touch-target rounded-button hover:bg-[var(--color-hover)] transition-colors"
            aria-label={t('accessibility.text_larger')}
            disabled={textScale >= 1.5}
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="touch-target rounded-button hover:bg-[var(--color-hover)] transition-colors flex items-center gap-2 px-2"
          aria-label={t('accessibility.theme')}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm hidden sm:inline">{t('accessibility.theme')}</span>
        </button>

        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* Calm mode */}
        <button
          onClick={toggleCalmMode}
          className={cn(
            'touch-target rounded-button transition-colors flex items-center gap-2 px-2',
            calmMode ? 'bg-accent/15 text-accent' : 'hover:bg-[var(--color-hover)]'
          )}
          aria-label={t('accessibility.calm_mode')}
          aria-pressed={calmMode}
        >
          <Wind size={18} />
          <span className="text-sm hidden sm:inline">{t('accessibility.calm_mode')}</span>
        </button>

        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* Read aloud */}
        <button
          onClick={handleReadAloud}
          className="touch-target rounded-button hover:bg-[var(--color-hover)] transition-colors flex items-center gap-2 px-2"
          aria-label={t('accessibility.read_aloud')}
        >
          <Volume2 size={18} />
          <span className="text-sm hidden sm:inline">{t('accessibility.read_aloud')}</span>
        </button>

        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* Language */}
        <button
          onClick={handleLanguageToggle}
          className="touch-target rounded-button hover:bg-[var(--color-hover)] transition-colors flex items-center gap-2 px-2"
          aria-label={t('accessibility.language')}
        >
          <Globe size={18} />
          <span className="text-sm font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>

        <div className="flex-1" />

        {/* Reset */}
        <Button variant="ghost" size="sm" onClick={() => { resetAll(); i18n.changeLanguage('en'); }}>
          {t('common.reset')}
        </Button>
      </div>
    </div>
  );
};
