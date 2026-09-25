import { logger } from './logger.mjs';

export function createProject(name) {
  logger.info(`Creating new Nexus project: ${name}`);
  logger.success('Project created successfully.');
}
