import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo/metadata-builder";
import { articleService } from "@/lib/services/article.service";
import { siteConfig } from "@/lib/seo/metadata";
import ArticleHero from "@/app/features/articles/components/ArticleHero";
import ArticleContent from "@/app/features/articles/components/ArticleContent";
import RelatedArticles from "@/app/features/articles/components/RelatedArticles";
import ArticleSidebar from "@/app/features/articles/components/ArticleSidebar";
import Breadcrumb from "@/app/features/articles/components/Breadcrumb";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const article = await articleService.getBySlug(slug);

  if (!article) {
    return {};
  }

  return buildMetadata({
    title: article.seoTitle ?? article.title,

    description: article.seoDescription ?? article.excerpt ?? article.title,

    keywords: article.seoKeywords
      ? article.seoKeywords.split(",").map((item) => item.trim())
      : [article.title],

    image: article.thumbnail ?? undefined,

    url: `${siteConfig.url}/articles/${article.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const article = await articleService.getBySlug(slug);

  if (!article) {
    notFound();
  }

  // افزایش بازدید
  await articleService.increaseViews(article.id);

  // مقالات مرتبط
  const relatedArticles = await articleService.getRelatedArticles(
    article.categoryId,
    article.id,
  );

  // مقالات پیشنهادی
  const suggestedArticles = await articleService.getSuggestedArticles(
    article.id,
    8,
  );
  const jsonLd = articleSchema(article);
  const breadcrumbJsonLd = breadcrumbSchema([
    {
      name: "خانه",
      url: siteConfig.url,
    },
    {
      name: "مقالات",
      url: `${siteConfig.url}/articles`,
    },
    {
      name: article.category.title,
      url: `${siteConfig.url}/articles?category=${article.category.slug}`,
    },
    {
      name: article.title,
      url: `${siteConfig.url}/articles/${article.slug}`,
    },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <main className="bg-[#fcfcfc]">
        <div className="mx-auto max-w-7xl px-4 py-2 md:py-10">
          <Breadcrumb article={article} />

          <div className="mt-4 md:mt-10 grid gap-4 md:gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-5">
                <ArticleHero article={article} />
              </div>
              <ArticleContent article={article} />
            </div>

            <aside className="lg:col-span-4">
              <ArticleSidebar
                article={article}
                suggestedArticles={suggestedArticles}
              />
            </aside>
          </div>

          <section className="mt-1 md:mt-20">
            <RelatedArticles articles={relatedArticles} />
          </section>
        </div>
      </main>
    </>
  );
}
