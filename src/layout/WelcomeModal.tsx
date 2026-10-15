import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/design-system';
import { usePrefsStore } from '@/store/usePrefsStore';
import { cn } from '@/utils/cn';
import { LogoMark } from './Sidebar';

const OPTIONS = [
  { scale: 1, key: 'small', sample: 'Aa' },
  { scale: 1.3, key: 'medium', sample: 'Aa' },
  { scale: 1.5, key: 'large', sample: 'Aa' },
] as const;

/** First-run welcome: pick a comfortable text size with a live preview. */
export const WelcomeModal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const done = usePrefsStore((s) => s.welcomeDone);
  const setDone = usePrefsStore((s) => s.setWelcomeDone);
  const scale = usePrefsStore((s) => s.textScale);
  const setScale = usePrefsStore((s) => s.setTextScale);

  const finish = () => { setDone(true); navigate('/'); };

  return (
    <Dialog.Root open={!done} onOpenChange={(o) => !o && finish()}>
      <Dialog.Portal>
        <Dialog.Overlay className="rc-overlay fixed inset-0 z-[150] bg-[rgb(3_7_18/0.75)] backdrop-blur-md" />
        <Dialog.Content className="glass-strong rc-pop fixed left-1/2 top-1/2 z-[160] max-h-[94dvh] w-[min(94vw,620px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] p-6 sm:p-9">
          <div className="mb-5 flex items-center gap-3">
            <LogoMark size={52} />
            <span className="eyebrow">{t('app.tagline')}</span>
          </div>
          <Dialog.Title className="font-heading text-3xl font-bold leading-tight">{t('welcome.title')}</Dialog.Title>
          <Dialog.Description className="mt-2 text-lg text-ink-2">{t('welcome.body')}</Dialog.Description>

          <div role="radiogroup" aria-label={t('a11y.textSize')} className="mt-6 grid grid-cols-3 gap-3">
            {OPTIONS.map((o) => {
              const active = Math.abs(scale - o.scale) < 0.01;
              return (
                <button
                  key={o.key}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setScale(o.scale)}
                  className={cn(
                    'relative flex min-h-[112px] flex-col items-center justify-center gap-1 rounded-2xl border-2 p-3 transition-all',
                    active ? 'border-accent bg-accent/12 shadow-glow' : 'border-line bg-surface/50 hover:border-accent/50',
                  )}
                >
                  {active && <Check className="absolute right-2 top-2 h-5 w-5 text-accent-ink" aria-hidden />}
                  <span className="font-heading font-bold" style={{ fontSize: `${o.scale * 1.6}rem`, lineHeight: 1 }} aria-hidden>{o.sample}</span>
                  <span className="text-sm font-semibold">{t(`welcome.${o.key}`)}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-surface/50 p-5" aria-live="polite">
            <p className="text-lg">{t('welcome.preview')}</p>
          </div>

          <Button className="mt-6" size="lg" fullWidth iconRight={<ArrowRight />} onClick={finish}>
            {t('welcome.continue')}
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
