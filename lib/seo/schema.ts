import { siteConfig } from "./metadata";

/** کمینه‌ی فیلدهای محصولی که برای ساخت schema محصول نیاز است. */
export interface ProductSchemaInput {
  id: number | string;
  slug: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  sku?: string | null;
  price: number;
  discountPrice?: number | null;
  stock: number;
  brand?: { title?: string | null } | null;
  category?: { title?: string | null } | null;
}

/** کمینه‌ی فیلدهای مقاله/برندی که برای ساخت schema مقاله نیاز است. */
export interface ArticleSchemaInput {
  slug: string;
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  excerpt?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
  createdAt?: string | Date | null;
  content?: string | null;
  seoKeywords?: string | null;
  category: { title?: string | null };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${siteConfig.url}#organization`,

    name: siteConfig.name,

    url: siteConfig.url,

    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },

    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },

    email: "info@example.com",

    telephone: "+989121234567",

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+989121234567",
      email: "info@example.com",
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["Persian"],
    },

    sameAs: ["https://instagram.com/yourpage", "https://t.me/yourpage"],
  };
}
export function websiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,

    name: siteConfig.name,

    inLanguage: "fa-IR",

    potentialAction: {
      "@type": "SearchAction",

      target: `${siteConfig.url}/search?q={search_term_string}`,

      "query-input": "required name=search_term_string",
    },
  };
}
export function breadcrumbSchema(
  items: {
    name: string;
    url: string;
  }[],
) {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: item.name,

      item: item.url,
    })),
  };
}

// نرخ تبدیل تومان به ریال؛ چون priceCurrency طبق ISO 4217 باید IRR باشه
// (تومان کد رسمی نداره)، هر عدد تومانی قبل از قرار گرفتن تو schema باید در ۱۰ ضرب بشه.
const TOMAN_TO_RIAL = 10;

export function productSchema(product: ProductSchemaInput) {
  // ⚠️ discountPrice تو کل پروژه به‌عنوان «درصد تخفیف» (۰ تا ۱۰۰) ذخیره و
  // استفاده میشه (دقیقاً مثل ProductInfo.tsx و WishlistCard.tsx)، نه قیمت نهایی.
  // نسخه‌ی قبلی این فایل اشتباهاً discountPrice رو مستقیم به‌عنوان قیمت نهایی
  // در نظر می‌گرفت که برای اعداد کوچیک (مثلاً ۲۰٪) باعث ارسال قیمت غلط به
  // گوگل می‌شد.
  const percent = product.discountPrice ?? 0;
  const hasDiscount = percent > 0 && percent < 100;

  const finalPriceToman = hasDiscount
    ? Math.round(product.price - (product.price * percent) / 100)
    : product.price;

  return {
    "@context": "https://schema.org",

    "@type": "Product",

    "@id": `${siteConfig.url}/products/${product.slug}#product`,

    name: product.title,

    image: [
      {
        "@type": "ImageObject",
        url: `${siteConfig.url}${product.thumbnail}`,
        width: 800,
        height: 800,
      },
    ],

    description: product.description,

    sku: product.sku ?? product.id.toString(),

    brand: {
      "@type": "Brand",

      name: product.brand?.title,
    },

    category: product.category?.title,

    offers: {
      "@type": "Offer",

      url: `${siteConfig.url}/products/${product.slug}`,

      price: finalPriceToman * TOMAN_TO_RIAL,

      priceCurrency: "IRR",

      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function articleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}/articles/${article.slug}#article`,
    headline: article.seoTitle ?? article.title,

    description: article.seoDescription ?? article.excerpt ?? "",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/articles/${article.slug}`,
      name: article.title,
    },

    image: article.thumbnail
      ? [
          {
            "@type": "ImageObject",

            url: `${siteConfig.url}/images/og-default.jpg`,

            width: 1200,

            height: 630,
          },
          {
            "@type": "ImageObject",

            url: article.thumbnail.startsWith("http")
              ? article.thumbnail
              : `${siteConfig.url}${article.thumbnail}`,
          },
        ]
      : [
          {
            "@type": "ImageObject",
            url: `${siteConfig.url}/images/og-default.jpg`,
            width: 1200,
            height: 630,
          },
        ],

    author: {
      "@type": "Person",
      name: "Glow Shop",
    },

    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },

    datePublished: article.publishedAt,

    dateModified: article.updatedAt,

    dateCreated: article.createdAt,

    articleSection: article.category.title,

    articleBody: article.content,

    keywords:
      article.seoKeywords?.split(",").map((item: string) => item.trim()) ?? [],

    url: `${siteConfig.url}/articles/${article.slug}`,

    inLanguage: "fa-IR",

    isAccessibleForFree: true,

    wordCount:
      article.content?.replace(/<[^>]+>/g, "").split(/\s+/).length ?? 0,
  };
}