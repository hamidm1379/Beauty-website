import Image from "next/image";
import Link from "next/link";

import { Product, ProductStatus, Category, Brand } from "@prisma/client";
import { Pencil } from "lucide-react";

import DeleteProductModal from "@/app/features/admin/components/products/DeleteProductModal";

type ProductWithRelations = Product & {
  category: Category;
  brand: Brand | null;
};

interface ProductsTableProps {
  products: ProductWithRelations[];
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const colors = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-red-100 text-red-700",
    DRAFT: "bg-yellow-100 text-yellow-700",
  };

  const labels = {
    ACTIVE: "فعال",
    INACTIVE: "غیرفعال",
    DRAFT: "پیش نویس",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-xl px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function ProductsTable({ products }: ProductsTableProps) {
  if (!products.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm sm:rounded-3xl sm:p-20 sm:text-base">
        هیچ محصولی یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">
      <table className="w-full min-w-[720px] text-sm sm:min-w-[900px] sm:text-base">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-3 py-2.5 text-right whitespace-nowrap sm:px-6 sm:py-4">محصول</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">دسته بندی</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">برند</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">قیمت</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">موجودی</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">وضعیت</th>

            <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const discountPercent = product.discountPrice ?? 0;

            const hasDiscount = discountPercent > 0 && discountPercent < 100;

            const finalPrice = hasDiscount
              ? Math.round(
                  product.price - (product.price * discountPercent) / 100,
                )
              : product.price;

            return (
              <tr
                key={product.id}
                className="border-b transition hover:bg-gray-50"
              >
                <td className="px-3 py-3 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <Image
                      src={product.thumbnail || "/images/no-image.png"}
                      alt={product.title}
                      width={120}
                      height={80}
                      className="h-12 w-14 shrink-0 rounded-lg border object-cover sm:h-16 sm:w-20 sm:rounded-xl"
                    />

                    <div className="whitespace-nowrap">
                      <h3 className="font-semibold">{product.title}</h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                  {product.category.title}
                </td>

                <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                  {product.brand?.title ?? "-"}
                </td>

                <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                  {hasDiscount ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base font-bold text-pink-600 sm:text-lg">
                        {finalPrice.toLocaleString()} تومان
                      </span>

                      <span className="text-xs text-gray-400 line-through sm:text-sm">
                        {product.price.toLocaleString()} تومان
                      </span>

                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600 sm:py-1 sm:text-xs">
                        {discountPercent}% تخفیف
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {product.price.toLocaleString()} تومان
                    </span>
                  )}
                </td>

                <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">{product.stock}</td>

                <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                  <StatusBadge status={product.status} />
                </td>

                <td className="px-3 py-3 sm:px-6 sm:py-5">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 sm:rounded-xl sm:p-2"
                    >
                      <Pencil size={16} className="sm:hidden" />
                      <Pencil size={18} className="hidden sm:block" />
                    </Link>

                    <DeleteProductModal
                      productId={product.id}
                      productTitle={product.title}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}