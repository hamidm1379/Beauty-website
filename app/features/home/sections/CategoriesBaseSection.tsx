import CategoryBaseCard from "@/app/features/home/components/CategoryBaseCard";
import { categoryService } from "@/lib/services/category.service";

export default async function CategoriesBaseSection() {
  const categories = await categoryService.findHomeCategories();

  return (
    <section className="py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((item) => (
            <CategoryBaseCard
              key={item.id}
              id={item.id}
              title={item.title}
              slug={item.slug}
              image={item.image ?? "/placeholder/category.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
