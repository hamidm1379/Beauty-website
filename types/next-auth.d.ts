import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      role: UserRole;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    username: string;
    role: UserRole;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: UserRole;
    isActive: boolean;
  }
}