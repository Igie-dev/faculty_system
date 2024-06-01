import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Client } from "pg";

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

client.connect();
export const db = drizzle(client, { schema, logger: true });
export type db = typeof db;
export default db;
