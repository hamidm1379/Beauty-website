"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ImageUploader from "@/app/shared/components/UploadImage";
import { getErrorMessage } from "@/lib/utils/errors";

interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: ProductData;
}

interface ProductData {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  purchasePrice: number | null;
  stock: number;
  thumbnail?: string;
  images: {
    id: number;
    image: string;
  }[];
  categoryId: number;
  brandId: number;
  status: "ACTIVE" | "DRAFT" | "INACTIVE";
  discountPrice: number;
  shortDescription: string | null;
  seoKeywords?: string | null;
  variants?: {
    id: number;
    colorName: string;
    colorCode: string;
    stock: number;
  }[];
}

interface Category {
  id: number;
  title: string;
}

interface Brand {
  id: number;
  title: string;
}

interface FormState {
  title: string;
  slug: string;
  description: string;
  price: string;
  purchasePrice: string;
  stock: string;
  thumbnailFile: File | null;
  imageFiles: File[];
  thumbnail: string;
  imageUrls: string[];
  categoryId: string;
  brandId: string;
  status: "ACTIVE" | "DRAFT" | "INACTIVE";
  discountPrice: string;
  shortDescription: string | null;
  seoKeywords: string;
}

const INITIAL_FORM_STATE: FormState = {
  title: "",
  slug: "",
  description: "",
  price: "",
  purchasePrice: "",
  stock: "",
  thumbnailFile: null,
  imageFiles: [],
  thumbnail: "",
  imageUrls: [],
  categoryId: "",
  brandId: "",
  status: "ACTIVE",
  discountPrice: "",
  shortDescription: null,
  seoKeywords: "",
};

