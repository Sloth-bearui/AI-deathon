import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  items?: TabItem[];
  tabs?: TabItem[];
  value: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  tabs,
  value,
  onValueChange,
  onChange,
  children,
  className,
}) => {
  const tabItems = items || tabs || [];
  const handleChange = onValueChange || onChange || (() => {});

  return (
    <RadixTabs.Root value={value} onValueChange={handleChange} className={className}>
      <RadixTabs.List className="flex gap-1 p-1 glass rounded-button mb-6 overflow-x-auto">
        {tabItems.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] whitespace-nowrap',
              'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]',
              'data-[state=active]:bg-accent/15 data-[state=active]:text-accent'
            )}
          >
            {item.icon}
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
};

export const TabContent = RadixTabs.Content;
