import { Metadata } from "next";

import { siteConfig } from "./metadata";

export function buildMetadata({
  title,
  description,
  image,
  url,
  keywords,
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  keywords?: string[];
}): Metadata {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.defaultOg}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },

    openGraph: {
      title,

      description,

      url,

      siteName: siteConfig.name,

      locale: "fa_IR",

      type: "website",

      images: [
        {
          url: imageUrl,

          width: 1200,

          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [imageUrl],
    },
  };
}
