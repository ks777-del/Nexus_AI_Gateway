import { BenchmarkSuite } from "./types";

export const LATENCY_SUITE: BenchmarkSuite = {
  id: "suite-latency-1",
  name: "Raw Latency Suite",
  description: "Simple prompts to test raw speed",
  dimension: "latency",
  prompts: [
    {
      id: "p-lat-1",
      prompt: "Say hello",
      maxLatencyMs: 1000,
      evaluationCriteria: "Check if the response is fast and simple."
    },
    {
      id: "p-lat-2",
      prompt: "Count to 5",
      maxLatencyMs: 1500,
      evaluationCriteria: "Check if the response contains numbers 1 to 5."
    }
  ]
};

export const CODING_SUITE: BenchmarkSuite = {
  id: "suite-coding-1",
  name: "Coding Suite",
  description: "Programming and logic tests",
  dimension: "coding",
  prompts: [
    {
      id: "p-code-1",
      prompt: "Write a FizzBuzz function in JavaScript",
      expectedPattern: "function",
      evaluationCriteria: "Should contain standard FizzBuzz logic."
    },
    {
      id: "p-code-2",
      prompt: "Implement binary search in Python",
      expectedPattern: "def",
      evaluationCriteria: "Should correctly implement binary search."
    },
    {
      id: "p-code-3",
      prompt: "Design a REST API endpoint for user creation",
      evaluationCriteria: "Should include HTTP methods and payload structure."
    }
  ]
};

export const REASONING_SUITE: BenchmarkSuite = {
  id: "suite-reasoning-1",
  name: "Reasoning Suite",
  description: "Logic puzzles and reasoning tasks",
  dimension: "reasoning",
  prompts: [
    {
      id: "p-reas-1",
      prompt: "If A > B and B > C, what is A ? C?",
      expectedPattern: "A > C",
      evaluationCriteria: "Should correctly deduce A > C."
    }
  ]
};

export const MATH_SUITE: BenchmarkSuite = {
  id: "suite-math-1",
  name: "Math Suite",
  description: "Mathematical problem solving",
  dimension: "math",
  prompts: [
    {
      id: "p-math-1",
      prompt: "What is 17 * 23?",
      expectedPattern: "391",
      evaluationCriteria: "Should evaluate exactly to 391."
    },
    {
      id: "p-math-2",
      prompt: "Solve: 2x + 5 = 15",
      expectedPattern: "5",
      evaluationCriteria: "Should deduce x = 5."
    }
  ]
};

export const STREAMING_SUITE: BenchmarkSuite = {
  id: "suite-streaming-1",
  name: "Streaming Suite",
  description: "Long generation to test streaming",
  dimension: "streaming",
  prompts: [
    {
      id: "p-stream-1",
      prompt: "Write a 500 word essay on the history of AI",
      evaluationCriteria: "Should test streaming throughput."
    }
  ]
};
