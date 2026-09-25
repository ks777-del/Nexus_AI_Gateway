import { AgentWorkflow, WorkflowExecution, StepExecution, WorkflowStep } from './types';
import { WorkflowExecutor } from './workflowExecutor';

export class Orchestrator {
  private executor: WorkflowExecutor;

  constructor() {
    this.executor = new WorkflowExecutor();
  }

  async executeWorkflow(workflow: AgentWorkflow, initialInput: string): Promise<WorkflowExecution> {
    const execution: WorkflowExecution = {
      id: `exec-${Date.now()}`,
      workflowId: workflow.id,
      status: 'running',
      steps: [],
      startedAt: Date.now()
    };

    const completedSteps = new Set<string>();
    const stepResults = new Map<string, string>();
    const pendingSteps = [...workflow.steps];

    while (pendingSteps.length > 0) {
      const readySteps = pendingSteps.filter(step => 
        step.dependsOn.every(dep => completedSteps.has(dep))
      );

      if (readySteps.length === 0) {
        execution.status = 'failed';
        break; // Deadlock or circular dependency
      }

      const promises = readySteps.map(async step => {
        const input = step.dependsOn.length > 0 
          ? step.dependsOn.map(dep => stepResults.get(dep)).join('\n')
          : initialInput;
          
        const result = await this.executor.executeStep(step, input);
        
        if (result.status === 'completed' && result.output) {
          stepResults.set(step.id, result.output);
          completedSteps.add(step.id);
        }
        
        return result;
      });

      const results = await Promise.all(promises);
      execution.steps.push(...results);

      // Remove completed steps from pending
      for (const step of readySteps) {
        const index = pendingSteps.findIndex(s => s.id === step.id);
        if (index > -1) pendingSteps.splice(index, 1);
      }

      const hasFailures = results.some(r => r.status === 'failed');
      if (hasFailures) {
        execution.status = 'failed';
        break;
      }
    }

    if (execution.status === 'running') {
      execution.status = 'completed';
      const leafSteps = workflow.steps.filter(s => 
        !workflow.steps.some(other => other.dependsOn.includes(s.id))
      );
      execution.finalOutput = leafSteps.map(s => stepResults.get(s.id)).join('\n\n');
    }

    execution.completedAt = Date.now();
    return execution;
  }
}
