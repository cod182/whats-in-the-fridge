// import mysql from 'serverless-mysql';
// const db = mysql({
//   config: {
//     host: process.env.NEXT_DB_HOST,
//     user: process.env.NEXT_DB_USER,
//     password: process.env.NEXT_DB_PASS,
//     database: process.env.NEXT_DB_DBNAME,
//     port: parseInt(process.env.NEXT_DB_PORT || '3306', 10),
//   }
// });

// export const executeQuery = async (query: string, values: any = []) => {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }

// }

import mysql, { OkPacket, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.NEXT_DB_HOST,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASS,
  database: process.env.NEXT_DB_DBNAME,
  port: parseInt(process.env.NEXT_DB_PORT || '3306', 10),
});

export const executeQuery = async <
  T extends RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader
>(
  query: string,
  values: any[] = []
): Promise<T> => {
  let connection: PoolConnection | undefined;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<T>(query, values);
    return rows;
  } catch (error: any) {
    console.error('Database Query Error: ', error);
    throw new Error('Database query failed');
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
