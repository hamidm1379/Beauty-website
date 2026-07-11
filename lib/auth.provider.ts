import Credentials from "next-auth/providers/credentials";

import { authService } from "@/lib/services/auth.service";

export const credentialsProvider = Credentials({
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

    try {
      return await authService.login(
        credentials.username as string,
        credentials.password as string
      );
    } catch {
      return null;
    }
  },
});