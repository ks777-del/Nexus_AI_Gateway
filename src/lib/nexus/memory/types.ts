export type MemoryType = "short-term" | "long-term" | "semantic" | "session" | "project" | "shared";

export interface MemoryEntry {
  id: string;
  type: MemoryType;
  content: string;
  metadata: Record<string, unknown>;
  relevanceScore: number;
  createdAt: number;
  accessedAt: number;
  accessCount: number;
  compressed: boolean;
}

export interface MemorySearchResult {
  entries: MemoryEntry[];
  totalCount: number;
  searchLatencyMs: number;
}

export interface MemoryStats {
  totalEntries: number;
  byType: Record<MemoryType, number>;
  totalSizeBytes: number;
  oldestEntry: number;
  newestEntry: number;
}
