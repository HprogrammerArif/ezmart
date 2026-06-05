/**
 * JsonLd - Injects JSON-LD structured data into the page <head>.
 * Search engines (Google, Bing) use this data to show rich results:
 * - Product star ratings in search
 * - Price and availability directly in results
 * - Breadcrumbs in search snippets
 * 
 * Usage on product pages:
 *   <JsonLd
 *     data={{
 *       "@context": "https://schema.org",
 *       "@type": "Product",
 *       "name": product.name,
 *       "image": product.imageUrls,
 *       "offers": {
 *         "@type": "Offer",
 *         "price": product.price,
 *         "priceCurrency": "USD",
 *         "availability": product.stock > 0 ? "InStock" : "OutOfStock"
 *       }
 *     }}
 *   />
 * 
 * Usage for the website (on the home page):
 *   <JsonLd
 *     data={{
 *       "@context": "https://schema.org",
 *       "@type": "WebSite",
 *       "name": "NextMart",
 *       "url": "https://nextmart.com"
 *     }}
 *   />
 */
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
