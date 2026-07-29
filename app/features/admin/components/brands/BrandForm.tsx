"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import ImageUploader from "@/app/shared/components/UploadImage";
import { getErrorMessage } from "@/lib/utils/errors";

interface BrandFormInitialData {
  id: number;
  title: string;
  slug: string;
  logo?: string | null;
}

interface BrandFormProps {
  mode: "create" | "edit";
  initialData?: BrandFormInitialData;
}

export default function BrandForm({ mode, initialData }: BrandFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    logoFile: null as File | null,
    logoUrl: initialData?.logo ?? "",
  });

  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    let logoPath = form.logoUrl;

    try {
      setLoading(true);

      // آپلود لوگو
      if (form.logoFile) {
        const uploadForm = new FormData();

        uploadForm.append("file", form.logoFile);
        uploadForm.append("folder", "brands");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "خطا در آپلود لوگو");
        }

        logoPath = uploadData.url;
      }

      const response = await fetch(
        mode === "create" ? "/api/brands" : `/api/brands/${initialData.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: form.title,
            slug: form.slug,
            logo: logoPath,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "برند با موفقیت ایجاد شد."
          : "برند با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/brands");
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
      className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
    >
      {/* Title */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          عنوان برند
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="مثلاً La Roche Posay"
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            outline-none
            transition
            focus:border-pink-500
          "
        />
      </div>

      {/* Slug */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Slug
        </label>

        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="la-roche-posay"
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4
            py-3
            outline-none
            transition
            focus:border-pink-500
          "
        />
      </div>

      {/* Logo */}

      <div>
        <label className="mb-2 block text-sm font-medium">لوگوی برند</label>

        <ImageUploader
          multiple={false}
          value={form.logoFile}
          preview={form.logoUrl}
          onChange={(file) =>
            setForm((prev) => ({
              ...prev,
              logoFile: file,
            }))
          }
        />
      </div>

      {/* Logo Preview */}
      {/* 
      {form.logo && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            پیش‌نمایش لوگو
          </label>

          <div
            className="
              flex
              h-40
              items-center
              justify-center

              rounded-2xl
              border
              border-gray-200
              bg-gray-50
            "
          >
            <img
              src={form.logo}
              alt={form.title}
              className="max-h-28 max-w-48 object-contain"
            />
          </div>
        </div>
      )} */}
      {/* Buttons */}

      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-medium
            transition
            hover:bg-gray-100
            disabled:opacity-50
          "
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            items-center
            gap-2

            rounded-xl

            bg-pink-600

            px-8
            py-3

            font-semibold
            text-white

            transition

            hover:bg-pink-700

            disabled:opacity-50
          "
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

          {mode === "create" ? "ثبت برند" : "بروزرسانی برند"}
        </button>
      </div>
    </form>
  );
}
