import categories from "./data/categories.json";
import { fileCategory } from "@/server/db/schema";
import type { db } from "@/server/db/seed";

export default async function seed(db: db) {
  for (let cat of categories) {
    const save = await db
      .insert(fileCategory)
      .values({
        name: cat.name,
        description: cat.description,
      })
      .returning({ id: fileCategory.id });

    if (!save[0]?.id) {
      throw Error(`Failed to save category ${cat.name}!`);
    }
  }
}
