import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requestPayment } from "@/lib/payment";
import { getErrorMessage } from "@/lib/utils/errors";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const orderId = Number(id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "سفارش پیدا نشد." },
        { status: 404 },
      );
    }

    if (order.userId !== Number(session.user.id)) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز." },
        { status: 403 },
      );
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        { success: false, message: "این سفارش قبلاً پرداخت شده است." },
        { status: 400 },
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const callbackUrl = `${appUrl}/api/orders/callback`;

    const { authority, gatewayUrl } = await requestPayment({
      amount: order.total,
      description: `پرداخت سفارش شماره ${order.orderNumber}`,
      callbackUrl,
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { authority },
    });

    return NextResponse.json({
      success: true,
      data: { gatewayUrl },
    });
  } catch (error) {
    console.error("Payment initiation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در اتصال به درگاه پرداخت.",
      },
      { status: 500 },
    );
  }
}
