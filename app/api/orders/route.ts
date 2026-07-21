import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { orderService } from "@/lib/services/order.service";

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
    );

    return NextResponse.json({
      success: true,

      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,

        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
