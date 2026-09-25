import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const stats = {
    totalEntries: 2045,
    memoryUsageBytes: 15400000,
    recentEntries: [
      { id: "mem-1", type: "conversation", content: "User asked about pricing", timestamp: Date.now() - 300000 },
      { id: "mem-2", type: "preference", content: "User prefers dark mode", timestamp: Date.now() - 86400000 }
    ]
  };
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const entry = {
    id: uuidv4(),
    timestamp: Date.now(),
    ...body
  };
  return NextResponse.json({ success: true, entry });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  
  return NextResponse.json({ success: true, message: `Cleared memory for type: ${type || 'all'}` });
}
