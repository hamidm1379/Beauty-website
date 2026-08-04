"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ImageUploader from "@/app/shared/components/UploadImage";
import { getErrorMessage } from "@/lib/utils/errors";

interface ArticleCategoryFormInitialData {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface ArticleCategoryFormProps {
  mode: "create" | "edit";
  initialData?: ArticleCategoryFormInitialData;
}

export default function ArticleCategoryForm({
  mode,
  initialData,
}: ArticleCategoryFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    imageFile: null as File | null,
    imageUrl: initialData?.image ?? "",
  });

  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let imagePath = form.imageUrl;

    try {
      setLoading(true);

      if (form.imageFile) {
        const uploadForm = new FormData();

        uploadForm.append("file", form.imageFile);
        uploadForm.append("folder", "article-categories");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message);
        }

        imagePath = uploadData.url;
      }

      const response = await fetch(
        mode === "create"
          ? "/api/article-categories"
          : `/api/article-categories/${initialData?.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            seoTitle: form.seoTitle || null,
            seoDescription: form.seoDescription || null,
            image: imagePath || null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "دسته‌بندی مقاله ایجاد شد."
          : "دسته‌بندی مقاله بروزرسانی شد."
      );

      router.push("/admin/article-categories");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-4 shadow-sm sm:space-y-8 sm:rounded-3xl sm:p-8"
    >
      {/* Title */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
          عنوان دسته‌بندی
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">Slug</label>

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
        />
      </div>

      {/* Image */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
          تصویر دسته‌بندی
        </label>

        <ImageUploader
          multiple={false}
          value={form.imageFile}
          preview={form.imageUrl}
          onChange={(file) =>
            setForm((prev) => ({
              ...prev,
              imageFile: file as File | null,
            }))
          }
        />
      </div>

      {/* SEO */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">SEO Title</label>

          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">SEO Description</label>

          <textarea
            rows={3}
            name="seoDescription"
            value={form.seoDescription}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end sm:gap-4 sm:pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2 text-sm sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
        >
          انصراف
        </button>

        <button
          disabled={loading}
          className="rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
        >
          {mode === "create" ? "ثبت دسته‌بندی" : "بروزرسانی دسته‌بندی"}
        </button>
      </div>
    </form>
  );
}