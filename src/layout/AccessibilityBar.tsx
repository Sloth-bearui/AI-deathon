import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Switch from '@radix-ui/react-switch';
import { Minus, Plus, Moon, Sun, Wind, Volume2, Square, Languages } from 'lucide-react';
import { usePrefsStore } from '@/store/usePrefsStore';
import { useTextScale } from '@/hooks/useTextScale';
import { useReadAloud } from '@/hooks/useReadAloud';
import { toast } from '@/design-system';
import { cn } from '@/utils/cn';

const iconBtn =
  'inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-xl px-3 font-heading font-semibold text-ink-2 transition-colors hover:bg-hover hover:text-ink disabled:opacity-40';

/** Calm-mode switch reused in Settings. */
export const CalmSwitch: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  const calm = usePrefsStore((s) => s.calmMode);
  const setCalm = usePrefsStore((s) => s.setCalmMode);
  return (
    <div className="flex items-center gap-3">
      <Switch.Root
        id={id}
        checked={calm}
        onCheckedChange={setCalm}
        className="relative h-8 w-14 shrink-0 rounded-full border border-line bg-surface transition-colors data-[state=checked]:bg-accent"
      >
        <Switch.Thumb className="block h-6 w-6 translate-x-1 rounded-full bg-ink shadow transition-transform data-[state=checked]:translate-x-7 data-[state=checked]:bg-accent-on" />
      </Switch.Root>
      <label htmlFor={id} className="cursor-pointer">
        <span className="flex items-center gap-2 font-heading font-semibold text-ink"><Wind className="h-5 w-5" aria-hidden />{t('a11y.calm')}</span>
        <span className="block text-sm text-ink-3">{t('a11y.calmHint')}</span>
      </label>
    </div>
  );
};

/** Always-reachable accessibility controls. `layout="inline"` for the desktop top bar, `"stack"` for the mobile sheet. */
export const AccessibilityBar: React.FC<{ layout?: 'inline' | 'stack' }> = ({ layout = 'inline' }) => {
  const { t, i18n } = useTranslation();
  const theme = usePrefsStore((s) => s.theme);
  const toggleTheme = usePrefsStore((s) => s.toggleTheme);
  const lang = usePrefsStore((s) => s.language);
  const setLang = usePrefsStore((s) => s.setLanguage);
  const calm = usePrefsStore((s) => s.calmMode);
  const setCalm = usePrefsStore((s) => s.setCalmMode);
  const ts = useTextScale();
  const reader = useReadAloud();

  const switchLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    void i18n.changeLanguage(next);
  };
  const read = () => {
    if (!reader.supported) {
      toast.error('Read aloud is not available', 'Your browser does not support speech. Try Chrome or Edge.');
      return;
    }
    reader.toggle();
  };

  if (layout === 'stack') {
    return (
      <div className="space-y-5">
        <div>
          <p className="label">{t('a11y.textSize')}: {ts.percent}%</p>
          <div className="flex items-center gap-3">
            <button className={cn(iconBtn, 'glass flex-1')} onClick={ts.decrease} disabled={!ts.canDecrease} aria-label={t('a11y.textSmaller')}>
              <Minus className="h-5 w-5" aria-hidden /> A
            </button>
            <button className={cn(iconBtn, 'glass flex-1 text-lg')} onClick={ts.increase} disabled={!ts.canIncrease} aria-label={t('a11y.textLarger')}>
              <Plus className="h-5 w-5" aria-hidden /> A
            </button>
          </div>
        </div>
        <button className={cn(iconBtn, 'glass w-full justify-start px-4')} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          {theme === 'dark' ? t('a11y.themeLight') : t('a11y.themeDark')}
        </button>
        <CalmSwitch id="calm-switch-sheet" />
        <button className={cn(iconBtn, 'glass w-full justify-start px-4')} onClick={read} aria-pressed={reader.speaking}>
          {reader.speaking ? <Square className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
          {reader.speaking ? t('a11y.stopReading') : t('a11y.readAloud')}
        </button>
        <button className={cn(iconBtn, 'glass w-full justify-start px-4')} onClick={switchLang} aria-label={t('a11y.languageLabel')} lang={lang === 'en' ? 'hi' : 'en'}>
          <Languages className="h-5 w-5" aria-hidden /> {t('a11y.language')}
        </button>
      </div>
    );
  }

  return (
    <div role="toolbar" aria-label={t('a11y.display')} data-tour="a11y" className="glass flex items-center gap-0.5 rounded-2xl p-1">
      <button className={iconBtn} onClick={ts.decrease} disabled={!ts.canDecrease} aria-label={`${t('a11y.textSmaller')} (${ts.percent}%)`}>
        <span className="text-sm" aria-hidden>A−</span>
      </button>
      <button className={iconBtn} onClick={ts.increase} disabled={!ts.canIncrease} aria-label={`${t('a11y.textLarger')} (${ts.percent}%)`}>
        <span className="text-lg" aria-hidden>A+</span>
      </button>
      <span className="mx-1 h-6 w-px bg-line" aria-hidden />
      <button className={iconBtn} onClick={toggleTheme} aria-label={theme === 'dark' ? t('a11y.themeLight') : t('a11y.themeDark')}>
        {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
      </button>
      <button className={cn(iconBtn, calm && 'bg-accent/15 text-accent-ink')} onClick={() => setCalm(!calm)} aria-pressed={calm} aria-label={t('a11y.calm')}>
        <Wind className="h-5 w-5" aria-hidden />
        <span className="hidden xl:inline">{t('a11y.calm')}</span>
      </button>
      <button className={cn(iconBtn, reader.speaking && 'bg-accent/15 text-accent-ink')} onClick={read} aria-pressed={reader.speaking}>
        {reader.speaking ? <Square className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
        <span className="hidden xl:inline">{reader.speaking ? t('a11y.stopReading') : t('a11y.readAloud')}</span>
        <span className="sr-only xl:hidden">{reader.speaking ? t('a11y.stopReading') : t('a11y.readAloud')}</span>
      </button>
      <button className={iconBtn} onClick={switchLang} aria-label={t('a11y.languageLabel')}>
        <Languages className="h-5 w-5" aria-hidden />
        <span lang={lang === 'en' ? 'hi' : 'en'}>{t('a11y.language')}</span>
      </button>
    </div>
  );
};
