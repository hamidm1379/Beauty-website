import { NextResponse } from "next/server";
import { bannerService } from "@/lib/services/banner.service";

export async function GET() {
  const banner = await bannerService.getHeroBanner();

  return NextResponse.json({
    success: true,
    data: banner,
  });
}