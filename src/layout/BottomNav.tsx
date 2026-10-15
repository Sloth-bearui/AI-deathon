import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Users, GraduationCap, Smartphone } from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/community', icon: Users, labelKey: 'nav.community' },
  { to: '/academy', icon: GraduationCap, labelKey: 'nav.academy' },
  { to: '/practice', icon: Smartphone, labelKey: 'nav.practice' },
];

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass border-t border-[var(--glass-border)]" role="navigation" aria-label="Main navigation">
      <div className="flex items-stretch justify-around">
        {navItems.map(({ to, icon: Icon, labelKey }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-3 min-h-[64px] min-w-[64px] transition-colors text-xs',
                isActive
                  ? 'text-accent'
                  : 'text-[var(--color-text-muted)]'
              )}
            >
              <Icon size={24} />
              <span className="font-medium">{t(labelKey)}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
