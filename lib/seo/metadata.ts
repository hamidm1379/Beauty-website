export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Glow Shop",

  company: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Glow Shop",

  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? "",

  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  locale: process.env.NEXT_PUBLIC_LOCALE ?? "fa_IR",

  twitter: process.env.NEXT_PUBLIC_APP_TWITTER ?? "",

  logo: process.env.NEXT_PUBLIC_APP_LOGO ?? "",

  defaultOg: process.env.NEXT_PUBLIC_DEFAULT_OG ?? "/images/og-default.jpg",

  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS?.split(",") ?? [],
  themeColor: "#ec4899",
};
