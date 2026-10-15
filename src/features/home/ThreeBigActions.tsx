import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, GraduationCap, Smartphone, ArrowRight, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { Card } from '@/design-system';

export const ThreeBigActions: React.FC = () => {
  const { t } = useTranslation();

  const actions = [
    {
      to: '/community',
      code: 'PROTOCOL // 01',
      tag: 'COMMUNITY_OSINT',
      title: t('home.actions.check.title'),
      body: t('home.actions.check.body'),
      cta: t('home.actions.check.cta'),
      icon: <Search className="h-7 w-7 text-[#5546F0]" />,
      accentGlow: 'hover:shadow-[0_8px_30px_rgba(85,70,240,0.12)]',
      borderAccent: 'hover:border-[#5546F0]/60',
      tagColor: 'text-[#5546F0] bg-[#F5F6FF] border-[#5546F0]/30',
    },
    {
      to: '/academy',
      code: 'PROTOCOL // 02',
      tag: 'FORENSIC_LABS',
      title: t('home.actions.learn.title'),
      body: t('home.actions.learn.body'),
      cta: t('home.actions.learn.cta'),
      icon: <GraduationCap className="h-7 w-7 text-[#6C5CE7]" />,
      accentGlow: 'hover:shadow-[0_8px_30px_rgba(108,92,231,0.12)]',
      borderAccent: 'hover:border-[#6C5CE7]/60',
      tagColor: 'text-[#6C5CE7] bg-[#F5F6FF] border-[#6C5CE7]/30',
    },
    {
      to: '/practice',
      code: 'PROTOCOL // 03',
      tag: 'PHONE_SANDBOX',
      title: t('home.actions.practice.title'),
      body: t('home.actions.practice.body'),
      cta: t('home.actions.practice.cta'),
      icon: <Smartphone className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />,
      accentGlow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
      borderAccent: 'hover:border-emerald-500/60',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/30',
    },
  ];

  return (
    <section aria-label="Main activities" data-tour="actions" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((act) => (
        <Link
          key={act.to}
          to={act.to}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5546F0] rounded-glass h-full"
        >
          <Card
            interactive
            technical
            className={`h-full flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 bg-surface/90 border border-[#E8EAF4] ${act.borderAccent} ${act.accentGlow}`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-6">
                <span className="text-ink-3 tracking-widest">{act.code}</span>
                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${act.tagColor}`}>
                  [{act.tag}]
                </span>
              </div>

              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F5F6FF] border border-[#E8EAF4] mb-6 group-hover:scale-105 group-hover:border-[#5546F0]/40 transition-all duration-300 shadow-sm">
                {act.icon}
              </div>

              <h2 className="font-heading text-2xl font-bold text-ink mb-3 group-hover:text-[#5546F0] transition-colors">
                {act.title}
              </h2>
              <p className="text-ink-2 leading-relaxed text-sm sm:text-base">
                {act.body}
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between font-heading font-bold text-[#5546F0] text-base group-hover:text-[#6C5CE7] transition-colors border-t border-line/40 mt-4">
              <span>{act.cta}</span>
              <ArrowRight className="h-5 w-5 text-[#5546F0] group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Card>
        </Link>
      ))}
    </section>
  );
};

export default ThreeBigActions;
