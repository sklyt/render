import { existsSync, mkdirSync, cpSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const src = join(repoRoot, 'prebuilds');
const dest = join(repoRoot, 'dist', 'prebuilds');

if (!existsSync(src)) {
  console.warn('[copy-prebuilds] no prebuilds folder found at', src);
  process.exit(0);
}

mkdirSync(dirname(dest), { recursive: true });

try {
  // Requires Node >=16.7.0 for fs.cpSync
  cpSync(src, dest, { recursive: true });
  console.log('[copy-prebuilds] copied', src, '->', dest);
} catch (err) {
  console.error('[copy-prebuilds] failed to copy:', err);
  process.exit(1);
}
