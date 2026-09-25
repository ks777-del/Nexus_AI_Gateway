"use client";
import React from "react";
import { GlassCard, GradientButton, StatusBadge } from "@/shared/components/nexus";

export default function WorkflowBuilderPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Workflow Builder</h1>
        <GradientButton><span className="material-symbols-outlined mr-1">add</span> New Workflow</GradientButton>
      </div>
      
      <h2 className="text-xl font-semibold mt-4">Template Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-4 hover:border-brand-primary cursor-pointer transition-colors">
          <h3 className="font-semibold mb-2">Research Pipeline</h3>
          <p className="text-sm text-text-muted">Automated web search, summary, and synthesis.</p>
        </GlassCard>
        <GlassCard className="p-4 hover:border-brand-primary cursor-pointer transition-colors">
          <h3 className="font-semibold mb-2">Code Review</h3>
          <p className="text-sm text-text-muted">Analyzes PRs for bugs and style issues.</p>
        </GlassCard>
        <GlassCard className="p-4 hover:border-brand-primary cursor-pointer transition-colors">
          <h3 className="font-semibold mb-2">Document Analysis</h3>
          <p className="text-sm text-text-muted">Extracts structured data from PDFs.</p>
        </GlassCard>
      </div>

      <h2 className="text-xl font-semibold mt-4">My Workflows</h2>
      <GlassCard className="p-4">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <div>
            <div className="font-semibold">Daily Report Generator</div>
            <div className="text-xs text-text-muted">4 Nodes | Last run: 2 hours ago</div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status="success">Active</StatusBadge>
            <GradientButton variant="outline" size="sm">Open Editor</GradientButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}