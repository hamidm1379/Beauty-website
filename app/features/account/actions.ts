"use server";

import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";

export async function getAccountProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return userService.getAccountProfile(Number(session.user.id));
}

export async function updateProfileAction(data: {
  firstName: string;
  lastName?: string;
  email?: string;
  username?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await userService.updateUser(Number(session.user.id), data);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطا در بروزرسانی اطلاعات.",
    };
  }
}
