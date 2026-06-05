"use client";
import React from "react";
import { Heart, LogOut, User, Clock, ShoppingBag, Search, Menu, X, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/libs/I18nNavigation";
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
import { protectedRoutes } from "@/contants";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import Image from "next/image";
import logo from "@/assets/ezmartlogo.png"
import Container from "./Container";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const t = useTranslations('Navigation');
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

  const changeLanguage = (locale: 'en' | 'bn') => {
    router.replace(pathname, { locale });
  };

  return (
    <>
      {/* Top Announcement Bar - Footy Style Hub */}
      <div className="bg-[#111111] text-white text-xs font-medium py-2 px-4 flex justify-between items-center w-full">
        <div className="flex-1"></div>
        <div className="flex-1 text-center tracking-widest uppercase">
          SHOP FOR THE WORLD CUP!
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
           <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-300 outline-none cursor-pointer">
              <Globe className="w-4 h-4" /> Language
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('bn')}>Bengali (বাংলা)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <header className="border-b bg-white w-full sticky top-0 z-[110] transition-all">
        <Container>
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 relative">
            {/* Left Side: Logo & Mobile Menu */}
            <div className="flex-1 flex justify-start items-center gap-4">
              <button className="lg:hidden text-gray-800">
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex items-center">
                <span className="font-black text-2xl tracking-tighter">FOOTY STYLE HUB.</span>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-semibold text-[14px] text-[#111111] uppercase tracking-wide">
              <Link href="/" className="hover:text-accent transition-colors">{t('home')}</Link>
              <Link href="/shop" className="hover:text-accent transition-colors">{t('shopAll')}</Link>
              <Link href="/collections" className="hover:text-accent transition-colors">{t('collections')}</Link>
              <Link href="/track-order" className="hover:text-accent transition-colors">{t('trackOrder')}</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">{t('contact')}</Link>
            </nav>

            {/* Right Side: Search and Actions */}
            <div className="flex-1 flex justify-end items-center gap-6">
              {/* Professional Search Bar */}
              <div
                className={`hidden md:flex flex-1 transition-all rounded-full border items-center px-4 py-2 h-10 max-w-[150px] lg:max-w-[220px] border-gray-200 hover:border-gray-300`}
              >
                <Search className={`w-4 h-4 mr-3 transition-colors ${isSearchOpen ? "text-black" : "text-gray-400"}`} />
                {isSearchOpen ? (
                  <div className="flex-1 flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full bg-transparent border-none focus:outline-none text-[13px] font-medium placeholder:text-gray-400"
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}>
                    <X className="w-4 h-4 text-gray-400 hover:text-black" />
                  </button>
                  </div>
                ) : (
                  <span 
                    onClick={() => setIsSearchOpen(true)}
                    className="text-[13px] cursor-pointer font-medium text-gray-400 truncate flex-1"
                  >
                    {t('searchPlaceholder')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 lg:gap-5 text-[#111111]">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="md:hidden hover:text-accent transition-colors"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>

                {user?.email ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none hover:text-accent transition-colors cursor-pointer z-30">
                     <Avatar className="w-7 h-7">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                     </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>My Shop</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-accent cursor-pointer"
                        onClick={handleLogOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" className="hover:text-accent transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                )}

                <button className="hover:text-accent transition-colors hidden sm:block">
                  <Clock className="w-5 h-5" />
                </button>

                <Link href="/wishlist" className="relative group hover:text-accent transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </Link>

                <Link href="/cart" className="relative group hover:text-accent transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
    </>
  );
}
