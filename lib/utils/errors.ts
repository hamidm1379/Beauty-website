/**
 * ابزارهای مرکزی برای مدیریت خطاها.
 *
 * این ماژول به‌جای استفاده از `any` در بلاک‌های `catch`، یک روش امن
 * و تایپ‌دار برای استخراج پیام خطا و ساخت پاسخ یکپارچه فراهم می‌کند.
 */

/**
 * علت شناخته‌شده‌ی یک خطا. کلاس پایه‌ی همه‌ی خطاهای برنامه.
 *
 * Status code پیش‌فرض 400 است و در API routeها به همراه `message` استفاده می‌شود.
 */
export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

/** خطای "یافت نشد" با کد وضعیت 404. */
export class NotFoundError extends AppError {
  constructor(message = "مورد درخواستی یافت نشد.") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

/** خطای اعتبارسنجی با کد وضعیت 422. */
export class ValidationError extends AppError {
  constructor(message = "ورودی‌ها نامعتبر است.") {
    super(message, 422);
    this.name = "ValidationError";
  }
}

type ErrorWithMessage = {
  message: string;
};

/** بررسی می‌کند که آیا مقدار یک شیء با فیلد `message` است. */
function isErrorWithMessage(value: unknown): value is ErrorWithMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (value as Record<string, unknown>).message === "string"
  );
}

/**
 * پیام قابل‌خواندن توسط انسان را از هر مقدار خطایی استخراج می‌کند.
 *
 * این تابع جایگزین الگوی ناامن `catch (error: any) { error.message }` است.
 */
export function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message;

  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return "خطای ناشناخته رخ داد.";
  }
}

/**
 * کد وضعیت HTTP مناسب برای خطا را برمی‌گرداند.
 *
 * اگر خطا از نوع `AppError` باشد از `statusCode` آن استفاده می‌کند،
 * در غیر این صورت 500 (خطای سرور) پیش‌فرض است.
 */
export function getErrorStatus(error: unknown): number {
  if (error instanceof AppError) return error.statusCode;

  return 500;
}
