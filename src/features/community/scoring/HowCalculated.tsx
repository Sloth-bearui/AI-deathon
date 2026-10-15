import React from 'react';
import { Accordion } from '@/design-system';
import { ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export const HowCalculated: React.FC = () => {
  const items = [
    {
      value: 'principles',
      title: 'How are relevance points calculated?',
      icon: <Scale className="h-4 w-4" />,
      content: (
        <div className="space-y-3 text-sm leading-relaxed text-ink-2">
          <p>
            Relevance points reflect how strongly verifiable evidence supports or contradicts the central claim.
            The score is calculated strictly using four transparent criteria:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Evidence strength (35%):</strong> Direct documentation, original files, verified records.</li>
            <li><strong>Source credibility (30%):</strong> Track record of primary reporting entities and institutional registries.</li>
            <li><strong>Independent corroboration (20%):</strong> Multiple unrelated sources confirming key details independently.</li>
            <li><strong>Reproducibility (15%):</strong> Anyone can test the steps (e.g. reverse search, archive lookup) and get the same outcome.</li>
          </ul>
        </div>
      ),
    },
    {
      value: 'what-counts-not',
      title: 'What NEVER affects the score?',
      icon: <AlertCircle className="h-4 w-4 text-warn-ink" />,
      content: (
        <div className="space-y-2 text-sm leading-relaxed text-ink-2">
          <p className="font-semibold text-ink">Popularity does not equal truth.</p>
          <p>
            Upvotes, likes, social shares, viral spread, and majority agreement have zero impact on the relevance point score.
            Furthermore, a contributor's reputation never changes a post's score — every claim is evaluated solely on its documented evidence.
          </p>
        </div>
      ),
    },
    {
      value: 'uncertainty',
      title: 'Handling uncertainty & new evidence',
      icon: <ShieldCheck className="h-4 w-4 text-ok-ink" />,
      content: (
        <p className="text-sm leading-relaxed text-ink-2">
          When a claim is newly submitted without enough corroborating facts, it is marked as <em>Not enough evidence yet</em>.
          As community members add primary sources and archive links, the score updates strictly according to defined rules.
        </p>
      ),
    },
  ];

  return <Accordion items={items} className="mt-4" />;
};
