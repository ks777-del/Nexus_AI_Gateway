import { PromptTemplate } from "./types";

export const DEFAULT_TEMPLATES: Record<string, PromptTemplate> = {
  coding: {
    id: "coding",
    name: "Code Generation",
    systemInstruction: "You are an expert software developer. Write clean, efficient, and well-documented code.",
    formatInstructions: "Output code in markdown code blocks.",
    reasoningMode: "step-by-step",
  },
  analysis: {
    id: "analysis",
    name: "Data Analysis",
    systemInstruction: "You are a data analyst. Extract insights, trends, and anomalies from the provided data.",
    reasoningMode: "chain-of-thought",
  },
  creative: {
    id: "creative",
    name: "Creative Writing",
    systemInstruction: "You are a creative writer. Be imaginative, engaging, and expressive.",
    reasoningMode: "standard",
  }
};
