import { createClient } from '@libsql/client';

type QueryRow = Record<string, unknown>;

export type QueryResultMeta = {
  affectedRows: number;
  rowsAffected: number;
  insertId: number;
  lastInsertRowid: number;
};

let client: ReturnType<typeof createClient> | null = null;

const getClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Database access is only available on the server.');
  }

  if (client) {
    return client;
  }

  const url = process.env.NEXT_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
  const authToken = process.env.NEXT_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('Missing Turso database URL. Set NEXT_TURSO_DATABASE_URL or TURSO_DATABASE_URL.');
  }

  client = createClient({
    url,
    authToken,
  });

  return client;
};

const isReadQuery = (sql: string) => {
  const normalized = sql.trim().toLowerCase();
  return normalized.startsWith('select') || normalized.startsWith('pragma') || normalized.startsWith('with');
};

export const executeQuery = async <T = QueryRow[] | QueryResultMeta>(
  query: string,
  values: unknown[] = []
): Promise<T> => {
  try {
    const dbClient = getClient();

    const result = await dbClient.execute({
      sql: query,
      args: values,
    });

    if (isReadQuery(query)) {
      return result.rows as T;
    }

    const lastInsertRowid = Number(result.lastInsertRowid ?? 0);
    return {
      affectedRows: result.rowsAffected,
      rowsAffected: result.rowsAffected,
      insertId: lastInsertRowid,
      lastInsertRowid,
    } as T;
  } catch (error) {
    console.error('Database Query Error:', error);
    throw new Error('Database query failed');
  }
};
