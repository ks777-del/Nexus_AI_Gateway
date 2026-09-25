import { ModelOutput } from './types';

export interface PipelineStep {
  name: string;
  role: 'planner' | 'researcher' | 'coder' | 'reviewer';
  model: string;
}

export class ReviewerPipeline {
  constructor() {}

  async executePipeline(prompt: string, steps: PipelineStep[]): Promise<string> {
    let context = prompt;
    for (const step of steps) {
      const stepOutput = `[${step.role} using ${step.model}]: Executed task successfully.\n`;
      if (step.role === 'reviewer') {
        context = `Review Evaluation: \n${context}\n${stepOutput}`;
      } else {
        context += `\n${stepOutput}`;
      }
    }
    return context;
  }
}
