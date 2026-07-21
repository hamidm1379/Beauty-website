import Breadcrumb from "@/app/features/cart/components/Breadcrumb";
import CartHero from "@/app/features/cart/components/CartHero";
import CartList from "@/app/features/cart/components/CartList";
import OrderSummary from "@/app/features/cart/components/OrderSummary";
import RecommendedProducts from "@/app/features/cart/components/RecommendedProducts";
import CartStepper from "@/app/features/cart/components/CartStepper";
import { auth } from "@/lib/auth";
import { cartService } from "@/lib/services/cart.service";
import { productService } from "@/lib/services/product.service";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">ابتدا وارد حساب کاربری شوید.</h1>
      </main>
    );
  }

  const cart = await cartService.getCart(Number(session.user.id));

  const cartProductIds = cart.items.map((item) => item.productId);

  const latestProducts = await productService.findLatestProducts(12);

  const recommendedProducts = latestProducts
    .filter((item) => !cartProductIds.includes(item.id))
    .slice(0, 4)
    .map((item) => {
      const discountPercent = item.discountPrice ?? 0;
      const hasDiscount = discountPercent > 0 && discountPercent < 100;
      const finalPrice = hasDiscount
        ? Math.round(item.price - (item.price * discountPercent) / 100)
        : item.price;

      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        brand: item.brand ? { title: item.brand.title } : null,
        thumbnail:
          item.thumbnail ??
          item.images?.[0]?.image ??
          "/placeholder-product.png",
        price: finalPrice,
        oldPrice: hasDiscount ? item.price : undefined,
        discount: hasDiscount ? discountPercent : undefined,
      };
    });

  return (
    <main className="bg-gray-50 py-8">
      <div
        className="mx-auto
          w-full
          max-w-350
          px-4
          sm:px-6
          lg:px-8"
      >
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero */}
        <div className="mt-8">
          <CartHero />
        </div>
        {/* Stepper */}
        <section className="mt-6">
          <CartStepper currentStep={1} />
        </section>

        {/* Cart */}
        <section className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <CartList items={cart.items} />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <OrderSummary items={cart.items} />
            </div>
          </div>
        </section>

        {/* Recommended */}
        {recommendedProducts.length > 0 && (
          <section className="mt-20">
            <RecommendedProducts products={recommendedProducts} />
          </section>
        )}
      </div>
    </main>
  );
}
