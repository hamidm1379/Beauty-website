"use server";

import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("admin-login", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });

    return {};
  } catch (error: any) {
    if (error?.type === "CredentialsSignin") {
      return {
        error: "نام کاربری یا رمز عبور اشتباه است.",
      };
    }

    return {
      error: "خطایی در ورود رخ داده است.",
    };
  }
}