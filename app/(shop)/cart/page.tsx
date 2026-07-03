import Breadcrumb from "@/app/features/cart/components/Breadcrumb";
import CartHero from "@/app/features/cart/components/CartHero";
import CartList from "@/app/features/cart/components/CartList";
import OrderSummary from "@/app/features/cart/components/OrderSummary";
import RecommendedProducts from "@/app/features/cart/components/RecommendedProducts";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero */}
        <div className="mt-8">
          <CartHero />
        </div>

        {/* Cart Content */}
        <section
          className="
            mt-10

            grid
            gap-8

            lg:grid-cols-12
            lg:items-start
          "
        >
          {/* Products */}
          <div className="lg:col-span-8">
            <CartList />
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <OrderSummary />
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="mt-20">
          <RecommendedProducts />
        </section>
      </div>
    </main>
  );
}