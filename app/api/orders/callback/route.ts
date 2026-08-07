import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/payment";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!authority) {
    return NextResponse.redirect(
      new URL("/account?payment=error", appUrl),
    );
  }

  const order = await prisma.order.findFirst({
    where: { authority },
    orderBy: { createdAt: "desc" },
  });

  if (!order) {
    return NextResponse.redirect(
      new URL("/account?payment=error", appUrl),
    );
  }

  if (status !== "OK") {
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: "FAILED" },
    });

    return NextResponse.redirect(
      new URL(`/account?payment=failed&order=${order.id}`, appUrl),
    );
  }

  try {
    const { refId, success } = await verifyPayment({
      amount: order.total,
      authority,
    });

    if (success) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          refId: String(refId),
        },
      });

      return NextResponse.redirect(
        new URL(`/account?payment=success&order=${order.id}`, appUrl),
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: "FAILED" },
    });

    return NextResponse.redirect(
      new URL(`/account?payment=failed&order=${order.id}`, appUrl),
    );
  } catch {
    return NextResponse.redirect(
      new URL(`/account?payment=error&order=${order.id}`, appUrl),
    );
  }
}
