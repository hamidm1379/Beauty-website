import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const address = await userService.updateAddress(
      Number(id),
      Number(session.user.id),
      body,
    );

    return NextResponse.json({ success: true, data: address });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: error.message ?? "خطا در ویرایش آدرس" },
      { status: 400 },
    );
  }
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

    const { id } = await params;

    await userService.deleteAddress(Number(id), Number(session.user.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: error.message ?? "خطا در حذف آدرس" },
      { status: 400 },
    );
  }
}