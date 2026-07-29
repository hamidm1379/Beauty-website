import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/services/order.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(
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
    const order = await orderService.getAdminOrder(Number(params.id));

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

    if (body.trackingCode) {
      const order = await orderService.addTrackingCode(
        Number(params.id),
        body.trackingCode,
      );

      return NextResponse.json({
        success: true,

        data: order,
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
