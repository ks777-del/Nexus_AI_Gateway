import { IntentAnalysis, Intent } from "./types";

/**
 * Heuristics-based intent detection engine.
 * Analyzes the prompt to infer primary and secondary intents.
 */
export function detectIntent(prompt: string): IntentAnalysis {
  const lowerPrompt = prompt.toLowerCase();
  
  const keywords: Record<Intent, string[]> = {
    coding: ["function", "class", "code", "implement", "debug", "refactor", "api", "html", "react", "typescript"],
    math: ["calculate", "equation", "integral", "derivative", "math", "sum", "subtract", "algebra"],
    writing: ["write", "essay", "article", "story", "blog", "draft", "compose", "poem"],
    reasoning: ["think", "analyze", "compare", "evaluate", "why", "how come", "reason", "logic"],
    vision: ["image", "picture", "screenshot", "photo", "look at", "visualize"],
    translation: ["translate", "in french", "in spanish", "in german", "language"],
    search: ["search", "find", "look up", "who is", "what is the latest"],
    conversation: ["hello", "hi", "how are you", "chat", "talk"],
    analysis: ["analyze data", "statistics", "trend", "break down"],
    creative: ["brainstorm", "ideas", "creative", "imagine"],
    summarization: ["summarize", "tl;dr", "tldr", "shorten", "in brief"],
    data_extraction: ["extract", "parse", "json", "csv", "table from"]
  };

  const scores: Record<Intent, number> = {
    coding: 0, writing: 0, math: 0, reasoning: 0, translation: 0,
    vision: 0, search: 0, conversation: 0, analysis: 0, creative: 0,
    summarization: 0, data_extraction: 0
  };

  for (const [intent, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (lowerPrompt.includes(word)) {
        scores[intent as Intent] += 1;
      }
    }
  }

  // Sort intents by score
  const sortedIntents = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0] as Intent);

  const primaryIntent = sortedIntents.length > 0 ? sortedIntents[0] : "conversation";
  const secondaryIntents = sortedIntents.slice(1, 3);
  
  // Complexity estimation
  let complexity: "simple" | "moderate" | "complex" | "expert" = "simple";
  if (prompt.length > 2000 || sortedIntents.length > 4) complexity = "expert";
  else if (prompt.length > 1000 || sortedIntents.length > 2) complexity = "complex";
  else if (prompt.length > 300 || sortedIntents.length > 1) complexity = "moderate";

  const requiresReasoning = scores.reasoning > 0 || complexity === "expert" || complexity === "complex";
  const requiresVision = scores.vision > 0;
  const requiresToolUse = scores.search > 0 || scores.data_extraction > 0;

  // Very rough token estimation
  const estimatedInputTokens = Math.ceil(prompt.length / 4);
  const estimatedOutputTokens = complexity === "expert" ? 2000 : complexity === "complex" ? 1000 : 500;

  return {
    primaryIntent,
    secondaryIntents,
    confidence: Math.min(1, (scores[primaryIntent] || 1) / 3), // Arbitrary confidence calc
    complexity,
    requiresReasoning,
    requiresVision,
    requiresToolUse,
    estimatedTokens: {
      input: estimatedInputTokens,
      output: estimatedOutputTokens
    }
  };
}
