import { Pool } from 'pg';

const { parsed } = require('dotenv').config();

const pool = new Pool({
  user: parsed.DB_USER,
  password: parsed.DB_PASSWORD,
  host: parsed.DB_HOST,
  port: Number(parsed.DB_PORT),
  database: parsed.DB_DATABASE,
});
export default pool;
