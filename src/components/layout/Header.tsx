"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, STORE } from "@/lib/constants";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E5E5]">
      {/* Top bar */}
      <div className="hidden sm:block bg-[#F8F5F0] text-[#8C7355] text-[13px] py-[4px] px-[20px] text-center">
        宠物与人的温暖时光 — {STORE.slogan}
      </div>

      {/* Main header */}
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
        <div className="flex items-center justify-between h-[56px] sm:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px]">
            <span
              className="text-[#B39B7E] text-[26px] sm:text-[32px] font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nonta
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-[30px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] text-[#333] hover:text-[#B39B7E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-[16px]">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-[#FF3F54] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              href="/login"
              className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors"
            >
              <User size={20} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-[8px] text-[#333]"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="pb-[16px]">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索商品..."
                className="w-full px-[16px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/products?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
                  }
                }}
              />
              <Search
                size={16}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#999]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E5] bg-white">
          <div className="px-[20px] py-[12px] flex flex-col gap-[4px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-[12px] text-[16px] text-[#333] hover:text-[#B39B7E] border-b border-[#F5F5F5] last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
