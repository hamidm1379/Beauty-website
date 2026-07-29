import { NextRequest, NextResponse } from "next/server";
import { articleCategoryRepository } from "@/lib/repositories/article-category.repository";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await articleCategoryRepository.findById(Number(id));

    if (!category) {
      return NextResponse.json(
        { success: false, message: "دسته‌بندی یافت نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) ?? "خطایی رخ داده است." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { title, slug, image, seoTitle, seoDescription } = body;

    if (slug) {
      const existing = await articleCategoryRepository.findBySlug(slug);

      if (existing && existing.id !== Number(id)) {
        return NextResponse.json(
          { success: false, message: "این اسلاگ قبلاً استفاده شده است." },
          { status: 400 }
        );
      }
    }

    const category = await articleCategoryRepository.update(Number(id), {
      title,
      slug,
      image,
      seoTitle,
      seoDescription,
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) ?? "خطایی رخ داده است." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await articleCategoryRepository.delete(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) ?? "خطایی رخ داده است." },
      { status: 500 }
    );
  }
}