export const logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  warn: (msg) => console.warn(`\x1b[33m[WARN] ${msg}\x1b[0m`),
  error: (msg) => console.error(`\x1b[31m[ERROR] ${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS] ${msg}\x1b[0m`)
};
