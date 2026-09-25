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
      data: analysis.routingExplanation
    });
  } catch (error) {
    console.error("[Routing Explain API] Error:", error);
    return NextResponse.json(
      { error: "Failed to explain routing" },
      { status: 500 }
    );
  }
}
