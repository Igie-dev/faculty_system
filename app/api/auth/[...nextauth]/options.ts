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
            where: email,
          });

          if (!foundFaculty?.id) {
            return null;
          }

          const comparePass = await bcrypt.compare(
            password,
            foundFaculty?.password
          );

          if (!comparePass) {
            return null;
          }
          return foundFaculty;
        } catch (error) {
          console.log(error);
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
          const { email } = user;

          const foundFaculty = await prisma.faculty.findUnique({
            where: { email },
            select: { id: true, faculty_id: true },
          });

          if (!foundFaculty?.id) {
            return null;
          }
          return foundFaculty;
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin",
  },
};
