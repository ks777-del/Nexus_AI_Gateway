const DEFAULT_NEXUS_BASE_URL = "http://localhost:20128";

type NexusBaseUrlEnv = {
  NEXUS_BASE_URL?: string;
  BASE_URL?: string;
  NEXT_PUBLIC_BASE_URL?: string;
};

function normalizeBaseUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

export function resolveNexusBaseUrl(env: NexusBaseUrlEnv = process.env): string {
  return (
    normalizeBaseUrl(env.NEXUS_BASE_URL) ||
    normalizeBaseUrl(env.BASE_URL) ||
    normalizeBaseUrl(env.NEXT_PUBLIC_BASE_URL) ||
    DEFAULT_NEXUS_BASE_URL
  );
}

export { DEFAULT_NEXUS_BASE_URL };
