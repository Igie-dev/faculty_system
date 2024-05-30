import departments from "@/db/seeds/data/department.json";
import { sql } from "drizzle-orm";
import { department } from "../schema";
import { v4 as uuid } from "uuid";
export default async function seed(db: any) {
  await Promise.all(
    departments.map(async (departmentData) => {
      const exist = await db.query.department.findFirst({
        where: () =>
          sql`${department.acronym} = ${departmentData.acronym} OR ${department.department} = ${departmentData.department}`,
        columns: {
          dep_id: true,
        },
      });

      if (exist?.dep_id) {
        throw Error(`Department ${departmentData.acronym} aleady exist!`);
      }
      const saveDepartment = await db
        .insert(department)
        .values({
          dep_id: uuid(),
          acronym: departmentData.acronym,
          department: departmentData.department,
        })
        .returning({ id: department.id });
      if (!saveDepartment[0]?.id) {
        throw Error(`Failed to save department ${departmentData.acronym}!`);
      }
    })
  );
}
