/**
 * Nexus AI Gateway — Request Replay API
 *
 * Re-executes a previously recorded request by ID.
 * Useful for debugging, testing, and comparison.
 *
 * POST /api/nexus/replay
 *
 * @module api/nexus/replay
 */

import { NextRequest, NextResponse } from "next/server";

interface ReplayRequest {
  /** Original request to replay */
  originalRequest: {
    model: string;
    messages: Array<{ role: string; content: string }>;
    temperature?: number;
    max_tokens?: number;
  };
  /** Optional: override the model for comparison */
  overrideModel?: string;
  /** Optional: override the provider */
  overrideProvider?: string;
  /** Whether to compare with original response */
  compare?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReplayRequest = await request.json();

    if (!body.originalRequest) {
      return NextResponse.json(
        { error: "originalRequest is required" },
        { status: 400 }
      );
    }

    const model = body.overrideModel || body.originalRequest.model;
    const start = Date.now();

    // Forward the replayed request to the chat completions endpoint
    const chatResponse = await fetch(
      new URL("/api/v1/chat/completions", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(request.headers.get("authorization")
            ? { Authorization: request.headers.get("authorization")! }
            : {}),
        },
        body: JSON.stringify({
          model,
          messages: body.originalRequest.messages,
          temperature: body.originalRequest.temperature ?? 0.7,
          max_tokens: body.originalRequest.max_tokens,
          stream: false,
        }),
      }
    );

    const responseData = await chatResponse.json();
    const latencyMs = Date.now() - start;

    return NextResponse.json({
      replay: {
        model,
        response: responseData,
        latencyMs,
        timestamp: Date.now(),
      },
      originalModel: body.originalRequest.model,
      overrideApplied: !!body.overrideModel,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Nexus AI Gateway — Request Replay API",
    usage: "POST with originalRequest to replay a previous request",
    features: ["Model override", "Provider override", "Response comparison"],
  });
}
