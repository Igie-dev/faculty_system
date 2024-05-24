import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export const getCurrentUser = async () => {
  const session = await getServerSession(options);
  const { faculty_id, role } = session?.user as any;
  return { faculty_id, role };
};
