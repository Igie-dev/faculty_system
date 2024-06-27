import { faculty, facultyArchiveAnnoucement } from "@/server/db/schema"
import { createTRPCRouter, handleTRPCResError, publicProcedure } from '../trpc';
import { z } from "zod";
import { eq, sql, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db"

export const archiveAnnouncementRouter = createTRPCRouter({
    getArchive: publicProcedure.input(z.string()).mutation(async ({ input }) => {
        try {

            const foundFaculty = await db.select({ id: faculty.id }).from(faculty).where(eq(faculty.faculty_id, input));

            if (!foundFaculty[0]?.id) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                })
            }

            const foundArchiveAnnouncements = await db.query.facultyArchiveAnnoucement.findMany({
                where: () => sql`${facultyArchiveAnnoucement.faculty_id} = ${input}`,
                with: {
                    announcement: {
                        with: {
                            faculty: {
                                columns: {
                                    faculty_id: true,
                                    role: true,
                                    name: true,
                                    image: true,
                                }
                            },
                            facultyArchive: true,
                        }
                    }
                }
            }).then((data) => {
                if (data) {
                    const announcements: TAnnouncementData[] = [];
                    for (let archive of data) {
                        const announcement = archive?.announcement as TAnnouncementData;
                        announcements.push(announcement)
                    }
                    return announcements;
                } else {
                    return []
                }
            })

            return {
                success: true,
                data: foundArchiveAnnouncements,
            }
        } catch (error) {
            handleTRPCResError(error)
        }
    }),
    addArchive: publicProcedure.input(z.object({
        announcementId: z.string(),
        facultyId: z.string()
    })).mutation(async ({ input }) => {
        try {
            const { announcementId, facultyId } = input;

            const existArchive = await db.select({ faculty_id: facultyArchiveAnnoucement.faculty_id })
                .from(facultyArchiveAnnoucement)
                .where(and(eq(facultyArchiveAnnoucement.faculty_id, facultyId), eq(facultyArchiveAnnoucement.announcement_id, announcementId)));

            if (existArchive[0]?.faculty_id) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Archive already saved!"
                });
            }

            const saveArchive = await db.insert(facultyArchiveAnnoucement).values({
                faculty_id: facultyId,
                announcement_id: announcementId,
            }).returning({
                announcement_id: facultyArchiveAnnoucement.faculty_id
            });


            if (!saveArchive[0]?.announcement_id) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to save archive!"
                })
            }

            return {
                success: true,
                message: "Archive saved!"
            }
        } catch (error) {
            handleTRPCResError(error);
        }
    }),
    removeArchive: publicProcedure.input(z.object({
        announcementId: z.string(),
        facultyId: z.string()
    })).mutation(async ({ input }) => {
        try {
            const { announcementId, facultyId } = input;

            const existArchive = await db.select({ faculty_id: facultyArchiveAnnoucement.faculty_id })
                .from(facultyArchiveAnnoucement)
                .where(and(eq(facultyArchiveAnnoucement.faculty_id, facultyId), eq(facultyArchiveAnnoucement.announcement_id, announcementId)));

            if (!existArchive[0]?.faculty_id) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Archive not found!"
                });
            }

            await db.delete(facultyArchiveAnnoucement).where(and(eq(facultyArchiveAnnoucement.faculty_id, facultyId), eq(facultyArchiveAnnoucement.announcement_id, announcementId)));

            return {
                success: true,
                message: "Archive deleted!"
            }
        } catch (error) {
            handleTRPCResError(error);
        }
    }),
})