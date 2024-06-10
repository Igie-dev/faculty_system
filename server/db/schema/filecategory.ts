import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { submission } from "./submission";

export const fileCategory = pgTable("filecategory", {
  id: serial("id").primaryKey(),
  category_id: uuid("category_id").defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
});

export const fileCategoryRelations = relations(fileCategory, ({ many }) => ({
  submissions: many(submission),
}));
