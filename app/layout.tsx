import type { Metadata } from "next";
import "./globals.css";
import { generateOpenGraph } from "@/lib/seo/openGraph";
import { generateTwitter } from "@/lib/seo/twitter";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "sonner";
import { organizationSchema,websiteSchema } from "@/lib/seo/schema";
import "leaflet/dist/leaflet.css";

import LayoutProvider from "@/app/shared/components/LayoutProvider";
import { siteConfig } from "@/lib/seo/metadata";

const vazir = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.company,
    },
  ],

  creator: siteConfig.company,

  publisher: siteConfig.company,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: generateOpenGraph({
    title: "Glow Shop",

    description: "فروشگاه تخصصی محصولات آرایشی",

    url: "/",
  }),

  twitter: generateTwitter({
    title: "Glow Shop",

    description: "فروشگاه تخصصی محصولات آرایشی",
  }),

  icons: {
    icon: "/favicon.ico",

    shortcut: "/favicon.ico",

    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`mx-auto ${vazir.className}`}>
        <LayoutProvider>{children}</LayoutProvider>

        <Toaster richColors position="top-center" closeButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
