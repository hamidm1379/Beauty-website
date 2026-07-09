import { notFound } from "next/navigation";

import ArticleCategoryForm from "@/app/features/admin/components/article-categories/ArticleCategoryForm";

import { articleCategoryService } from "@/lib/services/article-category.service";

interface EditArticleCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticleCategoryPage({
  params,
}: EditArticleCategoryPageProps) {
  const { id } = await params;

  const articleCategory = await articleCategoryService
    .getById(Number(id))
    .catch(() => null);

  if (!articleCategory) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ویرایش دسته‌بندی مقاله
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات دسته‌بندی را ویرایش کنید.
        </p>
      </div>

      <ArticleCategoryForm
        mode="edit"
        initialData={articleCategory}
      />
    </div>
  );
}