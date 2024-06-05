import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDatabaseConnection() {
  const poolConnection = new Pool({
    connectionString: process.env.DATABASE_URL as string,
  });
  return drizzle(poolConnection, { schema, logger: true });
}

export const db = singleton("db", createDatabaseConnection);
export type db = typeof db;
export default db;
