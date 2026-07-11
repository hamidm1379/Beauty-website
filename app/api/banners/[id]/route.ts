import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

import { prisma } from "@/lib/prisma";
import { bannerService } from "@/lib/services/banner.service";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* -------------------------------- GET -------------------------------- */

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const banner = await bannerService.getById(
      Number(id),
    );

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در دریافت بنر",
      },
      {
        status: 404,
      },
    );
  }
}

/* ------------------------------- UPDATE ------------------------------ */

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const banner = await bannerService.update(
      Number(id),
      body,
    );

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در بروزرسانی بنر",
      },
      {
        status: 400,
      },
    );
  }
}

/* ------------------------------- DELETE ------------------------------ */

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const banner = await prisma.banner.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "بنر پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    // حذف تصویر دسکتاپ
    if (banner.image) {
      try {
        const imagePath = path.join(
          process.cwd(),
          "public",
          banner.image.replace(/^\/+/, ""),
        );

        await fs.unlink(imagePath);
      } catch (err) {
        console.log("Desktop image not found.");
      }
    }

    // حذف تصویر موبایل
    if (banner.mobileImage) {
      try {
        const mobilePath = path.join(
          process.cwd(),
          "public",
          banner.mobileImage.replace(/^\/+/, ""),
        );

        await fs.unlink(mobilePath);
      } catch (err) {
        console.log("Mobile image not found.");
      }
    }

    await bannerService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "بنر با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در حذف بنر",
      },
      {
        status: 400,
      },
    );
  }
}