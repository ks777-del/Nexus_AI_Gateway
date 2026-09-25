export interface IntentAnalysis {
  primaryIntent: Intent;
  secondaryIntents: Intent[];
  confidence: number;
  complexity: "simple" | "moderate" | "complex" | "expert";
  requiresReasoning: boolean;
  requiresVision: boolean;
  requiresToolUse: boolean;
  estimatedTokens: { input: number; output: number };
}

export type Intent = "coding" | "writing" | "math" | "reasoning" | "translation" | "vision" | "search" | "conversation" | "analysis" | "creative" | "summarization" | "data_extraction";

export interface ModelRecommendation {
  modelId: string;
  providerId: string;
  score: number;
  reason: string;
  confidence: number;
  capabilities: CapabilityProfile;
  estimatedCost: CostEstimate;
  estimatedLatency: LatencyEstimate;
}

export interface CapabilityProfile {
  coding: number;        // 0-100
  writing: number;
  math: number;
  vision: number;
  reasoning: number;
  longContext: number;
  toolUse: number;
  translation: number;
  speed: number;
  costEfficiency: number;
  reliability: number;
  safety: number;
  functionCalling: number;
  streaming: number;
}

export interface CostEstimate {
  inputTokenCost: number;
  outputTokenCost: number;
  totalEstimatedCost: number;
  currency: string;
  cheaper_alternatives?: Array<{ modelId: string; savings: number }>;
}

export interface LatencyEstimate {
  estimatedFirstTokenMs: number;
  estimatedTotalMs: number;
  p50Ms: number;
  p95Ms: number;
  confidence: number;
}

export interface BrainAnalysis {
  intent: IntentAnalysis;
  recommendations: ModelRecommendation[];
  selectedModel: ModelRecommendation;
  routingExplanation: RoutingExplanation;
  contextAnalysis: ContextAnalysis;
}

export interface RoutingExplanation {
  selectedModel: string;
  reason: string;
  confidence: number;
  capabilityScore: number;
  latencyEstimate: string;
  costEstimate: string;
  breakdown: Array<{ factor: string; weight: number; score: number; detail: string }>;
}

export interface ContextAnalysis {
  tokenCount: number;
  messageCount: number;
  hasImages: boolean;
  hasFiles: boolean;
  hasCode: boolean;
  dominantLanguage: string;
  suggestedStrategy: "direct" | "compress" | "summarize" | "truncate" | "split";
}

export interface BrainRequest {
  prompt: string;
  messages: Array<{ role: string; content: any }>;
  availableModels: Array<{ id: string; providerId: string }>;
}
