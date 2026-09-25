export type WorkflowNodeType = "prompt" | "llm" | "memory" | "search" | "pdf" | "image" | "vision" | "tools" | "logic" | "output" | "input" | "transform" | "condition";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
  position: { x: number; y: number };
  config: Record<string, unknown>;
  inputs: string[];    // connected input node IDs
  outputs: string[];   // connected output node IDs
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

export interface WorkflowExecutionState {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "completed" | "failed" | "paused";
  currentNodeId?: string;
  nodeStates: Map<string, NodeExecutionState>;
  startedAt: number;
  completedAt?: number;
  error?: string;
  outputs: Record<string, unknown>;
}

export interface NodeExecutionState {
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  input?: unknown;
  output?: unknown;
  latencyMs?: number;
  error?: string;
}
