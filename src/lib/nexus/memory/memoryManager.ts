import { MemoryEntry, MemorySearchResult, MemoryStats, MemoryType } from "./types";
import { memoryCompressor } from "./memoryCompressor";

export class MemoryManager {
  private memories: Map<string, MemoryEntry> = new Map();

  /**
   * Stores a new memory entry.
   */
  public store(type: MemoryType, content: string, metadata: Record<string, unknown> = {}): MemoryEntry {
    const id = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();
    
    const entry: MemoryEntry = {
      id,
      type,
      content,
      metadata,
      relevanceScore: 1.0,
      createdAt: now,
      accessedAt: now,
      accessCount: 0,
      compressed: false,
    };

    this.memories.set(id, entry);
    return entry;
  }

  /**
   * Retrieves a memory entry by ID.
   */
  public retrieve(id: string): MemoryEntry | undefined {
    const entry = this.memories.get(id);
    if (entry) {
      entry.accessedAt = Date.now();
      entry.accessCount++;
      this.memories.set(id, entry);
    }
    return entry;
  }

  /**
   * Searches memories (mock implementation).
   */
  public search(query: string, type?: MemoryType): MemorySearchResult {
    const start = performance.now();
    const queryLower = query.toLowerCase();
    
    let results = Array.from(this.memories.values());
    if (type) {
      results = results.filter(e => e.type === type);
    }
    
    // Simple text match
    results = results.filter(e => e.content.toLowerCase().includes(queryLower));
    
    // Update access stats
    results.forEach(e => {
      e.accessedAt = Date.now();
      e.accessCount++;
    });

    const latency = performance.now() - start;

    return {
      entries: results,
      totalCount: results.length,
      searchLatencyMs: latency,
    };
  }

  /**
   * Deletes a memory entry.
   */
  public delete(id: string): boolean {
    return this.memories.delete(id);
  }

  /**
   * Compresses old memories.
   */
  public compress(): void {
    const entries = Array.from(this.memories.values());
    const compressedEntries = memoryCompressor.compress(entries);
    
    // Replace old entries with compressed ones
    this.memories.clear();
    compressedEntries.forEach(e => this.memories.set(e.id, e));
  }

  /**
   * Gets memory statistics.
   */
  public getStats(): MemoryStats {
    const entries = Array.from(this.memories.values());
    const byType = {
      "short-term": 0,
      "long-term": 0,
      "semantic": 0,
      "session": 0,
      "project": 0,
      "shared": 0,
    };
    
    let totalSizeBytes = 0;
    let oldestEntry = Date.now();
    let newestEntry = 0;

    entries.forEach(e => {
      byType[e.type]++;
      totalSizeBytes += e.content.length * 2; // rough estimation
      if (e.createdAt < oldestEntry) oldestEntry = e.createdAt;
      if (e.createdAt > newestEntry) newestEntry = e.createdAt;
    });

    return {
      totalEntries: entries.length,
      byType,
      totalSizeBytes,
      oldestEntry: entries.length > 0 ? oldestEntry : 0,
      newestEntry: entries.length > 0 ? newestEntry : 0,
    };
  }
}

export const memoryManager = new MemoryManager();
