"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const [activeImage, setActiveImage] = useState(product?.imageUrls[0]);

  const handleAddProduct = () => {
    dispatch(addProduct(product));
  };

  const discountPercentage = product?.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 max-w-6xl mx-auto px-4">
      {/* Left: Images */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] bg-[#f7f7f7] rounded-md overflow-hidden">
          <Image
            src={activeImage}
            alt="product main image"
            fill
            className="object-cover object-center"
            priority
          />
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
              Sale -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {product?.imageUrls.map((image: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveImage(image)}
              className={`relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                activeImage === image ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`product thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex flex-col pt-4">
        <h1 className="font-black text-3xl md:text-4xl uppercase tracking-tight text-[#111111] mb-2">
          {product?.name}
        </h1>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-black">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product?.averageRating) ? "fill-black" : "fill-transparent"}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-500">
            {product?.averageRating > 0 ? `${product.averageRating.toFixed(1)} Ratings` : "No reviews yet"}
          </span>
        </div>

        <div className="flex items-end gap-3 mb-8">
          {product?.offerPrice ? (
            <>
              <span className="text-3xl font-black text-accent">
                ${product?.offerPrice.toFixed(2)}
              </span>
              <span className="text-xl text-gray-400 line-through font-bold mb-1">
                ${product?.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-3xl font-black text-[#111111]">
              ${product?.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Shipping Info Boxes (Footy Style Hub specific) */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-[#fcfcfc]">
            <Truck className="w-6 h-6 text-black" />
            <div>
              <p className="font-bold text-sm text-[#111111]">Estimated Delivery</p>
              <p className="text-xs text-gray-600">3-5 Business Days (Standard)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-[#fcfcfc]">
            <ShieldCheck className="w-6 h-6 text-black" />
            <div>
              <p className="font-bold text-sm text-[#111111]">Secure Payment</p>
              <p className="text-xs text-gray-600">100% secure checkout processing</p>
            </div>
          </div>
        </div>

        <p className="text-[#111111] font-medium text-sm leading-relaxed mb-8">
          {product?.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            Status: <span className={product?.stock > 0 ? "text-green-600" : "text-red-600"}>{product?.stock > 0 ? "In Stock" : "Sold Out"}</span>
          </p>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleAddProduct}
              disabled={product?.stock === 0}
              className="flex-1 h-14 bg-[#111111] hover:bg-black text-white text-sm font-bold uppercase tracking-widest rounded-md"
            >
              Add To Cart
            </Button>
            <Button variant="outline" className="h-14 w-14 p-0 flex items-center justify-center rounded-md border-2 border-gray-200 hover:border-black transition-colors">
              <Heart className="w-5 h-5 text-[#111111]" />
            </Button>
          </div>
          <Button 
            disabled={product?.stock === 0}
            className="w-full h-14 bg-accent hover:bg-red-700 text-white text-sm font-bold uppercase tracking-widest rounded-md transition-colors"
          >
            Buy It Now
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
