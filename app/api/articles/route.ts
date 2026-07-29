import { NextRequest, NextResponse } from "next/server";

import { articleService } from "@/lib/services/article.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const data = await articleService.getFilteredArticles({
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      status: searchParams.get("status") ?? "",
      sort: searchParams.get("sort") ?? "newest",
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در دریافت مقالات.",
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

    const article = await articleService.create({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      thumbnail: body.thumbnail,
      categoryId: Number(body.categoryId),
      status: body.status,
      publishedAt: body.publishedAt
        ? new Date(body.publishedAt)
        : null,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      seoKeywords: body.seoKeywords,
    });

    return NextResponse.json({
      success: true,
      data: article,
      message: "مقاله با موفقیت ایجاد شد.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطا در ایجاد مقاله.",
      },
      {
        status: 400,
      },
    );
  }
}