import { CompiledPrompt, PromptTemplate } from "./types";
import { enrichPrompt } from "./enricher";
import { optimizePrompt } from "./optimizer";
import { DEFAULT_TEMPLATES } from "./templates";

export interface CompileConfig {
  intent?: string;
  context?: string;
  targetModel?: string;
  templateId?: string;
}

/**
 * Compiles a raw user prompt into a structured, optimized format.
 */
export function compilePrompt(
  rawPrompt: string,
  config: CompileConfig = {}
): CompiledPrompt {
  const template = config.templateId ? DEFAULT_TEMPLATES[config.templateId] : DEFAULT_TEMPLATES["coding"];
  
  const targetModel = config.targetModel || "gpt-4";
  
  // 1. Enrich
  const enriched = enrichPrompt(rawPrompt, template, config.context);
  
  // 2. Optimize
  const optimizedUserPrompt = optimizePrompt(enriched, targetModel);
  
  const systemPrompt = template?.systemInstruction || "You are a helpful AI assistant.";
  
  return {
    systemPrompt,
    userPrompt: optimizedUserPrompt,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: optimizedUserPrompt }
    ],
    metadata: {
      originalTokens: Math.ceil(rawPrompt.length / 4), // rough estimate
      compiledTokens: Math.ceil(optimizedUserPrompt.length / 4),
      template: template?.id || "none",
      optimizations: [config.targetModel ? `target=${targetModel}` : "default"]
    }
  };
}
