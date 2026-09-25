export type MarketplaceItemType = "prompt_pack" | "agent_pack" | "knowledge_pack" | "workflow_template" | "plugin" | "theme";

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  type: MarketplaceItemType;
  author: string;
  version: string;
  downloads: number;
  rating: number;
  tags: string[];
  price: "free" | number;
  installed: boolean;
  icon?: string;
}

export interface MarketplaceState {
  items: MarketplaceItem[];
  installed: Set<string>;
  lastRefreshed: number;
}
