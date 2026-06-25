import { IProduct } from "@/types";
import NMContainer from "@/components/ui/core/NMContainer";
import SportsProductCard from "@/components/ui/core/SportsProductCard";

interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: IProduct[];
  /** Max number of products to display. Defaults to 4 */
  limit?: number;
  /** Optional quick-view handler passed through to each card */
  onQuickView?: (product: IProduct) => void;
  /** Optional wishlist handler passed through to each card */
  onWishlist?: (product: IProduct) => void;
}

const ProductRow = ({
  title,
  subtitle,
  products,
  limit = 4,
  onQuickView,
  onWishlist,
}: ProductRowProps) => {
  if (!products || products.length === 0) return null;

  return (
    <NMContainer className="py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.slice(0, limit).map((product) => (
          <SportsProductCard
            key={product._id}
            product={product}
            onQuickView={onQuickView}
            onWishlist={onWishlist}
          />
        ))}
      </div>
    </NMContainer>
  );
};

export default ProductRow;
