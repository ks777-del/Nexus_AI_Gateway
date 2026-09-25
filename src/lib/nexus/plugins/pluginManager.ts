import { PluginDefinition, PluginState } from "./types";
import { PluginRegistry } from "./pluginRegistry";

export class PluginManager {
  private state: PluginState = {
    plugins: new Map(),
    enabled: new Set()
  };
  private registry: PluginRegistry;

  constructor(registry: PluginRegistry) {
    this.registry = registry;
  }

  async initialize() {
    const availablePlugins = this.registry.getAll();
    availablePlugins.forEach(p => {
      this.state.plugins.set(p.id, p);
      if (p.enabled) {
        this.state.enabled.add(p.id);
      }
    });
  }

  enable(pluginId: string): boolean {
    const plugin = this.state.plugins.get(pluginId);
    if (!plugin) return false;
    
    // Check dependencies (simplified)
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.state.enabled.has(dep)) {
          throw new Error(`Missing dependency: ${dep}`);
        }
      }
    }
    
    plugin.enabled = true;
    this.state.enabled.add(pluginId);
    return true;
  }

  disable(pluginId: string): boolean {
    const plugin = this.state.plugins.get(pluginId);
    if (!plugin) return false;
    
    plugin.enabled = false;
    this.state.enabled.delete(pluginId);
    return true;
  }

  updateConfig(pluginId: string, config: Record<string, unknown>): boolean {
    const plugin = this.state.plugins.get(pluginId);
    if (!plugin) return false;
    
    plugin.config = { ...plugin.config, ...config };
    return true;
  }

  getEnabledPlugins(): PluginDefinition[] {
    return Array.from(this.state.enabled)
      .map(id => this.state.plugins.get(id))
      .filter((p): p is PluginDefinition => p !== undefined);
  }
}
