import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const packs = [
    { id: "kp-1", name: "Engineering Docs", documentCount: 45, sizeBytes: 10245000, lastUpdated: Date.now() - 3600000 },
    { id: "kp-2", name: "Customer Support Logs", documentCount: 1200, sizeBytes: 54000000, lastUpdated: Date.now() - 86400000 }
  ];
  return NextResponse.json({ packs });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newPack = {
    id: uuidv4(),
    name: body.name || "New Pack",
    documentCount: 0,
    sizeBytes: 0,
    lastUpdated: Date.now(),
    ...body
  };
  return NextResponse.json({ success: true, pack: newPack });
}
