import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export const getCurrentUser = (): Promise<TSessionUser> => {
  return new Promise((resolve, reject) => {
    getServerSession(options)
      .then((session) => {
        resolve(session?.user as TSessionUser);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
