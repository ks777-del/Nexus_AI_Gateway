import { ContextSegment, ContextConfig } from "./types";

/**
 * Summarize long conversation contexts.
 */
export async function summarizeContext(
  segments: ContextSegment[],
  config: ContextConfig
): Promise<ContextSegment[]> {
  const summarized: ContextSegment[] = [];

  for (const seg of segments) {
    if (seg.type === "conversation" && seg.tokenCount > 500) {
      // Stub: in reality, call an LLM to summarize
      const summaryContent = `[Summary] ${seg.content.substring(0, 100)}...`;
      summarized.push({
        ...seg,
        content: summaryContent,
        tokenCount: Math.ceil(seg.tokenCount * 0.2), // assume 80% compression
      });
    } else {
      summarized.push(seg);
    }
  }

  return summarized;
}
