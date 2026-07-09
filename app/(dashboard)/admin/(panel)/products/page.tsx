import ProductsHeader from "@/app/features/admin/components/products/ProductsHeader";
// import ProductStatistics from "@/app/features/admin/components/products/ProductStatistics";
import ProductToolbar from "@/app/features/admin/components/products/ProductToolbar";
import BulkActions from "@/app/features/admin/components/products/BulkActions";
import ProductsTable from "@/app/features/admin/components/products/ProductsTable";
import ProductPagination from "@/app/features/admin/components/products/ProductPagination";

import { productService } from "@/lib/services/product.service";
import { categoryService } from "@/lib/services/category.service";
import { brandService } from "@/lib/services/brand.service";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string; // ✅ اضافه کردن limit
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  
  const filters = {
    search: params.search ?? "",
    category: params.category ?? "",
    brand: params.brand ?? "",
    status: params.status ?? "",
    sort: params.sort ?? "newest",
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 12), // ✅ الان اینجا خطا نداریم
  };

  const [productsData, stats, totalCategories, categories, brands] =
    await Promise.all([
      productService.getFilteredProducts(filters),
      productService.getStatistics(),
      categoryService.count(),
      categoryService.getAll(),
      brandService.getAll(),
    ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductsHeader
        totalProducts={stats.totalProducts}
        activeProducts={stats.activeProducts}
        outOfStockProducts={stats.outOfStockProducts}
        totalCategories={totalCategories}
      />

      {/* Toolbar */}
      <ProductToolbar
        categories={categories}
        brands={brands}
        filters={filters}
        totalProducts={stats.totalProducts}
      />

      {/* Bulk Actions */}
      <BulkActions />

      {/* Products Table */}
      <ProductsTable products={productsData.items} />

      {/* Pagination */}
      <ProductPagination
        page={productsData.page}
        totalPages={productsData.totalPages}
        totalItems={productsData.total}
        perPage={filters.limit}
      />
    </div>
  );
}