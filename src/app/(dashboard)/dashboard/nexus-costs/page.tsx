"use client";
import React from "react";
import { GlassCard, MetricCard, GradientButton } from "@/shared/components/nexus";

export default function NexusCostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Cost Intelligence</h1>
        <GradientButton variant="outline">Manage Budget</GradientButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Spend" value="$1,245.80" trend={{value: 5, isPositive: false}} />
        <MetricCard title="Today's Spend" value="$34.50" />
        <MetricCard title="Optimization Savings" value="$428.50" trend={{value: 12, isPositive: true}} />
        <MetricCard title="Budget Remaining" value="$754.20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-4 lg:col-span-2">
          <h3 className="font-semibold mb-4 text-text-main">Cost Trend</h3>
          <div className="h-64 flex items-center justify-center text-text-muted border border-dashed border-border rounded-md">
            Line Chart Placeholder
          </div>
        </GlassCard>
        
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-text-main">Cost by Provider</h3>
          <div className="h-64 flex items-center justify-center text-text-muted border border-dashed border-border rounded-md">
            Donut Chart Placeholder
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 text-text-main">Optimization Suggestions</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center p-3 bg-bg-subtle rounded-md border border-border">
            <div>
              <div className="font-semibold text-sm">Switch simple translation tasks to GPT-4o Mini</div>
              <div className="text-xs text-text-muted">Based on routing logs, precision isn't required for these queries.</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-success font-semibold text-sm">Est. Save: $45/mo</span>
              <GradientButton size="sm">Apply Rule</GradientButton>
            </div>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}