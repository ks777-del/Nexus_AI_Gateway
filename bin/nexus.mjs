#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { Command } from 'commander';
import { runWizard } from './cli/nexus/wizard.mjs';
import { registerCommands } from './cli/nexus/commands.mjs';

const program = new Command();
const nexusDir = path.join(os.homedir(), 'Nexus');

async function main() {
  program
    .name('nexus')
    .description('Nexus AI Gateway CLI')
    .version('1.0.0');

  // Register commands
  registerCommands(program);

  // Parse arguments without executing commands yet
  program.parseOptions(process.argv);

  const commandStr = process.argv.slice(2)[0];
  
  if (!fs.existsSync(nexusDir)) {
    // If command isn't just asking for help or version
    if (!['--help', '-h', '--version', '-V'].includes(commandStr)) {
      console.log('Nexus workspace not found. Starting first run wizard...');
      const success = await runWizard(nexusDir);
      if (!success) {
        process.exit(1);
      }
    }
  }

  // If no arguments provided, or after wizard completes and we just ran `nexus`
  if (process.argv.length <= 2) {
    program.outputHelp();
    process.exit(0);
  } else {
    // Parse normally and execute matched command
    program.parse(process.argv);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
