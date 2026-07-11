import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryId = Number(formData.get("categoryId"));
    const brandId = Number(formData.get("brandId"));
    const status = formData.get("status") as any;

    const thumbnailFile = formData.get("thumbnail") as File | null;

    const imageFiles = formData.getAll("images") as File[];

    let thumbnail = "";

    if (thumbnailFile && thumbnailFile.size > 0) {
      const bytes = Buffer.from(await thumbnailFile.arrayBuffer());

      const filename =
        randomUUID() +
        path.extname(thumbnailFile.name);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "products",
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      await fs.writeFile(
        path.join(uploadDir, filename),
        bytes,
      );

      thumbnail = "/uploads/products/" + filename;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price,
        stock,
        thumbnail,
        categoryId,
        brandId,
        status,
      },
    });

    if (imageFiles.length > 0) {
      for (const image of imageFiles) {
        if (image.size === 0) continue;

        const bytes = Buffer.from(
          await image.arrayBuffer(),
        );

        const filename =
          randomUUID() +
          path.extname(image.name);

        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "products",
        );

        await fs.writeFile(
          path.join(uploadDir, filename),
          bytes,
        );

        await prisma.productImage.create({
          data: {
            productId: product.id,
            image:
              "/uploads/products/" + filename,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد محصول",
      },
      {
        status: 500,
      },
    );
  }
}