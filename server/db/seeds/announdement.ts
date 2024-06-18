import announcements from "./data/announcements.json";
import type { db } from "@/server/db/seed";
import { announcement, faculty, department, departmentAnnouncement } from "@/server/db/schema";
import { sql } from "drizzle-orm";
export default async function seed(db: db) {
    const foundDeans = await db.select({ faculty_id: faculty.faculty_id }).from(faculty).where(() => sql`${faculty.role} = 'Dean'`);
    if (foundDeans.length <= 0) {
        throw Error(`No dean found!`);
    }
    for (let a of announcements) {
        let data = {
            faculty_id: foundDeans[0]?.faculty_id,
            description: a.description
        };
        const saveAnnouncement = await db.insert(announcement).values(data).returning({ id: announcement.id, announcement_id: announcement.announcement_id });

        if (!saveAnnouncement[0]?.id) {
            throw Error(`Failed to save announcement!`);
        }

        const foundDepartments = await db.select({
            dep_id: department.dep_id
        }).from(department);

        if (foundDepartments.length <= 0) {
            throw Error(`No departments found!`);
        }

        for (let dep of foundDepartments) {
            await db.insert(departmentAnnouncement).values({
                dep_id: dep.dep_id,
                announcement_id: saveAnnouncement[0].announcement_id
            })
        }
    }

}