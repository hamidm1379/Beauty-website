import { productService } from "@/lib/services/product.service";
import BestSellersSlider from "@/app/features/home/components/BestSellersSlider";

export default async function BestSellersSection() {
  const products = await productService.findBestSellers(12);

  return <BestSellersSlider products={products} />;
}