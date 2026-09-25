import fs from 'fs';
import path from 'path';
import { logger } from './logger.mjs';

export async function scaffoldWorkspace(basePath) {
  const folders = [
    'backend', 'frontend', 'database', 'storage', 'plugins', 
    'knowledge', 'models', 'cache', 'logs', 'uploads', 
    'config', 'workflows', 'memory', 'benchmarks', 
    'analytics', 'providers'
  ];

  const configFiles = [
    'gateway.json', 'brain.json', 'providers.json', 
    'routing.json', 'memory.json', 'security.json', 
    'analytics.json', 'billing.json', 'quotas.json', 
    'workflows.json', 'plugins.json'
  ];

  logger.info(`Creating Nexus workspace at ${basePath}...`);

  for (const folder of folders) {
    const dir = path.join(basePath, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logger.success(`Created directory: ${folder}`);
    }
  }

  for (const file of configFiles) {
    const filePath = path.join(basePath, 'config', file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
      logger.success(`Created config file: config/${file}`);
    }
  }

  logger.info('Workspace scaffolding complete.');
}
