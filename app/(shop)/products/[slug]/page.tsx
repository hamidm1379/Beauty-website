import { notFound } from "next/navigation";

import Breadcrumb from "@/app/features/product-detail/components/Breadcrumb";
import ProductFeatures from "@/app/features/product-detail/components/ProductFeatures";
import ProductGallery from "@/app/features/product-detail/components/ProductGallery";
import ProductInfo from "@/app/features/product-detail/components/ProductInfo";
import ProductTabs from "@/app/features/product-detail/components/ProductTabs";
import RelatedProducts from "@/app/features/product-detail/components/RelatedProducts";

import { buildMetadata } from "@/lib/seo/metadata-builder";
import { siteConfig } from "@/lib/seo/metadata";

import { productSchema, breadcrumbSchema } from "@/lib/seo/schema";

import { productService } from "@/lib/services/product.service";
import { auth } from "@/lib/auth";
import { wishlistService } from "@/lib/services/wishlist.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const product = await productService.getBySlug(slug);

    const keywords = product.seoKeywords
      ? product.seoKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [product.title, product.category.title, product.brand?.title].filter(
          (v): v is string => Boolean(v),
        );

    return buildMetadata({
      title: product.seoTitle ?? product.title,

      description:
        product.seoDescription ?? product.shortDescription ?? product.title,

      image: product.thumbnail ?? undefined,

      url: `${siteConfig.url}/products/${product.slug}`,

      keywords,
    });
  } catch {
    return {};
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // دریافت داده‌ها — خطاها به‌صورت استثنا مدیریت می‌شوند و در صورت نیاز
  // به notFound() ختم می‌گردد. JSX پس از این بخش و خارج از try/catch
  // return می‌شود تا قانون react-hooks/error-boundaries رعایت شود.
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  // وضعیت اولیه‌ی علاقه‌مندی؛ اگه کاربر لاگین نباشه false در نظر گرفته میشه
  const session = await auth();

  const initialFavorite = session?.user?.id
    ? await wishlistService.isInWishlist(Number(session.user.id), product.id)
    : false;

  // محصولات مرتبط

  const relatedProducts = await productService.getRelatedProducts(
    product.categoryId,
    product.id,
  );

  // تبدیل برای ProductCard

  const relatedProductsForCard = relatedProducts.map((item) => ({
    id: item.id,

    title: item.title,

    slug: item.slug,

    thumbnail: item.thumbnail ?? item.images?.[0]?.image ?? null,

    brand: item.brand
      ? {
          title: item.brand.title,
        }
        : null,

      price: item.price,

      discountPrice: item.discountPrice,
    }));

    // Product Schema

    const jsonLd = productSchema(product);

    // Breadcrumb Schema

    const breadcrumbJsonLd = breadcrumbSchema([
      {
        name: "خانه",
        url: siteConfig.url,
      },
      {
        name: "محصولات",
        url: `${siteConfig.url}/products`,
      },
      {
        name: product.category.title,

        url: `${siteConfig.url}/products?category=${product.category.slug}`,
      },
      {
        name: product.title,

        url: `${siteConfig.url}/products/${product.slug}`,
      },
    ]);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />

        <main className="bg-[#fcfcfc] ">
          <div className="mx-auto w-full max-w-7xl px-4 pb-4 md:py-8 xl:px-0">
            {/* Breadcrumb */}

            <Breadcrumb product={product} />

            {/* Product */}

            <section
              className="
              mt-2
              sm:mt-6
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-2
              sm:p-6
              shadow-sm
            "
            >
              <div
                className="
                grid
                gap-4
                md:gap-8
                md:grid-cols-2
              "
              >
                <ProductGallery product={product} />

                <ProductInfo
                  product={product}
                  initialFavorite={initialFavorite}
                />
              </div>
            </section>

            {/* Tabs */}

            <section className="mt-2 sm:mt-8">
              <ProductTabs product={product} />
            </section>

            {/* Related Products */}

            <section className="mt-2 sm:mt-10">
              <RelatedProducts products={relatedProductsForCard} />
            </section>
            <ProductFeatures />
          </div>
        </main>
      </>
    );
}
