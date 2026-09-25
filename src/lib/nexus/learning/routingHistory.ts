import { RoutingFeedback } from "./types";

export interface RoutingRecord extends RoutingFeedback {
  intent: string;
  promptPreview: string;
  responsePreview: string;
  costEstimate: number;
}

export class RoutingHistory {
  private history: RoutingRecord[] = [];
  private readonly maxHistorySize = 10000;

  /**
   * Adds a new record to the routing history.
   */
  public addRecord(record: RoutingRecord): void {
    if (this.history.length >= this.maxHistorySize) {
      this.history.shift(); // Remove oldest
    }
    this.history.push(record);
  }

  /**
   * Gets recent routing history.
   */
  public getRecentHistory(limit: number = 50): RoutingRecord[] {
    return this.history.slice(-limit).reverse();
  }

  /**
   * Gets analytics on model usage and success rates.
   */
  public getAnalytics(): Record<string, { total: number; success: number }> {
    const stats: Record<string, { total: number; success: number }> = {};
    for (const record of this.history) {
      const key = `${record.providerId}:${record.modelId}`;
      if (!stats[key]) {
        stats[key] = { total: 0, success: 0 };
      }
      stats[key].total++;
      if (record.success) {
        stats[key].success++;
      }
    }
    return stats;
  }
}

export const routingHistory = new RoutingHistory();
