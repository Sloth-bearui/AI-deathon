import React from 'react';
import * as RT from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

export interface TabDef {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabDef[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  label: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, value, defaultValue, onValueChange, label, className }) => (
  <RT.Root value={value} defaultValue={defaultValue ?? tabs[0]?.value} onValueChange={onValueChange} className={className}>
    <RT.List aria-label={label} className="glass mb-6 flex gap-1 overflow-x-auto rounded-2xl p-1.5">
      {tabs.map((t) => (
        <RT.Trigger
          key={t.value}
          value={t.value}
          className={cn(
            'flex min-h-[52px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 font-heading font-semibold text-ink-2 transition-all',
            'hover:text-ink data-[state=active]:bg-accent/15 data-[state=active]:text-accent-ink data-[state=active]:shadow-[inset_0_0_0_1px_rgb(var(--c-accent)/0.35)]',
          )}
        >
          {t.icon && <span className="[&>svg]:h-5 [&>svg]:w-5" aria-hidden>{t.icon}</span>}
          {t.label}
        </RT.Trigger>
      ))}
    </RT.List>
    {tabs.map((t) => (
      <RT.Content key={t.value} value={t.value} className="focus-visible:outline-none">
        {t.content}
      </RT.Content>
    ))}
  </RT.Root>
);
