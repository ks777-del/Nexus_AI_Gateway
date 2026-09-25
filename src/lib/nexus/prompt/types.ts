export interface CompiledPrompt {
  systemPrompt: string;
  userPrompt: string;
  messages: Array<{ role: string; content: string }>;
  metadata: {
    originalTokens: number;
    compiledTokens: number;
    template: string;
    optimizations: string[];
  };
}

export interface PromptTemplate {
  id: string;
  name: string;
  systemInstruction: string;
  formatInstructions?: string;
  reasoningMode?: "standard" | "chain-of-thought" | "step-by-step" | "tree-of-thought";
  outputFormat?: string;
}
