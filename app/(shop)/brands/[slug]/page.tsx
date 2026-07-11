import { buildMetadata } from "@/lib/seo/metadata-builder";

import { articleService } from "@/lib/services/article.service";

import { siteConfig } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const brand = await articleService.getBySlug(slug);

  return buildMetadata({
    title: brand.seoTitle ?? brand.title,

    description: ` برند ${brand.seoDescription}`,

    keywords: [brand.seoKeywords ?? brand.title],

    image: brand.thumbnail ?? undefined,

    url: `${siteConfig.url}/brands/${brand.slug}`,
  });
}
function brand() {
  return <div>brand</div>;
}

export default brand;
