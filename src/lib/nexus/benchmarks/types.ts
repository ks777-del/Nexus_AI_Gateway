export type BenchmarkDimension = "latency" | "coding" | "reasoning" | "math" | "streaming" | "reliability" | "accuracy";

export interface BenchmarkSuite {
  id: string;
  name: string;
  description: string;
  dimension: BenchmarkDimension;
  prompts: BenchmarkPrompt[];
}

export interface BenchmarkPrompt {
  id: string;
  prompt: string;
  expectedPattern?: string;
  maxLatencyMs?: number;
  evaluationCriteria: string;
}

export interface BenchmarkResult {
  id: string;
  suiteId: string;
  modelId: string;
  providerId: string;
  dimension: BenchmarkDimension;
  score: number;
  latencyMs: number;
  tokenCount: { input: number; output: number };
  success: boolean;
  error?: string;
  timestamp: number;
}

export interface BenchmarkLeaderboardEntry {
  modelId: string;
  providerId: string;
  overallScore: number;
  dimensions: Record<BenchmarkDimension, number>;
  lastBenchmarked: number;
  totalRuns: number;
}
