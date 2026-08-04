import FilterSidebar from "@/app/features/products/components/FilterSidebar";
import MobileFilter from "@/app/features/products/components/MobileFilter";
import ProductsContent from "@/app/features/products/sections/ProductsContent";
import ProductsHeader from "@/app/features/products/sections/ProductsHeader";
import ProductsPagination from "@/app/features/products/sections/ProductsPagination";

import { categoryRepository } from "@/lib/repositories/category.repository";
import { productService } from "@/lib/services/product.service";
import { brandRepository } from "@/lib/repositories/brand.repository";
interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    category?: string | string[];
    brand?: string | string[];
    sort?: string;
  }>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const allCategories = await categoryRepository.findAll();
  const brands = await brandRepository.findAll();
  const page = Number(params.page ?? 1);

  const category =
    typeof params.category === "string" ? params.category : undefined;

  const brand = typeof params.brand === "string" ? params.brand : undefined;

  const products = await productService.getFilteredProducts({
    page,
    limit: 12,
    search: params.search,
    category,
    brand,
    sort: params.sort,
    status: "ACTIVE",
  });
  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl pb-8 px-4 md:py-8 lg:px-8">
        {/* Title */}
        <ProductsHeader />

        <div className="mb-6">
          <MobileFilter categories={allCategories} brands={brands} />
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside
            className="
    hidden
    lg:block
    sticky
    top-24
    h-fit
    rounded-3xl
    border
    border-gray-100
    bg-white
    p-6
    shadow-sm
  "
          >
            <FilterSidebar categories={allCategories} brands={brands} />
          </aside>

          {/* Content */}
          <section>
            {/* Products */}
            <ProductsContent products={products.items} />

            {/* Pagination */}
            <ProductsPagination
              page={products.page}
              totalPages={products.totalPages}
              totalItems={products.total}
              perPage={products.limit}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
