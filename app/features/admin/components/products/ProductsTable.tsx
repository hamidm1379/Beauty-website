"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import ProductRow from "./ProductRow";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductsTableProps {
  products: any[];
  onDelete?: (id: number) => void;
  onBulkDelete?: (ids: number[]) => void;
}

export default function ProductsTable({
  products,
  onDelete,
  onBulkDelete,
}: ProductsTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const router = useRouter();
  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
      return;
    }
    setSelectedProducts(products.map((item) => item.id));
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    onBulkDelete?.(selectedProducts);
    setSelectedProducts([]);
  };
  async function handleDelete(id: number) {
    if (!confirm("از حذف این محصول مطمئن هستید؟")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("محصول حذف شد.");

      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <section className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr className="text-sm text-gray-600">
              <th className="w-14 px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedProducts.length === products.length
                  }
                  onChange={toggleAll}
                  className="h-5 w-5 rounded border-gray-300 accent-pink-500"
                />
              </th>
              <th className="px-5 py-4 text-right">محصول</th>
              <th className="px-5 py-4 text-right">دسته‌بندی</th>
              <th className="px-5 py-4 text-right">برند</th>
              <th className="px-5 py-4 text-right">
                <button className="flex items-center gap-2 font-semibold">
                  قیمت
                  <ArrowUpDown size={15} />
                </button>
              </th>
              <th className="px-5 py-4 text-right">موجودی</th>
              <th className="px-5 py-4 text-right">وضعیت</th>
              <th className="w-24 px-5 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  checked={selectedProducts.includes(product.id)}
                  onSelect={() => toggleProduct(product.id)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-400">
                  محصولی یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-gray-100
          bg-gray-50
          px-6
          py-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">
            تعداد محصولات
            <span className="mx-1 font-bold text-pink-600">
              {products.length.toLocaleString("fa-IR")}
            </span>
          </p>

          {selectedProducts.length > 0 && (
            <p className="text-sm text-gray-500">
              انتخاب شده
              <span className="mx-1 font-bold text-pink-600">
                {selectedProducts.length.toLocaleString("fa-IR")}
              </span>
            </p>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {selectedProducts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="
                rounded-2xl
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              حذف {selectedProducts.length.toLocaleString("fa-IR")} محصول
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
