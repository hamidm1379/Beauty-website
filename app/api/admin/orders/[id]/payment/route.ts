import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/services/order.service";

import { PaymentStatus } from "@prisma/client";
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

    const result = await orderService.changePaymentStatus(
      Number(params.id),

      body.paymentStatus as PaymentStatus,
    );

    return NextResponse.json({
      success: true,

      data: result,
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
