import { CostOptimizationResult, BudgetConfig } from "./types";

// Mock cost data for demonstration. In a real app, this comes from a DB/config.
const MODEL_COSTS_PER_1K: Record<string, number> = {
  "gpt-4": 0.03,
  "gpt-3.5-turbo": 0.002,
  "claude-3-opus": 0.015,
  "claude-3-haiku": 0.001,
  "llama-3-70b": 0.005,
  "llama-3-8b": 0.0002,
};

export class CostOptimizer {
  private budget: BudgetConfig = {
    dailyLimit: 50.0,
    monthlyLimit: 1000.0,
    currentDailySpend: 0.0,
    currentMonthlySpend: 0.0,
    currency: "USD",
  };

  /**
   * Evaluates prompt complexity and suggests an optimized model to save cost.
   */
  public optimizeCost(prompt: string, intent: string, currentModel: string): CostOptimizationResult {
    const originalCost = MODEL_COSTS_PER_1K[currentModel] || 0.01; // Default
    let optimizedModel = currentModel;
    let qualityImpact: CostOptimizationResult["qualityImpact"] = "none";
    let reason = "Optimal model already selected based on current parameters.";

    // Simple heuristic: short prompt, simple intent -> use cheaper model
    const isSimpleIntent = ["summarize", "translate", "extract"].includes(intent);
    const isShortPrompt = prompt.length < 500;

    if (isSimpleIntent && isShortPrompt) {
      if (currentModel === "gpt-4" || currentModel === "claude-3-opus") {
        optimizedModel = "claude-3-haiku"; // Suggest much cheaper model
        qualityImpact = "minimal";
        reason = "Task is simple and prompt is short. A faster, cheaper model is sufficient.";
      }
    } else if (prompt.length > 5000 && (currentModel === "gpt-4" || currentModel === "claude-3-opus")) {
       optimizedModel = "gpt-3.5-turbo";
       qualityImpact = "moderate";
       reason = "Context is large. Downgrading to a cheaper context model saves significant cost.";
    }

    const optimizedCost = MODEL_COSTS_PER_1K[optimizedModel] || originalCost;
    const savings = Math.max(0, originalCost - optimizedCost);
    const savingsPercent = originalCost > 0 ? (savings / originalCost) * 100 : 0;

    return {
      originalModel: currentModel,
      optimizedModel,
      originalCost,
      optimizedCost,
      savings,
      savingsPercent,
      qualityImpact,
      reason,
    };
  }

  /**
   * Tracks spend and returns true if within budget limits.
   */
  public trackAndCheckSpend(estimatedCost: number): boolean {
    if (this.budget.currentDailySpend + estimatedCost > this.budget.dailyLimit) {
      return false; // Over daily budget
    }
    
    this.budget.currentDailySpend += estimatedCost;
    this.budget.currentMonthlySpend += estimatedCost;
    
    return true;
  }

  public getBudgetStatus(): BudgetConfig {
    return { ...this.budget };
  }
}

export const costOptimizer = new CostOptimizer();
