import BrandCard from "@/app/features/brands/components/BrandCard";
import BrandPagination from "@/app/features/brands/components/BrandPagination";
import BrandHero from "@/app/features/brands/components/BrandHero";

import { articleService } from "@/lib/services/article.service";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function BrandsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const limit = Number(
    params.limit ?? 12,
  );

  const brands =
    await articleService.getPublishedBrands({
      page,
      limit,
      search: params.search,
    });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50">
      <div className="relative z-10">

        <BrandHero
          total={brands.total}
          search={params.search}
        />

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

          {brands.items.length > 0 ? (

            <div
              className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-3
              lg:grid-cols-4
            "
            >
              {brands.items.map(
                (brand, index) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    index={index}
                  />
                ),
              )}
            </div>

          ) : (

            <div
              className="
              rounded-3xl
              border
              border-dashed
              border-gray-200
              bg-white
              py-24
              text-center
            "
            >
              <p className="text-gray-500">
                برندی پیدا نشد.
              </p>
            </div>

          )}

          <BrandPagination
            page={brands.page}
            totalPages={
              brands.totalPages
            }
            totalItems={
              brands.total
            }
            perPage={
              brands.limit
            }
          />

        </div>
      </div>
    </main>
  );
}