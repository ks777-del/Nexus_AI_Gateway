"use client";
import React from "react";
import { GlassCard, GradientButton, StatusBadge } from "@/shared/components/nexus";

export default function NexusPluginsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-main">Plugin Manager</h1>
        <GradientButton>Install Plugin</GradientButton>
      </div>
      
      <div className="flex gap-4 border-b border-border pb-2">
        <button className="text-brand-primary font-semibold border-b-2 border-brand-primary px-2">Installed</button>
        <button className="text-text-muted px-2">Available</button>
        <button className="text-text-muted px-2">Updates</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-brand-primary">extension</span>
            <div>
              <h3 className="font-semibold">OpenAI Provider</h3>
              <p className="text-xs text-text-muted">v2.1.0 • LLM Provider</p>
            </div>
          </div>
          <p className="text-sm text-text-muted flex-grow">Native integration for OpenAI models including GPT-4o and o1.</p>
          <div className="flex justify-between items-center mt-2">
            <StatusBadge status="success">Enabled</StatusBadge>
            <button className="text-sm text-text-muted hover:text-text-main">Settings</button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-brand-primary">extension</span>
            <div>
              <h3 className="font-semibold">Anthropic Provider</h3>
              <p className="text-xs text-text-muted">v1.8.2 • LLM Provider</p>
            </div>
          </div>
          <p className="text-sm text-text-muted flex-grow">Integration for Claude 3.5 Sonnet and Opus models.</p>
          <div className="flex justify-between items-center mt-2">
            <StatusBadge status="success">Enabled</StatusBadge>
            <button className="text-sm text-text-muted hover:text-text-main">Settings</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}