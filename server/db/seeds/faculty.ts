import { InferSelectModel } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import faculties from "./data/faculty.json";
import { faculty, facultyDepartment } from "@/server/db/schema";
import type db from "@/server/db";
const saltRound = 9;
export default async function seed(db: db) {
  return await Promise.all(
    faculties.map(async (facultyData) => {
      const generateId = `${uuid()
        .toString()
        .replace("-", "")
        .slice(0, 10)}${facultyData.first_name.slice(
        0,
        2
      )}${facultyData.last_name.slice(0, 2)}`.toUpperCase();
      const hashedPassword = await bcrypt.hash(
        facultyData.password as string,
        saltRound
      );

      const data = {
        name: `${facultyData.first_name} ${facultyData.last_name}`,
        faculty_id: generateId,
        email: facultyData.email as string,
        contact: facultyData.contact as string,
        role: facultyData.role as "Dean" | "Teacher",
        password: hashedPassword,
      };

      const save = await db
        .insert(faculty)
        .values(data)
        .returning({ id: faculty.id });

      if (!save[0]?.id) {
        throw new Error(`Failed to save ${facultyData.last_name}!`);
      }

      const departments = facultyData.departments as InferSelectModel<
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
    })
  );
}
