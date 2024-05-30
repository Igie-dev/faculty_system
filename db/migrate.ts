import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

const db = drizzle(pool);

async function main() {
  console.log("Migration started");
  await migrate(db, {
    migrationsFolder: "/db/migrations",
  });
  console.log("Migration end");
  process.exit(0);
}

main().catch((error) => console.log(error));
