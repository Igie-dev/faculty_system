import semesters from "./data/semesters.json";
import { semester } from "../schema/semester";
import type { db } from "@/server/db/seed";
export default async function seed(db: db) {
  for (let sem of semesters) {
    const save = await db
      .insert(semester)
      .values({ semester: sem.semester })
      .returning({
        id: semester.id,
      });
    if (!save[0]?.id) {
      throw new Error(`Failed to save semester ${sem.semester}!`);
    }
  }
}
