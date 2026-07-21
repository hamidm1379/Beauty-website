import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const address = await userService.setDefaultAddress(
      Number(id),
      Number(session.user.id),
    );

    return NextResponse.json({ success: true, data: address });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "خطا در تنظیم آدرس پیش‌فرض",
      },
      { status: 400 },
    );
  }
}