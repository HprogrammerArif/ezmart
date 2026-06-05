import NMContainer from "@/components/ui/core/NMContainer";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const promos = [
  {
    image: "https://picsum.photos/seed/promo1/600/800",
    smallText: "PSG Vs. Arsenal 2026",
    title: "Anticipated Matchup",
    subtitle: "Shop The Best Games To Come",
    buttonText: "View Products",
    link: "/products",
  },
  {
    image: "https://picsum.photos/seed/promo2/600/800",
    smallText: "",
    title: "",
    subtitle: "",
    buttonText: "View Products",
    link: "/products",
  },
  {
    image: "https://picsum.photos/seed/promo3/600/800",
    smallText: "",
    title: "",
    subtitle: "",
    buttonText: "View Products",
    link: "/products",
  },
];

const SportsPromoBanners = () => {
  return (
    <NMContainer className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((promo, idx) => (
          <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden group">
            <Image
              src={promo.image}
              alt={promo.title || "Promo"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-0 w-full flex flex-col items-center text-center px-4">
              {promo.smallText && (
                <span className="text-white/80 text-xs uppercase tracking-widest mb-2 font-semibold">
                  {promo.smallText}
                </span>
              )}
              {promo.title && (
                <h3 className="text-white text-3xl font-bold mb-2">
                  {promo.title}
                </h3>
              )}
              {promo.subtitle && (
                <p className="text-white/80 text-sm mb-6">
                  {promo.subtitle}
                </p>
              )}
              
              <Link href={promo.link}>
                <button className="bg-white text-gray-900 rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  {promo.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </NMContainer>
  );
};

export default SportsPromoBanners;
