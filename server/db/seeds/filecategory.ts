import categories from "./data/categories.json";
import { file_category } from "@/server/db/schema";
import type { db } from "@/server/db/seed";

export default async function seed(db: db) {
  for (let cat of categories) {
    const save = await db
      .insert(file_category)
      .values({
        name: cat.name,
        description: cat.description,
      })
      .returning({ id: file_category.id });

    if (!save[0]?.id) {
      throw Error(`Failed to save category ${cat.name}!`);
    }
  }
}
