import { NextRequest, NextResponse } from "next/server";

import { categoryService } from "@/lib/services/category.service";
import { getErrorMessage } from "@/lib/utils/errors";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/*
|--------------------------------------------------------------------------
| GET Category By Id
|--------------------------------------------------------------------------
*/

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const category = await categoryService.getById(Number(id));

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 404,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const category = await categoryService.update(
      Number(id),
      {
        title: body.title,
        slug: body.slug,
        image: body.image,
      }
    );

    return NextResponse.json({
      success: true,
      message: "دسته‌بندی با موفقیت بروزرسانی شد.",
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 400,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    await categoryService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "دسته‌بندی با موفقیت حذف شد.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 400,
      }
    );
  }
}