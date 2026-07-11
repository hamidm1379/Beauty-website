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
      className={`rounded-xl px-3 py-1 text-sm font-medium ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function ProductsTable({ products }: ProductsTableProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl bg-white p-20 text-center text-gray-500 shadow-sm">
        هیچ محصولی یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-right">محصول</th>

            <th className="px-6 py-4 text-center">دسته بندی</th>

            <th className="px-6 py-4 text-center">برند</th>

            <th className="px-6 py-4 text-center">قیمت</th>

            <th className="px-6 py-4 text-center">موجودی</th>

            <th className="px-6 py-4 text-center">وضعیت</th>

            <th className="px-6 py-4 text-center">عملیات</th>
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
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.thumbnail || "/images/no-image.png"}
                      alt={product.title}
                      width={120}
                      height={80}
                      className="h-16 w-20 rounded-xl border object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{product.title}</h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-center">
                  {product.category.title}
                </td>

                <td className="px-6 py-5 text-center">
                  {product.brand?.title ?? "-"}
                </td>

                <td className="px-6 py-5 text-center">
                  {hasDiscount ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg font-bold text-pink-600">
                        {finalPrice.toLocaleString()} تومان
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        {product.price.toLocaleString()} تومان
                      </span>

                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                        {discountPercent}% تخفیف
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {product.price.toLocaleString()} تومان
                    </span>
                  )}
                </td>

                <td className="px-6 py-5 text-center">{product.stock}</td>

                <td className="px-6 py-5 text-center">
                  <StatusBadge status={product.status} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Pencil size={18} />
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
