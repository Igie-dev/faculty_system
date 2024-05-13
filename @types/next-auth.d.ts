import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      faculty_id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
