export type KnowledgePackCategory = "education" | "medical" | "legal" | "programming" | "company" | "research" | "reference" | "custom";

export interface KnowledgePack {
  id: string;
  name: string;
  description: string;
  category: KnowledgePackCategory;
  version: string;
  documentCount: number;
  totalTokens: number;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  enabled: boolean;
}

export interface KnowledgeDocument {
  id: string;
  packId: string;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
  tokenCount: number;
}
