"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowRight, Loader2 } from "lucide-react";

import { toast } from "sonner";

import ProductForm, { type ProductData } from "@/app/features/admin/components/products/ProductForm";
import { getErrorMessage } from "@/lib/utils/errors";

export default function EditProductPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<ProductData | null>(null);

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
      <div className="flex h-64 items-center justify-center sm:h-96">
        <Loader2 className="animate-spin text-pink-600" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
        <h2 className="text-lg font-bold text-red-500 sm:text-2xl">
          محصول پیدا نشد.
        </h2>

        <Link
          href="/admin/products"
          className="mt-4 inline-flex rounded-lg bg-pink-600 px-4 py-2 text-sm text-white sm:mt-6 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
        >
          بازگشت
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            ویرایش محصول
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            اطلاعات محصول را بروزرسانی کنید.
          </p>
        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium transition hover:bg-gray-50 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <ArrowRight size={16} className="sm:hidden" />
          <ArrowRight size={18} className="hidden sm:block" />
          بازگشت
        </Link>
      </div>

      {/* Form */}

      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}