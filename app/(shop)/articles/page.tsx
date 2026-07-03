import ArticlesHero from "@/app/features/articles/components/ArticlesHero";
import ArticlesFilter from "@/app/features/articles/components/ArticlesFilter";
import ArticlesGrid from "@/app/features/articles/components/ArticlesGrid";
import ArticlesPagination from "@/app/features/articles/components/ArticlesPagination";
// import Newsletter from "@/app/features/about/components/Newsletter";

export default function blogs() {
  return (
    <main className="bg-[#fcfcfc]">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {/* Hero */}
        <ArticlesHero />

        {/* Filter */}
        <section className="mt-10">
          <ArticlesFilter />
        </section>

        {/* Articles */}
        <section className="mt-10">
          <ArticlesGrid />
        </section>

        {/* Pagination */}
        <section className="mt-14">
          <ArticlesPagination totalPages={8} />
        </section>

        {/* Newsletter
        <section className="mt-20">
          <Newsletter />
        </section> */}
      </div>
    </main>
  );
}