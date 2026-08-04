import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { settingService } from "@/lib/services/setting.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const settings = await settingService.getAll();

    const grouped: Record<string, Record<string, string | null>> = {};

    for (const s of settings) {
      if (!grouped[s.group]) grouped[s.group] = {};
      grouped[s.group][s.key] = s.value;
    }

    return NextResponse.json({ success: true, data: grouped });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { group, data } = body as {
      group: string;
      data: Record<string, string | null>;
    };

    if (!group || !data) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    await settingService.save(group, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
