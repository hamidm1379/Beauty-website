// lib/seo/schema.ts

import { siteConfig } from "./metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: siteConfig.name,

    url: siteConfig.url,

    logo: `${siteConfig.url}/logo.png`,

    image: `${siteConfig.url}/logo.png`,

    email: "info@example.com",

    telephone: "+989121234567",

    sameAs: [
      "https://instagram.com/yourpage",
      "https://t.me/yourpage",
    ],
  };
}
export function websiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

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
export function breadcrumbSchema(items: {
  name: string;
  url: string;
}[]) {
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
export function productSchema(product: any) {
  const price =
    product.discountPrice &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price
      ? product.discountPrice
      : product.price;

  return {
    "@context": "https://schema.org",

    "@type": "Product",

    name: product.title,

    image: [
      `${siteConfig.url}${product.thumbnail}`,
    ],

    description: product.description,

    sku: product.id.toString(),

    brand: {
      "@type": "Brand",

      name: product.brand?.title,
    },

    category: product.category?.title,

    offers: {
      "@type": "Offer",

      url: `${siteConfig.url}/product/${product.slug}`,

      price,

      priceCurrency: "IRR",

      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition:
        "https://schema.org/NewCondition",
    },
  };
}