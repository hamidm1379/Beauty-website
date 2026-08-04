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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          ویرایش دسته‌بندی مقاله
        </h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-base">
          اطلاعات دسته‌بندی را ویرایش کنید.
        </p>
      </div>

      <ArticleCategoryForm mode="edit" initialData={articleCategory} />
    </div>
  );
}