import { NextRequest, NextResponse } from "next/server";
import { analyzeBrain, BrainRequest } from "@/lib/nexus/brain";

export async function POST(req: NextRequest) {
  try {
    const requestBody: BrainRequest = await req.json();
    
    if (!requestBody.prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    
    const analysis = await analyzeBrain(requestBody);
    
    return NextResponse.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error("[Brain API] Error analyzing prompt:", error);
    return NextResponse.json(
      { error: "Failed to analyze prompt" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    version: "1.0.0",
    modules: [
      "intentDetector",
      "contextAnalyzer",
      "capabilityMatcher",
      "costPredictor",
      "latencyEstimator"
    ]
  });
}
