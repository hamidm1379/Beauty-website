import ArticlesHero from "@/app/features/articles/components/ArticlesHero";
import ArticlesFilter from "@/app/features/articles/components/ArticlesFilter";
import ArticlesGrid from "@/app/features/articles/components/ArticlesGrid";
import ArticlesPagination from "@/app/features/articles/components/ArticlesPagination";

import { articleService } from "@/lib/services/article.service";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const result = await articleService.getFilteredArticles({
    page,
    limit: 9,

    search: params.search,

    category: params.category,

    sort: params.sort,
  });

  const categories = await articleService.getCategories();

  return (
    <main className="bg-[#fcfcfc]">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8 md:py-10">
        <ArticlesHero />

        <section className="mt-6 sm:mt-10">
          <ArticlesFilter categories={categories} />
        </section>

        <section className="mt-6 sm:mt-10">
          <section className="mt-10">
            {result.items.length > 0 ? (
              <ArticlesGrid articles={result.items} />
            ) : (
              <div className="flex min-h-75 items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-700">
                    مقاله‌ای پیدا نشد
                  </h2>

                  <p className="mt-3 text-gray-500">
                    متأسفانه مقاله‌ای مطابق جستجو یا فیلترهای انتخاب‌شده وجود
                    ندارد.
                  </p>
                </div>
              </div>
            )}
          </section>
        </section>

        <section className="mt-14">
          {result.totalPages > 1 && (
            <section className="mt-14">
              <ArticlesPagination totalPages={result.totalPages} />
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
