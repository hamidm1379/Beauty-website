import ProductsHeader from "@/app/features/admin/components/products/ProductsHeader";
import ProductStatistics from "@/app/features/admin/components/products/ProductStatistics";
import ProductToolbar from "@/app/features/admin/components/products/ProductToolbar";
import BulkActions from "@/app/features/admin/components/products/BulkActions";
import ProductsTable from "@/app/features/admin/components/products/ProductsTable";
import ProductPagination from "@/app/features/admin/components/products/ProductPagination";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <ProductsHeader />

      {/* Statistics */}
      <ProductStatistics />

      {/* Toolbar */}
      <ProductToolbar />

      {/* Bulk Actions */}
      <BulkActions />

      {/* Products Table */}
      <ProductsTable />

      {/* Pagination */}
      <ProductPagination />
    </div>
  );
}