import { NextRequest, NextResponse } from "next/server";
import { couponService } from "@/lib/services/coupon.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await couponService.getAll({ page, limit });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "خطا در دریافت کدهای تخفیف" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const coupon = await couponService.create(body);

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در ایجاد کد تخفیف",
      },
      { status: 400 },
    );
  }
}