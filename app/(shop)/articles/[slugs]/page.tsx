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

  const article = await articleService.getBySlug(slug);

  return buildMetadata({
    title: article.seoTitle ?? article.title,

    description: ` برند ${article.seoDescription}`,

    keywords: [article.seoKeywords ?? article.title],

    image: article.thumbnail ?? undefined,

    url: `${siteConfig.url}/brands/${article.slug}`,
  });
}
function page() {
  return (
    <div>pageawdawdadawdawdwadaw</div>
  )
}

export default page