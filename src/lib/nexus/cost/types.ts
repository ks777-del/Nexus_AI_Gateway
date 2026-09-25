export interface CostOptimizationResult {
  originalModel: string;
  optimizedModel: string;
  originalCost: number;
  optimizedCost: number;
  savings: number;
  savingsPercent: number;
  qualityImpact: "none" | "minimal" | "moderate" | "significant";
  reason: string;
}

export interface BudgetConfig {
  dailyLimit: number;
  monthlyLimit: number;
  currentDailySpend: number;
  currentMonthlySpend: number;
  currency: string;
}
