import { NextRequest, NextResponse } from "next/server";

import { categoryService } from "@/lib/services/category.service";

export async function GET() {
  try {
    const categories = await categoryService.getAll();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const category = await categoryService.create({
      title: body.title,
      slug: body.slug,
      image: body.image,
    });

    return NextResponse.json(
      {
        success: true,
        message: "دسته‌بندی با موفقیت ایجاد شد.",
        data: category,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}