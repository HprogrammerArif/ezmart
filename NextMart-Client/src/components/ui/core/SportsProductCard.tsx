"use client";

import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const SportsProductCard = ({ product }: { product: IProduct }) => {
  const discountPercentage = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product?._id}`} className="group block relative w-full h-full bg-white flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-white flex items-center justify-center">
        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          fill
          alt={product?.name || "Product"}
          className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
          {product?.stock === 0 && (
            <span className="bg-black text-white text-[12px] font-medium px-3 py-1 rounded-full">
              Sold Out
            </span>
          )}
          {discountPercentage > 0 && product?.stock > 0 && (
            <span className="bg-[#cc3333] text-white text-[12px] font-medium px-3 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col items-center text-center px-2 mt-auto">
        <h3 className="font-bold text-[15px] leading-tight text-gray-900 mb-2 line-clamp-2">
          {product?.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-[14px]">
          {product?.offerPrice ? (
            <>
              <span className="font-bold text-[#cc3333]">
                ${product?.offerPrice.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through">
                ${product?.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900">
              ${product?.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SportsProductCard;
