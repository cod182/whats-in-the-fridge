import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USER,
    password: process.env.NEXT_DB_PASS,
    database: process.env.NEXT_DB_DBNAME,
    port: parseInt(process.env.NEXT_DB_PORT || '3306', 10),
  }
});

export const executeQuery = async (query: any, values = []) => {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }

}