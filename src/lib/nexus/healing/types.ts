export type ProviderHealthStatus = "healthy" | "degraded" | "down";

export interface ProviderHealth {
  providerId: string;
  status: ProviderHealthStatus;
  errorRate: number;
  avgLatencyMs: number;
  lastChecked: number;
  consecutiveFailures: number;
}

export interface HealingEvent {
  id: string;
  timestamp: number;
  type: "retry" | "fallback" | "circuit_breaker_open" | "circuit_breaker_close";
  providerId: string;
  modelId: string;
  reason: string;
  successful: boolean;
}
