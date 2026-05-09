import { createClient } from '@libsql/client';
import fs from 'node:fs/promises';
import path from 'node:path';

const readEnvFile = async () => {
  const envPath = path.resolve(process.cwd(), '.env');
  try {
    const content = await fs.readFile(envPath, 'utf8');
    const envMap = {};

    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      value = value.replace(/^['\"]|['\"]$/g, '');
      envMap[key] = value;
    }

    return envMap;
  } catch {
    return {};
  }
};

const envFileValues = await readEnvFile();

const url =
  process.env.NEXT_TURSO_DATABASE_URL ||
  process.env.TURSO_DATABASE_URL ||
  process.env.witf_database_TURSO_DATABASE_URL ||
  envFileValues.NEXT_TURSO_DATABASE_URL ||
  envFileValues.TURSO_DATABASE_URL ||
  envFileValues.witf_database_TURSO_DATABASE_URL;

const authToken =
  process.env.NEXT_TURSO_AUTH_TOKEN ||
  process.env.TURSO_AUTH_TOKEN ||
  process.env.witf_database_TURSO_AUTH_TOKEN ||
  envFileValues.NEXT_TURSO_AUTH_TOKEN ||
  envFileValues.TURSO_AUTH_TOKEN ||
  envFileValues.witf_database_TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('Missing Turso URL. Set NEXT_TURSO_DATABASE_URL or TURSO_DATABASE_URL.');
}

const client = createClient({ url, authToken });

const loadCatalog = async () => {
  const itemsPath = path.resolve(process.cwd(), 'static/items.js');
  const source = await fs.readFile(itemsPath, 'utf8');

  const exportedNames = [...source.matchAll(/export const\s+(\w+)\s*=/g)].map((match) => match[1]);
  const transformed = source.replace(/export const\s+/g, 'const ');
  const evaluator = new Function(`${transformed}\nreturn { ${exportedNames.join(', ')} };`);
  return evaluator();
};

const catalog = await loadCatalog();

const allItems = Object.values(catalog)
  .filter((value) => Array.isArray(value))
  .flat()
  .filter((item) => item && typeof item === 'object' && item.name && item.image)
  .map((item) => ({
    name: String(item.name),
    itemMainType: String(item.itemMainType ?? ''),
    itemType: String(item.type ?? item.itemType ?? ''),
    itemSubType: String(item.subtype ?? item.itemSubType ?? ''),
    image: String(item.image),
  }));

const uniqueByKey = new Map();
for (const item of allItems) {
  const key = [item.name, item.itemMainType, item.itemType, item.itemSubType, item.image].join('|');
  if (!uniqueByKey.has(key)) {
    uniqueByKey.set(key, item);
  }
}

const uniqueItems = [...uniqueByKey.values()];

await client.execute('DELETE FROM availableItems');

for (const item of uniqueItems) {
  await client.execute({
    sql: 'INSERT INTO availableItems (name, itemMainType, itemType, itemSubType, image) VALUES (?, ?, ?, ?, ?)',
    args: [item.name, item.itemMainType, item.itemType, item.itemSubType, item.image],
  });
}

console.log(`Seeded availableItems with ${uniqueItems.length} rows.`);
