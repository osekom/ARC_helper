/**
 * Reads all .json files from public/data/ (excluding items.json itself)
 * and writes:
 *   - public/data/index.json   → array of item IDs (for reference)
 *   - public/data/items.json   → merged array of all item objects (used by the app)
 *
 * Usage:  node scripts/generate-data-index.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../public/data');

const files = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json') && f !== 'items.json' && f !== 'index.json')
  .sort();

const ids = files.map((f) => f.replace(/\.json$/, ''));
const items = files.map((f) => {
  const raw = readFileSync(resolve(dataDir, f), 'utf-8');
  return JSON.parse(raw);
});

writeFileSync(resolve(dataDir, 'index.json'), JSON.stringify(ids, null, 2), 'utf-8');
writeFileSync(resolve(dataDir, 'items.json'), JSON.stringify(items, null, 2), 'utf-8');

console.log(`Generated index.json and items.json: ${items.length} items`);
