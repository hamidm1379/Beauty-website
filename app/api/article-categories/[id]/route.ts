import { NextRequest, NextResponse } from "next/server";
import { articleCategoryService } from "@/lib/services/article-category.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await articleCategoryService.getById(Number(id));

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

    const category = await articleCategoryService.update(Number(id), {
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
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await articleCategoryService.delete(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) ?? "خطایی رخ داده است." },
      { status: 400 }
    );
  }
}