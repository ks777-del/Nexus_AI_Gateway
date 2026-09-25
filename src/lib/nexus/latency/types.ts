export interface LatencyOptimizationCandidate {
  modelId: string;
  providerId: string;
  expectedLatencyMs: number;
  qualityScore: number;
}

export interface LatencyBudget {
  maxLatencyMs: number;
  p99LatencyMs: number;
  strict: boolean;
}
