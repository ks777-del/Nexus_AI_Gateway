import { scaffoldWorkspace } from './installer.mjs';
import { logger } from './logger.mjs';
import { showBanner } from './banner.mjs';
import readline from 'readline';

export async function runWizard(workspacePath) {
  logger.info('Welcome to Nexus AI Gateway First Run Wizard!');
  logger.info('We will now set up your workspace environment.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`Proceed with setting up workspace at ${workspacePath}? (Y/n) `, async (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'n') {
        logger.info('Setup cancelled.');
        resolve(false);
        return;
      }
      
      await scaffoldWorkspace(workspacePath);
      logger.success('Nexus AI Gateway setup is complete!');
      console.log('');
      showBanner();
      resolve(true);
    });
  });
}
