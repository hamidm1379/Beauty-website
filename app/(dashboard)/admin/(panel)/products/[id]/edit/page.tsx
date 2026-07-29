"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowRight, Loader2 } from "lucide-react";

import { toast } from "sonner";

import ProductForm from "@/app/features/admin/components/products/ProductForm";
import { getErrorMessage } from "@/lib/utils/errors";

export default function EditProductPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<Record<string, unknown>>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
    
        const result = await response.json();
    
        if (!response.ok) {
          throw new Error(result.message);
        }
    
        setProduct(result.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2
          className="animate-spin text-pink-600"
          size={40}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-red-500">
          محصول پیدا نشد.
        </h2>

        <Link
          href="/admin/products"
          className="mt-6 inline-flex rounded-xl bg-pink-600 px-6 py-3 text-white"
        >
          بازگشت
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            ویرایش محصول
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات محصول را بروزرسانی کنید.
          </p>

        </div>

        <Link
          href="/admin/products"
          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-gray-200

            bg-white

            px-5
            py-3

            text-sm
            font-medium

            transition

            hover:bg-gray-50
          "
        >
          <ArrowRight size={18} />

          بازگشت
        </Link>

      </div>

      {/* Form */}

      <ProductForm
        mode="edit"
        initialData={product}
      />

    </div>
  );
}