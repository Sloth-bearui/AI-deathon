import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('skeleton h-4 rounded', className)} />
      ))}
    </>
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="glass rounded-glass p-6 space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
    <div className="flex gap-2 mt-4">
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-16 rounded-full" />
    </div>
  </div>
);
