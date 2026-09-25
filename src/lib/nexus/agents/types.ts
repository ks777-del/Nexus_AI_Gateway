export type AgentRole = "planner" | "researcher" | "coder" | "reviewer" | "debugger" | "teacher" | "writer" | "reasoner" | "translator" | "summarizer" | "evaluator";

export interface AgentDefinition {
  id: string;
  role: AgentRole;
  name: string;
  description: string;
  systemPrompt: string;
  preferredModel?: string;
  preferredProvider?: string;
  capabilities: string[];
}

export interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  agentRole: AgentRole;
  instruction: string;
  dependsOn: string[];
  parallel: boolean;
  timeout: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "completed" | "failed";
  steps: StepExecution[];
  startedAt: number;
  completedAt?: number;
  finalOutput?: string;
}

export interface StepExecution {
  stepId: string;
  status: "pending" | "running" | "completed" | "failed";
  agentRole: AgentRole;
  input: string;
  output?: string;
  model?: string;
  latencyMs?: number;
  error?: string;
}
