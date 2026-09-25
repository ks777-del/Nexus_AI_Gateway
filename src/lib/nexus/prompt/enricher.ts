import { PromptTemplate } from "./types";

/**
 * Inject relevant context and formatting instructions.
 */
export function enrichPrompt(
  rawPrompt: string,
  template?: PromptTemplate,
  context?: string
): string {
  let enriched = rawPrompt;

  if (context) {
    enriched = `Context:\n${context}\n\nTask:\n${enriched}`;
  }

  if (template?.formatInstructions) {
    enriched = `${enriched}\n\nFormatting Requirements:\n${template.formatInstructions}`;
  }

  if (template?.reasoningMode === "chain-of-thought") {
    enriched = `${enriched}\n\nThink step-by-step before answering.`;
  }

  return enriched;
}
