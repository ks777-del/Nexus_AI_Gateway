import { ContextSegment, BuiltContext, ContextConfig } from "./types";
import { prioritizeContext } from "./contextPrioritizer";
import { compressContext } from "./contextCompressor";
import { summarizeContext } from "./contextSummarizer";

/**
 * Aggregates all context sources into a unified BuiltContext.
 */
export async function buildContext(
  requestContexts: ContextSegment[],
  config: ContextConfig
): Promise<BuiltContext> {
  let segments = [...requestContexts];
  let strategy = "standard";
  let compressed = false;
  let summarized = false;

  // 1. Prioritize segments
  segments = prioritizeContext(segments);

  let totalTokens = segments.reduce((sum, seg) => sum + seg.tokenCount, 0);

  // 2. Summarize if needed
  if (config.enableSummarization && totalTokens > config.maxTokens * 1.5) {
    segments = await summarizeContext(segments, config);
    totalTokens = segments.reduce((sum, seg) => sum + seg.tokenCount, 0);
    summarized = true;
    strategy = "summarized";
  }

  // 3. Compress if still over budget
  if (config.enableCompression && totalTokens > config.maxTokens) {
    segments = compressContext(segments, config);
    totalTokens = segments.reduce((sum, seg) => sum + seg.tokenCount, 0);
    compressed = true;
    strategy = summarized ? "summarized+compressed" : "compressed";
  }

  // Final fallback: strict truncation
  if (totalTokens > config.maxTokens) {
    let currentTokens = 0;
    const truncated: ContextSegment[] = [];
    for (const seg of segments) {
      if (currentTokens + seg.tokenCount <= config.maxTokens) {
        truncated.push(seg);
        currentTokens += seg.tokenCount;
      }
    }
    segments = truncated;
    totalTokens = currentTokens;
    strategy = "truncated";
  }

  return {
    segments,
    totalTokens,
    compressed,
    summarized,
    strategy,
  };
}
