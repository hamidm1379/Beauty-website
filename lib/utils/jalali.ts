const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const PERSIAN_WEEKDAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

function div(a: number, b: number): number {
  return Math.floor(a / b);
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number,
): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * div(days, 12053);
  days = mod(days, 12053);
  jy += 4 * div(days, 1461);
  days = mod(days, 1461);
  if (days > 365) {
    jy += div(days - 1, 365);
    days = mod(days - 1, 365);
  }
  let jm: number;
  let jd: number;
  if (days < 186) {
    jm = 1 + div(days, 31);
    jd = 1 + mod(days, 31);
  } else {
    jm = 7 + div(days - 186, 30);
    jd = 1 + mod(days - 186, 30);
  }
  return [jy, jm, jd];
}

export function toJalaliString(date: Date): string {
  const [jy, jm, jd] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  const mm = String(jm).padStart(2, "0");
  const dd = String(jd).padStart(2, "0");
  return `${jy}/${mm}/${dd}`;
}

export function toJalaliFull(date: Date): string {
  const [jy, jm, jd] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  const weekday = PERSIAN_WEEKDAYS[date.getDay()];
  const month = PERSIAN_MONTHS[jm - 1];
  return `${weekday} ${jd} ${month} ${jy}`;
}

export function toPersianDigits(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num)
    .split("")
    .map((ch) => {
      const d = parseInt(ch, 10);
      return isNaN(d) ? ch : persianDigits[d];
    })
    .join("");
}

export function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${toPersianDigits(h)}:${toPersianDigits(m)}`;
}
