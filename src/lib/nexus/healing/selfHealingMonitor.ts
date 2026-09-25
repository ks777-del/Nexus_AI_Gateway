import { ProviderHealth, ProviderHealthStatus, HealingEvent } from "./types";

export class SelfHealingMonitor {
  private healthMap: Map<string, ProviderHealth> = new Map();
  private events: HealingEvent[] = [];
  
  private readonly degradedThreshold = 0.1; // 10% error rate
  private readonly downThreshold = 0.5; // 50% error rate
  private readonly circuitBreakerFailures = 5;

  /**
   * Reports a request outcome to update provider health.
   */
  public reportOutcome(providerId: string, success: boolean, latencyMs: number): void {
    let health = this.healthMap.get(providerId);
    const now = Date.now();

    if (!health) {
      health = {
        providerId,
        status: "healthy",
        errorRate: 0,
        avgLatencyMs: latencyMs,
        lastChecked: now,
        consecutiveFailures: 0,
      };
    }

    // Update stats (simple moving average for demonstration)
    const alpha = 0.1;
    health.errorRate = health.errorRate * (1 - alpha) + (success ? 0 : 1) * alpha;
    health.avgLatencyMs = health.avgLatencyMs * (1 - alpha) + latencyMs * alpha;
    health.lastChecked = now;

    if (success) {
      health.consecutiveFailures = 0;
    } else {
      health.consecutiveFailures++;
    }

    // Determine status
    if (health.consecutiveFailures >= this.circuitBreakerFailures || health.errorRate >= this.downThreshold) {
      if (health.status !== "down") {
        this.logEvent("circuit_breaker_open", providerId, "unknown", "High failure rate", false);
      }
      health.status = "down";
    } else if (health.errorRate >= this.degradedThreshold) {
      health.status = "degraded";
    } else {
      if (health.status === "down") {
        this.logEvent("circuit_breaker_close", providerId, "unknown", "Recovery detected", true);
      }
      health.status = "healthy";
    }

    this.healthMap.set(providerId, health);
  }

  /**
   * Logs a healing event (e.g., fallback, retry).
   */
  public logEvent(type: HealingEvent["type"], providerId: string, modelId: string, reason: string, successful: boolean): void {
    this.events.unshift({
      id: `heal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      providerId,
      modelId,
      reason,
      successful,
    });

    if (this.events.length > 1000) {
      this.events.pop();
    }
  }

  /**
   * Gets the health status of a provider.
   */
  public getHealth(providerId: string): ProviderHealthStatus {
    return this.healthMap.get(providerId)?.status || "healthy";
  }

  /**
   * Gets all provider healths.
   */
  public getAllHealth(): ProviderHealth[] {
    return Array.from(this.healthMap.values());
  }

  /**
   * Gets recent healing events.
   */
  public getRecentEvents(limit: number = 50): HealingEvent[] {
    return this.events.slice(0, limit);
  }
}

export const selfHealingMonitor = new SelfHealingMonitor();
