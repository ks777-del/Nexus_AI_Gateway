/**
 * Nexus AI Gateway — Batch Request API
 *
 * Accepts an array of chat completion requests and processes them
 * concurrently, returning results in the same order.
 *
 * POST /api/nexus/batch
 *
 * @module api/nexus/batch
 */

import { NextRequest, NextResponse } from "next/server";

interface BatchRequestItem {
  id: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
}

interface BatchResponseItem {
  id: string;
  status: "success" | "error";
  response?: unknown;
  error?: string;
  latencyMs: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requests: BatchRequestItem[] = body.requests;

    if (!Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json(
        { error: "requests must be a non-empty array" },
        { status: 400 }
      );
    }

    if (requests.length > 50) {
      return NextResponse.json(
        { error: "Maximum 50 requests per batch" },
        { status: 400 }
      );
    }

    const results: BatchResponseItem[] = await Promise.all(
      requests.map(async (req) => {
        const start = Date.now();
        try {
          // Forward each request to the internal chat completions endpoint
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
                model: req.model,
                messages: req.messages,
                temperature: req.temperature ?? 0.7,
                max_tokens: req.max_tokens,
                stream: false,
              }),
            }
          );

          const responseData = await chatResponse.json();
          return {
            id: req.id,
            status: "success" as const,
            response: responseData,
            latencyMs: Date.now() - start,
          };
        } catch (error) {
          return {
            id: req.id,
            status: "error" as const,
            error: error instanceof Error ? error.message : "Unknown error",
            latencyMs: Date.now() - start,
          };
        }
      })
    );

    return NextResponse.json({
      results,
      metadata: {
        totalRequests: requests.length,
        successful: results.filter((r) => r.status === "success").length,
        failed: results.filter((r) => r.status === "error").length,
        totalLatencyMs: Math.max(...results.map((r) => r.latencyMs)),
      },
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
    service: "Nexus AI Gateway — Batch API",
    maxBatchSize: 50,
    supportedEndpoints: ["/v1/chat/completions"],
    documentation: "POST an array of requests to process them concurrently.",
  });
}
