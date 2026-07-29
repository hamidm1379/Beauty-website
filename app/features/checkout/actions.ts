"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function createAddressAction(data: {
  title: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  plaque?: string;
  unit?: string;
  isDefault?: boolean;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }

  try {
    const address = await userService.createAddress(
      Number(session.user.id),
      data,
    );

    revalidatePath("/checkout");

    return {
      success: true,
      data: address,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error) ?? "خطا در ثبت آدرس.",
    };
  }
}