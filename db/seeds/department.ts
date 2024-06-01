import departments from "@/db/seeds/data/department.json";
import { department } from "@/db/schema";
import { v4 as uuid } from "uuid";
export default async function seed(db: any) {
  return await Promise.all(
    departments.map(async (departmentData) => {
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
