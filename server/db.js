import pg from "pg";
import { config } from "dotenv";
config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.dbPort,
});

export default pool;
