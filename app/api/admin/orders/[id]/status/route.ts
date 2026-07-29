import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/services/order.service";

import { OrderStatus } from "@prisma/client";
import { getErrorMessage } from "@/lib/utils/errors";

export async function PATCH(
  req: NextRequest,

  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  try {
    const body = await req.json();

    const status = body.status as OrderStatus;

    if (!status) {
      return NextResponse.json(
        {
          success: false,

          message: "وضعیت سفارش ارسال نشده",
        },

        {
          status: 400,
        },
      );
    }

    const order = await orderService.changeOrderStatus(
      Number(params.id),

      status,
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
        status: 500,
      },
    );
  }
}
