import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const results = [
    { id: "sb-1", modelId: "gpt-4o", prompt: "Hello world", response: "Hi there!", timestamp: Date.now() - 50000 },
    { id: "sb-2", modelId: "claude-3-5-sonnet", prompt: "Summarize this", response: "Here is a summary...", timestamp: Date.now() - 150000 }
  ];
  return NextResponse.json({ results });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { modelId, prompt } = body;
  
  // Mock generation
  const response = `Mock response from ${modelId} for prompt: "${prompt.substring(0, 20)}..."`;
  
  const result = {
    id: uuidv4(),
    modelId,
    prompt,
    response,
    timestamp: Date.now(),
    latencyMs: Math.floor(Math.random() * 500) + 200,
    tokenCount: { input: 15, output: 25 }
  };
  
  return NextResponse.json({ success: true, result });
}
