import ArticleCategoryHeader from "@/app/features/admin/components/article-categories/ArticleCategoryHeader";
import ArticleCategoryToolbar from "@/app/features/admin/components/article-categories/ArticleCategoryToolbar";
import ArticleCategoriesTable from "@/app/features/admin/components/article-categories/ArticleCategoriesTable";

import { articleCategoryService } from "@/lib/services/article-category.service";

export default async function ArticleCategoriesPage() {
  // const categories = await articleCategoryRepository.findAll();
  const [categories, totalCategories] = await Promise.all([
    articleCategoryService.getAll(),
    articleCategoryService.count(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <ArticleCategoryHeader totalCategories={totalCategories} /> */}

      {/* Toolbar */}
      <ArticleCategoryToolbar totalCategories={totalCategories} />

      {/* Table */}
      <ArticleCategoriesTable
        initialData={categories.map((c) => ({
          ...c,
          createdAt: c.createdAt?.toISOString?.() ?? String(c.createdAt),
          updatedAt: c.updatedAt?.toISOString?.() ?? String(c.updatedAt),
        }))}
      />
    </div>
  );
}