import { MarketplaceItem, MarketplaceState } from "./types";

export class MarketplaceManager {
  private state: MarketplaceState = {
    items: [],
    installed: new Set(),
    lastRefreshed: 0
  };

  constructor() {
    this.seedCatalog();
  }

  async fetchCatalog(): Promise<MarketplaceItem[]> {
    // In a real system, fetch from an external API
    this.state.lastRefreshed = Date.now();
    return this.state.items;
  }

  getItems(filters?: { type?: string; tag?: string }): MarketplaceItem[] {
    let result = this.state.items;
    
    if (filters?.type) {
      result = result.filter(item => item.type === filters.type);
    }
    
    if (filters?.tag) {
      result = result.filter(item => item.tags.includes(filters.tag!));
    }
    
    return result;
  }

  async installItem(id: string): Promise<boolean> {
    const item = this.state.items.find(i => i.id === id);
    if (!item) return false;
    
    // Simulate install
    item.installed = true;
    this.state.installed.add(id);
    return true;
  }

  async uninstallItem(id: string): Promise<boolean> {
    const item = this.state.items.find(i => i.id === id);
    if (!item) return false;
    
    // Simulate uninstall
    item.installed = false;
    this.state.installed.delete(id);
    return true;
  }

  private seedCatalog() {
    this.state.items = [
      {
        id: "mp-1",
        name: "Developer Prompt Pack",
        description: "A collection of prompts for coding tasks.",
        type: "prompt_pack",
        author: "Nexus",
        version: "1.0.0",
        downloads: 1542,
        rating: 4.8,
        tags: ["coding", "development"],
        price: "free",
        installed: false
      },
      {
        id: "mp-2",
        name: "React Workflow Template",
        description: "Automated workflow for React component generation.",
        type: "workflow_template",
        author: "Community",
        version: "2.1.0",
        downloads: 856,
        rating: 4.5,
        tags: ["react", "frontend"],
        price: "free",
        installed: false
      }
    ];
  }
}
