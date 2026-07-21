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
