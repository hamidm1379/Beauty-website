"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("admin-login", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect:false
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "نام کاربری یا رمز عبور اشتباه است.",
          };

        default:
          return {
            error: "خطایی در ورود رخ داده است.",
          };
      }
    }

    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "خطای ناشناخته.",
    };
  }
}