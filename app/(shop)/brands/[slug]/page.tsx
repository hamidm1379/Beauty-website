import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo/metadata-builder";
import { siteConfig } from "@/lib/seo/metadata";
import { articleService } from "@/lib/services/article.service";

import BrandContent from "@/app/features/brands/components/BrandContent";
import RelatedBrands from "@/app/features/brands/components/RelatedBrands";

import {
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema";
import BrandHeroDetail from "@/app/features/brands/components/BrandHeroDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const brand = await articleService.getBySlug(slug);

  if (!brand) {
    return {};
  }

  return buildMetadata({
    title: brand.seoTitle ?? brand.title,

    description:
      brand.seoDescription ??
      brand.excerpt ??
      brand.title,

    keywords: brand.seoKeywords
      ? brand.seoKeywords
          .split(",")
          .map((item) => item.trim())
      : [brand.title],

    image: brand.thumbnail ?? undefined,

    url: `${siteConfig.url}/brands/${brand.slug}`,
  });
}

export default async function BrandDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const brand = await articleService.getBySlug(slug);

  if (!brand) {
    notFound();
  }

  // فقط برندها مجاز باشند
  if (brand.category.slug !== "brands") {
    notFound();
  }

  // افزایش بازدید
  await articleService.increaseViews(
    brand.id,
  );

  // برندهای مرتبط
  const relatedBrands =
    await articleService.getRelatedBrands(
      brand.id,
      4,
    );

  // schema
  const jsonLd = articleSchema(brand);

  const breadcrumbJsonLd =
    breadcrumbSchema([
      {
        name: "خانه",
        url: siteConfig.url,
      },
      {
        name: "برندها",
        url: `${siteConfig.url}/brands`,
      },
      {
        name: brand.title,
        url: `${siteConfig.url}/brands/${brand.slug}`,
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
          __html: JSON.stringify(
            breadcrumbJsonLd,
          ),
        }}
      />

      <main className="bg-[#fcfcfc]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 md:py-8 xl:px-0">
          <div className="mx-auto max-w-5xl">
            {/* Hero */}

            <BrandHeroDetail brand={brand} />

            {/* Content */}

            <div className="mt-6 sm:mt-10">
              <BrandContent content={brand.content} />
            </div>
          </div>

          {/* Related Brands */}

          <section className="mt-10 sm:mt-20">
            <RelatedBrands
              brands={relatedBrands}
            />
          </section>
        </div>
      </main>
    </>
  );
}


//  <section className="space-y-8">
//               <BrandContent content={brand.content} />

//               <RelatedBrands brands={relatedBrands} />
//             </section>