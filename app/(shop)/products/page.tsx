import CategoryFilter from "@/app/features/products/components/CategoryFilter";
import FilterSidebar from "@/app/features/products/components/FilterSidebar";
import SortDropdown from "@/app/features/products/components/SortDropdown";
import ProductsContent from "@/app/features/products/sections/ProductsContent";
import ProductsHeader from "@/app/features/products/sections/ProductsHeader";
import ProductsPagination from "@/app/features/products/sections/ProductsPagination";


export default function ProductsPage() {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

        {/* Title */}
        <ProductsHeader/>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside
            className="
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
            <FilterSidebar/>
          </aside>

          {/* Content */}
          <section>
            {/* Toolbar */}
            <SortDropdown/>

            {/* Products */}
            <ProductsContent/>

            {/* Pagination */}
            <ProductsPagination totalPages={8}/>
          </section>
        </div>
      </div>
    </main>
  );
}