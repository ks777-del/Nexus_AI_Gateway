"use client";
import React, { useState } from "react";
import { GlassCard, GradientButton, StatusBadge } from "@/shared/components/nexus";

export default function ModelSandboxPage() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Model Sandbox</h1>
        <GradientButton><span className="material-symbols-outlined mr-1">add</span> Add Provider</GradientButton>
      </div>
      
      <div className="flex gap-4 items-center">
        <span className="text-sm text-text-muted">Active Models:</span>
        <StatusBadge status="info">GPT-4o</StatusBadge>
        <StatusBadge status="info">Claude 3.5 Sonnet</StatusBadge>
      </div>

      <div className="flex gap-6 flex-grow">
        <GlassCard className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold mb-2">GPT-4o</h3>
          <div className="flex-grow bg-bg-subtle rounded-md p-3 font-mono text-sm overflow-y-auto border border-border">
            Waiting for prompt...
          </div>
        </GlassCard>
        
        <GlassCard className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold mb-2">Claude 3.5 Sonnet</h3>
          <div className="flex-grow bg-bg-subtle rounded-md p-3 font-mono text-sm overflow-y-auto border border-border">
            Waiting for prompt...
          </div>
        </GlassCard>
      </div>
      
      <div className="flex gap-4">
        <textarea 
          className="flex-grow bg-surface border border-border rounded-md p-3 resize-none h-24 focus:ring-1 focus:ring-brand-primary outline-none"
          placeholder="Enter test prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <GradientButton className="h-24 w-24 flex flex-col items-center justify-center gap-1">
          <span className="material-symbols-outlined">play_arrow</span>
          Run
        </GradientButton>
      </div>
    </div>
  );
}