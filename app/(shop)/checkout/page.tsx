import { redirect } from "next/navigation";

import Breadcrumb from "@/app/features/checkout/components/Breadcrumb";
import CheckoutHero from "@/app/features/checkout/components/CheckoutHero";
import CheckoutStepper from "@/app/features/checkout/components/CheckoutStepper";
import CheckoutClient from "@/app/features/checkout/components/CheckoutClient";

import { auth } from "@/lib/auth";
import { cartService } from "@/lib/services/cart.service";
import { addressService } from "@/lib/services/address.service";

type Props = {
  searchParams: Promise<{ coupon?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/account/login?redirect=/checkout");
  }

  const { coupon } = await searchParams;

  const userId = Number(session.user.id);

  const [cart, addresses] = await Promise.all([
    cartService.getCart(userId),
    addressService.getByUser(userId),
  ]);

  if (!cart.items.length) {
    redirect("/cart");
  }

  const cartItems = cart.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      title: item.product.title,
      price: item.product.price,
      discountPrice: item.product.discountPrice,
    },
  }));

  return (
    <main className="bg-[#fcfcfc]">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero */}
        <section className="mt-4 sm:mt-6 md:mt-8">
          <CheckoutHero />
        </section>

        {/* Stepper */}
        <section className="mt-2 sm:mt-4 md:mt-6">
          <CheckoutStepper currentStep={2} />
        </section>

        {/* Checkout */}
        <CheckoutClient
          addresses={addresses}
          cartItems={cartItems}
          initialCouponCode={coupon}
        />
      </div>
    </main>
  );
}