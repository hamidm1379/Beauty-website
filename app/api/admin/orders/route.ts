import { NextRequest, NextResponse } from "next/server";

import { orderService } from "@/lib/services/order.service";
import { getErrorMessage } from "@/lib/utils/errors";

import { OrderStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status") as OrderStatus | null;
    const search = searchParams.get("search") ?? undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const data = await orderService.getAdminOrders({
      status: status ?? undefined,
      search,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data,
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
