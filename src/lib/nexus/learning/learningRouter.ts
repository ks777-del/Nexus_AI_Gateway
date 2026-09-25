import { ModelPreference, RoutingFeedback, LearningState } from "./types";

export class LearningRouter {
  private state: LearningState;
  private readonly alpha = 0.2; // Exponential moving average smoothing factor
  private readonly decayRate = 0.95; // Decay factor for stale preferences
  private readonly decayIntervalMs = 24 * 60 * 60 * 1000; // 1 day

  constructor() {
    this.state = {
      preferences: new Map(),
      totalFeedback: 0,
      lastUpdated: Date.now(),
    };
  }

  /**
   * Records feedback and updates model preference scores using EMA.
   */
  public recordFeedback(feedback: RoutingFeedback): void {
    const key = `${feedback.providerId}:${feedback.modelId}`;
    let pref = this.state.preferences.get(key);

    if (!pref) {
      pref = {
        modelId: feedback.modelId,
        providerId: feedback.providerId,
        score: 0.5,
        totalRequests: 0,
        successRate: 1.0,
        avgRating: 3.0,
        avgLatencyMs: feedback.latencyMs,
        lastUsed: feedback.timestamp,
      };
    }

    // Update stats
    pref.totalRequests++;
    pref.successRate = pref.successRate * (1 - this.alpha) + (feedback.success ? 1 : 0) * this.alpha;
    pref.avgRating = pref.avgRating * (1 - this.alpha) + feedback.rating * this.alpha;
    pref.avgLatencyMs = pref.avgLatencyMs * (1 - this.alpha) + feedback.latencyMs * this.alpha;
    pref.lastUsed = feedback.timestamp;

    // Calculate composite score (0-1)
    // Higher rating is better, higher success is better, lower latency is better
    const latencyScore = Math.max(0, 1 - (pref.avgLatencyMs / 5000)); // Assume > 5s is bad
    const ratingScore = (pref.avgRating - 1) / 4; // Normalize 1-5 to 0-1
    pref.score = (pref.successRate * 0.5) + (ratingScore * 0.3) + (latencyScore * 0.2);

    this.state.preferences.set(key, pref);
    this.state.totalFeedback++;
    this.state.lastUpdated = Date.now();
  }

  /**
   * Retrieves the learned preference for a given model.
   */
  public getLearnedPreference(providerId: string, modelId: string): ModelPreference | undefined {
    this.applyDecay();
    return this.state.preferences.get(`${providerId}:${modelId}`);
  }

  /**
   * Gets top models based on learned scores.
   * @param intent Optional intent to filter top models (simplified for now).
   * @param n Number of models to return.
   */
  public getTopModels(intent: string, n: number): ModelPreference[] {
    this.applyDecay();
    const allPrefs = Array.from(this.state.preferences.values());
    allPrefs.sort((a, b) => b.score - a.score);
    return allPrefs.slice(0, n);
  }

  /**
   * Decays preferences for models not used recently.
   */
  private applyDecay(): void {
    const now = Date.now();
    if (now - this.state.lastUpdated > this.decayIntervalMs) {
      const daysElapsed = Math.floor((now - this.state.lastUpdated) / this.decayIntervalMs);
      const decayFactor = Math.pow(this.decayRate, daysElapsed);

      for (const pref of this.state.preferences.values()) {
        if (now - pref.lastUsed > this.decayIntervalMs) {
          pref.score *= decayFactor;
        }
      }
      this.state.lastUpdated = now;
    }
  }
}

export const learningRouter = new LearningRouter();
