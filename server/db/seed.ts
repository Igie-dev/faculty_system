import pg from "pg";
import { Table, getTableName, sql } from "drizzle-orm";
import faculty from "./seeds/faculty.js";
import department from "./seeds/department";
import * as schema from "@/server/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL as string,
});

const db = drizzle(pool);
export type db = typeof db;

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

(async () => {
  console.log("Reset table started");
  for (const table of [schema.faculty, schema.department]) {
    await resetTable(db, table);
  }
  console.log("Seeding started");
  await faculty(db);

  await department(db);
  console.log("Seeding done");
  await pool.end();
})().catch((error) => {
  console.log(error);
  process.exit(0);
});
