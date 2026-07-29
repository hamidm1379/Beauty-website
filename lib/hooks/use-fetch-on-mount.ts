"use client";

import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
};

/**
 * یک fetch را یک‌بار هنگام mount اجرا می‌کند و نتیجه را در state نگه می‌دارد.
 *
 * جایگزین امن و استاندارد الگوی رایج زیر که قوانین `react-hooks/immutability`
 * و `react-hooks/exhaustive-deps` را نقض می‌کند:
 *
 * ```ts
 * const [data, setData] = useState(null);
 * useEffect(() => { loadData(); }, []);
 * async function loadData() { ... setData(res); }
 * ```
 *
 * تابع fetch باید داده‌ی نهایی را return کند (نه کل response). خطاهای پرتاب‌شده
 * نادیده گرفته می‌شوند؛ برای مدیریت خطا، منطق دلخواه را درون `fetcher` قرار دهید.
 */
export function useFetchOnMount<T>(
  fetcher: () => Promise<T>,
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetcher()
      .then((result) => {
        if (active) setData(result);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
