"use client";
import React from "react";
import { GlassCard, MetricCard, StatusBadge } from "@/shared/components/nexus";

export default function SecurityCenterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Security Center</h1>
        <StatusBadge status="success">System Secure</StatusBadge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Events" value="1,245" trend={{value: 5, isPositive: false}} />
        <MetricCard title="Blocked Threats" value="34" trend={{value: 12, isPositive: true}} />
        <MetricCard title="Active Policies" value="8" />
        <MetricCard title="Threat Rate" value="0.02%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-text-main">Recent Events</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center"><span className="text-text-muted">Blocked prompt injection</span><StatusBadge status="error">High</StatusBadge></li>
            <li className="flex justify-between items-center"><span className="text-text-muted">Rate limit exceeded</span><StatusBadge status="warning">Med</StatusBadge></li>
          </ul>
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 text-text-main">Active Policies</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center"><span className="text-text-muted">PII Redaction</span><StatusBadge status="success">Active</StatusBadge></li>
            <li className="flex justify-between items-center"><span className="text-text-muted">Jailbreak Protection</span><StatusBadge status="success">Active</StatusBadge></li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}