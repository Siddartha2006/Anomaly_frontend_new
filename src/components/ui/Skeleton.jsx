import React from 'react';
import { cn } from '../../lib/utils';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};

const SkeletonCard = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full max-w-[200px]" />
              <Skeleton className="h-3 w-full max-w-[150px]" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Skeleton, SkeletonCard, SkeletonTable };
