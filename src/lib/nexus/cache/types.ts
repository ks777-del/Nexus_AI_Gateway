export interface CacheEntry {
  key: string;
  prompt: string;
  response: string;
  modelId: string;
  createdAt: number;
  tokens: number;
  hitCount: number;
  lastHitAt: number;
}

export interface SemanticCacheConfig {
  similarityThreshold: number; // 0.0 to 1.0
  maxEntries: number;
  ttlMs: number;
}
