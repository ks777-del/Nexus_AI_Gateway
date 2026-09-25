export * from "./types";
export * from "./suites";
import { getLeaderboard, getHistory, saveResult } from "./benchmarkDb";
import { runSingleBenchmark } from "./benchmarkRunner";
import { BenchmarkSuite, BenchmarkResult } from "./types";

export { getLeaderboard, getHistory as getBenchmarkHistory };

export async function runBenchmarkSuite(suite: BenchmarkSuite, modelId: string, providerId: string): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];
  
  for (const prompt of suite.prompts) {
    const res = await runSingleBenchmark(prompt, modelId, providerId);
    const fullResult: BenchmarkResult = {
      ...res,
      suiteId: suite.id,
      dimension: suite.dimension
    };
    saveResult(fullResult);
    results.push(fullResult);
  }
  
  return results;
}
