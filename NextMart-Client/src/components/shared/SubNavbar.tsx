"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Container from "./Container";

const promotions = [
  "Sign up for 15% off your first order",
  "Free shipping on orders over $50",
  "New arrivals are here! Shop now",
];

export default function SubNavbar() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  const nextPromo = React.useCallback(() => {
    setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
  }, []);

  const prevPromo = React.useCallback(() => {
    setCurrentPromoIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextPromo, 5000);
    return () => clearInterval(timer);
  }, [nextPromo, currentPromoIndex]);




  return (
    <div className="bg-[#0f1111] text-white text-[11px] py-1 w-full uppercase tracking-[0.05em] font-medium border-b border-white/10  z-[20]">




      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .promo-slide {
          animation: slideInFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <Container>
        <div className="flex justify-between items-center px-4 min-h-[38px]">


          {/* Left Side: Promotion Slider */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPromo();
                }}
                className="hover:text-white/70 transition-all p-2 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Previous promotion"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPromo();
                }}
                className="hover:text-white/70 transition-all p-2 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Next promotion"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>



            <div className="overflow-hidden h-full flex items-center min-w-[300px]">
              <span key={currentPromoIndex} className="promo-slide block">
                {promotions[currentPromoIndex]}
              </span>
            </div>
          </div>


          {/* Right Side: Country Selector */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-white/70 transition-all group shrink-0">
            <span role="img" aria-label="USA Flag" className="text-xs">
              🇺🇸
            </span>
            <span className="font-medium hidden sm:inline-block">United States (USD $)</span>
            <span className="font-medium sm:hidden">USD $</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </Container>
    </div>
  );
}


