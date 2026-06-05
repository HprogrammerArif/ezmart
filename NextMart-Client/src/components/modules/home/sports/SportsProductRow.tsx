import { IProduct } from "@/types";
import NMContainer from "@/components/ui/core/NMContainer";
import SportsProductCard from "@/components/ui/core/SportsProductCard";

interface SportsProductRowProps {
  title: string;
  subtitle?: string;
  products: IProduct[];
}

const SportsProductRow = ({ title, subtitle, products }: SportsProductRowProps) => {
  if (!products || products.length === 0) return null;

  return (
    <NMContainer className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {/* Render 4 products per row ideally */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.slice(0, 4).map((product, idx) => (
          <SportsProductCard key={idx} product={product} />
        ))}
      </div>
    </NMContainer>
  );
};

export default SportsProductRow;
