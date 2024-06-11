import pg from "pg";
import { Table, getTableName, sql } from "drizzle-orm";
import * as schema from "@/server/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import faculty from "./seeds/faculty.js";
import department from "./seeds/department";
import schoolyear from "./seeds/schoolyear";
import semester from "./seeds/semester";
import filecategory from "./seeds/filecategory.js";

import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL as string,
});

const db = drizzle(pool);
export type db = typeof db;

async function resetTable(db: db, table: Table) {
  const tableName = getTableName(table);
  const query = `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`;
  try {
    await db.execute(sql.raw(query));
    console.log(`Table ${tableName} reset successfully`);
  } catch (error) {
    console.error(`Failed to reset table ${tableName}:`, error);
    throw error;
  }
}

(async () => {
  try {
    console.log("Reset table started");
    const tables = [
      schema.faculty,
      schema.department,
      schema.school_year,
      schema.semester,
      schema.file_category,
    ];
    for (let table of tables) {
      await resetTable(db, table);
    }
    console.log("Seeding started");
    await Promise.all([
      department(db),
      faculty(db),
      schoolyear(db),
      semester(db),
      filecategory(db),
    ]);
    console.log("Seeding done");
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
