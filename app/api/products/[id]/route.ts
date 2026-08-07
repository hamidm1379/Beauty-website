import { NextRequest, NextResponse } from "next/server";
import { ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// =======================
// GET
// =======================

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        {
          status: 404,
        },
      );
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
      },
      {
        status: 500,
      },
    );
  }
}

// =======================
// UPDATE
// =======================

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const productId = Number(id);

    const formData = await request.formData();
    const variantsRaw = formData.get("variants") as string | null;
    const seoKeywords = formData.get("seoKeywords") as string;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    let thumbnail = product.thumbnail ?? "";

    const thumbnailFile = formData.get("thumbnail") as File | null;

    if (thumbnailFile && thumbnailFile.size > 0) {
      if (product.thumbnail) {
        try {
          await fs.unlink(
            path.join(process.cwd(), "public", product.thumbnail),
          );
        } catch {}
      }

      const filename = randomUUID() + path.extname(thumbnailFile.name);

      const bytes = Buffer.from(await thumbnailFile.arrayBuffer());

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

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        description: (formData.get("description") as string) ?? "",
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        categoryId: Number(formData.get("categoryId")),
        brandId: Number(formData.get("brandId")),
        status: formData.get("status") as ProductStatus,
        thumbnail,
        shortDescription: (formData.get("shortDescription") as string) ?? "",
        purchasePrice: Number(formData.get("purchasePrice")),
        seoKeywords: seoKeywords ?? "",
        discountPrice: formData.get("discountPrice")
          ? Number(formData.get("discountPrice"))
          : null,
      },
    });

    const newImages = formData.getAll("images") as File[];
    const removedImages = formData.getAll("removedImages") as string[];

    // Delete specifically removed images
    if (removedImages.length > 0) {
      for (const imageUrl of removedImages) {
        if (!imageUrl || imageUrl.trim() === "") continue;
        try {
          await fs.unlink(path.join(process.cwd(), "public", imageUrl));
        } catch {}
      }

      // Remove from database
      await prisma.productImage.deleteMany({
        where: {
          productId,
          image: { in: removedImages },
        },
      });
    }

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

        // حذف variantهای قبلی و جایگزینی با نسخه جدید
        await prisma.productVariant.deleteMany({
          where: { productId },
        });

        if (validVariants.length > 0) {
          await prisma.productVariant.createMany({
            data: validVariants.map((v) => ({
              productId,
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
    if (newImages.length > 0) {
      for (const image of product.images) {
        try {
          await fs.unlink(path.join(process.cwd(), "public", image.image));
        } catch {}
      }

      await prisma.productImage.deleteMany({
        where: {
          productId,
        },
      });

      for (const image of newImages) {
        if (image.size === 0) continue;

        const filename = randomUUID() + path.extname(image.name);

        const bytes = Buffer.from(await image.arrayBuffer());

        await fs.writeFile(
          path.join(process.cwd(), "public", "uploads", "products", filename),
          bytes,
        );

        await prisma.productImage.create({
          data: {
            productId,
            image: "/uploads/products/" + filename,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در بروزرسانی محصول",
      },
      {
        status: 500,
      },
    );
  }
}

// =======================
// DELETE
// =======================

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    if (product.thumbnail) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", product.thumbnail));
      } catch {}
    }

    for (const image of product.images) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", image.image));
      } catch {}
    }

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
