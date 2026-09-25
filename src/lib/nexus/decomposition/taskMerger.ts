import { DecomposedTask } from './types';

export interface TaskResult {
  taskId: string;
  output: string;
}

export class TaskMerger {
  merge(tasks: DecomposedTask[], results: TaskResult[]): string {
    let finalOutput = '# Synthesized Task Report\n\n';

    const missing = tasks.filter(t => !results.some(r => r.taskId === t.id));
    if (missing.length > 0) {
      finalOutput += `## Warning\nMissing task results for: ${missing.map(m => m.title).join(', ')}\n\n`;
    }

    for (const result of results) {
      const task = tasks.find(t => t.id === result.taskId);
      if (task) {
        finalOutput += `## Phase: ${task.title} (${task.category})\n`;
        finalOutput += `${result.output}\n\n---\n\n`;
      }
    }

    return finalOutput.trim();
  }
}
