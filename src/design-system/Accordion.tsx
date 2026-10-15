import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  type?: 'single' | 'multiple';
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  type = 'single',
}) => {
  return (
    <RadixAccordion.Root type={type} collapsible className={cn('space-y-2', className)}>
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          className="glass rounded-card overflow-hidden"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex items-center justify-between w-full px-5 py-4 text-left font-heading font-medium hover:bg-[var(--color-hover)] transition-colors min-h-[56px] group">
              {item.title}
              <ChevronDown
                size={20}
                className="shrink-0 ml-2 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="px-5 pb-4 text-[var(--color-text-secondary)] data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up overflow-hidden">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
