"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import banner1 from "@/assets/banner/Footystyle_site_backgrounds_Buy_3_desktop.jpg";
import banner2 from "@/assets/banner/Footystyle_site_backgrounds_Trusted_desktop.jpg";
import banner3 from "@/assets/banner/Footystyle_site_backgrounds_welcome_desktop.jpg";

const banners = [banner1, banner2, banner3];

const HeroSection = () => {
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
    <section className="relative w-full overflow-hidden " style={{ aspectRatio: "16/9" }}>
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
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative p-1 cursor-pointer"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                current === index
                  ? "w-8 h-2.5 bg-white shadow-lg"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Left / Right Arrows */}
      <button
        onClick={() => goToSlide((current - 1 + banners.length) % banners.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-black/40 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((current + 1) % banners.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-black/40 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div
          className="h-full bg-white/60 transition-none"
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
