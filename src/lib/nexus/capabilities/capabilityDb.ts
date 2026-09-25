import { CapabilityProfile } from "../brain/types";

const DEFAULT_PROFILE: CapabilityProfile = {
  coding: 50,
  writing: 50,
  math: 50,
  vision: 0,
  reasoning: 50,
  longContext: 50,
  toolUse: 50,
  translation: 50,
  speed: 50,
  costEfficiency: 50,
  reliability: 90,
  safety: 90,
  functionCalling: 50,
  streaming: 100,
};

const PROFILES: Record<string, Partial<CapabilityProfile>> = {
  "gpt-4o": {
    coding: 95, writing: 90, math: 90, vision: 95, reasoning: 95, longContext: 85, toolUse: 98, speed: 70, costEfficiency: 40
  },
  "claude-3-5-sonnet": {
    coding: 98, writing: 95, math: 85, vision: 90, reasoning: 95, longContext: 95, toolUse: 95, speed: 75, costEfficiency: 60
  },
  "gemini-1.5-pro": {
    coding: 85, writing: 85, math: 80, vision: 95, reasoning: 85, longContext: 100, toolUse: 85, speed: 65, costEfficiency: 50
  },
  "llama-3-70b": {
    coding: 80, writing: 85, math: 70, vision: 0, reasoning: 80, longContext: 40, toolUse: 60, speed: 85, costEfficiency: 95
  }
};

/**
 * Get capability profile for a given model.
 */
export function getCapabilityProfile(modelId: string, providerId: string): CapabilityProfile {
  // Find a matching profile key (simplistic matching for now)
  const key = Object.keys(PROFILES).find(k => modelId.includes(k));
  
  const customProfile = key ? PROFILES[key] : {};
  
  return { ...DEFAULT_PROFILE, ...customProfile };
}
