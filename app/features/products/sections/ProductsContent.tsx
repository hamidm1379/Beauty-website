import ProductCard from "@/app/features/home/components/ProductCard";
// Removed unused ProductsPagination import
import { newProducts } from "@/app/features/home/data/products";

export default function ProductsContent() {
  return (
    <section className="flex-1">
      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {newProducts.map((product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </section>
  );
}
