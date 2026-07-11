import { siteConfig } from "./metadata";

interface OpenGraphOptions {
  title: string;

  description: string;

  image?: string;

  url: string;
}

export function generateOpenGraph({
  title,
  description,
  image,
  url,
}: OpenGraphOptions) {
  return {
    title,

    description,

    url: `${siteConfig.url}${url}`,

    type: "website",

    siteName: siteConfig.name,

    locale: "fa_IR",

    images: [
      {
        url: image || siteConfig.defaultOg,

        width: 1200,

        height: 630,

        alt: title,
      },
    ],
  };
}