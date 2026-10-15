import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const WelcomeHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative text-center py-8 lg:py-14">
      {/* Soft central glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[min(90vw,600px)] rounded-full blur-[100px] opacity-25"
        style={{ background: 'radial-gradient(circle, var(--color-accent, #2DD4BF) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-surface/70 text-accent-ink text-sm font-semibold shadow-soft">
          <ShieldCheck className="h-4 w-4" />
          <span>{t('home.greeting')}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
          {t('home.title')}
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 max-w-2xl mx-auto leading-relaxed">
          {t('home.subtitle')}
        </p>
      </div>
    </section>
  );
};
