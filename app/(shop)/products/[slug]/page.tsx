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

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const product = await productService.getBySlug(slug);

    return buildMetadata({
      title: product.seoTitle ?? product.title,

      description:
        product.seoDescription ?? product.shortDescription ?? product.title,

      image: product.thumbnail ?? undefined,

      url: `${siteConfig.url}/products/${product.slug}`,
    });
  } catch {
    return {};
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  try {
    const product = await productService.getBySlug(slug);

    if (!product) {
      notFound();
    }

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
          <div className="mx-auto w-full max-w-7xl px-4 py-8 xl:px-0">
            {/* Breadcrumb */}

            <Breadcrumb product={product} />

            {/* Product */}

            <section
              className="
              mt-6
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
            "
            >
              <div
                className="
                grid
                gap-8
                lg:grid-cols-2
              "
              >
                <ProductGallery product={product} />

                <ProductInfo product={product} />
              </div>

             
            </section>

            {/* Tabs */}

            <section className="mt-8">
              <ProductTabs product={product} />
            </section>

            {/* Related Products */}

            <section className="mt-10">
              <RelatedProducts products={relatedProductsForCard} />
            </section>
             <ProductFeatures />
          </div>
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
