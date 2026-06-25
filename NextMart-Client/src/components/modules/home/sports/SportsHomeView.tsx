import { getPopularProducts, getNewArrivalProducts } from "@/services/Product/queries";
import SportsTopCollections from "./SportsTopCollections";
import SportsHeroBanner from "./SportsHeroBanner";
import SportsProductRow from "./SportsProductRow";
import SportsPromoBanners from "./SportsPromoBanners";
import ScrollReveal from "@/components/shared/ScrollReveal";
import HeroSection from "../HeroSection";

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Extract the product array from { data: { data: Product[] } } */
const extractProducts = (res: any): any[] => res?.data?.data ?? res?.data ?? [];

/** Pick a human-readable subtitle based on the fallback source */
const bestSellersSubtitle = (source?: string) => {
  if (source === "orders")    return "Our Most Ordered Items This Month";
  if (source === "top_rated") return "Highest Rated by Our Community";
  return "Fresh Picks — Explore Our Catalogue";
};

// ─── component ───────────────────────────────────────────────────────────────

const SportsHomeView = async () => {
  // Fetch in parallel — no waterfall
  const [bestSellersRes, newArrivalsRes] = await Promise.all([
    getPopularProducts(8),
    getNewArrivalProducts(8),
  ]);

  const bestSellers = extractProducts(bestSellersRes);
  const bestSellersSource: string = bestSellersRes?.data?.source ?? "";

  const newArrivals = extractProducts(newArrivalsRes);

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* Hero — above the fold, no reveal needed */}
      <HeroSection />

      <ScrollReveal animation="fade" delay={100}>
        <SportsTopCollections />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={150}>
        <SportsHeroBanner />
      </ScrollReveal>

      {bestSellers.length > 0 && (
        <ScrollReveal animation="up" delay={200}>
          <SportsProductRow
            title="Best Sellers"
            subtitle={bestSellersSubtitle(bestSellersSource)}
            products={bestSellers}
          />
        </ScrollReveal>
      )}

      {newArrivals.length > 0 && (
        <ScrollReveal animation="up" delay={300}>
          <SportsProductRow
            title="New Arrivals"
            subtitle="The Latest and Greatest Styles"
            products={newArrivals}
          />
        </ScrollReveal>
      )}

      <ScrollReveal animation="up" delay={400}>
        <SportsPromoBanners />
      </ScrollReveal>
    </div>
  );
};

export default SportsHomeView;
