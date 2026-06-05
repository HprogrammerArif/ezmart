"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import banner1 from "@/assets/banner/Footystyle_site_backgrounds_Buy_3_desktop.jpg";
import banner2 from "@/assets/banner/Footystyle_site_backgrounds_Trusted_desktop.jpg";
import banner3 from "@/assets/banner/Footystyle_site_backgrounds_welcome_desktop.jpg";

const banners = [banner1, banner2, banner3];

const HeroSection = () => {
  const t = useTranslations('Hero');
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning, current]
  );

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, goToSlide]);

  return (
    <section className="relative w-full overflow-hidden h-[80vh] min-h-[600px]">
      {/* Slides */}
      {banners.map((src, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0,
            transform: current === index ? "scale(1)" : "scale(1.05)",
            zIndex: current === index ? 10 : 5,
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={src}
            alt={`Banner ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center w-full h-full"
          />
        </div>
      ))}

   

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative p-1 cursor-pointer outline-none"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                current === index
                  ? "w-10 h-1.5 bg-white shadow-lg"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-accent transition-none"
          style={{
            animation: "hero-progress 5s linear infinite",
            width: "100%",
          }}
          key={current}
        />
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
