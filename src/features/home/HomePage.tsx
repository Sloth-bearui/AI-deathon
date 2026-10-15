import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShelbyDeskHero } from './ShelbyDeskHero';
import { TechnicalPhoneSandboxHero } from './TechnicalPhoneSandboxHero';
import { ThreeBigActions } from './ThreeBigActions';
import { ContinueCard } from './ContinueCard';
import { ShieldCheck, Lock, EyeOff, Terminal, Activity } from 'lucide-react';
import { Card } from '@/design-system';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container-page space-y-12">
      <ShelbyDeskHero />
      <TechnicalPhoneSandboxHero />

      {/* 2. Three Main Technical Protocols */}
      <ThreeBigActions />

      {/* 3. Continue Card if User has In-Progress Activity */}
      <ContinueCard />

      {/* 4. Cybersecurity Containment & Privacy Architecture Banner */}
      <section aria-labelledby="promise-title" className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-[#E8EAF4] text-ink relative shadow-lift">
        <span className="absolute top-2 left-2 text-[10px] font-mono text-[#5546F0]/30 select-none">+</span>
        <span className="absolute top-2 right-2 text-[10px] font-mono text-[#5546F0]/30 select-none">+</span>
        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#5546F0]/30 select-none">+</span>
        <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#5546F0]/30 select-none">+</span>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line pb-4 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5546F0] block mb-1 font-bold">
                [COMPLIANCE // ZERO-TRUST SANDBOX]
              </span>
              <h2 id="promise-title" className="font-heading text-2xl font-bold text-ink flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                {t('home.promise.title')}
              </h2>
            </div>
            <span className="text-xs font-mono bg-[#F5F6FF] text-[#5546F0] border border-[#5546F0]/30 font-bold px-3 py-1 rounded-full">
              SECURITY_AUDIT: PASSED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F6FF] border border-[#E8EAF4]">
              <Lock className="h-5 w-5 text-[#5546F0] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-bold text-[#5546F0] uppercase mb-1">100% Client-Side</p>
                <p className="text-xs text-ink-2 leading-relaxed">{t('home.promise.p1')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F6FF] border border-[#E8EAF4]">
              <EyeOff className="h-5 w-5 text-[#6C5CE7] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-bold text-[#6C5CE7] uppercase mb-1">Zero Telemetry Leak</p>
                <p className="text-xs text-ink-2 leading-relaxed">{t('home.promise.p2')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F6FF] border border-[#E8EAF4]">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-bold text-emerald-600 uppercase mb-1">Simulated Safety</p>
                <p className="text-xs text-ink-2 leading-relaxed">{t('home.promise.p3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
