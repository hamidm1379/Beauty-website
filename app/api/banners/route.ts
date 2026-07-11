import { NextRequest, NextResponse } from "next/server";

import { bannerService } from "@/lib/services/banner.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      search: searchParams.get("search") ?? "",
      position: searchParams.get("position") ?? "",
      status: searchParams.get("status") ?? "",
      sort: searchParams.get("sort") ?? "newest",
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    };

    const result =
      await bannerService.getFilteredBanners(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت بنرها.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const banner =
      await bannerService.create(body);

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در ایجاد بنر.",
      },
      {
        status: 400,
      },
    );
  }
}