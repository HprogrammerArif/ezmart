"use client";

import React, { useState, useEffect } from "react";
import { Search, X, TrendingUp, Sparkles } from "lucide-react";
import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import { getAllProducts, getPopularProducts } from "@/services/Product";
import Container from "./Container";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TRENDING_SEARCHES = [
  "AC Milan 2007",
  "Ronaldo",
  "Messi",
  "Neymar",
  "Brazil",
  "Santos",
  "Travis Scott",
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, 
  onClose,
  searchQuery,
  setSearchQuery
}) => {
  const [popularProducts, setPopularProducts] = useState<IProduct[]>([]);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch initial popular products
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await getPopularProducts(5);
        setPopularProducts(data || []);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };
    fetchPopular();
  }, []);

  // Handle Search Fetching
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const { data } = await getAllProducts(); // Replacing this with actual search service when available
        const filtered = data.filter((p: IProduct) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      {/* Backdrop - Absolute to stay with sticky header */}
      <div 
        className={`absolute top-full left-0 w-full h-[200vh] bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Search Sheet - Absolute to stick with Navbar */}
      <div 
        className={`absolute top-full left-0 w-full bg-white z-[100] shadow-md border-t border-gray-200 transition-all duration-300 ease-in-out transform origin-top ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <Container>
          <div className="py-8 space-y-10 max-h-[calc(100vh-120px)] overflow-y-auto">
            {!searchQuery || searchQuery.trim() === "" ? (
              <>
                {/* Trending Search - Matched to Image */}
                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Trending Search
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {TRENDING_SEARCHES.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-5 py-2 border border-gray-200 rounded-full text-[13px] font-medium text-gray-500 bg-transparent hover:border-black hover:text-black transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Popular Products - Matched to Image */}
                <section>
                  <h3 className="text-base font-bold text-gray-900 mb-6 mt-8">
                    Popular Products
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
                    {popularProducts.slice(0, 5).map((p: IProduct) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section className="animate-in slide-in-from-bottom-2 duration-300">
                <div className="mb-10">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Search for &quot;{searchQuery}&quot;
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-[12px] font-bold text-red-500 uppercase tracking-[0.25em] border-b-2 border-red-500/10 pb-2 inline-block">
                      Suggestions
                    </p>
                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                      {searchResults.length > 0 ? (
                        searchResults.map((p: IProduct) => (
                          <div
                            key={p._id}
                            className="text-[17px] font-semibold text-gray-400 hover:text-black cursor-pointer transition-colors"
                            onClick={() => setSearchQuery(p.name)}
                          >
                            {p.name.toLowerCase()}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No direct matches found.</p>
                      )}
                    </div>
                  </div>
                </div>

                {isSearching ? (
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 opacity-40">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="h-[350px] bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
                      {searchResults.map((p: IProduct) => (
                        <div key={p._id} className="transition-transform hover:-translate-y-2">
                          <ProductCard product={p} />
                        </div>
                      ))}
                    </div>
                    
                    {searchResults.length > 0 && (
                      <div className="mt-20 flex justify-center pb-12">
                        <Link
                          href={`/shop?search=${searchQuery}`}
                          onClick={onClose}
                          className="px-16 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center gap-4 group"
                        >
                          View all Results
                          <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default SearchOverlay;
