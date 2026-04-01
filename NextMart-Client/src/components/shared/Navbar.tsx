"use client";
import React from "react";
import { Heart, LogOut, User, Clock, ShoppingBag, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/contants";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import Image from "next/image";
import logo from "@/assets/ezmartlogo.png"
import Container from "./Container";
import { Input } from "../ui/input";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-white w-full sticky top-0 z-[110] transition-all">
      <Container>
        <div className="flex justify-between items-center h-24 px-4 sm:px-6 relative">
          {/* Left Side: Logo & Mobile Menu */}
          <div className="flex-1 flex justify-start items-center gap-4">
            <button className="lg:hidden text-gray-800">
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                width={120}
                height={120}
                alt="ezmart logo"
                className="w-28 sm:w-36 h-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

          </div>


          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[15px] text-gray-800 tracking-tight">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-red-500 transition-colors">Shop All</Link>
            <Link href="/collections" className="hover:text-red-500 transition-colors">Collections</Link>
            <Link href="/track-order" className="hover:text-red-500 transition-colors">Track Order</Link>
            <Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
          </nav>

          {/* Right Side: Search and Actions */}
          <div className="flex-1 flex justify-end items-center gap-8">
            {/* Professional Search Bar */}
            <div
              className={`hidden md:flex flex-1 transition-all rounded-full border-2 items-center px-4 py-2 h-10 max-w-[150px] lg:max-w-[220px] border-gray-200 hover:border-gray-300`}
            >
              <Search className={`w-4 h-4 mr-3 transition-colors ${isSearchOpen ? "text-black" : "text-gray-400"}`} />
              {isSearchOpen ? (
                <div className="flex-1 flex items-center">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="I'm looking for..."
                  className="w-full bg-transparent border-none focus:outline-none text-[15px] font-medium placeholder:text-gray-400"
                />
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-black" />
                </button>
                </div>
              ) : (
                <span 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[15px] cursor-pointer font-medium text-gray-600 truncate flex-1"
                >
                  I&apos;m looking for...
                </span>
              )}
            </div>



            <div className="flex items-center gap-4 lg:gap-6 text-gray-700">

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden hover:text-red-500 transition-colors"
              >
                {isSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
              </button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none hover:text-red-500 transition-colors">
                  <User className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {user?.email ? (
                    <>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>My Shop</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 cursor-pointer"
                        onClick={handleLogOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link href="/login" className="w-full">Login</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* History / Recently Viewed */}
              <button className="hover:text-red-500 transition-colors hidden sm:block">
                <Clock className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative group hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative group hover:text-red-500 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {products?.length ?? 0}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </header>
  );



}
