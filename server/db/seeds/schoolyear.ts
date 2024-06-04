import schoolyears from "./data/schoolYears.json";
import { schoolyear } from "../schema/schoolyear";
import type { db } from "@/server/db/seed";

export default async function seed(db: db) {
  for (let schol of schoolyears) {
    const save = await db
      .insert(schoolyear)
      .values({
        school_year: schol.school_year,
      })
      .returning({
        id: schoolyear.id,
      });
    if (!save[0]?.id) {
      throw new Error(`Failed to save school year ${schol.school_year}!`);
    }
  }
}
