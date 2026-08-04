import type { TopProduct } from "./types";

export default function TopProducts({ data }: { data: TopProduct[] }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow">
      <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl font-black">
        پرفروش‌ترین محصولات
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl sm:rounded-2xl bg-gray-50 p-3 sm:p-4"
          >
            <div>
              <h3 className="text-sm sm:text-base font-bold">
                {product.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500">
                تعداد فروش: {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}