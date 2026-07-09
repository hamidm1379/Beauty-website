import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/lib/services/user.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const user = await userService.getUser(Number(id));

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const user = await userService.updateUser(
      Number(id),
      body
    );

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    await userService.deleteUser(Number(id));

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}