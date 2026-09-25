import { IntentAnalysis, ModelRecommendation, CostEstimate } from "./types";

/**
 * Basic hardcoded pricing for demonstration (per 1M tokens)
 */
const MOCK_PRICING: Record<string, { in: number; out: number }> = {
  "gpt-4o": { in: 5, out: 15 },
  "claude-3-5-sonnet": { in: 3, out: 15 },
  "gemini-1.5-pro": { in: 3.5, out: 10.5 },
  "llama-3-70b": { in: 0.5, out: 0.5 },
};

/**
 * Predict costs for model recommendations based on estimated tokens
 */
export function predictCosts(
  intent: IntentAnalysis,
  recommendations: ModelRecommendation[]
): ModelRecommendation[] {
  const { input, output } = intent.estimatedTokens;

  return recommendations.map(rec => {
    // Attempt to match model ID to mock pricing, default to 1/1 if unknown
    const pricingKey = Object.keys(MOCK_PRICING).find(k => rec.modelId.includes(k));
    const rates = pricingKey ? MOCK_PRICING[pricingKey] : { in: 1, out: 1 };
    
    const inCost = (input / 1_000_000) * rates.in;
    const outCost = (output / 1_000_000) * rates.out;
    const total = inCost + outCost;

    const estimatedCost: CostEstimate = {
      inputTokenCost: inCost,
      outputTokenCost: outCost,
      totalEstimatedCost: total,
      currency: "USD",
      cheaper_alternatives: [] // Could be populated by comparing with others
    };

    return { ...rec, estimatedCost };
  });
}
