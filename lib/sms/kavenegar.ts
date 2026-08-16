/* eslint-disable @typescript-eslint/no-var-requires */

// پکیج رسمی kavenegar فایل تایپ (types) رسمی منتشر نکرده.
// چون TypeScript اجازه‌ی augmentation ماژول‌های untyped را در فایل‌های
// معمولی .ts (غیر از .d.ts) نمی‌دهد، اینجا با require + type assertion
// محلی مشکل را دور می‌زنیم تا همه‌چیز در همین یک فایل بماند.
const KavenegarPkg = require("kavenegar") as {
  KavenegarApi(config: KavenegarConfig): KavenegarApiClient;
};

interface KavenegarConfig {
  apikey: string;
}

interface KavenegarVerifyLookupParams {
  receptor: string;
  token: string;
  token2?: string;
  token3?: string;
  template: string;
  type?: "sms" | "call";
}

interface KavenegarSendParams {
  receptor: string;
  message: string;
  sender?: string;
}

interface KavenegarEntry {
  messageid: number;
  message: string;
  status: number;
  statustext: string;
  sender: string;
  receptor: string;
  date: number;
  cost: number;
}

interface KavenegarApiClient {
  VerifyLookup(
    params: KavenegarVerifyLookupParams,
    callback: (response: KavenegarEntry | null, status: number, message?: string) => void,
  ): void;
  Send(
    params: KavenegarSendParams,
    callback: (response: KavenegarEntry[] | null, status: number, message?: string) => void,
  ): void;
}

const KAVENEGAR_API_KEY = process.env.KAVENEGAR_API_KEY;
const KAVENEGAR_OTP_TEMPLATE = process.env.KAVENEGAR_OTP_TEMPLATE ?? "verify";
const KAVENEGAR_SENDER_LINE = process.env.KAVENEGAR_SENDER_LINE;

let client: KavenegarApiClient | null = null;

function getClient(): KavenegarApiClient {
  if (!KAVENEGAR_API_KEY) {
    throw new Error("KAVENEGAR_API_KEY تنظیم نشده است.");
  }

  if (!client) {
    client = KavenegarPkg.KavenegarApi({ apikey: KAVENEGAR_API_KEY });
  }

  return client;
}

// پیام‌های فارسی برای رایج‌ترین کدهای خطای کاوه‌نگار
// مستندات کامل: https://kavenegar.com/rest.html#errors
const KAVENEGAR_ERROR_MESSAGES: Record<number, string> = {
  401: "کلید API کاوه‌نگار نامعتبر است.",
  402: "اعتبار حساب کاوه‌نگار کافی نیست.",
  403: "دسترسی از این IP مجاز نیست. آدرس IP سرور را در پنل کاوه‌نگار تأیید کنید.",
  411: "شماره گیرنده نامعتبر است.",
  412: "خط ارسال‌کننده نامعتبر است.",
  414: "متن پیامک خالی است.",
  424: "الگوی پیامک (Template) پیدا نشد یا هنوز تأیید نشده است.",
  426: "سرویس Verify Lookup برای این حساب فعال نیست.",
  428: "متغیرهای الگو با مقادیر ارسالی همخوانی ندارند.",
  431: "این الگو برای سرویس Verify Lookup تعریف نشده است.",
  432: "شماره گیرنده مسدود است یا در لیست سیاه قرار دارد.",
};

function toFriendlyError(status: number, fallbackMessage?: string) {
  return new Error(
    KAVENEGAR_ERROR_MESSAGES[status] ??
      fallbackMessage ??
      "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.",
  );
}

/**
 * ارسال کد تایید با استفاده از سرویس Verify Lookup کاوه‌نگار.
 * توجه: این متد نیاز به یک الگوی (Template) از قبل ساخته و تأییدشده در
 * پنل کاوه‌نگار دارد (KAVENEGAR_OTP_TEMPLATE). اگر الگو نساخته/تأیید نشده
 * باشد، خطای «الگوی پیامک پیدا نشد یا تأیید نشده» می‌گیری.
 * مستندات: https://kavenegar.com/rest.html#lookup
 */
export function sendOtpSmsViaTemplate(phone: string, code: string): Promise<KavenegarEntry> {
  const api = getClient();

  return new Promise((resolve, reject) => {
    api.VerifyLookup(
      {
        receptor: phone,
        token: code,
        template: KAVENEGAR_OTP_TEMPLATE,
      },
      (response, status, message) => {
        if (status !== 200 || !response) {
          reject(toFriendlyError(status, message));
          return;
        }

        resolve(response);
      },
    );
  });
}

/**
 * ارسال کد تایید با استفاده از API عادی ارسال پیامک (بدون نیاز به الگوی
 * تأییدشده‌ی Verify Lookup). فعلاً روش پیش‌فرض همین است تا وقتی الگوی
 * Lookup در پنل کاوه‌نگار ساخته و تأیید بشه.
 */
export function sendOtpSms(phone: string, code: string): Promise<KavenegarEntry[]> {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "";
  const message = `کد تایید شما: ${code}${appName ? `\n${appName}` : ""}`;

  return sendSms(phone, message);
}

/**
 * ارسال پیامک دلخواه با استفاده از API عادی ارسال پیامک کاوه‌نگار.
 * (برخلاف Verify Lookup، این متد نیاز به سرویس پیشرفته/تایید کسب‌وکار ندارد
 * و روی اکانت‌های عادی/رایگان هم کار می‌کند.)
 * مستندات: https://kavenegar.com/rest.html#sms-send
 */
export function sendSms(phone: string, message: string): Promise<KavenegarEntry[]> {
  const api = getClient();

  return new Promise((resolve, reject) => {
    api.Send(
      {
        receptor: phone,
        message,
        ...(KAVENEGAR_SENDER_LINE ? { sender: KAVENEGAR_SENDER_LINE } : {}),
      },
      (response, status, errMessage) => {
        if (status !== 200 || !response) {
          reject(toFriendlyError(status, errMessage));
          return;
        }

        resolve(response);
      },
    );
  });
}