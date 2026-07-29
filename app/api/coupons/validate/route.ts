import { NextRequest, NextResponse } from "next/server";
import { couponService } from "@/lib/services/coupon.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const code = body.code as string;
    const amount = Number(body.amount);

    if (!code || Number.isNaN(amount)) {
      return NextResponse.json(
        { success: false, message: "اطلاعات ارسالی نامعتبر است." },
        { status: 400 },
      );
    }

    const result = await couponService.validate(code, amount);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "کد تخفیف معتبر نیست.",
      },
      { status: 400 },
    );
  }
}