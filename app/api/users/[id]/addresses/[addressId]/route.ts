import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";

interface RouteContext {
  params: Promise<{ id: string; addressId: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 },
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز." },
        { status: 403 },
      );
    }

    const { id, addressId } = await params;

    await userService.deleteAddress(Number(addressId), Number(id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: error.message ?? "خطا در حذف آدرس" },
      { status: 400 },
    );
  }
}