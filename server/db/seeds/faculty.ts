import { InferSelectModel } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import faculties from "./data/faculties.json";
import { faculty, facultyDepartment } from "@/server/db/schema";
import type { db } from "@/server/db/seed";
const saltRound = 9;
export default async function seed(db: db) {
  for (let fac of faculties) {
    const generateId = `${uuid()
      .toString()
      .replace("-", "")
      .slice(0, 10)}${fac.first_name.slice(0, 2)}${fac.last_name.slice(
      0,
      2
    )}`.toUpperCase();
    const hashedPassword = await bcrypt.hash(fac.password as string, saltRound);

    const data = {
      name: `${fac.first_name} ${fac.last_name}`,
      faculty_id: generateId,
      email: fac.email as string,
      contact: fac.contact as string,
      role: fac.role as "Dean" | "Teacher",
      password: hashedPassword,
    };
    const save = await db
      .insert(faculty)
      .values(data)
      .returning({ id: faculty.id });

    if (!save[0]?.id) {
      throw new Error(`Failed to save faculty ${fac.last_name}!`);
    }

    const departments = fac.departments as InferSelectModel<
      typeof facultyDepartment
    >[];

    if (departments.length >= 0) {
      for (let dep of departments) {
        await db.insert(facultyDepartment).values({
          faculty_id: data.faculty_id,
          dep_id: dep.dep_id,
        });
      }
    }
  }
}
