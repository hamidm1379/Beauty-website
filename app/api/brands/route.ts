import { NextRequest, NextResponse } from "next/server";

import { brandService } from "@/lib/services/brand.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
  try {
    const brands = await brandService.getAll();

    return NextResponse.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: getErrorMessage(error),
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

    const brand = await brandService.create({
      title: body.title,
      slug: body.slug,
      logo: body.logo,
    });

    return NextResponse.json(
      {
        success: true,
        message: "برند با موفقیت ایجاد شد.",
        data: brand,
      },
      {
        status: 201,
      }
    );
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