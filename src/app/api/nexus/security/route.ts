import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const stats = {
    totalEvents: 1045,
    blockedEvents: 23,
    activePolicies: 5,
    eventsByType: {
      "rate-limit": 10,
      "ip-block": 5,
      "content-filter": 8
    },
    recentEvents: [
      { id: "e1", type: "rate-limit", action: "blocked", timestamp: Date.now() - 10000, details: "Exceeded 100 req/min" },
      { id: "e2", type: "content-filter", action: "flagged", timestamp: Date.now() - 50000, details: "Potentially harmful content" }
    ]
  };
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process policy creation
  return NextResponse.json({ success: true, policy: body });
}
