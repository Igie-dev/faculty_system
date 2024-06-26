import { announcement, departmentAnnouncement } from "@/server/db/schema"
import { db } from "@/server/db"
import { createTRPCRouter, handleError, privateProcedure, publicProcedure } from '../trpc';
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

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
    }),
    getBytAnnouncementId: publicProcedure.input(z.string()).query(async ({ input }) => {
        try {
            const annnouncementId = input;
            const foundAnnouncement = await db.query.announcement.findFirst({
                where: () => sql`${announcement.announcement_id} = ${annnouncementId}`,
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

            if (!foundAnnouncement?.id) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Announcement not found!"
                })
            }

            return {
                success: true,
                data: foundAnnouncement
            }
        } catch (error) {
            handleError(error)
        }
    })
})