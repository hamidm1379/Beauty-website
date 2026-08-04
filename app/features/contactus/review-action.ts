"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type SubmitReviewResult =
  | { success: true }
  | { success: false; error: string };

export async function submitReviewAction(
  formData: FormData,
): Promise<SubmitReviewResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "برای ثبت نظر باید وارد حساب کاربری خود شوید.",
      };
    }

    const userId = Number(session.user.id);
    const productId = Number(formData.get("productId"));
    const rating = Number(formData.get("rating"));
    const title = (formData.get("title") as string)?.trim() || null;
    const comment = (formData.get("comment") as string)?.trim();
    const advantages = (formData.get("advantages") as string)?.trim() || null;
    const disadvantages =
      (formData.get("disadvantages") as string)?.trim() || null;

    if (!productId) {
      return { success: false, error: "محصول مورد نظر یافت نشد." };
    }

    if (!rating || rating < 1 || rating > 5) {
      return {
        success: false,
        error: "امتیاز باید بین ۱ تا ۵ باشد.",
      };
    }

    if (!comment) {
      return { success: false, error: "متن نظر الزامی است." };
    }

    if (comment.length < 3) {
      return {
        success: false,
        error: "متن نظر باید حداقل ۳ کاراکتر باشد.",
      };
    }

    const existing = await prisma.review.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existing) {
      return {
        success: false,
        error: "شما قبلاً برای این محصول نظر ثبت کرده‌اید.",
      };
    }

    await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        title,
        comment,
        advantages,
        disadvantages,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("خطای ثبت نظر:", err);

    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "خطا در ثبت نظر. لطفاً دوباره تلاش کنید.",
    };
  }
}
