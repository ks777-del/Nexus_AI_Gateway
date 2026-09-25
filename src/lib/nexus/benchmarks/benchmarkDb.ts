import { BenchmarkResult, BenchmarkLeaderboardEntry } from "./types";

let benchmarkResults: BenchmarkResult[] = [];

// Pre-populated mock data
const mockModels = [
  { id: "gpt-4o", provider: "openai" },
  { id: "claude-3-5-sonnet-20240620", provider: "anthropic" },
  { id: "gemini-2.0-flash", provider: "google" },
  { id: "deepseek-chat", provider: "deepseek" },
  { id: "llama-3-1-70b-versatile", provider: "groq" }
];

export function getLeaderboard(): BenchmarkLeaderboardEntry[] {
  const entries: BenchmarkLeaderboardEntry[] = mockModels.map(m => {
    return {
      modelId: m.id,
      providerId: m.provider,
      overallScore: Math.floor(Math.random() * 20) + 80,
      dimensions: {
        latency: Math.floor(Math.random() * 20) + 80,
        coding: Math.floor(Math.random() * 20) + 80,
        reasoning: Math.floor(Math.random() * 20) + 80,
        math: Math.floor(Math.random() * 20) + 80,
        streaming: Math.floor(Math.random() * 20) + 80,
        reliability: Math.floor(Math.random() * 20) + 80,
        accuracy: Math.floor(Math.random() * 20) + 80
      },
      lastBenchmarked: Date.now(),
      totalRuns: Math.floor(Math.random() * 100) + 10
    };
  });
  
  return entries.sort((a, b) => b.overallScore - a.overallScore);
}

export function saveResult(result: BenchmarkResult) {
  benchmarkResults.push(result);
}

export function getHistory(modelId: string): BenchmarkResult[] {
  return benchmarkResults.filter(r => r.modelId === modelId);
}
