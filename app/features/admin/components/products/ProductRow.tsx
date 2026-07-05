"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Package,
} from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
}

interface ProductRowProps {
  product: Product;
  checked: boolean;
  onSelect: () => void;
}

export default function ProductRow({
  product,
  checked,
  onSelect,
}: ProductRowProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <motion.tr
      layout
      whileHover={{
        backgroundColor: "#fafafa",
      }}
      className="border-b border-gray-100 transition"
    >
      {/* Checkbox */}

      <td className="px-5 py-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onSelect}
          className="h-5 w-5 rounded accent-pink-500"
        />
      </td>

      {/* Product */}

      <td className="px-5 py-5">
        <div className="flex items-center gap-4">
          <div
            className="
              relative

              h-16
              w-16

              overflow-hidden

              rounded-2xl

              border
              border-gray-100

              bg-gray-50
            "
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                "
              >
                <Package
                  size={24}
                  className="text-gray-400"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              {product.title}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              ID : {product.id}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}

      <td className="px-5 py-5">
        <span
          className="
            rounded-full

            bg-pink-50

            px-3
            py-1.5

            text-xs
            font-semibold

            text-pink-600
          "
        >
          {product.category}
        </span>
      </td>

      {/* Brand */}

      <td className="px-5 py-5">
        <span className="font-medium text-gray-700">
          {product.brand}
        </span>
      </td>

      {/* Price */}

      <td className="px-5 py-5">
        <span className="font-bold text-gray-900">
          {product.price.toLocaleString("fa-IR")}
        </span>

        <span className="mr-1 text-sm text-gray-400">
          تومان
        </span>
      </td>

      {/* Stock */}

      <td className="px-5 py-5">
        {product.stock > 0 ? (
          <span className="font-bold text-green-600">
            {product.stock.toLocaleString("fa-IR")}
          </span>
        ) : (
          <span className="font-bold text-red-500">
            ناموجود
          </span>
        )}
      </td>

      {/* Status */}

      <td className="px-5 py-5">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            product.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status === "active"
            ? "فعال"
            : "غیرفعال"}
        </span>
      </td>

      {/* Actions */}

      <td className="relative px-5 py-5">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="
            rounded-xl

            p-2

            transition

            hover:bg-gray-100
          "
        >
          <MoreVertical size={18} />
        </button>

        {openMenu && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              absolute
              left-5
              top-14
              z-20

              w-44

              overflow-hidden

              rounded-2xl

              border
              border-gray-100

              bg-white

              shadow-xl
            "
          >
            <Link
              href={`/admin/products/${product.id}`}
              className="
                flex
                items-center
                gap-3

                px-4
                py-3

                text-sm

                transition

                hover:bg-gray-50
              "
            >
              <Eye size={17} />

              مشاهده
            </Link>

            <Link
              href={`/admin/products/${product.id}/edit`}
              className="
                flex
                items-center
                gap-3

                px-4
                py-3

                text-sm

                transition

                hover:bg-gray-50
              "
            >
              <Pencil size={17} />

              ویرایش
            </Link>

            <button
              className="
                flex
                w-full
                items-center
                gap-3

                px-4
                py-3

                text-sm

                text-red-500

                transition

                hover:bg-red-50
              "
            >
              <Trash2 size={17} />

              حذف محصول
            </button>
          </motion.div>
        )}
      </td>
    </motion.tr>
  );
}