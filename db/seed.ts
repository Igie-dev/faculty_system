import { Table, getTableName, sql } from "drizzle-orm";
import faculty from "./seeds/faculty.js";
import department from "./seeds/department.js";
import { db, client } from "@/db";
import * as schema from "@/db/schema";

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
  await client.end();
})().catch((error) => {
  console.log(error);
  process.exit(0);
});
