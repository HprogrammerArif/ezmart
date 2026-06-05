import type { Metadata } from "next";
import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productDetails";
import NMContainer from "@/components/ui/core/NMContainer";
import { getSingleProduct } from "@/services/Product";
import JsonLd from "@/components/shared/JsonLd";
import { getAppUrl } from "@/utils/Helpers";

// Generate dynamic page title for each product (improves SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);

  return {
    title: product?.name ?? 'Product Details',
    description: product?.description?.slice(0, 160) ?? '',
    openGraph: {
      title: product?.name,
      description: product?.description?.slice(0, 160) ?? '',
      images: product?.imageUrls?.[0] ? [{ url: product.imageUrls[0] }] : [],
    },
  };
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);

  // Schema.org Product structured data for Google rich results
  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.imageUrls,
        url: `${getAppUrl()}/products/${productId}`,
        brand: {
          '@type': 'Brand',
          name: product.brand?.name ?? 'NextMart',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: product.offerPrice ?? product.price,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'NextMart',
          },
        },
        aggregateRating: product.averageRating > 0
          ? {
              '@type': 'AggregateRating',
              ratingValue: product.averageRating,
              reviewCount: product.totalRating ?? 1,
            }
          : undefined,
      }
    : null;

  return (
    <NMContainer>
      {productJsonLd && <JsonLd data={productJsonLd} />}
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductDetails product={product} />
    </NMContainer>
  );
};

export default ProductDetailsPage;

