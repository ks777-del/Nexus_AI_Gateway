"use client";
import React from "react";
import { GlassCard, MetricCard, GradientButton } from "@/shared/components/nexus";

export default function NexusMemoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Memory Manager</h1>
        <GradientButton>Compress Memory</GradientButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Memories" value="45,231" />
        <MetricCard title="Short-term" value="1,200" />
        <MetricCard title="Long-term" value="44,031" />
        <MetricCard title="Storage Size" value="2.4 GB" />
      </div>

      <GlassCard className="p-4 min-h-[300px]">
        <h3 className="font-semibold mb-4 text-text-main">Memory Browser</h3>
        <input type="text" placeholder="Search memories..." className="w-full bg-bg-subtle border border-border rounded-md px-3 py-2 mb-4" />
        <div className="text-text-muted text-center mt-10">Select a memory to view details.</div>
      </GlassCard>
    </div>
  );
}