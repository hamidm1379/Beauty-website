"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ArticleBasicInfo from "@/app/features/admin/components/articles/form/ArticleBasicInfo";
import ArticleContent from "@/app/features/admin/components/articles/form/ArticleContent";
import ArticleMedia from "@/app/features/admin/components/articles/form/ArticleMedia";
import ArticleCategory from "@/app/features/admin/components/articles/form/ArticleCategory";
import ArticleSeo from "@/app/features/admin/components/articles/form/ArticleSeo";
import ArticlePublish from "@/app/features/admin/components/articles/form/ArticlePublish";
import ArticleActions from "@/app/features/admin/components/articles/form/ArticleActions";
import { getErrorMessage } from "@/lib/utils/errors";

import type {
  ArticleCategoryOption,
  ArticleFormState,
  ArticleInitialData,
  UpdateField,
} from "./types";

interface ArticleFormProps {
  mode: "create" | "edit";
  initialData?: ArticleInitialData;
}

export default function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<ArticleCategoryOption[]>([]);

  const [form, setForm] = useState<ArticleFormState>(
    initialData
      ? {
          title: initialData.title ?? "",
          slug: initialData.slug ?? "",

          excerpt: initialData.excerpt ?? "",
          content: initialData.content ?? "",

          thumbnailFile: null,
          thumbnailUrl: initialData.thumbnail ?? "",

          categoryId: String(initialData.categoryId ?? ""),

          status: initialData.status ?? "DRAFT",

          publishedAt: initialData.publishedAt
            ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
            : "",

          seoTitle: initialData.seoTitle ?? "",
          seoDescription: initialData.seoDescription ?? "",
          seoKeywords: initialData.seoKeywords ?? "",
        }
      : {
          title: "",
          slug: "",

          excerpt: "",
          content: "",

          thumbnailFile: null,
          thumbnailUrl: "",

          categoryId: "",

          status: "DRAFT",

          publishedAt: "",

          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
        },
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/article-categories");
        const json = await res.json();

        if (json.success) {
          setCategories(json.data);
        }
      } catch {}
    }

    loadCategories();
  }, []);

  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  const updateField: UpdateField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      let thumbnail = form.thumbnailUrl;

      // Upload Image
      if (form.thumbnailFile) {
        const uploadForm = new FormData();

        uploadForm.append("file", form.thumbnailFile);
        uploadForm.append("folder", "articles");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message);
        }

        thumbnail = uploadData.url;
      }

      const response = await fetch(
        mode === "create" ? "/api/articles" : `/api/articles/${initialData.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: form.title,
            slug: form.slug || generateSlug(form.title),

            excerpt: form.excerpt,
            content: form.content,

            thumbnail,

            categoryId: Number(form.categoryId),

            status: form.status,
            publishedAt: form.publishedAt || null,

            seoTitle: form.seoTitle,
            seoDescription: form.seoDescription,
            seoKeywords: form.seoKeywords,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "مقاله با موفقیت ایجاد شد."
          : "مقاله با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ArticleBasicInfo form={form} updateField={updateField} />

      <ArticleCategory
        categories={categories}
        form={form}
        updateField={updateField}
      />

      <ArticleContent form={form} updateField={updateField} />

      <ArticleMedia form={form} updateField={updateField} />

      <ArticleSeo form={form} updateField={updateField} />

      <ArticlePublish form={form} updateField={updateField} />

      <ArticleActions
        loading={loading}
        mode={mode}
        onCancel={() => router.back()}
      />
    </form>
  );
}
