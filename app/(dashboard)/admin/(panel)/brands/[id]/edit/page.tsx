"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowRight, Loader2 } from "lucide-react";

import { toast } from "sonner";

import BrandForm from "@/app/features/admin/components/brands/BrandForm";

interface Brand {
  id: number;
  title: string;
  slug: string;
  logo?: string | null;
}

export default function EditBrandPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    loadBrand();
  }, []);

  async function loadBrand() {
    try {
      const response = await fetch(`/api/brands/${id}`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setBrand(result.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-pink-600" size={40} />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-red-500">برند پیدا نشد.</h2>

        <Link
          href="/admin/brands"
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
          <h1 className="text-3xl font-extrabold text-gray-900">ویرایش برند</h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات برند را بروزرسانی کنید.
          </p>
        </div>

        <Link
          href="/admin/brands"
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

      <BrandForm mode="edit" initialData={brand} />
    </div>
  );
}
