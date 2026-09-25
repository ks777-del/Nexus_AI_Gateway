"use client";

import { useState, useEffect } from "react";
import { 
  GlassCard, 
  GradientButton, 
  StatusBadge 
} from "@/shared/components/nexus";
import { BenchmarkLeaderboardEntry } from "@/lib/nexus/benchmarks";

export default function BenchmarksPage() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "history" | "configure">("leaderboard");
  const [leaderboard, setLeaderboard] = useState<BenchmarkLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/nexus/benchmarks");
      const result = await res.json();
      if (result.success) {
        setLeaderboard(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleRunBenchmarks = async () => {
    setIsBenchmarking(true);
    try {
      await fetch("/api/nexus/benchmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: "gpt-4o",
          providerId: "openai"
        })
      });
      await fetchLeaderboard();
    } catch (error) {
      console.error("Failed to run benchmarks", error);
    } finally {
      setIsBenchmarking(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            Benchmark Leaderboard
            <StatusBadge status="active" label="Live" />
          </h1>
          <p className="text-text-muted mt-1">Dynamic capability evaluation and scoring</p>
        </div>
        
        <GradientButton onClick={handleRunBenchmarks} loading={isBenchmarking}>
          Run Benchmarks
        </GradientButton>
      </div>

      <div className="flex gap-2 p-1 bg-bg-subtle border border-border rounded-lg w-fit">
        {(["leaderboard", "history", "configure"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab 
                ? "bg-surface text-text-main shadow-sm" 
                : "text-text-muted hover:text-text-main"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <GlassCard>
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse h-64 bg-bg-subtle/50 rounded-lg" />
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                No benchmark data available.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-3 text-sm font-semibold text-text-main">Rank</th>
                      <th className="p-3 text-sm font-semibold text-text-main">Model</th>
                      <th className="p-3 text-sm font-semibold text-text-main">Provider</th>
                      <th className="p-3 text-sm font-semibold text-text-main">Overall Score</th>
                      <th className="p-3 text-sm font-semibold text-text-muted">Reasoning</th>
                      <th className="p-3 text-sm font-semibold text-text-muted">Coding</th>
                      <th className="p-3 text-sm font-semibold text-text-muted">Math</th>
                      <th className="p-3 text-sm font-semibold text-text-muted">Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={`${entry.modelId}-${entry.providerId}`} className="border-b border-border/50 hover:bg-bg-subtle/50">
                        <td className="p-3 font-medium text-text-muted">#{index + 1}</td>
                        <td className="p-3 font-semibold text-text-main">{entry.modelId}</td>
                        <td className="p-3 text-text-muted capitalize">{entry.providerId}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                            {Math.round(entry.overallScore)}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{Math.round(entry.dimensions.reasoning || 0)}</td>
                        <td className="p-3 text-sm">{Math.round(entry.dimensions.coding || 0)}</td>
                        <td className="p-3 text-sm">{Math.round(entry.dimensions.math || 0)}</td>
                        <td className="p-3 text-sm">{Math.round(entry.dimensions.latency || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="text-center py-12 text-text-muted">
            Benchmark history timeline view coming soon.
          </div>
        )}

        {activeTab === "configure" && (
          <div className="text-center py-12 text-text-muted">
            Benchmark suite configuration coming soon.
          </div>
        )}
      </GlassCard>
    </div>
  );
}
