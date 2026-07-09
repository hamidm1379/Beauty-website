"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ImageUploader from "@/app/shared/components/UploadImage";

interface ArticleCategoryInitialData {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface ArticleCategoryFormProps {
  mode: "create" | "edit";
  initialData?: ArticleCategoryInitialData;
}

export default function ArticleCategoryForm({
  mode,
  initialData,
}: ArticleCategoryFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    imageFile: null as File | null,
    imageUrl: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      title: initialData.title ?? "",
      slug: initialData.slug ?? "",
      seoTitle: initialData.seoTitle ?? "",
      seoDescription: initialData.seoDescription ?? "",
      imageFile: null,
      imageUrl: initialData.image ?? "",
    });
  }, [initialData]);

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
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          عنوان دسته‌بندی
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-medium">Slug</label>

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          تصویر دسته‌بندی
        </label>

        <ImageUploader
          multiple={false}
          value={form.imageFile}
          preview={form.imageUrl}
          onChange={(file) =>
            setForm((prev) => ({
              ...prev,
              imageFile: file,
            }))
          }
        />
      </div>

      {/* SEO */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Title
          </label>

          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Description
          </label>

          <textarea
            rows={3}
            name="seoDescription"
            value={form.seoDescription}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border px-6 py-3"
        >
          انصراف
        </button>

        <button
          disabled={loading}
          className="rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
        >
          {mode === "create" ? "ثبت دسته‌بندی" : "بروزرسانی دسته‌بندی"}
        </button>
      </div>
    </form>
  );
}