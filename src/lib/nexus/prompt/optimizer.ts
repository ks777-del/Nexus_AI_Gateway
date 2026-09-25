/**
 * Model-specific prompt optimization.
 */
export function optimizePrompt(prompt: string, targetModel: string): string {
  let optimized = prompt;

  // Basic model-specific tweaks
  if (targetModel.includes("gpt")) {
    // GPT tends to follow system messages well
  } else if (targetModel.includes("claude")) {
    // Claude prefers XML tags for structure
    optimized = `<request>\n${optimized}\n</request>`;
  } else if (targetModel.includes("gemini")) {
    // Gemini handles direct instructions well
  }

  return optimized;
}
