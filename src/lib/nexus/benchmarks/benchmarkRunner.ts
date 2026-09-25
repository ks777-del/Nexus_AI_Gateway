import { BenchmarkSuite, BenchmarkResult, BenchmarkPrompt } from "./types";
import { v4 as uuidv4 } from "uuid";

export async function runSingleBenchmark(prompt: BenchmarkPrompt, modelId: string, providerId: string): Promise<Omit<BenchmarkResult, "suiteId">> {
  const start = Date.now();
  let success = true;
  let error = undefined;
  
  // Simulate network call / latency
  const mockLatency = Math.floor(Math.random() * 500) + 100;
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  const end = Date.now();
  const latencyMs = mockLatency + (end - start);
  
  // Mock validation
  if (prompt.maxLatencyMs && latencyMs > prompt.maxLatencyMs) {
    success = false;
    error = "Timeout exceeded";
  }

  const score = success ? Math.floor(Math.random() * 20) + 80 : 0;
  
  return {
    id: uuidv4(),
    modelId,
    providerId,
    dimension: "accuracy", // Will be overridden by suite
    score,
    latencyMs,
    tokenCount: { input: 10, output: 50 },
    success,
    error,
    timestamp: Date.now()
  };
}
