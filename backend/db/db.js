import mysql from 'mysql2';
import { configDotenv } from 'dotenv';

configDotenv();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default db;
