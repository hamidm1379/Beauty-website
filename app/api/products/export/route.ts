import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Products");

  sheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "عنوان", key: "title", width: 35 },
    { header: "Slug", key: "slug", width: 30 },
    { header: "توضیحات", key: "description", width: 50 },
    { header: "قیمت", key: "price", width: 15 },
    { header: "قیمت تخفیف", key: "discountPrice", width: 15 },
    { header: "موجودی", key: "stock", width: 12 },
    { header: "فروش", key: "soldCount", width: 12 },
    { header: "SKU", key: "sku", width: 20 },
    { header: "بارکد", key: "barcode", width: 25 },
    { header: "وزن", key: "weight", width: 12 },
    { header: "دسته بندی", key: "category", width: 25 },
    { header: "برند", key: "brand", width: 25 },
    { header: "وضعیت", key: "status", width: 15 },
    { header: "تصویر اصلی", key: "thumbnail", width: 45 },
    { header: "گالری", key: "gallery", width: 80 },
    { header: "SEO Title", key: "seoTitle", width: 35 },
    { header: "SEO Description", key: "seoDescription", width: 50 },
    { header: "تاریخ ایجاد", key: "createdAt", width: 22 },
    { header: "آخرین بروزرسانی", key: "updatedAt", width: 22 },
  ];

  sheet.getRow(1).font = {
    bold: true,
  };

  sheet.getRow(1).alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  products.forEach((product) => {
    sheet.addRow({
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description ?? "",
      price: product.price,
      discountPrice: product.discountPrice ?? "",
      stock: product.stock,
      soldCount: product.soldCount,
      sku: product.sku ?? "",
      barcode: product.barcode ?? "",
      weight: product.weight ?? "",
      category: product.category?.title ?? "",
      brand: product.brand?.title ?? "",
      status:
        product.status === "ACTIVE"
          ? "فعال"
          : product.status === "DRAFT"
          ? "پیش نویس"
          : "غیرفعال",
      thumbnail: product.thumbnail ?? "",
      gallery: product.images.map((i) => i.image).join("\n"),
      seoTitle: product.seoTitle ?? "",
      seoDescription: product.seoDescription ?? "",
      createdAt: product.createdAt.toLocaleString("fa-IR"),
      updatedAt: product.updatedAt.toLocaleString("fa-IR"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="products.xlsx"',
    },
  });
}