import { CacheEntry, SemanticCacheConfig } from "./types";

export class EmbeddingCache {
  private entries: Map<string, CacheEntry> = new Map();
  private readonly config: SemanticCacheConfig;

  constructor(config?: Partial<SemanticCacheConfig>) {
    this.config = {
      similarityThreshold: config?.similarityThreshold ?? 0.85,
      maxEntries: config?.maxEntries ?? 1000,
      ttlMs: config?.ttlMs ?? 24 * 60 * 60 * 1000, // 1 day
    };
  }

  /**
   * Retrieves a cached response if a semantically similar prompt exists.
   */
  public get(prompt: string, modelId?: string): CacheEntry | null {
    this.evictExpired();

    let bestMatch: CacheEntry | null = null;
    let highestSimilarity = 0;

    for (const entry of this.entries.values()) {
      // Optional: enforce model match
      if (modelId && entry.modelId !== modelId) continue;

      const sim = this.calculateSimilarity(prompt, entry.prompt);
      if (sim >= this.config.similarityThreshold && sim > highestSimilarity) {
        highestSimilarity = sim;
        bestMatch = entry;
      }
    }

    if (bestMatch) {
      bestMatch.hitCount++;
      bestMatch.lastHitAt = Date.now();
      return bestMatch;
    }

    return null;
  }

  /**
   * Stores a prompt-response pair in the cache.
   */
  public set(prompt: string, response: string, modelId: string, tokens: number = 0): void {
    this.evictExpired();

    if (this.entries.size >= this.config.maxEntries) {
      this.evictLRU();
    }

    const key = `cache_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = Date.now();

    this.entries.set(key, {
      key,
      prompt,
      response,
      modelId,
      createdAt: now,
      tokens,
      hitCount: 0,
      lastHitAt: now,
    });
  }

  /**
   * Clears the cache.
   */
  public clear(): void {
    this.entries.clear();
  }

  /**
   * Extremely simple bag-of-words similarity (Jaccard Index) for demonstration.
   * In a real system, this would use embeddings (e.g., text-embedding-ada-002) and cosine similarity.
   */
  private calculateSimilarity(text1: string, text2: string): number {
    const tokenize = (t: string) => new Set(t.toLowerCase().split(/\W+/).filter(w => w.length > 0));
    const set1 = tokenize(text1);
    const set2 = tokenize(text2);
    
    if (set1.size === 0 && set2.size === 0) return 1.0;
    if (set1.size === 0 || set2.size === 0) return 0.0;

    let intersectionSize = 0;
    for (const word of set1) {
      if (set2.has(word)) {
        intersectionSize++;
      }
    }

    const unionSize = set1.size + set2.size - intersectionSize;
    return intersectionSize / unionSize; // Jaccard similarity (0.0 to 1.0)
  }

  private evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.entries.entries()) {
      if (now - entry.createdAt > this.config.ttlMs) {
        this.entries.delete(key);
      }
    }
  }

  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.entries.entries()) {
      if (entry.lastHitAt < oldestTime) {
        oldestTime = entry.lastHitAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.entries.delete(oldestKey);
    }
  }
}

export const embeddingCache = new EmbeddingCache();
