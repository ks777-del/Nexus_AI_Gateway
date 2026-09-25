import { ContextSegment, ContextConfig } from "./types";

/**
 * Priority-based compression.
 * Preserves high-priority segments, filters or truncates low-priority ones.
 */
export function compressContext(
  segments: ContextSegment[],
  config: ContextConfig
): ContextSegment[] {
  // Sort by priority descending
  const sorted = [...segments].sort((a, b) => b.priority - a.priority);
  const compressed: ContextSegment[] = [];
  let currentTokens = 0;

  for (const seg of sorted) {
    // Drop segments below priority threshold if we are getting tight on tokens
    if (currentTokens > config.maxTokens * 0.8 && seg.priority < config.priorityThreshold) {
      continue;
    }

    if (currentTokens + seg.tokenCount <= config.maxTokens) {
      compressed.push(seg);
      currentTokens += seg.tokenCount;
    } else {
      // Partial inclusion (naive truncation for now)
      const allowedTokens = config.maxTokens - currentTokens;
      if (allowedTokens > 50) {
        // rough char/token ratio 4
        const chars = allowedTokens * 4;
        compressed.push({
          ...seg,
          content: seg.content.slice(0, chars) + "... [truncated]",
          tokenCount: allowedTokens,
        });
        currentTokens += allowedTokens;
      }
      break; // No more token budget
    }
  }

  return compressed.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
}
