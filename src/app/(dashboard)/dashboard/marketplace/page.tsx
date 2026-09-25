"use client";
import React from "react";
import { GlassCard, GradientButton } from "@/shared/components/nexus";

export default function MarketplacePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">AI Marketplace</h1>
        <input 
          type="text" 
          placeholder="Search marketplace..." 
          className="bg-bg-subtle border border-border rounded-md px-3 py-1 w-64"
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Prompts', 'Agents', 'Knowledge', 'Workflows', 'Plugins', 'Themes'].map(tab => (
          <button key={tab} className="px-3 py-1 rounded-full text-sm bg-surface hover:bg-bg-subtle border border-border whitespace-nowrap">
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        <GlassCard className="p-4 flex flex-col">
          <div className="h-32 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-md mb-4 flex items-center justify-center">
             <span className="material-symbols-outlined text-4xl text-brand-primary">smart_toy</span>
          </div>
          <h3 className="font-semibold">Code Assistant Agent</h3>
          <p className="text-xs text-text-muted mt-1 mb-2 flex-grow">An expert agent configured for full-stack web development and debugging.</p>
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-amber-500">★★★★★ (124)</span>
            <span className="font-semibold text-success">Free</span>
          </div>
          <GradientButton className="w-full" size="sm">Install</GradientButton>
        </GlassCard>
        
        <GlassCard className="p-4 flex flex-col">
          <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-md mb-4 flex items-center justify-center">
             <span className="material-symbols-outlined text-4xl text-purple-500">article</span>
          </div>
          <h3 className="font-semibold">Copywriting Prompts</h3>
          <p className="text-xs text-text-muted mt-1 mb-2 flex-grow">A pack of 50+ optimized prompts for marketing copy.</p>
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-amber-500">★★★★☆ (89)</span>
            <span className="font-semibold">$4.99</span>
          </div>
          <GradientButton className="w-full" variant="outline" size="sm">Purchase</GradientButton>
        </GlassCard>
      </div>
    </div>
  );
}