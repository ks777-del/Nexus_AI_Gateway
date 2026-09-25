import { ContextAnalysis } from "./types";

/**
 * Analyze request context and history to determine context management strategy.
 */
export function analyzeContext(
  prompt: string,
  messages: Array<{ role: string; content: any }>
): ContextAnalysis {
  let tokenCount = Math.ceil(prompt.length / 4);
  let hasImages = false;
  let hasFiles = false;
  let hasCode = false;
  
  if (prompt.includes("```")) hasCode = true;

  for (const msg of messages) {
    if (typeof msg.content === "string") {
      tokenCount += Math.ceil(msg.content.length / 4);
      if (msg.content.includes("```")) hasCode = true;
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === "image_url") hasImages = true;
        if (part.type === "text") {
          tokenCount += Math.ceil(part.text.length / 4);
          if (part.text.includes("```")) hasCode = true;
        }
      }
    }
  }

  let suggestedStrategy: ContextAnalysis["suggestedStrategy"] = "direct";
  
  if (tokenCount > 100000) {
    suggestedStrategy = "truncate";
  } else if (tokenCount > 50000) {
    suggestedStrategy = "summarize";
  } else if (tokenCount > 20000) {
    suggestedStrategy = "compress";
  }

  return {
    tokenCount,
    messageCount: messages.length,
    hasImages,
    hasFiles, // Simplification
    hasCode,
    dominantLanguage: "en", // Simplified for now
    suggestedStrategy
  };
}
