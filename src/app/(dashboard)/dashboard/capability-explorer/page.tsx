"use client";
import React, { useState } from "react";
import { GlassCard, MetricCard, StatusBadge, GradientButton, RadarChart } from "@/shared/components/nexus";

export default function CapabilityExplorerPage() {
  const [search, setSearch] = useState("");
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Capability Explorer</h1>
        <input 
          type="text" 
          placeholder="Search models..." 
          className="bg-bg-subtle border border-border rounded-md px-3 py-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">GPT-4o</h3>
          <RadarChart data={[{subject: "Coding", A: 90}, {subject: "Reasoning", A: 95}]} dataKey="A" />
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Claude 3.5 Sonnet</h3>
          <RadarChart data={[{subject: "Coding", A: 95}, {subject: "Reasoning", A: 90}]} dataKey="A" />
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Gemini 2.0</h3>
          <RadarChart data={[{subject: "Coding", A: 92}, {subject: "Reasoning", A: 92}]} dataKey="A" />
        </GlassCard>
      </div>
    </div>
  );
}