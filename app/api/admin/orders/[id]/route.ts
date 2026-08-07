import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/services/order.service";
import { getErrorMessage } from "@/lib/utils/errors";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const order = await orderService.getAdminOrder(Number(id));

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (body.trackingCode) {
      const orderId = Number(id);

      await orderService.addTrackingCode(orderId, body.trackingCode);
      await orderService.changeOrderStatus(orderId, "SHIPPED");

      return NextResponse.json({
        success: true,
        data: { success: true },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "داده نامعتبر",
      },
      {
        status: 400,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
