import { siteConfig } from "./metadata";

interface TwitterOptions {
  title: string;

  description: string;

  image?: string;
}

export function generateTwitter({
  title,
  description,
  image,
}: TwitterOptions) {
  return {
    card: "summary_large_image",

    site: siteConfig.twitter,

    creator: siteConfig.twitter,

    title,

    description,

    images: [
      image || siteConfig.defaultOg,
    ],
  };
}