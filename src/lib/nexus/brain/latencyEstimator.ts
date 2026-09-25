import { IntentAnalysis, ModelRecommendation, LatencyEstimate } from "./types";

/**
 * Estimate response latency for model recommendations
 */
export function estimateLatencies(
  intent: IntentAnalysis,
  recommendations: ModelRecommendation[]
): ModelRecommendation[] {
  const { input, output } = intent.estimatedTokens;

  return recommendations.map(rec => {
    // Simple heuristic: 
    // Faster models have lower ms per token.
    // E.g. speed score 100 = 10ms/token, 50 = 30ms/token
    const speed = rec.capabilities.speed || 50;
    const msPerToken = Math.max(5, 50 - (speed * 0.4));
    
    // Time to first token
    const ttft = 200 + (input * 0.05) + ((100 - speed) * 5);
    
    // Total time
    const total = ttft + (output * msPerToken);
    
    const estimatedLatency: LatencyEstimate = {
      estimatedFirstTokenMs: ttft,
      estimatedTotalMs: total,
      p50Ms: total * 0.9,
      p95Ms: total * 1.5,
      confidence: 0.7
    };

    return { ...rec, estimatedLatency };
  });
}
