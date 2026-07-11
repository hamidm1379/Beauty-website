import { MetadataRoute } from "next";

import { sitemapService } from "@/lib/services/sitemap.service";
import { siteConfig } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, brands, ArticleRepository] = await Promise.all([
    sitemapService.getProducts(),
    sitemapService.getCategories(),
    sitemapService.getBrands(),
    sitemapService.getArticleRepository(),
  ]);

  const urls: MetadataRoute.Sitemap = [];

  // Home
  urls.push({
    url: siteConfig.url,

    lastModified: new Date(),

    changeFrequency: "daily",

    priority: 1,
  });

  // Products
  urls.push(
    ...products.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,

      lastModified: product.updatedAt,

      changeFrequency: "weekly" as const,

      priority: 0.9,
    })),
  );
  // articles
  urls.push(
    ...ArticleRepository.map((articles) => ({
      url: `${siteConfig.url}/articles/${articles.slug}`,

      lastModified: articles.updatedAt,

      changeFrequency: "weekly" as const,

      priority: 0.9,
    })),
  );
  // Categories
  urls.push(
    ...categories.map((category) => ({
      url: `${siteConfig.url}/categories/${category.slug}`,

      lastModified: category.createdAt,

      changeFrequency: "weekly" as const,

      priority: 0.8,
    })),
  );

  // Brands
  urls.push(
    ...brands.map((brand) => ({
      url: `${siteConfig.url}/brands/${brand.slug}`,

      lastModified: brand.createdAt,

      changeFrequency: "monthly" as const,

      priority: 0.7,
    })),
  );

  return urls;
}
