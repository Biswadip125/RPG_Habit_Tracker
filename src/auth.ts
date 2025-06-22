import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./lib";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./schema/loginFormSchema";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = LoginFormSchema.safeParse(credentials);
        if (!result.success) {
          return null;
        }
        const { email, password } = result.data;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
          return user;
        }
        return null;
      },
    }),
    GitHub,
    Google,
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
