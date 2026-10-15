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

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-[var(--sidebar-width)] h-screen fixed left-0 top-0 glass border-r border-[var(--glass-border)] z-30">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z" stroke="#2DD4BF" strokeWidth="2.5" fill="none" opacity="0.9"/>
            <circle cx="30" cy="28" r="12" stroke="#2DD4BF" strokeWidth="2.5" fill="none"/>
            <line x1="39" y1="37" x2="48" y2="46" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round"/>
            <polyline points="24,28 28,33 36,23" stroke="#34D399" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg leading-tight">Reality Check</h1>
          <p className="text-xs text-[var(--color-text-muted)]">{t('tagline')}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, labelKey }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-card text-sm font-medium transition-all duration-200 min-h-[52px]',
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]'
              )}
            >
              <Icon size={22} />
              <span>{t(labelKey)}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--glass-border)]">
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Community-powered verification
        </p>
      </div>
    </aside>
  );
};
