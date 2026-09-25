import { LatencyOptimizationCandidate, LatencyBudget } from "./types";

export class LatencyOptimizer {
  private readonly defaultBudget: LatencyBudget = {
    maxLatencyMs: 20128,
    p99LatencyMs: 5000,
    strict: false,
  };

  /**
   * Re-ranks candidates to prefer faster models when quality difference is negligible.
   */
  public optimizeLatency(
    prompt: string,
    intent: string,
    candidates: LatencyOptimizationCandidate[],
    budget: LatencyBudget = this.defaultBudget
  ): LatencyOptimizationCandidate[] {
    if (!candidates || candidates.length === 0) return [];

    // Filter out candidates exceeding strict budget
    let viableCandidates = candidates;
    if (budget.strict) {
      viableCandidates = candidates.filter(c => c.expectedLatencyMs <= budget.maxLatencyMs);
      
      // Fallback if all are filtered out
      if (viableCandidates.length === 0) {
        viableCandidates = candidates; 
      }
    }

    // Sort by a combined score: prioritize quality, but heavily penalize high latency
    viableCandidates.sort((a, b) => {
      const latencyWeight = 0.5;
      const qualityWeight = 0.5;

      // Normalize latency (lower is better, max normalized is 1)
      const maxLat = Math.max(...viableCandidates.map(c => c.expectedLatencyMs));
      const normLatA = a.expectedLatencyMs / maxLat;
      const normLatB = b.expectedLatencyMs / maxLat;

      // Normalize quality (higher is better, assumed 0-1)
      const maxQual = Math.max(...viableCandidates.map(c => c.qualityScore));
      const normQualA = maxQual > 0 ? a.qualityScore / maxQual : 0;
      const normQualB = maxQual > 0 ? b.qualityScore / maxQual : 0;

      const scoreA = (normQualA * qualityWeight) - (normLatA * latencyWeight);
      const scoreB = (normQualB * qualityWeight) - (normLatB * latencyWeight);

      return scoreB - scoreA; // Descending order of combined score
    });

    return viableCandidates;
  }
}

export const latencyOptimizer = new LatencyOptimizer();
