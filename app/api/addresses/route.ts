import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userService } from "@/lib/services/user.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 },
      );
    }

    const addresses = await userService.getAddresses(Number(session.user.id));

    return NextResponse.json({ success: true, data: addresses });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "خطا در دریافت آدرس‌ها" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "ابتدا وارد حساب کاربری شوید." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const address = await userService.createAddress(
      Number(session.user.id),
      body,
    );

    return NextResponse.json({ success: true, data: address });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: getErrorMessage(error) ?? "خطا در ثبت آدرس" },
      { status: 400 },
    );
  }
}