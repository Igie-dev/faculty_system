import { announcement } from "@/server/db/schema"
import { db } from "@/server/db"
import { createTRPCRouter, handleTRPCResError, publicProcedure } from '../trpc';
import { z } from "zod";
import { sql, between } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { dateNow } from "@/utils/dateUtil";

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
                    },
                    facultyArchive: true
                }
            });
            return {
                success: true,
                data: announcements
            }
        } catch (error) {
            handleTRPCResError(error)
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
                    },
                    facultyArchive: true
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
            handleTRPCResError(error)
        }
    }),
    getLatest: publicProcedure.query(async () => {
        try {
            const startDate = dateNow().toISOString()
            const endDate = startDate;
            const foundLatestAnnouncements = await db.select().from(announcement).where(between(announcement.createdAt, startDate, endDate));
            return {
                success: true,
                data: foundLatestAnnouncements
            }
        } catch (error) {
            handleTRPCResError(error)
        }
    }),
})