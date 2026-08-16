import { NextResponse } from "next/server";
import { settingService } from "@/lib/services/setting.service";
import { siteConfig } from "@/lib/seo/metadata";

export async function GET() {
  const [siteName, siteLogo, siteDescription] = await Promise.all([
    settingService.getValue("siteName"),
    settingService.getValue("siteLogo"),
    settingService.getValue("siteDescription"),
  ]);

  const name = (siteName ?? "").trim() || siteConfig.name;
  const description = (siteDescription ?? "").trim() || siteConfig.description;
  const startUrl = "/";
  const display = "standalone";
  const bgColor = "#ffffff";
  const themeColor = siteConfig.themeColor;

  const icons = siteLogo
    ? [
        {
          src: siteLogo,
          sizes: "any",
          type: "image/png",
          purpose: "any maskable",
        },
      ]
    : [];

  const manifest = {
    name,
    short_name: name,
    description,
    start_url: startUrl,
    display,
    background_color: bgColor,
    theme_color: themeColor,
    icons,
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
