import HeroSlider from "@/app/features/home/components/HeroSlider";
import CategoriesBaseSection from "@/app/features/home/sections/CategoriesBaseSection";
import NewProductsSection from "@/app/features/home/sections/NewProductsSection";
import BestSellersSection from "@/app/features/home/sections/BestSellersSection";
import FeaturesSection from "@/app/features/home/sections/FeaturesSection";
import PromoSection from "@/app/features/home/sections/PromoSection";

export default async function Home() {

  return (
    <>
      <HeroSlider/>
      <CategoriesBaseSection />
      <NewProductsSection />
      <BestSellersSection />
      <PromoSection />
      <FeaturesSection />
    </>
  );
}
