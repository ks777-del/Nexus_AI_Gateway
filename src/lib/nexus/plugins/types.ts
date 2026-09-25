export type PluginCategory = "provider" | "tool" | "search" | "knowledge" | "ocr" | "vision" | "speech" | "storage" | "agent" | "theme";

export interface PluginDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  enabled: boolean;
  config: Record<string, unknown>;
  configSchema?: Record<string, PluginConfigField>;
  dependencies?: string[];
}

export interface PluginConfigField {
  type: "string" | "number" | "boolean" | "select";
  label: string;
  description?: string;
  required?: boolean;
  default?: unknown;
  options?: Array<{ label: string; value: string }>;
}

export interface PluginState {
  plugins: Map<string, PluginDefinition>;
  enabled: Set<string>;
}
