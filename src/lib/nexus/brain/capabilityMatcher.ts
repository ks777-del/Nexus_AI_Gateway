import { IntentAnalysis, ModelRecommendation, CostEstimate, LatencyEstimate } from "./types";
import { getCapabilityProfile } from "../capabilities/capabilityDb";
import { scoreCapabilities } from "../capabilities/capabilityScorer";

/**
 * Matches detected intent to available models and ranks them.
 */
export function matchCapabilities(
  intent: IntentAnalysis,
  availableModels: Array<{ id: string; providerId: string }>
): ModelRecommendation[] {
  const recommendations: ModelRecommendation[] = [];

  for (const model of availableModels) {
    const profile = getCapabilityProfile(model.id, model.providerId);
    
    // Default estimates to be populated later by specific predictors
    const dummyCost: CostEstimate = { inputTokenCost: 0, outputTokenCost: 0, totalEstimatedCost: 0, currency: "USD" };
    const dummyLatency: LatencyEstimate = { estimatedFirstTokenMs: 0, estimatedTotalMs: 0, p50Ms: 0, p95Ms: 0, confidence: 0 };
    
    const scoreResult = scoreCapabilities(intent, profile);

    recommendations.push({
      modelId: model.id,
      providerId: model.providerId,
      score: scoreResult.score,
      reason: scoreResult.reason,
      confidence: scoreResult.confidence,
      capabilities: profile,
      estimatedCost: dummyCost,
      estimatedLatency: dummyLatency,
    });
  }

  // Sort descending by score
  return recommendations.sort((a, b) => b.score - a.score);
}
