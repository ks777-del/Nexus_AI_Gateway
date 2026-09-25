import { MemoryEntry } from "./types";

export class MemoryCompressor {
  private readonly compressionThresholdMs = 7 * 24 * 60 * 60 * 1000; // 7 days

  /**
   * Compresses a list of memory entries by summarizing old ones and removing duplicates.
   */
  public compress(entries: MemoryEntry[]): MemoryEntry[] {
    const now = Date.now();
    const result: MemoryEntry[] = [];
    const seenContents = new Set<string>();

    for (const entry of entries) {
      // 1. Remove exact duplicates
      if (seenContents.has(entry.content)) {
        continue;
      }
      seenContents.add(entry.content);

      // 2. Compress old uncompressed memories
      if (!entry.compressed && (now - entry.createdAt > this.compressionThresholdMs)) {
        // Mock summarization: trim content
        entry.content = this.summarize(entry.content);
        entry.compressed = true;
      }

      result.push(entry);
    }

    return result;
  }

  private summarize(content: string): string {
    if (content.length <= 100) return content;
    return `[Summarized]: ${content.substring(0, 97)}...`;
  }
}

export const memoryCompressor = new MemoryCompressor();
