import DiscountBanner from "@/app/features/home/components/DiscountBanner";
import BrandsBanner from "@/app/features/home/components/BrandsBanner";

export default function PromoSection() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <DiscountBanner />
          <BrandsBanner />
        </div>
      </div>
    </section>
  );
}
