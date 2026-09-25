import { KnowledgePack, KnowledgeDocument } from "./types";
import { KnowledgePackDb } from "./knowledgePackDb";

export class KnowledgePackManager {
  private db: KnowledgePackDb;

  constructor(db: KnowledgePackDb) {
    this.db = db;
  }

  createPack(data: Omit<KnowledgePack, "id" | "createdAt" | "updatedAt" | "documentCount" | "totalTokens">): KnowledgePack {
    return this.db.createPack(data);
  }

  updatePack(id: string, data: Partial<KnowledgePack>): KnowledgePack | undefined {
    return this.db.updatePack(id, data);
  }

  deletePack(id: string): boolean {
    return this.db.deletePack(id);
  }

  getPack(id: string): KnowledgePack | undefined {
    return this.db.getPack(id);
  }

  listPacks(filters?: { category?: string; enabled?: boolean }): KnowledgePack[] {
    return this.db.listPacks(filters);
  }

  addDocument(packId: string, document: Omit<KnowledgeDocument, "id" | "packId">): KnowledgeDocument {
    return this.db.addDocument(packId, document);
  }

  getDocuments(packId: string): KnowledgeDocument[] {
    return this.db.getDocumentsByPack(packId);
  }
}
