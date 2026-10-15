import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Users, GraduationCap, Smartphone, Settings, ShieldCheck, Terminal, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

/** Logo mark: a magnifier whose lens holds a check, inside a hexagon. */
export const LogoMark: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <defs>
      <linearGradient id="rc-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5546F0" />
        <stop offset="100%" stopColor="#6C5CE7" />
      </linearGradient>
    </defs>
    <path d="M24 3 42 13.5v21L24 45 6 34.5v-21Z" fill="url(#rc-logo)" opacity=".16" />
    <path d="M24 3 42 13.5v21L24 45 6 34.5v-21Z" fill="none" stroke="url(#rc-logo)" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="21.5" cy="21.5" r="8.5" fill="none" stroke="url(#rc-logo)" strokeWidth="3" />
    <path d="m17.6 21.6 2.8 2.8 5-5.4" fill="none" stroke="url(#rc-logo)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m28 28 6.5 6.5" stroke="url(#rc-logo)" strokeWidth="3.6" strokeLinecap="round" />
  </svg>
);

export const Logo: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-3">
        <LogoMark size={compact ? 36 : 42} />
        <span className="font-heading text-xl font-black tracking-tight text-ink">{t('app.name')}</span>
      </span>
      {!compact && (
        <span className="text-[10px] font-mono tracking-widest text-[#5546F0] mt-1 pl-1 uppercase font-bold">
          [AI_SECURITY_SANDBOX]
        </span>
      )}
    </div>
  );
};

export const NAV_ITEMS = [
  { to: '/', key: 'home', icon: Home, end: true },
  { to: '/community', key: 'community', icon: Users, end: false },
  { to: '/academy', key: 'academy', icon: GraduationCap, end: false },
  { to: '/practice', key: 'practice', icon: Smartphone, end: false },
] as const;

export const Sidebar: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => {
  const { t } = useTranslation();
  return (
    <aside className="bg-surface/90 backdrop-blur-xl fixed inset-y-3 left-3 z-40 hidden w-[264px] flex-col rounded-[24px] p-4 lg:flex border border-[#E8EAF4] shadow-lift">
      <NavLink to="/" className="mb-6 rounded-xl px-2 py-2" aria-label={`${t('app.name')} — ${t('nav.home')}`}>
        <Logo />
      </NavLink>

      <nav aria-label={t('nav.label')} data-tour="nav">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map(({ to, key, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'group relative flex min-h-[56px] items-center gap-3.5 rounded-2xl px-4 font-heading text-[1.05rem] font-semibold transition-all',
                    isActive
                      ? 'bg-[#5546F0]/10 text-[#5546F0] shadow-[inset_0_0_0_1px_rgba(85,70,240,0.3)]'
                      : 'text-ink-2 hover:bg-[#F5F6FF] hover:text-[#5546F0]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#5546F0] to-[#6C5CE7] shadow-[0_0_8px_rgba(85,70,240,0.4)]" aria-hidden />
                    )}
                    <Icon className="h-6 w-6 shrink-0" aria-hidden />
                    {t(`nav.${key}`)}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-3">
        <div className="rounded-2xl border border-[#E8EAF4] bg-[#F5F6FF] p-4 text-xs font-mono text-ink-2 space-y-1.5 shadow-sm">
          <p className="flex items-center gap-2 font-bold text-[#5546F0]">
            <Activity className="h-4 w-4 text-emerald-500" aria-hidden />
            STATUS: ACTIVE_DEFENSE
          </p>
          <p className="text-[11px] text-ink-3">
            Air-gapped emulated environment with zero data leakage.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenSettings}
          className="flex min-h-[56px] w-full items-center gap-3.5 rounded-2xl px-4 font-heading font-semibold text-ink-2 transition-colors hover:bg-[#F5F6FF] hover:text-[#5546F0]"
        >
          <Settings className="h-6 w-6" aria-hidden /> {t('nav.settings')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
