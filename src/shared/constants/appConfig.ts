import pkg from "../../../package.json" with { type: "json" };

export const APP_CONFIG = {
  name: "Nexus AI Gateway",
  description: "The Intelligent Operating System for AI Models",
  version: pkg.version,
};

export const THEME_CONFIG = {
  storageKey: "theme",
  defaultTheme: "system",
};
