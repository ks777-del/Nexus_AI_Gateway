import { BrainRequest, BrainAnalysis, RoutingExplanation } from "./types";
import { detectIntent } from "./intentDetector";
import { analyzeContext } from "./contextAnalyzer";
import { matchCapabilities } from "./capabilityMatcher";
import { predictCosts } from "./costPredictor";
import { estimateLatencies } from "./latencyEstimator";

export * from "./types";

/**
 * Main Brain module orchestrator.
 * Connects all analysis and prediction modules to form a complete BrainAnalysis.
 */
export async function analyzeBrain(request: BrainRequest): Promise<BrainAnalysis> {
  // 1. Detect Intent
  const intent = detectIntent(request.prompt);

  // 2. Analyze Context
  const contextAnalysis = analyzeContext(request.prompt, request.messages);

  // 3. Match Capabilities
  let recommendations = matchCapabilities(intent, request.availableModels);

  // 4. Predict Costs
  recommendations = predictCosts(intent, recommendations);

  // 5. Estimate Latencies
  recommendations = estimateLatencies(intent, recommendations);

  // Re-sort based on a combined heuristic of score, cost, and latency
  recommendations.sort((a, b) => {
    // Arbitrary weightings for demonstration
    const scoreWeight = a.score * 10;
    const costPenalty = a.estimatedCost.totalEstimatedCost * 100; // Penalize high cost
    const latencyPenalty = a.estimatedLatency.estimatedTotalMs / 1000; // Penalize high latency
    const aTotal = scoreWeight - costPenalty - latencyPenalty;
    
    const bScoreWeight = b.score * 10;
    const bCostPenalty = b.estimatedCost.totalEstimatedCost * 100;
    const bLatencyPenalty = b.estimatedLatency.estimatedTotalMs / 1000;
    const bTotal = bScoreWeight - bCostPenalty - bLatencyPenalty;
    
    return bTotal - aTotal;
  });

  const selectedModel = recommendations[0];

  const routingExplanation: RoutingExplanation = {
    selectedModel: selectedModel.modelId,
    reason: selectedModel.reason,
    confidence: selectedModel.confidence,
    capabilityScore: selectedModel.score,
    latencyEstimate: `${Math.round(selectedModel.estimatedLatency.estimatedTotalMs)}ms`,
    costEstimate: `$${selectedModel.estimatedCost.totalEstimatedCost.toFixed(4)}`,
    breakdown: [
      { factor: "Capability Score", weight: 0.6, score: selectedModel.score, detail: "Model capabilities strongly match intent." },
      { factor: "Cost", weight: 0.2, score: 100 - (selectedModel.estimatedCost.totalEstimatedCost * 1000), detail: "Cost efficiency within acceptable range." },
      { factor: "Latency", weight: 0.2, score: 100 - (selectedModel.estimatedLatency.estimatedTotalMs / 100), detail: "Expected response time is fast." }
    ]
  };

  return {
    intent,
    recommendations,
    selectedModel,
    routingExplanation,
    contextAnalysis
  };
}
