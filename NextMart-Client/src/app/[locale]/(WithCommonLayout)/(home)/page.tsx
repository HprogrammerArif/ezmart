import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TopCollection from "@/components/modules/home/TopCollection";
import TopBrands from "@/components/modules/home/TopBrands";
import ScrollReveal from "@/components/shared/ScrollReveal";

const HomePage = async () => {
  return (
    <div>
      {/* Hero doesn't need reveal — it's above the fold */}
      <HeroSection />

      <ScrollReveal animation="up" delay={100}>
        <Category />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={150}>
        <FeaturedProducts />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={100}>
        <FlashSale />
      </ScrollReveal>

      <ScrollReveal animation="fade" delay={200}>
        <TopBrands />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={150}>
        <TopCollection />
      </ScrollReveal>
    </div>
  );
};

export default HomePage;

