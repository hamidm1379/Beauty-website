/**
 * تبدیل ارقام فارسی و عربی به انگلیسی، حذف فاصله‌ها و کاراکترهای نامرئی
 * (مثل RLM/LRM که مرورگر یا کیبورد ممکن است هنگام تایپ در فیلدهای RTL اضافه کند).
 *
 * این تابع باعث می‌شود ورودی‌هایی مثل "۰۹۱۸۳۱۰۴۸۲۷" یا "09183104827‌"
 * (با کاراکتر نامرئی وسط آن) هر دو به "09183104827" تبدیل شوند.
 */
export function toEnglishDigits(value: string): string {
  if (!value) return value;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  let result = value;

  for (let i = 0; i < 10; i++) {
    result = result
      .replace(new RegExp(persianDigits[i], "g"), String(i))
      .replace(new RegExp(arabicDigits[i], "g"), String(i));
  }

  // حذف کاراکترهای نامرئی جهت‌دهی متن (LRM, RLM, ZWNJ, ZWJ) و فاصله‌های اضافه
  result = result.replace(/[\u200B-\u200F\uFEFF]/g, "").trim();

  return result;
}