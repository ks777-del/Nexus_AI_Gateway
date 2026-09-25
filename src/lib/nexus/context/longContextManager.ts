import { ContextSegment, ContextConfig } from "./types";

/**
 * Sliding window and recursive summarization for contexts exceeding model limits.
 */
export class LongContextManager {
  private config: ContextConfig;

  constructor(config: ContextConfig) {
    this.config = config;
  }

  public applySlidingWindow(segments: ContextSegment[], windowSizeTokens: number): ContextSegment[] {
    let currentTokens = 0;
    const window: ContextSegment[] = [];
    
    // Process from most recent (assuming last is most recent if chronological)
    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i];
      if (currentTokens + seg.tokenCount <= windowSizeTokens) {
        window.unshift(seg);
        currentTokens += seg.tokenCount;
      } else {
        break;
      }
    }
    
    return window;
  }
}
