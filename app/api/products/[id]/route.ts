import { NextRequest, NextResponse } from "next/server";

import { productService } from "@/lib/services/product.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/*
|--------------------------------------------------------------------------
| GET Product By Id
|--------------------------------------------------------------------------
*/

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const product = await productService.getById(Number(id));

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 404,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const product = await productService.update(Number(id), {
      title: body.title,
      slug: body.slug,
      description: body.description,
      price: Number(body.price),
      stock: Number(body.stock),
      image: body.image,
      status: body.status,
      categoryId: Number(body.categoryId),
      brandId: Number(body.brandId),
    });

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت بروزرسانی شد.",
      data: product,
    });
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

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    await productService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت حذف شد.",
    });
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