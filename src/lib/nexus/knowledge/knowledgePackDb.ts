import { KnowledgePack, KnowledgeDocument } from "./types";

export class KnowledgePackDb {
  private packs = new Map<string, KnowledgePack>();
  private documents = new Map<string, KnowledgeDocument>();

  constructor() {
    this.seed();
  }

  createPack(data: Omit<KnowledgePack, "id" | "createdAt" | "updatedAt" | "documentCount" | "totalTokens">): KnowledgePack {
    const id = crypto.randomUUID();
    const now = Date.now();
    const pack: KnowledgePack = {
      ...data,
      id,
      documentCount: 0,
      totalTokens: 0,
      createdAt: now,
      updatedAt: now
    };
    this.packs.set(id, pack);
    return pack;
  }

  updatePack(id: string, data: Partial<KnowledgePack>): KnowledgePack | undefined {
    const pack = this.packs.get(id);
    if (!pack) return undefined;
    
    const updated = {
      ...pack,
      ...data,
      updatedAt: Date.now()
    };
    this.packs.set(id, updated);
    return updated;
  }

  deletePack(id: string): boolean {
    // Delete associated docs
    Array.from(this.documents.values())
      .filter(d => d.packId === id)
      .forEach(d => this.documents.delete(d.id));
      
    return this.packs.delete(id);
  }

  getPack(id: string): KnowledgePack | undefined {
    return this.packs.get(id);
  }

  listPacks(filters?: { category?: string; enabled?: boolean }): KnowledgePack[] {
    let result = Array.from(this.packs.values());
    if (filters?.category) {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters?.enabled !== undefined) {
      result = result.filter(p => p.enabled === filters.enabled);
    }
    return result;
  }

  addDocument(packId: string, document: Omit<KnowledgeDocument, "id" | "packId">): KnowledgeDocument {
    const pack = this.packs.get(packId);
    if (!pack) throw new Error("Pack not found");

    const id = crypto.randomUUID();
    const doc: KnowledgeDocument = {
      ...document,
      id,
      packId
    };
    
    this.documents.set(id, doc);
    
    // Update pack stats
    pack.documentCount++;
    pack.totalTokens += doc.tokenCount;
    pack.updatedAt = Date.now();
    
    return doc;
  }

  getDocumentsByPack(packId: string): KnowledgeDocument[] {
    return Array.from(this.documents.values()).filter(d => d.packId === packId);
  }

  private seed() {
    this.createPack({
      name: "JavaScript Fundamentals",
      description: "Core concepts of JavaScript.",
      category: "programming",
      version: "1.0.0",
      tags: ["js", "web"],
      enabled: true
    });
  }
}
