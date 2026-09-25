const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['open-sse'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.css'];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (EXTENSIONS.includes(path.extname(f))) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix identifiers where 'Nexus AI Gateway' was improperly injected
  content = content.replace(/([a-zA-Z0-9_\-])Nexus AI Gateway/g, '$1Nexus');
  content = content.replace(/Nexus AI Gateway([a-zA-Z0-9_\-])/g, 'Nexus$1');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed syntax in: ${filePath}`);
  }
}

DIRECTORIES.forEach(dir => walkDir(dir, processFile));
console.log('Fix script complete.');
