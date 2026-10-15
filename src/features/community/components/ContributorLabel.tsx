import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface Props {
  contributorId: string;
  name?: string;
  className?: string;
}

export const ContributorLabel: React.FC<Props> = ({ contributorId, name = 'Community Member', className }) => {
  return (
    <Link
      to={`/community/contributor/${contributorId}`}
      className={`inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-accent-ink transition-colors ${className || ''}`}
      onClick={(e) => e.stopPropagation()}
      title="View contributor profile. Contributor reliability does not affect post relevance scores."
    >
      <User className="h-3.5 w-3.5" />
      <span>Submitted by <strong className="font-medium text-ink-2 hover:underline">{name}</strong></span>
    </Link>
  );
};
