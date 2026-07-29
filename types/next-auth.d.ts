import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

/**
 * تعریف نوع یکپارچه‌ی NextAuth.
 *
 * این فایل تنها منبع تعریف نوع برای session، user و token است؛
 * فایل تکراری `types/auth.d.ts` حذف شده تا تداخل تعریف‌ها پیش نیاید.
 */

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
    name?: string | null;
    email?: string | null;
    username?: string;
    role: UserRole;
    isActive: boolean;
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    role: UserRole;
    isActive: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    username?: string;
    role: UserRole;
    isActive: boolean;
  }
}
