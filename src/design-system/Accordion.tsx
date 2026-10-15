import React from 'react';
import * as RA from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AccordionItemDef {
  value: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemDef[];
  defaultValue?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultValue, className }) => (
  <RA.Root type="single" collapsible defaultValue={defaultValue} className={cn('space-y-3', className)}>
    {items.map((it) => (
      <RA.Item key={it.value} value={it.value} className="overflow-hidden rounded-2xl border border-line bg-surface/50">
        <RA.Header>
          <RA.Trigger className="group flex min-h-[56px] w-full items-center gap-3 px-5 py-3 text-left font-heading text-lg font-semibold transition-colors hover:bg-hover/60">
            {it.icon && <span className="text-accent-ink [&>svg]:h-5 [&>svg]:w-5" aria-hidden>{it.icon}</span>}
            <span className="flex-1">{it.title}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-ink-2 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
          </RA.Trigger>
        </RA.Header>
        <RA.Content className="rc-accordion overflow-hidden">
          <div className="px-5 pb-5 pt-1 text-ink-2">{it.content}</div>
        </RA.Content>
      </RA.Item>
    ))}
  </RA.Root>
);
