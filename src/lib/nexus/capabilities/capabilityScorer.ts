import { IntentAnalysis, CapabilityProfile } from "../brain/types";

export interface ScoreResult {
  score: number;
  reason: string;
  confidence: number;
}

/**
 * Score a model's capabilities against the detected intent.
 */
export function scoreCapabilities(intent: IntentAnalysis, profile: CapabilityProfile): ScoreResult {
  let score = 0;
  let maxPossible = 0;
  let reason = "Good general fit.";

  // Core capability matching
  if (intent.primaryIntent === "coding") {
    score += profile.coding * 3;
    maxPossible += 300;
    reason = "Strong coding capabilities match request intent.";
  } else if (intent.primaryIntent === "writing" || intent.primaryIntent === "creative") {
    score += profile.writing * 3;
    maxPossible += 300;
    reason = "High writing capability fits creative request.";
  } else if (intent.primaryIntent === "math") {
    score += profile.math * 3;
    maxPossible += 300;
    reason = "Mathematical reasoning matches query.";
  } else if (intent.primaryIntent === "reasoning" || intent.requiresReasoning) {
    score += profile.reasoning * 3;
    maxPossible += 300;
    reason = "Advanced reasoning fits complex prompt.";
  } else {
    // General fallback
    score += ((profile.writing + profile.reasoning) / 2) * 2;
    maxPossible += 200;
  }

  // Hard constraints
  if (intent.requiresVision) {
    if (profile.vision < 20) {
      return { score: 0, reason: "Model lacks required vision capabilities.", confidence: 1 };
    }
    score += profile.vision * 2;
    maxPossible += 200;
    reason = "Vision capabilities match request requirements.";
  }

  if (intent.requiresToolUse) {
    if (profile.toolUse < 20) {
       return { score: 0, reason: "Model lacks required tool/function calling capabilities.", confidence: 1 };
    }
    score += profile.toolUse * 2;
    maxPossible += 200;
  }

  // Normalize score to 0-100
  const normalizedScore = maxPossible > 0 ? (score / maxPossible) * 100 : 50;

  return {
    score: normalizedScore,
    reason,
    confidence: 0.8
  };
}
