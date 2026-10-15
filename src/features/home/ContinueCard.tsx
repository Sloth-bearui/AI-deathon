import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAcademyStore } from '@/store/useAcademyStore';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { Card, Button } from '@/design-system';
import { PlayCircle, GraduationCap, Smartphone, Clock, ArrowRight } from 'lucide-react';

export const ContinueCard: React.FC = () => {
  const { t } = useTranslation();
  const lastLab = useAcademyStore((s) => s.lastActiveLabSlug);
  const lastScenario = useSimulatorStore((s) => s.lastActiveScenarioId);
  const completedLabs = useAcademyStore((s) => s.completedLabIds);

  const hasActivity = Boolean(lastLab || lastScenario);

  if (!hasActivity) {
    return (
      <Card className="border border-line bg-surface/40 p-6 text-center text-ink-2">
        <p>{t('home.nothingYet')}</p>
      </Card>
    );
  }

  return (
    <section aria-label="Resume activity" className="my-8">
      <Card className="border border-accent/20 bg-gradient-to-r from-surface to-raised/60 p-6 sm:p-7 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-ink shrink-0">
              <PlayCircle className="h-6 w-6" />
            </span>
            <div>
              <span className="eyebrow block mb-1">{t('home.continue')}</span>
              <h3 className="font-heading text-xl font-bold text-ink">
                Spotting Phishing & Dangerous Sender Details
              </h3>
              <p className="text-sm text-ink-2 mt-0.5">
                Practice identifying sender domain anomalies and SMS red flags.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Button
              to={`/academy/${lastLab || 'spot-phishing-messages'}`}
              variant="primary"
              size="md"
              iconRight={<ArrowRight />}
            >
              {t('home.resume')} {t('home.continueLab')}
            </Button>
            <Button
              to={`/practice/${lastScenario || 'scenario-001'}`}
              variant="secondary"
              size="md"
            >
              {t('home.resume')} {t('home.continueScenario')}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
