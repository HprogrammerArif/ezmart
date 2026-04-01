"use client";
import React from "react";
import { Heart, LogOut, User, Clock, ShoppingBag, Search, Menu } from "lucide-react";
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

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-white w-full sticky top-0 z-50">
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
                width={140}
                height={140}
                alt="ezmart logo"
                className="object-contain transition-transform hover:scale-105"
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
          <div className="flex-1 flex justify-end items-center gap-5">
            {/* Compact Search Bar */}
            <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-gray-200 transition-all w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="I'm looking for..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>


            <div className="flex items-center gap-4 text-gray-700">
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
                <Clock className="w-6 h-6" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative group hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative group hover:text-red-500 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {products?.length ?? 0}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );

}
