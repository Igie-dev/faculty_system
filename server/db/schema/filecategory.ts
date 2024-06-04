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
import { z } from "zod";
export const fileCategory = pgTable("fileCategory", {
  id: serial("id").primaryKey(),
  category_id: uuid("category_id").defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().defaultNow(),
});

export const categoryRelations = relations(fileCategory, ({ many }) => ({
  submissions: many(submission),
}));

export const createFileCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Category must be string!",
    })
    .min(1, { message: "This field must be filled in!" }),
  description: z
    .string({
      invalid_type_error: "Description must be string!",
    })
    .min(1, { message: "This field must be filled in!" }),
});
