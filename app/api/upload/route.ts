import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_FOLDERS = [
  "brands",
  "products",
  "categories",
  "banners",
  "users",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    const folder =
      (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "فایلی ارسال نشده است.",
        },
        {
          status: 400,
        },
      );
    }

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json(
        {
          success: false,
          message: "پوشه معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "فرمت فایل مجاز نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "حداکثر حجم فایل 5MB است.",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      folder,
    );

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const extension = file.name.split(".").pop();

    const filename =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${extension}`;

    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${folder}/${filename}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپلود فایل.",
      },
      {
        status: 500,
      },
    );
  }
}