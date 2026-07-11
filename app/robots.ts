import { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          "/admin",

          "/api",

          "/dashboard",

          "/login",

          "/register",

          "/profile",

          "/cart",

          "/checkout",
        ],
      },

      {
        userAgent: "Googlebot",

        allow: "/",
      },
    ],

    sitemap: `${siteConfig.url}/sitemap.xml`,

    host: siteConfig.url,
  };
}