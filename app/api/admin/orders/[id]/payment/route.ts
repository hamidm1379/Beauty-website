import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils/errors";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { paymentStatus: body.paymentStatus },
    });

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
