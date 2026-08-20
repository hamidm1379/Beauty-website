import { NextRequest, NextResponse } from "next/server";
import { couponService } from "@/lib/services/coupon.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = body.code as string;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "کد تخفیف الزامی است." },
        { status: 400 },
      );
    }

    await couponService.releaseCoupon(code);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در آزادسازی کد تخفیف.",
      },
      { status: 500 },
    );
  }
}
