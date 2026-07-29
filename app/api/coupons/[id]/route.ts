import { NextRequest, NextResponse } from "next/server";
import { couponService } from "@/lib/services/coupon.service";
import { getErrorMessage } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const coupon = await couponService.getById(Number(id));

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "کد تخفیف پیدا نشد.",
      },
      { status: 404 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const body = await request.json();

    const coupon = await couponService.update(Number(id), body);

    return NextResponse.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در بروزرسانی کد تخفیف",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    await couponService.delete(Number(id));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در حذف کد تخفیف",
      },
      { status: 400 },
    );
  }
}