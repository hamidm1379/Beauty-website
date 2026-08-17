import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { orderService } from "@/lib/services/order.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const order = await orderService.createOrder(
      Number(session.user.id),

      Number(body.addressId),

      body.couponCode || undefined,
    );

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
        status: 400,
      },
    );
  }
}
