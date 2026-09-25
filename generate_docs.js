const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\USER\\Downloads\\OmniRoute-release-v3.8.49\\OmniRoute-release-v3.8.49';

const readmeContent = `
# 🌌 Nexus AI Gateway

<div align="center">
  <h3>Enterprise-Grade AI Routing, Memory & Workflow Engine</h3>
  <p>The ultimate infrastructure for scaling, managing, and optimizing Large Language Model interactions.</p>
</div>

---

## 📖 Introduction
Nexus AI Gateway is an advanced middleware platform designed to unify access to multiple AI providers, enforce granular rate limits, manage quotas, and provide deep analytics.

## ✨ Features
- 🚀 **High-Performance Routing Engine**: Dynamic load balancing and fallback mechanisms.
- 🧠 **AI Brain & Memory**: Persistent context management and long-term memory via Knowledge Packs.
- 🔌 **Plugin System**: Extensible architecture for custom integrations.
- 📊 **Advanced Analytics**: Real-time insights and benchmarking.
- 🔐 **Enterprise Security**: Role-based access control (RBAC), robust API key management.

## 🏗️ Architecture
Nexus AI Gateway relies on a non-blocking workflow engine designed for high throughput.

## 💻 Installation
\`\`\`bash
npm install -g @nexus/ai-gateway
\`\`\`

## ⚙️ Configuration
Nexus stores its configuration in the default workspace:
\`\`\`bash
~/Nexus
\`\`\`

The server listens on port **20128** by default.

## 🛠️ CLI
\`\`\`bash
nexus init
nexus start --port 20128
nexus status
\`\`\`

## 🔌 API
Our REST API is available at \`http://localhost:20128/api/v1\`. Check out [REST-API.md](docs/REST-API.md) for details.

## 📚 Examples
Explore real-world use cases in [Examples.md](docs/Examples.md).

## 🖼️ Screenshots
*(Screenshot placeholders)*
- [Dashboard](docs/assets/dashboard-placeholder.png)
- [Routing Rules](docs/assets/routing-placeholder.png)

## 🧑‍💻 Developer Guide
Start hacking on Nexus AI Gateway! Read our [Developer Guide](docs/Developer-Guide.md).

## 🤝 Contributing
We welcome contributions! Please review our [Contributing Guide](legal/Contributing Guide.md) and [Code of Conduct](legal/Code of Conduct.md).

## 📄 License
Copyright (c) Nexus AI. All rights reserved.
`;

const legalFiles = [
  'Privacy Policy.md',
  'Terms of Service.md',
  'Security Policy.md',
  'Code of Conduct.md',
  'Contributing Guide.md',
  'Support Policy.md',
  'Responsible AI Policy.md',
  'Data Usage Policy.md',
  'Cookie Policy.md'
];

const docFiles = [
  'Getting-Started.md', 'Installation.md', 'CLI-Commands.md', 'Configuration.md', 
  'Providers.md', 'Routing-Engine.md', 'AI-Brain.md', 'Memory.md', 'Knowledge-Packs.md', 
  'Plugin-System.md', 'Analytics.md', 'Benchmarking.md', 'Workflow-Engine.md', 
  'REST-API.md', 'Authentication.md', 'API-Keys.md', 'Rate-Limits.md', 'Quota-System.md', 
  'Billing.md', 'Security.md', 'Deployment.md', 'Docker.md', 'Troubleshooting.md', 
  'FAQ.md', 'Examples.md', 'Developer-Guide.md', 'Architecture.md'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(path.join(ROOT, 'legal'));
ensureDir(path.join(ROOT, 'docs'));

fs.writeFileSync(path.join(ROOT, 'README.md'), readmeContent.trim());

legalFiles.forEach(file => {
  const name = file.replace('.md', '');
  const content = `# ${name}\n\nWelcome to the ${name} for **Nexus AI Gateway**.\n\n## Overview\nThis document outlines our policies regarding ${name}. \n\n## Operating Context\nNexus AI Gateway operates on port \`20128\` (e.g., \`http://localhost:20128\`) and uses \`~/Nexus\` as the default workspace for all configurations and memory storage.\n`;
  fs.writeFileSync(path.join(ROOT, 'legal', file), content);
});

docFiles.forEach(file => {
  const name = file.replace('.md', '').replace(/-/g, ' ');
  const content = `# ${name}\n\nWelcome to the ${name} documentation for **Nexus AI Gateway**.\n\n## Details\nNexus AI Gateway provides robust enterprise features. Make sure to configure your environment properly.\n\n### Important Defaults\n- **Default Port**: \`20128\` (\`http://localhost:20128\`)\n- **Default Workspace**: \`~/Nexus\`\n\nExplore more in other documentation files.\n`;
  fs.writeFileSync(path.join(ROOT, 'docs', file), content);
});

console.log('Documentation and Legal files created successfully.');
