export type ConsensusMode = "single" | "dual" | "triple" | "reviewer";

export interface ConsensusConfig {
  mode: ConsensusMode;
  models: string[];
  reviewerModel?: string;
  mergeStrategy: "best" | "synthesize" | "majority" | "longest";
  timeout: number;
}

export interface ConsensusResult {
  finalOutput: string;
  mode: ConsensusMode;
  modelOutputs: ModelOutput[];
  reviewerFeedback?: string;
  consensus: { agreed: boolean; confidence: number; divergenceAreas: string[] };
  metadata: { totalLatencyMs: number; totalTokens: number; totalCost: number };
}

export interface ModelOutput {
  modelId: string;
  providerId: string;
  output: string;
  latencyMs: number;
  tokens: { input: number; output: number };
  quality?: number;
}
