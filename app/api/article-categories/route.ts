import { NextRequest, NextResponse } from "next/server";
import { articleCategoryService } from "@/lib/services/article-category.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
  try {
    const categories = await articleCategoryService.getAll();

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

    const category = await articleCategoryService.create({
      title,
      slug,
      image,
      seoTitle,
      seoDescription,
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
      { status: 400 }
    );
  }
}