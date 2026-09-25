export interface RoutingFactors {
  quality: number;
  latency: number;
  cost: number;
  availability: number;
  userPreference: number;
  capabilityMatch: number;
  historicalPerformance: number;
  healthScore: number;
  contextFit: number;
  reliability: number;
}

export interface ModelRoute {
  model: string;
  provider: string;
}

/**
 * 10-factor scoring engine for model routing.
 */
export function scoreRoute(route: ModelRoute, factors: Partial<RoutingFactors>): number {
  const weights = {
    quality: 0.2,
    latency: 0.15,
    cost: 0.1,
    availability: 0.1,
    userPreference: 0.05,
    capabilityMatch: 0.15,
    historicalPerformance: 0.05,
    healthScore: 0.1,
    contextFit: 0.05,
    reliability: 0.05,
  };

  let totalScore = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const val = (factors as any)[key] ?? 0.5; // Default score of 0.5 if unknown
    totalScore += val * weight;
  }

  return totalScore;
}
