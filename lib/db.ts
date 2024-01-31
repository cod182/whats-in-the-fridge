import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.NEXT_DB_HOST,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASS,
  database: process.env.NEXT_DB_NAME,
  port: parseInt(process.env.NEXT_DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,

});

export const executeQuery = async (query: string, values?: any[]) => {
  const connection = await pool.getConnection();
  try {
    const result = await connection.query(query, values);
    return result[0];
  } finally {
    connection.release();
  }
 
};