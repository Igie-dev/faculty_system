import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { faculty } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const foundFaculty = await db.query.faculty.findFirst({
            where: () => sql`${faculty.email} = ${email}`,
          });

          if (!foundFaculty || !foundFaculty?.id) {
            const error: any = new Error(
              "Invalid credentials! Please check your email or password!"
            );
            error.statusCode = 401; // Unauthorized
            throw error;
          }

          const comparePass = await bcrypt.compare(
            password,
            foundFaculty?.password
          );

          if (!comparePass) {
            const error: any = new Error(
              "Invalid credentials! Please check your email or password!"
            );
            error.statusCode = 401; // Unauthorized
            throw error;
          }
          return foundFaculty as any;
        } catch (error: any) {
          // If the error does not have a status code already, set a default one
          const statusCode = error.statusCode || 500; // Internal Server Error
          const message =
            error.message ||
            "An unexpected error occurred. Please try again later.";
          const customError: any = new Error(message);
          customError.statusCode = statusCode;
          throw customError;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const foundFaculty = await db.query.faculty.findFirst({
            where: () => sql`${faculty.email} = ${user?.email}`,
            columns: {
              faculty_id: true,
              role: true,
            },
          });

          if (!foundFaculty?.faculty_id) {
            const error: any = new Error(
              "Invalid credentials! Please check your email or password!"
            );
            error.statusCode = 401; // Unauthorized
            throw error;
          }
          return user;
        } catch (error: any) {
          // If the error does not have a status code already, set a default one
          const statusCode = error.statusCode || 500; // Internal Server Error
          const message =
            error.message ||
            "An unexpected error occurred. Please try again later.";
          const customError: any = new Error(message);
          customError.statusCode = statusCode;
          throw customError;
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          const foundFaculty = await db.query.faculty.findFirst({
            where: () => sql`${faculty.email} = ${user?.email}`,
            columns: {
              faculty_id: true,
              role: true,
            },
          });

          if (foundFaculty?.faculty_id) {
            token.faculty_id = foundFaculty?.faculty_id;
            token.role = foundFaculty?.role;
          }
          token.email = user.email;
          token.name = user.name;
        }
      } catch (error) {
        throw Error("Unauthorized user!");
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      try {
        if (session.user) {
          session.user.faculty_id = token?.faculty_id;
          session.user.role = token?.role;
          session.user.email = token.email;
          session.user.name = token.name;
          console.log(token)
          if (!token.picture) {
            const foundImage = await db.query.faculty.findFirst({
              where: () => sql`${faculty.faculty_id} = ${token?.faculty_id}`,
              columns: {
                image: true,
              },
            });

            if (foundImage?.image) {
              session.user.image = foundImage.image;
            }
          } else {
            await db.update(faculty).set({
              image: token.picture
            })
            session.user.image = token.picture;
          }
        }
      } catch (error) { }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin",
    error: "/autherror",
  },
};
