import type { TopProduct } from "./types";

export default function TopProducts({ data }: { data: TopProduct[] }) {
  return (
    <div
      className="
rounded-3xl
bg-white
p-6
shadow
"
    >
      <h2
        className="
mb-5
text-xl
font-black
"
      >
        پرفروش‌ترین محصولات
      </h2>

      <div className="space-y-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="
flex
items-center
justify-between
rounded-2xl
bg-gray-50
p-4
"
          >
            <div>
              <h3
                className="
font-bold
"
              >
                {product.title}
              </h3>

              <p
                className="
text-sm
text-gray-500
"
              >
                تعداد فروش:
                {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
