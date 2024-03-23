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

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.NEXT_DB_HOST,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASS,
  database: process.env.NEXT_DB_DBNAME,
  port: parseInt(process.env.NEXT_DB_PORT || '3306', 10),
});

export const executeQuery = async (query: string, values: any[] = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, values);
    return rows;
  } catch (error) {
    return { error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};