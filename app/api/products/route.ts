import { NextRequest, NextResponse } from "next/server";
import { ProductStatus } from "@prisma/client";
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
    const purchasePrice = Number(formData.get("purchasePrice"));
    const categoryId = Number(formData.get("categoryId"));
    const brandId = Number(formData.get("brandId"));
    const status = formData.get("status") as ProductStatus;
    const shortDescription = formData.get("shortDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;
    const thumbnailFile = formData.get("thumbnail") as File | null;
    const variantsRaw = formData.get("variants") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    let thumbnail = "";

    if (thumbnailFile && thumbnailFile.size > 0) {
      const bytes = Buffer.from(await thumbnailFile.arrayBuffer());

      const filename = randomUUID() + path.extname(thumbnailFile.name);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "products",
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      await fs.writeFile(path.join(uploadDir, filename), bytes);

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
        shortDescription,
        seoKeywords,
        purchasePrice,
      },
    });
    if (variantsRaw) {
      try {
        const variants = JSON.parse(variantsRaw) as {
          colorName: string;
          colorCode: string;
          stock: number;
        }[];

        const validVariants = variants.filter(
          (v) => v.colorName && v.colorName.trim(),
        );

        if (validVariants.length > 0) {
          await prisma.productVariant.createMany({
            data: validVariants.map((v) => ({
              productId: product.id,
              title: v.colorName,
              colorName: v.colorName,
              colorCode: v.colorCode || "#000000",
              stock: Number(v.stock) || 0,
            })),
          });
        }
      } catch (err) {
        console.error("خطا در پردازش variants:", err);
      }
    }

    if (imageFiles.length > 0) {
      for (const image of imageFiles) {
        if (image.size === 0) continue;

        const bytes = Buffer.from(await image.arrayBuffer());

        const filename = randomUUID() + path.extname(image.name);

        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "products",
        );

        await fs.writeFile(path.join(uploadDir, filename), bytes);

        await prisma.productImage.create({
          data: {
            productId: product.id,
            image: "/uploads/products/" + filename,
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
