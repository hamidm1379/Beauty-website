import { NextRequest, NextResponse } from "next/server";

import { reportService } from "@/lib/services/report.service";
import { getErrorMessage } from "@/lib/utils/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const range = searchParams.get("range") ?? undefined;

    const from = searchParams.get("from") ?? undefined;

    const to = searchParams.get("to") ?? undefined;

    const data = await reportService.getReports({
      range,

      from,

      to,
    });

    return NextResponse.json({
      success: true,

      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
