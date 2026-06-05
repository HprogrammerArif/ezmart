"use client";

import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { IProduct } from "@/types";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault();
    dispatch(addProduct(product));
  };

  const discountPercentage = product?.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

  return (
    <Link href={`/products/${product?._id}`} className="group block relative w-full h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#f7f7f7] overflow-hidden rounded-md mb-3">
        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          fill
          alt={product?.name || "Product"}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product?.stock === 0 && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm">
              Sold Out
            </span>
          )}
          {discountPercentage > 0 && product?.stock > 0 && (
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm">
              Sale -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => handleAddProduct(e, product)}
            disabled={product?.stock === 0}
            className="bg-black hover:bg-gray-800 text-white rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="bg-white hover:bg-gray-100 text-black rounded-full p-3 shadow-lg transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col items-center text-center px-1">
        <h3 className="font-bold text-[14px] leading-tight text-gray-900 mb-1.5 uppercase line-clamp-2">
          {product?.name}
        </h3>
        
        <div className="flex items-center gap-2 text-[14px]">
          {product?.offerPrice ? (
            <>
              <span className="font-bold text-accent">
                ${product?.offerPrice.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through font-medium">
                ${product?.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900">
              ${product?.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-1 mt-1.5 opacity-80">
          <Star className="w-3.5 h-3.5 fill-black text-black" />
          <span className="text-[12px] font-semibold text-gray-700">
            {product?.averageRating > 0 ? product.averageRating.toFixed(1) : "No reviews"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
