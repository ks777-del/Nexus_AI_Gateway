const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['src', 'bin', 'public', '.env.example', 'config', 'scripts'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.css', '.env', '.example', '.html', '.sh', '.ps1'];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) {
    callback(dir);
    return;
  }
  
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.next') {
        walkDir(dirPath, callback);
      }
    } else {
      if (EXTENSIONS.includes(path.extname(f)) || path.basename(f).includes('.env')) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Env vars
  content = content.replace(/OMNIROUTE_/g, 'NEXUS_');
  
  // 2. DB and Logs
  content = content.replace(/omniroute\.db/g, 'nexus.db');
  content = content.replace(/omniroute\.log/g, 'nexus.log');

  // 3. Workspace
  // Need to be careful here not to break require('@omniroute/...')
  // We only replace exact '.omniroute' string matches which represent the data dir
  content = content.replace(/\.omniroute(?!\/)/g, 'Nexus');
  
  // 4. Branding
  // Replace OmniRoute with Nexus AI Gateway everywhere except in package scopes or URLs
  // Wait, let's just do a blanket replace of "OmniRoute" since it's the exact casing of the brand name
  content = content.replace(/OmniRoute/g, 'Nexus AI Gateway');
  
  // 5. Help Menu URLs
  if (filePath.includes('i18n') || filePath.includes('locales') || filePath.includes('program.mjs') || filePath.includes('commands')) {
    content = content.replace(/https:\/\/github\.com\/[^"'\s`]+/g, 'Coming Soon');
    content = content.replace(/https:\/\/docs\.omniroute\.com[^"'\s`]*/g, 'Coming Soon');
    content = content.replace(/https:\/\/omniroute\.com[^"'\s`]*/g, 'Coming Soon');
    content = content.replace(/https:\/\/discord\.gg\/[^"'\s`]+/g, 'Coming Soon');
  }

  // 6. Changelog Removal
  if (filePath.includes('locales') || filePath.includes('Sidebar') || filePath.includes('Footer') || filePath.includes('About')) {
    content = content.replace(/"changelog":\s*"[^"]+",?/gi, '');
    content = content.replace(/Changelog/gi, '');
  }

  // 7. Port 3000/8080 -> 20128
  content = content.replace(/\b3000\b/g, '20128'); // Replace default 3000 with 20128
  content = content.replace(/\b8080\b/g, '20128'); // Replace alternate default 8080 with 20128

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

DIRECTORIES.forEach(dir => walkDir(dir, processFile));
console.log('Rebranding script complete.');
