"use client";

import { Skeleton } from "@/shared/components/Loading";

export default function NexusBrainLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] rounded-lg" />
        <Skeleton className="h-[400px] rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}
