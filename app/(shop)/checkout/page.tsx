import Breadcrumb from "@/app/features/checkout/components/Breadcrumb";
import CheckoutHero from "@/app/features/checkout/components/CheckoutHero";
import CheckoutStepper from "@/app/features/checkout/components/CheckoutStepper";
import ShippingForm from "@/app/features/checkout/components/ShippingForm";
import ShippingMethod from "@/app/features/checkout/components/ShippingMethod";
import CouponBox from "@/app/features/checkout/components/CouponBox";
import OrderSummary from "@/app/features/checkout/components/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="bg-[#fcfcfc]">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero */}
        <section className="mt-6">
          <CheckoutHero />
        </section>

        {/* Stepper */}
        <section className="mt-6">
          <CheckoutStepper currentStep={2} />
        </section>

        {/* Checkout */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <div className="space-y-8">
            <ShippingForm />

            <ShippingMethod />

            <CouponBox />
          </div>

          {/* Right */}
          <aside className="lg:sticky lg:top-6 h-fit">
            <OrderSummary />
          </aside>
        </section>
      </div>
    </main>
  );
}