export default function ProductForm({ mode, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [variants, setVariants] = useState([
    {
      colorName: "",
      colorCode: "",
      stock: 0,
    },
  ]);

  const addColor = () => {
    setVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorCode: "",
        stock: 0,
      },
    ]);
  };

  const removeColor = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: "colorName" | "colorCode" | "stock",
    value: string,
  ) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? { ...variant, [field]: field === "stock" ? Number(value) : value }
          : variant,
      ),
    );
  };

  useEffect(() => {
    if (!initialData) return;

    setForm({
      title: initialData.title,
      slug: initialData.slug,
      description: initialData.description ?? "",
      price: initialData.price.toString(),
      purchasePrice: initialData.purchasePrice?.toString() ?? "",
      stock: initialData.stock.toString(),
      thumbnailFile: null,
      imageFiles: [],
      thumbnail: initialData.thumbnail ?? "",
      imageUrls:
        initialData.images?.map((img) => img.image).filter(Boolean) ?? [],
      categoryId: initialData.categoryId.toString(),
      brandId: initialData.brandId.toString(),
      status: initialData.status,
      discountPrice: initialData.discountPrice?.toString() ?? "",
      shortDescription: initialData.shortDescription ?? null,
      seoKeywords: initialData.seoKeywords ?? "",
    });

    if (initialData.variants && initialData.variants.length > 0) {
      setVariants(
        initialData.variants.map((v) => ({
          colorName: v.colorName,
          colorCode: v.colorCode,
          stock: v.stock,
        })),
      );
    }
  }, [initialData]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategories(json.data ?? []);
    }

    loadCategories();
  }, []);

  async function loadBrands() {
    const res = await fetch("/api/brands");
    const json = await res.json();
    setBrands(json.data ?? []);
  }

  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleThumbnailChange(file: File | null) {
    setForm((prev) => ({
      ...prev,
      thumbnailFile: file,
    }));
  }

  function handleImagesChange(files: File[]) {
    setForm((prev) => ({
      ...prev,
      imageFiles: files,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // گارد دفاعی: تو حالت edit، بدون id معتبر اصلاً درخواست نفرست
    // (نبودش دقیقاً همون چیزیه که باعث PUT /api/products/undefined میشه)

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("purchasePrice", form.purchasePrice);
      formData.append("stock", form.stock);
      formData.append("categoryId", form.categoryId);
      formData.append("brandId", form.brandId);
      formData.append("status", form.status);
      formData.append("discountPrice", form.discountPrice);
      formData.append("variants", JSON.stringify(variants));
      formData.append("seoKeywords", form.seoKeywords);

      // تصاویر قبلی
      formData.append("oldThumbnail", form.thumbnail);

      form.imageUrls.forEach((image) => {
        formData.append("oldImages", image);
      });
      formData.append("shortDescription", form.shortDescription ?? "");

      // تصویر اصلی جدید
      if (form.thumbnailFile) {
        formData.append("thumbnail", form.thumbnailFile);
      }

      // گالری جدید
      form.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const isEditMode = mode === "edit";

      if (isEditMode && !initialData?.id) {
        toast.error(
          "شناسه محصول در دسترس نیست؛ لطفاً صفحه را رفرش کرده و دوباره تلاش کنید.",
        );
        setLoading(false);
        return;
      }

      const url = isEditMode
        ? `/api/products/${initialData!.id}`
        : "/api/products";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "محصول با موفقیت ایجاد شد."
          : "محصول با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">عنوان محصول</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          توضیح کوتاه محصول
        </label>

        <textarea
          rows={3}
          name="shortDescription"
          value={form.shortDescription ?? ""}
          onChange={handleChange}
          placeholder="یک توضیح کوتاه برای نمایش در صفحه محصول..."
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">توضیحات</label>
        <textarea
          rows={6}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">قیمت فروش</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            قیمت خرید (بهای تمام‌شده)
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={form.purchasePrice}
            onChange={handleChange}
            placeholder="اختیاری — برای محاسبه سود ناخالص"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">تخفیف (%)</label>

          <input
            type="number"
            name="discountPrice"
            min={0}
            max={100}
            value={form.discountPrice}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">موجودی</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
      </div>

      {/* SEO Keywords */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          کلمات کلیدی سئو
        </label>

        <input
          type="text"
          name="seoKeywords"
          value={form.seoKeywords}
          onChange={handleChange}
          placeholder="کلمات کلیدی را با کاما جدا کنید، مثلاً: کرم پودر, آرایشی, استی لادر"
          className="w-full rounded-xl border px-4 py-3"
        />

        <p className="mt-1.5 text-xs text-gray-400">
          این کلمات برای بهبود رتبه‌بندی محصول در موتورهای جستجو استفاده می‌شود.
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">دسته بندی</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">انتخاب کنید</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-sm font-medium">برند</label>
        <select
          name="brandId"
          value={form.brandId}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">انتخاب کنید</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>
      </div>

      {/* Variants */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="block text-sm font-semibold">رنگ‌بندی محصول</label>
          <button
            type="button"
            onClick={addColor}
            className="rounded-lg bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 transition hover:bg-pink-100"
          >
            + افزودن رنگ
          </button>
        </div>

        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-4"
            >
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  نام رنگ
                </label>
                <input
                  type="text"
                  value={variant.colorName}
                  onChange={(e) =>
                    handleVariantChange(index, "colorName", e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  کد رنگ
                </label>
                <input
                  type="color"
                  value={variant.colorCode || "#000000"}
                  onChange={(e) =>
                    handleVariantChange(index, "colorCode", e.target.value)
                  }
                  className="h-9 w-full rounded-lg border px-1"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  موجودی
                </label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-end">
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    حذف این رنگ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm font-medium">وضعیت</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="ACTIVE">فعال</option>
          <option value="DRAFT">پیش نویس</option>
          <option value="INACTIVE">غیرفعال</option>
        </select>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="mb-3 block text-sm font-semibold">
          تصویر اصلی محصول
        </label>
        <ImageUploader
          multiple={false}
          value={form.thumbnailFile}
          preview={form.thumbnail}
          onChange={handleThumbnailChange}
        />
      </div>

      {/* Gallery */}
      <div>
        <label className="mb-3 block text-sm font-semibold">گالری تصاویر</label>
        <ImageUploader
          multiple
          value={form.imageFiles}
          previews={form.imageUrls}
          onChange={handleImagesChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-20"
              />
              <path
                fill="currentColor"
                className="opacity-80"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {mode === "create" ? "ثبت محصول" : "بروزرسانی محصول"}
        </button>
      </div>
    </form>
  );
}