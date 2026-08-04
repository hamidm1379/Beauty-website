import Link from "next/link";

import { Article, ArticleCategory } from "@prisma/client";

import ArticleCard from "./ArticleCard";

type ArticleWithCategory = Article & {
  category: ArticleCategory;
};

interface Props {
  articles: ArticleWithCategory[];
}

export default function RelatedArticles({
  articles,
}: Props) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="mt-12 md:mt-24">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl sm:text-xl md:text-2xl font-bold">
          مقالات مرتبط
        </h2>

        <Link
          href="/articles"
          className="
            text-pink-500
            transition
            hover:text-pink-700
            text-sm
            sm:text-md
          "
        >
          مشاهده همه
        </Link>
      </div>

      <div
        className="
          grid
          gap-8

          md:grid-cols-2

          xl:grid-cols-3
        "
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={{
              id: article.id.toString(),

              slug: article.slug,

              title: article.title,

              excerpt: article.excerpt ?? "",

              image:
                article.thumbnail ??
                "/images/no-image.png",

              category: article.category.title,

              date: article.publishedAt
                ? new Date(
                    article.publishedAt
                  ).toLocaleDateString("fa-IR")
                : "",

              readTime: "۵ دقیقه",
            }}
          />
        ))}
      </div>
    </section>
  );
}