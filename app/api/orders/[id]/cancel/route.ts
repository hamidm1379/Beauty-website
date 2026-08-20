import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { orderService } from "@/lib/services/order.service";
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

    await orderService.cancelOrder(orderId, Number(session.user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در لغو سفارش.",
      },
      { status: 500 },
    );
  }
}
