export interface DecomposedTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  estimatedComplexity: number;
  dependencies: string[];
  priority: number;
}

export type TaskCategory = "frontend" | "backend" | "database" | "auth" | "testing" | "deployment" | "design" | "documentation" | "api" | "configuration" | "general";

export interface DecompositionResult {
  originalPrompt: string;
  shouldDecompose: boolean;
  reason: string;
  tasks: DecomposedTask[];
  executionPlan: ExecutionPlan;
}

export interface ExecutionPlan {
  phases: ExecutionPhase[];
  estimatedTotalTime: string;
}

export interface ExecutionPhase {
  phaseNumber: number;
  tasks: string[];
  parallel: boolean;
}
