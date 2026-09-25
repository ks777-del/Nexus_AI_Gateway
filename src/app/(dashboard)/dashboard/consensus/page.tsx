"use client";
import React, { useState } from "react";
import { GlassCard, GradientButton } from "@/shared/components/nexus";

export default function ConsensusPage() {
  const [prompt, setPrompt] = useState("");
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Consensus AI</h1>
        <div className="bg-surface rounded-full p-1 flex border border-border">
          {['Single', 'Dual', 'Triple', 'Reviewer'].map(mode => (
            <button key={mode} className={`px-4 py-1 rounded-full text-sm ${mode === 'Dual' ? 'bg-bg-subtle text-text-main shadow-sm' : 'text-text-muted'}`}>
              {mode}
            </button>
          ))}
        </div>
      </div>
      
      <GlassCard className="p-4">
        <h3 className="font-semibold mb-2 text-sm text-text-muted">Prompt</h3>
        <textarea 
          className="w-full bg-bg-subtle border border-border rounded-md p-3 resize-y min-h-[100px] focus:ring-1 focus:ring-brand-primary outline-none"
          placeholder="Enter a prompt to run against multiple models..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <GradientButton>Generate Consensus</GradientButton>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <GlassCard className="p-4 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
            <select className="bg-transparent font-semibold outline-none text-text-main">
              <option>GPT-4o</option>
              <option>Claude 3.5 Sonnet</option>
            </select>
          </div>
          <div className="flex-grow text-text-muted text-sm flex items-center justify-center border border-dashed border-border rounded-md">
            Awaiting prompt...
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
            <select className="bg-transparent font-semibold outline-none text-text-main">
              <option>Claude 3.5 Sonnet</option>
              <option>GPT-4o</option>
            </select>
          </div>
          <div className="flex-grow text-text-muted text-sm flex items-center justify-center border border-dashed border-border rounded-md">
            Awaiting prompt...
          </div>
        </GlassCard>
      </div>
    </div>
  );
}