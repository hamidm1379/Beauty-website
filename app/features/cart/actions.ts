"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { cartService } from "@/lib/services/cart.service";

export async function addToCartAction(
  productId: number,
  quantity: number = 1,
  variantId?: number | null,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }
  try {
    const result = await cartService.addToCart(
      Number(session.user.id),
      productId,
      quantity,
      variantId,
    );

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/cart");

    return {
      success: true,
      alreadyInCart: result.alreadyInCart,
    };
  } catch (err) {
    console.error("خطای افزودن به سبد خرید:", err);
    return {
      success: false,
      error: "خطا در افزودن محصول.",
    };
  }
}

export async function increaseCartItemAction(cartItemId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد شوید.",
    };
  }

  await cartService.increaseQuantity(cartItemId, Number(session.user.id));

  revalidatePath("/cart");

  return {
    success: true,
  };
}

export async function decreaseCartItemAction(cartItemId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد شوید.",
    };
  }

  await cartService.decreaseQuantity(cartItemId, Number(session.user.id));

  revalidatePath("/cart");

  return {
    success: true,
  };
}

export async function removeCartItemAction(cartItemId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد شوید.",
    };
  }

  await cartService.removeItem(cartItemId, Number(session.user.id));

  revalidatePath("/cart");

  return {
    success: true,
  };
}
