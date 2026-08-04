"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { reviewService } from "@/lib/services/review.service";

async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("دسترسی غیرمجاز.");
  }

  return session;
}

export async function approveReviewAction(id: number) {
  try {
    await requireAdmin();

    await reviewService.approveReview(id);

    revalidatePath("/admin/comments");

    return { success: true };
  } catch (err) {
    console.error("خطای تایید نظر:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "خطا در تایید نظر.",
    };
  }
}

export async function rejectReviewAction(id: number) {
  try {
    await requireAdmin();

    await reviewService.rejectReview(id);

    revalidatePath("/admin/comments");

    return { success: true };
  } catch (err) {
    console.error("خطای رد نظر:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "خطا در رد نظر.",
    };
  }
}

export async function deleteReviewAction(id: number) {
  try {
    await requireAdmin();

    await reviewService.deleteReview(id);

    revalidatePath("/admin/comments");

    return { success: true };
  } catch (err) {
    console.error("خطای حذف نظر:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "خطا در حذف نظر.",
    };
  }
}
