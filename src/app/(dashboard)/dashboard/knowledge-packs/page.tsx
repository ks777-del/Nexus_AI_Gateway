"use client";
import React from "react";
import { GlassCard, GradientButton, StatusBadge } from "@/shared/components/nexus";

export default function KnowledgePacksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Knowledge Packs</h1>
        <GradientButton><span className="material-symbols-outlined mr-1">upload</span> Create Pack</GradientButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">Programming Best Practices</h3>
            <StatusBadge status="success">Active</StatusBadge>
          </div>
          <p className="text-sm text-text-muted mb-4">A collection of style guides, design patterns, and coding standards.</p>
          <div className="flex justify-between text-xs text-text-muted">
            <span>24 Documents</span>
            <span>1.2M Tokens</span>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">Medical Terminology</h3>
            <StatusBadge status="neutral">Inactive</StatusBadge>
          </div>
          <p className="text-sm text-text-muted mb-4">Standard medical ontologies and reference materials.</p>
          <div className="flex justify-between text-xs text-text-muted">
            <span>5 Documents</span>
            <span>450K Tokens</span>
          </div>
        </GlassCard>
      </div>
      
      <GlassCard className="p-8 border-dashed flex flex-col items-center justify-center text-center mt-4">
        <span className="material-symbols-outlined text-4xl text-text-muted mb-2">cloud_upload</span>
        <h3 className="font-semibold mb-1">Upload Custom Documents</h3>
        <p className="text-sm text-text-muted mb-4">Drag and drop PDFs, Markdown, or text files here to create a new Knowledge Pack.</p>
        <GradientButton variant="outline">Browse Files</GradientButton>
      </GlassCard>
    </div>
  );
}