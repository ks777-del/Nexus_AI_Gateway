import { NextRequest, NextResponse } from "next/server";
import { getLeaderboard, runAllBenchmarks } from "@/lib/nexus/benchmarks";

export async function GET() {
  try {
    const leaderboard = getLeaderboard();
    return NextResponse.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error("[Benchmarks API] Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { modelId, providerId } = body;
    
    if (!modelId || !providerId) {
      return NextResponse.json(
        { error: "modelId and providerId are required" },
        { status: 400 }
      );
    }
    
    const results = await runAllBenchmarks(modelId, providerId);
    
    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error("[Benchmarks API] Error running benchmarks:", error);
    return NextResponse.json(
      { error: "Failed to run benchmarks" },
      { status: 500 }
    );
  }
}
