"use server";
import prisma from "@/utils/prisma";
export const getFaculties = async (): Promise<TFacultyData[]> => {
  try {
    const faculties = await prisma.faculty.findMany({
      select: {
        id: true,
        faculty_id: true,
        name: true,
        contact: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        Announcements: {
          include: {
            Files: {
              select: {
                file_id: true,
                file_name: true,
                mimetype: true,
                file_link: true,
                file_category: true,
              },
            },
          },
        },
        FacultyDepartments: {
          include: {
            Departments: true,
          },
        },
        ArchiveAnnouncements: true,
        Notifications: {},
        Submissions: {
          include: {
            Files: {
              select: {
                file_id: true,
                file_name: true,
                mimetype: true,
                file_link: true,
                file_category: true,
              },
            },
          },
        },
        Tasks: true,
        Files: {
          select: {
            file_id: true,
            file_name: true,
            mimetype: true,
            file_link: true,
            file_category: true,
          },
        },
      },
    });

    if (faculties?.length <= 0) {
      return [];
    }
    return faculties;
  } catch (error) {
    return [];
  }
};
