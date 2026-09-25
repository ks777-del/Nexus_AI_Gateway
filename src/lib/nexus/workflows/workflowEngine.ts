import { WorkflowDefinition, WorkflowExecutionState, NodeExecutionState, WorkflowNode } from "./types";

export class WorkflowEngine {
  /**
   * Execute a workflow definition
   * @param workflow The workflow to execute
   * @param initialInput Initial input to pass to input nodes
   */
  async execute(workflow: WorkflowDefinition, initialInput: Record<string, unknown>): Promise<WorkflowExecutionState> {
    const state: WorkflowExecutionState = {
      id: crypto.randomUUID(),
      workflowId: workflow.id,
      status: "running",
      nodeStates: new Map<string, NodeExecutionState>(),
      startedAt: Date.now(),
      outputs: {}
    };

    try {
      const sortedNodes = this.topologicalSort(workflow);
      
      for (const node of sortedNodes) {
        state.currentNodeId = node.id;
        state.nodeStates.set(node.id, { status: "running" });
        
        try {
          const startTime = Date.now();
          // Simplified execution logic
          const output = await this.executeNode(node, state, initialInput);
          const latencyMs = Date.now() - startTime;
          
          state.nodeStates.set(node.id, {
            status: "completed",
            output,
            latencyMs
          });
          
          if (node.type === "output") {
             state.outputs[node.id] = output;
          }
        } catch (error) {
           const errorMessage = error instanceof Error ? error.message : "Unknown error";
           state.nodeStates.set(node.id, { status: "failed", error: errorMessage });
           throw error;
        }
      }
      
      state.status = "completed";
      state.completedAt = Date.now();
    } catch (error) {
      state.status = "failed";
      state.error = error instanceof Error ? error.message : "Workflow execution failed";
      state.completedAt = Date.now();
    }
    
    return state;
  }

  private topologicalSort(workflow: WorkflowDefinition): WorkflowNode[] {
    const visited = new Set<string>();
    const sorted: WorkflowNode[] = [];
    const tempVisited = new Set<string>();

    const nodeMap = new Map<string, WorkflowNode>();
    workflow.nodes.forEach(n => nodeMap.set(n.id, n));

    const visit = (nodeId: string) => {
      if (tempVisited.has(nodeId)) {
        throw new Error("Cycle detected in workflow");
      }
      if (visited.has(nodeId)) return;
      
      tempVisited.add(nodeId);
      
      const node = nodeMap.get(nodeId);
      if (node) {
        // Find dependencies
        const edges = workflow.edges.filter(e => e.target === nodeId);
        for (const edge of edges) {
          visit(edge.source);
        }
        
        visited.add(nodeId);
        tempVisited.delete(nodeId);
        sorted.push(node);
      }
    };

    workflow.nodes.forEach(n => {
      if (!visited.has(n.id)) {
        visit(n.id);
      }
    });

    return sorted;
  }

  private async executeNode(node: WorkflowNode, state: WorkflowExecutionState, initialInput: Record<string, unknown>): Promise<unknown> {
    // In a real system, this would look up inputs from parent nodes
    // and route to specific node handlers
    return { executed: true, nodeId: node.id, type: node.type };
  }
}
