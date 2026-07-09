"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Edit,
  Trash2,
} from "lucide-react";

interface ProductRowProps {
  product: any;

  checked: boolean;

  onSelect: () => void;

  onDelete?: () => void;
}

export default function ProductRow({
  product,
  checked,
  onSelect,
  onDelete,
}: ProductRowProps) {
  function getStatus() {
    switch (product.status) {
      case "ACTIVE":
        return {
          title: "فعال",
          className:
            "bg-green-100 text-green-700",
        };

      case "DRAFT":
        return {
          title: "پیش نویس",
          className:
            "bg-yellow-100 text-yellow-700",
        };

      case "INACTIVE":
        return {
          title: "غیرفعال",
          className:
            "bg-red-100 text-red-700",
        };

      default:
        return {
          title: product.status,
          className:
            "bg-gray-100 text-gray-700",
        };
    }
  }

  const status = getStatus();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">

      <td className="px-5 py-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onSelect}
          className="h-5 w-5 accent-pink-500"
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-4">

          <Image
            src={product.image || "/images/no-image.png"}
            alt={product.title}
            width={60}
            height={60}
            className="rounded-xl border object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              {product.title}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              #{product.id}
            </p>
          </div>

        </div>
      </td>

      <td className="px-5 py-4">
        {product.category?.title ?? "-"}
      </td>

      <td className="px-5 py-4">
        {product.brand?.title ?? "-"}
      </td>

      <td className="px-5 py-4 font-semibold">
        {Number(product.price).toLocaleString("fa-IR")} تومان
      </td>

      <td className="px-5 py-4">
        {product.stock.toLocaleString("fa-IR")}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
        >
          {status.title}
        </span>
      </td>

      <td className="px-5 py-4">

        <div className="flex justify-center gap-2">

          <Link
            href={`/admin/products/${product.id}/edit`}
            className="
              rounded-xl
              bg-blue-50
              p-2
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            <Edit size={18} />
          </Link>

          <button
            onClick={onDelete}
            className="
              rounded-xl
              bg-red-50
              p-2
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}