// run to pre-seed the Turso database with the schema before deploying to production

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
  envFileValues.NEXT_TURSO_DATABASE_URL ||
  envFileValues.TURSO_DATABASE_URL;

const authToken =
  process.env.NEXT_TURSO_AUTH_TOKEN ||
  process.env.TURSO_AUTH_TOKEN ||
  envFileValues.NEXT_TURSO_AUTH_TOKEN ||
  envFileValues.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('Missing Turso URL. Set NEXT_TURSO_DATABASE_URL or TURSO_DATABASE_URL.');
}

const client = createClient({ url, authToken });
const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
const schemaSql = await fs.readFile(schemaPath, 'utf8');

const statements = schemaSql
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const sql of statements) {
  await client.execute(sql);
}

console.log('Turso schema setup complete.');
