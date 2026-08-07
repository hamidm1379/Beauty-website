"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";

interface ProductItem {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  price: number;
  discountPrice: number | null;
}

interface Props {
  className?: string;
}

export default function SearchInput({ className = "" }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.items ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(() => search(value.trim()), 300);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    setOpen(false);
    setResults([]);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  }

  function handleSelect() {
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={18}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          placeholder="جستجو برای محصول..."
          autoComplete="off"
          className="
            h-11
            w-full
            rounded-full
            bg-gray-50
            pr-11
            pl-9
            text-sm
            outline-none
            transition-all
            focus:bg-white
            focus:ring-2
            focus:ring-pink-200
          "
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-gray-600
              cursor-pointer
            "
          >
            <X size={16} />
          </button>
        )}

        {loading && (
          <div
            className="
              absolute
              left-9
              top-1/2
              -translate-y-1/2
            "
          >
            <Loader2 size={16} className="animate-spin text-pink-400" />
          </div>
        )}
      </form>

      {showDropdown && (
        <div
          className="
            absolute
            top-full
            right-0
            z-50
            mt-2
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-xl
          "
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            <>
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={handleSelect}
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        transition
                        hover:bg-pink-50/60
                      "
                    >
                      <div
                        className="
                          h-12
                          w-12
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-gray-100
                        "
                      >
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-300">
                            <Search size={16} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {item.discountPrice ? (
                            <>
                              <span className="font-bold text-pink-500">
                                {Math.round(
                                  item.price -
                                    (item.price * item.discountPrice) / 100,
                                ).toLocaleString("fa-IR")}
                              </span>
                              <span className="mr-1 text-gray-300 line-through">
                                {item.price.toLocaleString("fa-IR")}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-gray-700">
                              {item.price.toLocaleString("fa-IR")}
                            </span>
                          )}
                          <span className="mr-1">تومان</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/products?search=${encodeURIComponent(query.trim())}`}
                onClick={handleSelect}
                className="
                  block
                  border-t
                  border-gray-100
                  bg-gray-50
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-pink-500
                  transition
                  hover:bg-pink-50
                "
              >
                مشاهده همه نتایج
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
