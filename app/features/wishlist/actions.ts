"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { wishlistService } from "@/lib/services/wishlist.service";

type ToggleWishlistResult =
  | { success: true; isFavorite: boolean }
  | { success: false; error: string };

export async function toggleWishlistAction(
  productId: number,
): Promise<ToggleWishlistResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }

  try {
    const result = await wishlistService.toggle(
      Number(session.user.id),
      productId,
    );

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/wishlist");

    return {
      success: true,
      isFavorite: result.isFavorite,
    };
  } catch (err) {
    console.error("خطای افزودن/حذف علاقه‌مندی:", err);

    return {
      success: false,
      error: "خطا در بروزرسانی علاقه‌مندی‌ها.",
    };
  }
}

export async function removeFromWishlistAction(productId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد شوید.",
    };
  }

  try {
    await wishlistService.remove(Number(session.user.id), productId);

    revalidatePath("/wishlist");

    return { success: true };
  } catch (err) {
    console.error("خطای حذف علاقه‌مندی:", err);

    return {
      success: false,
      error: "خطا در حذف از علاقه‌مندی‌ها.",
    };
  }
}