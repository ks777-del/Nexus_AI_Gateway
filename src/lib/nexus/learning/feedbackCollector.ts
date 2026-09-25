import { RoutingFeedback } from "./types";
import { learningRouter } from "./learningRouter";

export class FeedbackCollector {
  private batch: RoutingFeedback[] = [];
  private readonly batchSize = 10;
  private flushIntervalId?: NodeJS.Timeout;

  constructor() {
    this.startAutoFlush();
  }

  /**
   * Record user-provided feedback (e.g., thumbs up/down, star ratings)
   */
  public recordUserFeedback(feedback: Omit<RoutingFeedback, "success" | "retried" | "latencyMs" | "tokenCount">): void {
    this.addFeedback({
      ...feedback,
      success: true, // Assuming user feedback implies the request didn't throw an error
      retried: false,
      latencyMs: 0, // Need accurate latency if available
      tokenCount: 0,
    });
  }

  /**
   * Record implicit feedback from system execution (e.g., latency, errors)
   */
  public recordImplicitFeedback(feedback: RoutingFeedback): void {
    this.addFeedback(feedback);
  }

  private addFeedback(feedback: RoutingFeedback): void {
    this.batch.push(feedback);
    if (this.batch.length >= this.batchSize) {
      this.flush();
    }
  }

  public flush(): void {
    if (this.batch.length === 0) return;

    for (const feedback of this.batch) {
      learningRouter.recordFeedback(feedback);
    }

    this.batch = [];
  }

  private startAutoFlush(): void {
    this.flushIntervalId = setInterval(() => {
      this.flush();
    }, 60000); // Flush every minute
  }

  public stopAutoFlush(): void {
    if (this.flushIntervalId) {
      clearInterval(this.flushIntervalId);
    }
  }
}

export const feedbackCollector = new FeedbackCollector();
