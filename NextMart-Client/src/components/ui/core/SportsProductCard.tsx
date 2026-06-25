"use client";

import { IProduct } from "@/types";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";

interface SportsProductCardProps {
  product: IProduct;
  /** Optional: called when user clicks the quick-view button */
  onQuickView?: (product: IProduct) => void;
  /** Optional: called when user clicks the wishlist button */
  onWishlist?: (product: IProduct) => void;
}

const SportsProductCard = ({
  product,
  onQuickView,
  onWishlist,
}: SportsProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercentage = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
    onWishlist?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <Link
      href={`/products/${product?._id}`}
      className="group block w-full cursor-pointer"
    >
      {/* ── Image Area ─────────────────────────────── */}
      <div className="relative aspect-[7/7] bg-white overflow-hidden mb-4 flex items-center justify-center">
        {/* Product Image */}
        <Image
          src={
            product?.imageUrls?.[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          fill
          sizes="100%"
          alt={product?.name || "Product"}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105 max-h-90"
        />

        {/* ── Discount Badge — always visible, white circle ── */}
        {discountPercentage > 0 && product?.stock > 0 && (
          <span className="absolute top-3 left-3 z-10 w-14 h-14 rounded-full bg-red-900 shadow-md flex items-center justify-center select-none">
            <span className="text-[13px] font-bold text-gray-900 leading-none">
              -{discountPercentage}%
            </span>
          </span>
        )}

        {/* ── Sold-Out Badge — always visible ── */}
        
          {/* <span className="absolute top-3 left-3 z-10 w-14 h-14 rounded-full bg-red-900 shadow-md flex items-center justify-center select-none">
            <span className="text-[11px] font-bold text-white leading-tight text-center">
              Sold
              <br />
              Out
            </span>
          </span>
         */}
        {/* ── Sold-Out Badge — always visible ── */}
        {product?.stock != 0 && (
          <span className="absolute top-3 left-3 z-10 w-14 h-14 rounded-full bg-red-900 shadow-md flex items-center justify-center select-none">
            <span className="text-[11px] font-bold text-white leading-tight text-center">
              Sold
              <br />
              Out
            </span>
          </span>
        )}



        {/* ── Hover Action Buttons ─────────────────────────────────────
            Stacked vertically in the top-right corner, slide in from right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-20">
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className={`
              w-11 h-11 rounded-full flex items-center justify-center shadow-lg
              transition-all duration-200 hover:scale-110
              ${wishlisted
                ? "bg-[#cc3333] text-white"
                : "bg-white text-gray-700 hover:bg-[#cc3333] hover:text-white"
              }
            `}
          >
            <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
          </button>

          {/* Quick View */}
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="w-11 h-11 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:bg-gray-900 hover:text-white"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Product Details ─────────────────────────── */}
      <div className="flex flex-col items-center text-center px-2 w-full">
        <h3 className="font-bold text-[14px] leading-snug text-gray-900 mb-2 line-clamp-2">
          {product?.name}
        </h3>

        <div className="flex items-center justify-center gap-2 text-[14px]">
          {product?.offerPrice ? (
            <>
              <span className="font-bold text-[#cc3333]">
                ${product.offerPrice.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-2 w-full">
          <Button size="sm" className="w-full">Select Option</Button>
        </div>
      </div>
    </Link>
  );
};

export default SportsProductCard;
