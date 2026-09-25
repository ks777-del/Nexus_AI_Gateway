import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const plugins = [
    { id: "pl-1", name: "Search Engine Plugin", version: "1.0.0", enabled: true },
    { id: "pl-2", name: "Data Analytics Plugin", version: "2.1.0", enabled: false }
  ];
  return NextResponse.json({ plugins });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, action: body.action, pluginId: body.pluginId });
}
