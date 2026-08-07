import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { credentialsProvider, otpCredentialsProvider } from "./auth.provider";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [credentialsProvider, otpCredentialsProvider],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.isActive = user.isActive;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as "ADMIN" | "CUSTOMER" | "SUPPORT";
        session.user.isActive = token.isActive as boolean;
      }

      return session;
    },
  },
});