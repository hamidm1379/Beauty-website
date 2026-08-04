import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest) {
  try {
    const { filePath } = (await request.json()) as { filePath: string };

    if (!filePath || !filePath.startsWith("/uploads/")) {
      return NextResponse.json(
        { success: false, message: "مسیر فایل معتبر نیست." },
        { status: 400 },
      );
    }

    const fullPath = path.join(process.cwd(), "public", filePath);

    await fs.unlink(fullPath).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "خطا در حذف فایل." },
      { status: 500 },
    );
  }
}
