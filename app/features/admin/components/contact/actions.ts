"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { contactService } from "@/lib/services/contact.service";

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "SUPPORT"].includes(session.user.role as string)) {
    throw new Error("دسترسی غیرمجاز.");
  }

  return session;
}

export async function markContactMessageReadAction(id: number) {
  try {
    await requireAdmin();

    await contactService.markAsRead(id);

    revalidatePath("/admin/contact-messages");

    return { success: true };
  } catch (err) {
    console.error("خطای علامت‌گذاری پیام:", err);

    return {
      success: false,
      error:
        err instanceof Error ? err.message : "خطا در بروزرسانی پیام.",
    };
  }
}

export async function deleteContactMessageAction(id: number) {
  try {
    await requireAdmin();

    await contactService.deleteMessage(id);

    revalidatePath("/admin/contact-messages");

    return { success: true };
  } catch (err) {
    console.error("خطای حذف پیام:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "خطا در حذف پیام.",
    };
  }
}