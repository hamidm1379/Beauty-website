import Breadcrumb from "@/app/features/product-detail/components/Breadcrumb";
import ProductFeatures from "@/app/features/product-detail/components/ProductFeatures";
import ProductGallery from "@/app/features/product-detail/components/ProductGallery";
import ProductInfo from "@/app/features/product-detail/components/ProductInfo";
import ProductTabs from "@/app/features/product-detail/components/ProductTabs";
import RelatedProducts from "@/app/features/product-detail/components/RelatedProducts";
import { siteConfig } from "@/lib/seo/metadata";
import { productService } from "@/lib/services/product.service";
import { buildMetadata } from "@/lib/seo/metadata-builder";
import { productSchema } from "@/lib/seo/schema";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const product = await productService.getBySlug(slug);

  return buildMetadata({
    title: product.seoTitle ?? product.title,
    description: product.seoDescription ?? siteConfig.description,

    image: product.thumbnail ?? undefined,

    url: `${siteConfig.url}/products/${product.slug}`,
  });
}

export default function ProductDetailPage() {
  return (
    <>
    {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      /> */}
      <main className="bg-[#fcfcfc]">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 xl:px-0">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Top Section */}
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
              <ProductGallery />

              <ProductInfo />
            </div>

            <ProductFeatures />
          </section>

          {/* Tabs */}
          <section className="mt-8">
            <ProductTabs />
          </section>

          {/* Related Products */}
          <section className="mt-10">
            <RelatedProducts />
          </section>
        </div>
      </main>
      
    </>
  );
}
