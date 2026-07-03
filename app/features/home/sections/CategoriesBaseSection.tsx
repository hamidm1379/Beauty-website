import CategoryBaseCard from "@/app/features/home/components/CategoryBaseCard";
import { categories } from "../data/categories";

function CategoriesBaseSection() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
          {categories.map((item) => (
            <CategoryBaseCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesBaseSection;
