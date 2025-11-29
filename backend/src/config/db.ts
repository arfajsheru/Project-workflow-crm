import pkg from "pg";
import dotenv from "dotenv";
import { PoolClient } from "pg";

dotenv.config();
const { Pool } = pkg;


const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



pool
  .connect()
  .then((client: PoolClient) => {
    console.log("🔗 PostgreSQL Connected Successfully");
    client.release();
  })
  .catch((err: Error) => console.error("❌ PostgreSQL Connection Error:", err));

export default pool;
