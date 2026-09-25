"use client";

import { Skeleton } from "@/shared/components/Loading";

export default function BenchmarksLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <Skeleton className="h-8 w-40" />
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-[500px] rounded-lg" />
    </div>
  );
}
