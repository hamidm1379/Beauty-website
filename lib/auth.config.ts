import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Credentials({
      id: "admin-login",
      name: "Admin Login",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username as string,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const valid = await compare(
          credentials.password as string,
          user.password
        );

        if (!valid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },
} satisfies NextAuthConfig;