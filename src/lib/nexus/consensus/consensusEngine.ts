import { ConsensusConfig, ConsensusResult, ModelOutput, ConsensusMode } from './types';

export class ConsensusEngine {
  constructor() {}

  async runConsensus(prompt: string, config: ConsensusConfig): Promise<ConsensusResult> {
    const outputs: ModelOutput[] = [];
    
    // Simulate model outputs
    for (const model of config.models) {
      outputs.push({
        modelId: model,
        providerId: 'mock-provider',
        output: `Output from ${model}: ${prompt.substring(0, 20)}...`,
        latencyMs: Math.floor(Math.random() * 1000) + 500,
        tokens: { input: 10, output: 50 },
        quality: Math.random(),
      });
    }

    let finalOutput = '';
    let agreed = false;
    let confidence = 0;
    const divergenceAreas: string[] = [];
    let reviewerFeedback = undefined;

    if (config.mode === 'single') {
      finalOutput = outputs[0]?.output || '';
      confidence = 1;
      agreed = true;
    } else if (config.mode === 'dual') {
      if (config.mergeStrategy === 'best') {
        outputs.sort((a, b) => (b.quality || 0) - (a.quality || 0));
        finalOutput = outputs[0]?.output || '';
        confidence = 0.8;
      } else {
        finalOutput = `${outputs[0]?.output}\n\n---\n\n${outputs[1]?.output}`;
        confidence = 0.6;
        divergenceAreas.push("Semantic differences detected.");
      }
    } else if (config.mode === 'triple') {
      if (config.mergeStrategy === 'majority') {
        finalOutput = outputs[0]?.output || '';
        confidence = 0.9;
        agreed = true;
      } else {
        finalOutput = outputs.map(o => o.output).join('\n---\n');
        confidence = 0.7;
      }
    } else if (config.mode === 'reviewer') {
      reviewerFeedback = "Reviewer selected the best output based on guidelines.";
      outputs.sort((a, b) => (b.quality || 0) - (a.quality || 0));
      finalOutput = outputs[0]?.output || '';
      confidence = 0.95;
      agreed = true;
    }

    const totalLatencyMs = outputs.reduce((acc, o) => acc + o.latencyMs, 0);
    const totalTokens = outputs.reduce((acc, o) => acc + o.tokens.input + o.tokens.output, 0);
    const totalCost = totalTokens * 0.0001; 

    return {
      finalOutput,
      mode: config.mode,
      modelOutputs: outputs,
      reviewerFeedback,
      consensus: { agreed, confidence, divergenceAreas },
      metadata: { totalLatencyMs, totalTokens, totalCost }
    };
  }

  private answerComparator(out1: string, out2: string): number {
    // Semantic similarity comparison logic
    return out1.length === out2.length ? 1 : 0.8;
  }
}
