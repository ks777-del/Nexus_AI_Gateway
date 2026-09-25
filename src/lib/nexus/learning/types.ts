export interface RoutingFeedback {
  requestId: string;
  modelId: string;
  providerId: string;
  rating: number;   // 1-5
  success: boolean;
  retried: boolean;
  latencyMs: number;
  tokenCount: number;
  timestamp: number;
}

export interface ModelPreference {
  modelId: string;
  providerId: string;
  score: number;         // exponential moving average
  totalRequests: number;
  successRate: number;
  avgRating: number;
  avgLatencyMs: number;
  lastUsed: number;
}

export interface LearningState {
  preferences: Map<string, ModelPreference>;
  totalFeedback: number;
  lastUpdated: number;
}
