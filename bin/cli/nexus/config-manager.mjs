import { logger } from './logger.mjs';

export const configManager = {
  load: () => {
    logger.info('Loading configuration...');
    return {};
  },
  save: (config) => {
    logger.info('Saving configuration...');
  }
};
