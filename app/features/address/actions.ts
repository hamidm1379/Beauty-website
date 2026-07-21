"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { addressService } from "@/lib/services/address.service";

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
    await addressService.create(Number(session.user.id), data);

    revalidatePath("/account");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "خطایی رخ داده است.",
    };
  }
}

export async function setDefaultAddressAction(addressId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }

  try {
    await addressService.setDefault(
      addressId,
      Number(session.user.id),
    );

    revalidatePath("/account");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "خطایی رخ داده است.",
    };
  }
}

export async function deleteAddressAction(addressId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }

  try {
    await addressService.delete(
      addressId,
      Number(session.user.id),
    );

    revalidatePath("/account");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "خطایی رخ داده است.",
    };
  }
}

export async function updateAddressAction(
  addressId: number,
  data: {
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
  },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "ابتدا وارد حساب کاربری شوید.",
    };
  }

  try {
    await addressService.update(
      addressId,
      Number(session.user.id),
      data,
    );

    revalidatePath("/account");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "خطایی رخ داده است.",
    };
  }
}