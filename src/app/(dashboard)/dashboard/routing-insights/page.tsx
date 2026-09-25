"use client";
import React from "react";
import { GlassCard, MetricCard } from "@/shared/components/nexus";

export default function RoutingInsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text-main">Routing Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Decisions" value="128,492" trend={{value: 12, isPositive: true}} />
        <MetricCard title="Avg Confidence" value="94.2%" trend={{value: 1.5, isPositive: true}} />
        <MetricCard title="Top Model" value="Claude 3.5" />
        <MetricCard title="Est. Cost Savings" value="$428.50" trend={{value: 8, isPositive: true}} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-4 lg:col-span-2">
          <h3 className="font-semibold mb-4 text-text-main">Routing Decision Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted bg-bg-subtle">
                <tr>
                  <th className="px-4 py-2 rounded-l-md">Prompt Prefix</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Selected Model</th>
                  <th className="px-4 py-2 rounded-r-md">Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="px-4 py-3 font-mono truncate max-w-[200px]">"Write a React hook for..."</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">Coding</span></td>
                  <td className="px-4 py-3">Claude 3.5 Sonnet</td>
                  <td className="px-4 py-3 text-success">98%</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-4 py-3 font-mono truncate max-w-[200px]">"Translate this to French..."</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs">Language</span></td>
                  <td className="px-4 py-3">GPT-4o Mini</td>
                  <td className="px-4 py-3 text-success">95%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-text-main">Model Distribution</h3>
          <div className="h-64 flex items-center justify-center text-text-muted border border-dashed border-border rounded-md">
            Pie Chart Placeholder
          </div>
        </GlassCard>
      </div>
    </div>
  );
}