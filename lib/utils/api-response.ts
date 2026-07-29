import { NextResponse } from "next/server";

import { getErrorMessage, getErrorStatus } from "@/lib/utils/errors";

/** شکل یکپارچه‌ی همه‌ی پاسخ‌های API. */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

/** پاسخ موفق با کد وضعیت پیش‌فرض 200. */
export function successResponse<T>(
  data?: T,
  message?: string,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

/** پاسخ خطا با کد وضعیت استخراج‌شده از نوع خطا. */
export function errorResponse(
  error: unknown,
  fallbackStatus = 500,
): NextResponse<ApiResponse> {
  const status = getErrorStatus(error) || fallbackStatus;

  return NextResponse.json(
    { success: false, message: getErrorMessage(error) },
    { status },
  );
}

/**
 * یک handler ناهمگام (async) را می‌گیرد و خطاهای آن را به‌صورت خودکار
 * به پاسخ JSON تبدیل می‌کند.
 *
 * جایگزین الگوی تکراری `try { ... } catch (error: any) { ... }` در routeها.
 *
 * @example
 * export const GET = withErrorHandler(async () => {
 *   const data = await service.getAll();
 *   return successResponse(data);
 * });
 */
export function withErrorHandler<TArgs extends unknown[]>(
  handler: (...args: TArgs) => Promise<NextResponse>,
): (...args: TArgs) => Promise<NextResponse> {
  return async (...args: TArgs) => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
