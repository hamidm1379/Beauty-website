import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim();

    if (!q || q.length < 2) {
      return NextResponse.json({ items: [] });
    }

    const items = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { title: { contains: q } },
          { slug: { contains: q } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        price: true,
        discountPrice: true,
      },
      take: 8,
      orderBy: { title: "asc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
