import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/payment";
import { sendSms } from "@/lib/sms/kavenegar";
import { cartService } from "@/lib/services/cart.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!authority) {
    return NextResponse.redirect(new URL("/cart?payment=error", appUrl));
  }

  const order = await prisma.order.findFirst({
    where: { authority },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.redirect(new URL("/cart?payment=error", appUrl));
  }

  const safeOrder = order;

  // پرداخت ناموفق: بازگرداندن آیتم‌ها به سبد، حذف سفارش و ریدایرکت به /cart
  async function failAndRedirectToCart() {
    try {
      await cartService.restoreCartFromOrder(safeOrder.userId, {
        items: safeOrder.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          variantId: item.variantId,
        })),
      });

      await prisma.order.delete({ where: { id: safeOrder.id } });
    } catch (error) {
      console.error("[payment-callback] بازگردانی سبد/حذف سفارش ناموفق بود:", error);
    }

    return NextResponse.redirect(new URL("/cart?payment=failed", appUrl));
  }

  if (status !== "OK") {
    return failAndRedirectToCart();
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

      // ارسال پیامک تایید ثبت سفارش (غیرمسدودکننده — شکست پیامک نباید پرداخت موفق را خراب کند)
      try {
        const fullOrder = await prisma.order.findUnique({
          where: { id: order.id },
          select: {
            orderNumber: true,
            user: { select: { phone: true } },
          },
        });

        if (fullOrder?.user?.phone) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

          const message = `خرید شما با موفقیت ثبت شد.\nشماره سفارش: ${fullOrder.orderNumber}\nاز خرید شما سپاسگزاریم.\n${appUrl}`;

          await sendSms(fullOrder.user.phone, message);
        }
      } catch (error) {
        console.error(
          "[payment-callback] ارسال پیامک تایید سفارش ناموفق بود:",
          error,
        );
      }

      return NextResponse.redirect(
        new URL(`/account?payment=success&order=${order.id}`, appUrl),
      );
    }

    // تایید پرداخت ناموفق بود
    return failAndRedirectToCart();
  } catch (error) {
    console.error("[payment-callback] خطا در تایید پرداخت:", error);

    return failAndRedirectToCart();
  }
}
