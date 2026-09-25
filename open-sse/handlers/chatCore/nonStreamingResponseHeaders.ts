/**
 * chatCore non-streaming success response headers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's non-streaming success path: build the response header map for a
 * cache-MISS JSON response — the static Content-Type + cache marker, the Nexus AI Gateway meta headers
 * (provider/model/latency/usage/cost/request-id), and the optional compression header. Pure builder
 * (returns a fresh map; only mutates the map it owns). Behaviour is byte-identical to the previous
 * inline block, including `latencyMs: now - startTime`.
 */
import { NEXUS_RESPONSE_HEADERS } from "@/shared/constants/headers";
import { attachNexusMetaHeaders as defaultAttachMeta } from "@/domain/omnirouteResponseMeta";

export function buildNonStreamingResponseHeaders(
  args: {
    provider: string | null | undefined;
    model: string | null | undefined;
    startTime: number;
    responseUsage: unknown;
    estimatedCost: number;
    requestId: unknown;
    compressionResponseMeta?: string | null | undefined;
    comboStrategy?: string | null | undefined;
  },
  deps: { attachNexusMetaHeaders: typeof defaultAttachMeta; now: () => number } = {
    attachNexusMetaHeaders: defaultAttachMeta,
    now: Date.now,
  }
): Record<string, string> {
  const responseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    [NEXUS_RESPONSE_HEADERS.cache]: "MISS",
  };
  deps.attachNexusMetaHeaders(responseHeaders, {
    provider: args.provider,
    model: args.model,
    cacheHit: false,
    latencyMs: deps.now() - args.startTime,
    usage: args.responseUsage,
    costUsd: args.estimatedCost,
    requestId: args.requestId,
    strategy: args.comboStrategy ?? "single",
  });
  if (args.compressionResponseMeta) {
    responseHeaders[NEXUS_RESPONSE_HEADERS.compression] = args.compressionResponseMeta;
  }
  return responseHeaders;
}
