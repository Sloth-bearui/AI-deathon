import React from 'react';
import { cn } from '@/utils/cn';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('skeleton h-4', className)} aria-hidden />
);

/** Placeholder matching the PostCard / LabCard shape. */
export const SkeletonCard: React.FC<{ media?: boolean }> = ({ media = true }) => (
  <div className="glass space-y-4 rounded-glass p-5" aria-hidden>
    {media && <Skeleton className="h-40 w-full rounded-2xl" />}
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-8 w-28 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
  </div>
);

export const SkeletonList: React.FC<{ count?: number; media?: boolean; label?: string }> = ({ count = 3, media, label = 'Loading' }) => (
  <div role="status" aria-live="polite" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    <span className="sr-only">{label}…</span>
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} media={media} />)}
  </div>
);
