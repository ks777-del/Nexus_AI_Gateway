export interface ContextSegment {
  type: "conversation" | "file" | "memory" | "search" | "preference" | "knowledge";
  content: string;
  priority: number;    // 0-100
  tokenCount: number;
  metadata: Record<string, unknown>;
  timestamp?: number;
}

export interface BuiltContext {
  segments: ContextSegment[];
  totalTokens: number;
  compressed: boolean;
  summarized: boolean;
  strategy: string;
}

export interface ContextConfig {
  maxTokens: number;
  priorityThreshold: number;
  enableCompression: boolean;
  enableSummarization: boolean;
  enableMemoryRetrieval: boolean;
}
