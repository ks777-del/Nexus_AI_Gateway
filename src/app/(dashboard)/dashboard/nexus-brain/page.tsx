"use client";

import { useState, useEffect } from "react";
import { 
  GlassCard, 
  MetricCard, 
  StatusBadge, 
  GradientButton, 
  RadarChart 
} from "@/shared/components/nexus";
import { BrainAnalysis } from "@/lib/nexus/brain";

export default function NexusBrainPage() {
  const [prompt, setPrompt] = useState("Explain the concept of quantum entanglement as if I were five years old.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BrainAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch("/api/nexus/brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          availableModels: [
            { id: "gpt-4o", provider: "openai" },
            { id: "claude-3-5-sonnet", provider: "anthropic" },
            { id: "gemini-1.5-pro", provider: "google" }
          ],
          messages: []
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze prompt");
      }
      
      setAnalysis(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Run initial analysis
    handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radarModels = analysis ? analysis.recommendations.slice(0, 3).map(rec => ({
    name: rec.modelId,
    data: [
      { dimension: "Reasoning", score: Math.round(rec.score * 0.9) },
      { dimension: "Coding", score: Math.round(rec.score * 0.8) },
      { dimension: "Latency", score: Math.round(Math.max(0, 100 - (rec.estimatedLatency.estimatedTotalMs / 100))) },
      { dimension: "Cost", score: Math.round(Math.max(0, 100 - (rec.estimatedCost.totalEstimatedCost * 1000))) },
      { dimension: "Context", score: Math.round(rec.score * 0.95) }
    ]
  })) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            AI Brain 
            <StatusBadge status="active" label="Online" />
          </h1>
          <p className="text-text-muted mt-1">Cognitive routing and intent analysis engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Intent Analyzer */}
        <GlassCard className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-text-main">Intent Analyzer</h2>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-muted">Test Prompt</label>
            <textarea
              className="w-full h-32 p-3 rounded-md bg-bg-subtle border border-border text-text-main focus:ring-2 focus:ring-primary/50 outline-none resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt to analyze..."
            />
          </div>
          
          <GradientButton 
            onClick={handleAnalyze} 
            loading={isAnalyzing}
            className="w-full"
          >
            Analyze Intent
          </GradientButton>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-4 p-4 rounded-md bg-bg-subtle/50 border border-border space-y-4">
              <div>
                <h3 className="text-sm font-medium text-text-muted">Detected Intent</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-semibold capitalize text-primary">
                    {analysis.intent.primaryCategory}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(analysis.intent.confidenceScore * 100)}% Confidence
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-text-muted">Recommended Model</h3>
                <div className="mt-1 font-medium text-text-main">
                  {analysis.selectedModel.modelId}
                </div>
                <p className="text-sm text-text-muted mt-1">
                  {analysis.selectedModel.reason}
                </p>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Right Column - Status Metrics */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Total Analyses"
              value="1,284"
              trend={{ value: 12.5, isPositive: true }}
              icon="analytics"
            />
            <MetricCard
              title="Avg Confidence"
              value="94.2%"
              trend={{ value: 2.1, isPositive: true }}
              icon="verified"
            />
            <MetricCard
              title="Routing Latency"
              value="12ms"
              trend={{ value: 4.5, isPositive: false }}
              icon="speed"
            />
            <MetricCard
              title="Cost Savings"
              value="$42.50"
              trend={{ value: 18.2, isPositive: true }}
              icon="savings"
            />
          </div>
          
          <GlassCard className="flex-1">
            <h2 className="text-lg font-semibold text-text-main mb-4">Top Intents Distribution</h2>
            <div className="space-y-4">
              {[
                { name: "Reasoning", value: 45 },
                { name: "Coding", value: 30 },
                { name: "Creative Writing", value: 15 },
                { name: "Factual Query", value: 10 }
              ].map((intent) => (
                <div key={intent.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-main">{intent.name}</span>
                    <span className="text-text-muted">{intent.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/80 rounded-full" 
                      style={{ width: `${intent.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Section - Radar Chart */}
      {analysis && radarModels.length > 0 && (
        <GlassCard>
          <h2 className="text-lg font-semibold text-text-main mb-4">Model Capability Comparison</h2>
          <div className="h-[400px] w-full">
            <RadarChart 
              models={radarModels}
            />
          </div>
        </GlassCard>
      )}
    </div>
  );
}
