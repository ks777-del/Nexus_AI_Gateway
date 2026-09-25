export function showBanner() {
  const blue = "\x1b[34m";
  const cyan = "\x1b[36m";
  const green = "\x1b[32m";
  const reset = "\x1b[0m";
  const bold = "\x1b[1m";

  console.log(`${blue}██████████████████████████${reset}`);
  console.log(`      ${cyan}${bold}NEXUS AI GATEWAY${reset}`);
  console.log(`AI Infrastructure Platform`);
  console.log(`${blue}██████████████████████████${reset}`);
  console.log(`🧠 AI Brain         ${green}READY${reset}`);
  console.log(`⚡ Routing          ${green}READY${reset}`);
  console.log(`📚 Memory           ${green}READY${reset}`);
  console.log(`🔌 Providers        ${cyan}18 Connected${reset}`);
  console.log(`🤖 Models           ${cyan}320 Available${reset}`);
  console.log(`📊 Dashboard        ${blue}http://localhost:20128${reset}`);
  console.log(`🔑 API              ${blue}http://localhost:20128/v1${reset}`);
  console.log('');
}
