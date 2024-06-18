import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Client } from "pg";

// Define a global type for database connection management
const globalForDb = globalThis as unknown as {
  conn: Client | undefined;
};

let conn: Client;

// Check if the connection already exists
if (!globalForDb.conn) {
  conn = new Client({
    connectionString: process.env.DATABASE_URL as string,
  });

  conn.connect().catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  });

  // Assign the connection to the global object if not in production
  if (process.env.NODE_ENV !== "production") {
    globalForDb.conn = conn;
  }
} else {
  conn = globalForDb.conn;
}

// Initialize the drizzle ORM with the database connection
export const db = drizzle(conn, { schema, logger: true });
export type db = typeof db;
export default db;
