import { productService } from "@/lib/services/product.service";
import NewProductsSlider from "@/app/features/home/components/NewProductsSlider";

export default async function NewProductsSection() {
  const products = await productService.findLatestProducts(12);

  return (
    <NewProductsSlider products={products} />
  );
}