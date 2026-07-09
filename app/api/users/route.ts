import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/lib/services/user.service";
import { userSchema } from "@/lib/validations/user.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات وارد شده معتبر نیست.",

          errors: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const user = await userService.createUser(result.data);

    return NextResponse.json(
      {
        success: true,

        message: "کاربر با موفقیت ایجاد شد.",

        data: user,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,

        message: error.message ?? "خطایی در ایجاد کاربر رخ داد.",
      },
      {
        status: 500,
      },
    );
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = Number(searchParams.get("page") ?? 1);

  const limit = Number(searchParams.get("limit") ?? 10);

  const search = searchParams.get("search") ?? undefined;

  const role = searchParams.get("role") ?? undefined;

  const isActive = searchParams.get("isActive");

  const users = await userService.getUsers({
    page,
    limit,
    search,

    role: role as any,

    isActive: isActive === null ? undefined : isActive === "true",
  });

  return NextResponse.json(users);
}
