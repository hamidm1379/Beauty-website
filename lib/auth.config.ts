import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  trustHost: true,
};

export default authConfig;