import { NextRequest, NextResponse } from "next/server";

import { brandService } from "@/lib/services/brand.service";
import { getErrorMessage } from "@/lib/utils/errors";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                                    GET                                     */
/* -------------------------------------------------------------------------- */

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const brand = await brandService.getById(Number(id));

    return NextResponse.json({
      success: true,
      data: brand,
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

/* -------------------------------------------------------------------------- */
/*                                    PUT                                     */
/* -------------------------------------------------------------------------- */

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const brand = await brandService.update(Number(id), {
      title: body.title,
      slug: body.slug,
      logo: body.logo,
    });

    return NextResponse.json({
      success: true,
      message: "برند با موفقیت بروزرسانی شد.",
      data: brand,
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

/* -------------------------------------------------------------------------- */
/*                                  DELETE                                    */
/* -------------------------------------------------------------------------- */

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    await brandService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "برند با موفقیت حذف شد.",
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
