import { PluginDefinition } from "./types";

export class PluginRegistry {
  private registry = new Map<string, PluginDefinition>();

  constructor() {
    this.seedBuiltIn();
  }

  register(plugin: PluginDefinition) {
    if (this.registry.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} already registered`);
    }
    this.registry.set(plugin.id, plugin);
  }

  unregister(id: string) {
    this.registry.delete(id);
  }

  get(id: string): PluginDefinition | undefined {
    return this.registry.get(id);
  }

  getAll(): PluginDefinition[] {
    return Array.from(this.registry.values());
  }

  private seedBuiltIn() {
    this.register({
      id: "openai-provider",
      name: "OpenAI Provider",
      description: "Core provider plugin for OpenAI APIs.",
      version: "1.0.0",
      author: "Nexus",
      category: "provider",
      enabled: true,
      config: { apiKey: "" },
      configSchema: {
        apiKey: { type: "string", label: "API Key", required: true }
      }
    });

    this.register({
      id: "anthropic-provider",
      name: "Anthropic Provider",
      description: "Core provider plugin for Anthropic APIs.",
      version: "1.0.0",
      author: "Nexus",
      category: "provider",
      enabled: true,
      config: { apiKey: "" },
      configSchema: {
        apiKey: { type: "string", label: "API Key", required: true }
      }
    });
  }
}
