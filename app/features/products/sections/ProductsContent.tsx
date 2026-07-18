import ProductCard from "@/app/features/home/components/ProductCard";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

export default function ProductsContent({
  products,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white">
        <p className="text-gray-500">
          محصولی یافت نشد.
        </p>
      </div>
    );
  }

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}