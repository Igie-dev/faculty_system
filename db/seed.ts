import faculty from "./seeds/faculty.js";
import department from "./seeds/department.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

const db = drizzle(pool);

(async () => {
  console.log("Seeding started");
  await faculty(db);
  await department(db);
})().catch((error) => {
  console.log(error);
  process.exit(0);
});
