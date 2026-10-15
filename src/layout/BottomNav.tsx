import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import { NAV_ITEMS } from './Sidebar';

/** Mobile bottom tab bar with 64px targets. */
export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav
      aria-label={t('nav.label')}
      data-tour="nav"
      className="glass-strong fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {NAV_ITEMS.map(({ to, key, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'relative flex min-h-[68px] flex-col items-center justify-center gap-1 px-1 text-center text-[0.78rem] font-semibold leading-tight transition-colors',
                  isActive ? 'text-accent-ink' : 'text-ink-2 hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn('grid h-8 w-14 place-items-center rounded-full transition-all', isActive && 'bg-accent/15')}>
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  {t(`nav.${key}`)}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
