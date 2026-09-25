import { DecomposedTask, DecompositionResult, ExecutionPlan } from './types';

export class PromptDecomposer {
  decompose(prompt: string): DecompositionResult {
    // Basic heuristic to detect multi-part complex requests
    const words = prompt.split(/\s+/).length;
    const hasMultipleParts = prompt.includes(' and ') || prompt.includes(' 1.') || words > 40;
    
    if (!hasMultipleParts) {
      return {
        originalPrompt: prompt,
        shouldDecompose: false,
        reason: 'Prompt is simple and single-focused.',
        tasks: [],
        executionPlan: { phases: [], estimatedTotalTime: '0s' }
      };
    }

    // Mock decomposition mapping
    const tasks: DecomposedTask[] = [
      {
        id: 'task-1',
        title: 'Initial Setup and Backend',
        description: 'Initialize the core architecture and build out backend APIs.',
        category: 'backend',
        estimatedComplexity: 3,
        dependencies: [],
        priority: 1
      },
      {
        id: 'task-2',
        title: 'Frontend UI Implementation',
        description: 'Create the responsive user interface and connect to APIs.',
        category: 'frontend',
        estimatedComplexity: 5,
        dependencies: ['task-1'],
        priority: 2
      }
    ];

    const executionPlan: ExecutionPlan = {
      phases: [
        { phaseNumber: 1, tasks: ['task-1'], parallel: false },
        { phaseNumber: 2, tasks: ['task-2'], parallel: true }
      ],
      estimatedTotalTime: '2 hours'
    };

    return {
      originalPrompt: prompt,
      shouldDecompose: true,
      reason: 'Prompt contains multiple interconnected requirements requiring separate phases.',
      tasks,
      executionPlan
    };
  }
}
