import { getAllProducts } from "@/services/Product";
import SportsTopCollections from "./SportsTopCollections";
import SportsHeroBanner from "./SportsHeroBanner";
import SportsProductRow from "./SportsProductRow";
import SportsPromoBanners from "./SportsPromoBanners";
import ScrollReveal from "@/components/shared/ScrollReveal";
import HeroSection from "../HeroSection";
import Category from "../Category";
import FeaturedProducts from "../FeaturedProducts";

const SportsHomeView = async () => {
  // Fetch products (you might want separate queries for Best Sellers vs New Arrivals later, 
  // but for now we'll just slice the all products list to simulate it)
  const { data: products } = await getAllProducts();

  // Simulate New Arrivals (first 4)
  const newArrivals = products?.slice(0, 4) || [];
  
  // Simulate Best Sellers (next 4)
  const bestSellers = products?.slice(4, 8) || [];

  return (
    <div className="bg-[#f8f8f8] min-h-screen">

       {/* Hero doesn't need reveal — it's above the fold */}
      <HeroSection />

   
      <ScrollReveal animation="up" delay={150}>
        <FeaturedProducts />
      </ScrollReveal>


      <ScrollReveal animation="fade" delay={100}>
        <SportsTopCollections />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={150}>
        <SportsHeroBanner />
      </ScrollReveal>

      {newArrivals.length > 0 && (
        <ScrollReveal animation="up" delay={200}>
          <SportsProductRow 
            title="New Arrivals" 
            subtitle="The Latest and Greatest Styles"
            products={newArrivals} 
          />
        </ScrollReveal>
      )}

      {bestSellers.length > 0 && (
        <ScrollReveal animation="up" delay={300}>
          <SportsProductRow 
            title="Best Sellers" 
            subtitle="Our Communities Favorite Items!"
            products={bestSellers} 
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
