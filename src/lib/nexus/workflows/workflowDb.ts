import { WorkflowDefinition } from "./types";

export class WorkflowDb {
  private workflows = new Map<string, WorkflowDefinition>();

  constructor() {
    this.seedTemplates();
  }

  create(workflow: Omit<WorkflowDefinition, "id" | "createdAt" | "updatedAt">): WorkflowDefinition {
    const id = crypto.randomUUID();
    const now = Date.now();
    const newWorkflow: WorkflowDefinition = {
      ...workflow,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.workflows.set(id, newWorkflow);
    return newWorkflow;
  }

  get(id: string): WorkflowDefinition | undefined {
    return this.workflows.get(id);
  }

  update(id: string, updates: Partial<Omit<WorkflowDefinition, "id" | "createdAt" | "updatedAt">>): WorkflowDefinition | undefined {
    const existing = this.workflows.get(id);
    if (!existing) return undefined;
    
    const updated: WorkflowDefinition = {
      ...existing,
      ...updates,
      updatedAt: Date.now()
    };
    
    this.workflows.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.workflows.delete(id);
  }

  list(filters?: { tags?: string[] }): WorkflowDefinition[] {
    let result = Array.from(this.workflows.values());
    if (filters?.tags && filters.tags.length > 0) {
      result = result.filter(w => filters.tags!.some(t => w.tags.includes(t)));
    }
    return result;
  }

  private seedTemplates() {
    this.workflows.set("template-1", {
      id: "template-1",
      name: "Simple Text Summarization",
      description: "A simple workflow to summarize text.",
      version: "1.0.0",
      nodes: [],
      edges: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: ["template", "text"]
    });
  }
}
