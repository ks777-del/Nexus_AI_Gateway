export interface RoutingBreakdown {
  factor: string;
  score: number;
  weight: number;
}

export interface AlternativeRoute {
  model: string;
  provider: string;
  score: number;
}

export interface ExplainedRoute {
  selectedModel: string;
  selectedProvider: string;
  reason: string;
  confidence: number;
  capabilityScore: number;
  latencyEstimate: string;
  costEstimate: string;
  breakdown: RoutingBreakdown[];
  alternatives: AlternativeRoute[];
}

export function generateRoutingExplanation(route: any, breakdown: RoutingBreakdown[], alternatives: AlternativeRoute[]): ExplainedRoute {
  return {
    selectedModel: route.model,
    selectedProvider: route.provider,
    reason: `Selected ${route.model} due to high capability score and optimal context fit.`,
    confidence: 0.92,
    capabilityScore: 0.88,
    latencyEstimate: "~850ms",
    costEstimate: "$0.002",
    breakdown,
    alternatives,
  };
}
