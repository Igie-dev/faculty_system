import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";

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
          const foundFaculty = await prisma.faculty.findUnique({
            where: {
              email,
            },
          });

          if (!foundFaculty?.id) {
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
          return foundFaculty;
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
          const foundFaculty = await prisma.faculty.findUnique({
            where: {
              email: user?.email,
            },
            select: {
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
          const foundFaculty = await prisma.faculty.findUnique({
            where: {
              email: user?.email,
            },
            select: {
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
      } catch (error) {}

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      try {
        if (session.user) {
          session.user.faculty_id = token?.faculty_id;
          session.user.role = token?.role;
          session.user.email = token.email;
          session.user.name = token.name;

          if (!token.picture) {
            const foundImage = await prisma.image.findUnique({
              where: { image_id: token?.faculty_id },
            });
            if (foundImage?.id) {
              session.user.image = foundImage?.image_link;
            }
          } else {
            session.user.image = token.picture;
          }
        }
      } catch (error) {}

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin",
    error: "/autherror",
  },
};
