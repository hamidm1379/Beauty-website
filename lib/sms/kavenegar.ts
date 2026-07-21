const KAVENEGAR_API_KEY = process.env.KAVENEGAR_API_KEY;
const KAVENEGAR_OTP_TEMPLATE = process.env.KAVENEGAR_OTP_TEMPLATE ?? "verify";

/**
 * ارسال کد تایید با استفاده از سرویس Verify Lookup کاوه‌نگار
 * مستندات: https://kavenegar.com/rest.html#lookup
 */
export async function sendOtpSms(phone: string, code: string) {
  if (!KAVENEGAR_API_KEY) {
    throw new Error("KAVENEGAR_API_KEY تنظیم نشده است.");
  }

  const url = `https://api.kavenegar.com/v1/${KAVENEGAR_API_KEY}/verify/lookup.json`;

  const params = new URLSearchParams({
    receptor: phone,
    token: code,
    template: KAVENEGAR_OTP_TEMPLATE,
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok || result?.return?.status !== 200) {
    throw new Error(
      result?.return?.message ?? "خطا در ارسال پیامک. لطفاً دوباره تلاش کنید.",
    );
  }

  return result;
}