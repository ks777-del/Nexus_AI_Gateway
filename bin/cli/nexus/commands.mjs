import { runDoctor } from './doctor.mjs';
import { checkForUpdates } from './updater.mjs';
import { displayStatus } from './status-display.mjs';
import { createProject } from './project-creator.mjs';

export function registerCommands(program) {
  program
    .command('doctor')
    .description('Run system health checks')
    .action(() => {
      runDoctor();
    });

  program
    .command('update')
    .description('Check for and install updates')
    .action(() => {
      checkForUpdates();
    });

  program
    .command('status')
    .description('Display system status')
    .action(() => {
      displayStatus();
    });

  program
    .command('create <name>')
    .description('Create a new project')
    .action((name) => {
      createProject(name);
    });
}
