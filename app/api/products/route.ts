import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/lib/services/product.service";

export async function GET() {
  try {
    const products = await productService.getAll();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت محصولات",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await productService.create({
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

    return NextResponse.json(
      {
        success: true,
        message: "محصول با موفقیت ایجاد شد.",
        data: product,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "خطا در ایجاد محصول",
      },
      {
        status: 400,
      }
    );
  }
}