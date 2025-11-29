import fs from "fs";
import path from "path";
import pool from "../src/config/db";

async function runMigrations(): Promise<void> {
  const migrationDir = path.resolve("migrations");

  const files = fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  console.log("\n🚀 Starting PostgreSQL Migrations...\n");

  for (const file of files) {
    const filePath = path.join(migrationDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    try {
      console.log(`📌 Executing migration: ${file}`);
      await pool.query(sql); // ⬅ no unused variable now

      console.log(`✅ Completed: ${file}\n`);
    } catch (error: any) {
      console.error(`❌ Error in migration ${file}:`, error.message);
      process.exit(1);
    }
  }

  console.log("🎉 All PostgreSQL migrations executed successfully!");
  process.exit(0);
}

runMigrations();
