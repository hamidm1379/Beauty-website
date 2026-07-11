import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: UserRole;
      isActive: boolean;
    } & DefaultSession["user"];

  }

  interface User {
    id: string;
    username: string;
    role: UserRole;
    isActive: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: UserRole;
    isActive: boolean;
  }
}