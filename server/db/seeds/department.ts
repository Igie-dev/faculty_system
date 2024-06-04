import departments from "./data/departments.json";
import { department } from "@/server/db/schema";
import type { db } from "@/server/db/seed";

export default async function seed(db: db) {
  for (let dep of departments) {
    const saveDepartment = await db
      .insert(department)
      .values({
        acronym: dep.acronym,
        name: dep.name,
      })
      .returning({ id: department.id });
    if (!saveDepartment[0]?.id) {
      throw Error(`Failed to save department ${dep.acronym}!`);
    }
  }
}
