import { NextRequest, NextResponse } from "next/server";

import { articleService } from "@/lib/services/article.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams,
) {
  try {
    const { id } = await params;

    const article = await articleService.getById(Number(id));

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "مقاله پیدا نشد.",
      },
      {
        status: 404,
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams,
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const article = await articleService.update(Number(id), {
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
      message: "مقاله با موفقیت بروزرسانی شد.",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "خطا در بروزرسانی مقاله.",
      },
      {
        status: 400,
      },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams,
) {
  try {
    const { id } = await params;

    await articleService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "مقاله با موفقیت حذف شد.",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "خطا در حذف مقاله.",
      },
      {
        status: 400,
      },
    );
  }
}