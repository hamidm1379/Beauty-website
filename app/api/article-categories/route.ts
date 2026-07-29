import { NextRequest, NextResponse } from "next/server";
import { articleCategoryRepository } from "@/lib/repositories/article-category.repository";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
  try {
    const categories = await articleCategoryRepository.findAll();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطایی رخ داده است.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, slug, image, seoTitle, seoDescription } = body;

    if (!title || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان و اسلاگ الزامی است.",
        },
        { status: 400 }
      );
    }

    const existing = await articleCategoryRepository.findBySlug(slug);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "این اسلاگ قبلاً استفاده شده است.",
        },
        { status: 400 }
      );
    }

    const category = await articleCategoryRepository.create({
      title,
      slug,
      image: image || undefined,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
    });

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error) ?? "خطایی رخ داده است.",
      },
      { status: 500 }
    );
  }
}