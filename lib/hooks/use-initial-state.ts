"use client";

import { useEffect, useRef, useState } from "react";

/**
 * مقدار اولیه‌ی state را مقداردهی می‌کند و در صورت تغییر `initialValue`
 * (مثلاً پس از بارگذاری داده از سرور)، state را به‌روز می‌کند — بدون نقض
 * قانون `react-hooks/set-state-in-effect`.
 *
 * این تابع جایگزین امن الگوی زیر است:
 *
 * ```ts
 * const [v, setV] = useState(defaultValue);
 * useEffect(() => { if (initialValue) setV(initialValue); }, [initialValue]);
 * ```
 *
 * با نگه‌داشتن مرجع مقدار قبلی، فقط زمانی `setState` صدا زده می‌شود که
 * `initialValue` واقعاً تغییر کرده باشد، بنابراین رندر آبشاری رخ نمی‌دهد.
 */
export function useInitialState<T>(
  initialValue: T | undefined,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue ?? defaultValue);
  const lastSynced = useRef<T | undefined>(initialValue);

  useEffect(() => {
    if (initialValue === undefined) return;
    if (Object.is(initialValue, lastSynced.current)) return;

    lastSynced.current = initialValue;
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue];
}
