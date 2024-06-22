import { announcement, departmentAnnouncement } from "@/server/db/schema"
import { db } from "@/server/db"
import { createTRPCRouter, handleError, privateProcedure, publicProcedure } from "../trpc";


export const announcementRouter = createTRPCRouter({
    getAll: publicProcedure.query(async () => {
        try {
            const announcements = await db.query.announcement.findMany({
                with: {
                    faculty: {
                        columns: {
                            faculty_id: true,
                            name: true,
                            role: true,
                            image: true
                        }
                    }
                }
            });
            return {
                success: true,
                data: announcements
            }
        } catch (error) {
            handleError(error)
        }
    })
})