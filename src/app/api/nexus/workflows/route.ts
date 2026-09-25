import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Workaround if types don't exist yet, simply return arbitrary data
export async function GET(request: NextRequest) {
  const workflows = [
    { id: "wf-1", name: "Content Generator", status: "active", steps: 3, lastRun: Date.now() - 86400000 },
    { id: "wf-2", name: "Data Processing Pipeline", status: "inactive", steps: 5, lastRun: Date.now() - 172800000 }
  ];
  return NextResponse.json({ workflows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newWorkflow = {
    id: uuidv4(),
    name: body.name || "New Workflow",
    status: "active",
    steps: body.steps?.length || 1,
    lastRun: null,
    ...body
  };
  return NextResponse.json({ success: true, workflow: newWorkflow });
}
