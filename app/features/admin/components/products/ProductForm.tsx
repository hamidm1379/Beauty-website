"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductImages from "@/app/features/admin/components/products/ProductImages";


interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

interface Category {
  id: number;
  title: string;
}

interface Brand {
  id: number;
  title: string;
}

export default function ProductForm({ mode, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
    brandId: "",
    status: "ACTIVE",
  });

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        slug: initialData.slug,
        description: initialData.description ?? "",
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        image: initialData.image ?? "",
        categoryId: initialData.categoryId.toString(),
        brandId: initialData.brandId.toString(),
        status: initialData.status,
      });
    }
  }, [initialData]);

  // Load categories and brands on mount
  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  async function loadCategories() {
    try {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategories(json.data);
    } catch {
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    }
  }

  async function loadBrands() {
    try {
      const res = await fetch("/api/brands");
      const json = await res.json();
      setBrands(json.data);
    } catch {
      toast.error("خطا در دریافت برندها");
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/products"
          : `/api/products/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          image: form.image,
          status: form.status,
          categoryId: Number(form.categoryId),
          brandId: Number(form.brandId),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "خطا در ذخیره محصول");
      }

      toast.success(
        mode === "create"
          ? "محصول با موفقیت ایجاد شد."
          : "محصول با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
    >
      {/* اطلاعات اصلی */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            عنوان محصول
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="مثلاً کرم آبرسان"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="hydrating-cream"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">قیمت</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="350000"
            required
            min="0"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">موجودی</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="25"
            required
            min="0"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">دسته بندی</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          >
            <option value="">انتخاب دسته بندی</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">برند</label>
          <select
            name="brandId"
            value={form.brandId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          >
            <option value="">انتخاب برند</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">وضعیت</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
          >
            <option value="ACTIVE">فعال</option>
            <option value="DRAFT">پیش نویس</option>
            <option value="OUT_OF_STOCK">ناموجود</option>
          </select>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            تصویر محصول
          </label>
          <ProductImages
            value={form.image}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                image: value,
              }))
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">توضیحات</label>
        <textarea
          rows={8}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="توضیحات کامل محصول..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "در حال ذخیره..."
            : mode === "create"
              ? "ثبت محصول"
              : "بروزرسانی محصول"}
        </button>
      </div>
    </form>
  );
}
