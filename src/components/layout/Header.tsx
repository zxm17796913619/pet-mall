"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E5E5]">
        {/* Top bar */}
        <div className="hidden sm:block bg-[#F8F5F0] text-[#8C7355] text-[13px] py-[4px] px-[20px] text-center overflow-hidden">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap inline-block"
          >
            全场满99元包邮 · 新用户注册享9折优惠 · 宠物用品一站式购齐
          </motion.div>
        </div>

        {/* Main header */}
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <div className="flex items-center justify-between h-[56px] sm:h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-[10px] group">
              <span
                className="text-[#B39B7E] text-[26px] sm:text-[32px] font-bold transition-transform duration-300 group-hover:scale-105"
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
                  className="text-[14px] text-[#333] hover:text-[#B39B7E] transition-colors relative group py-[4px]"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B39B7E] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-[12px]">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors rounded-full hover:bg-[#F8F5F0]"
              >
                <Search size={20} />
              </button>

              {/* Cart button → opens drawer */}
              <button
                onClick={() => setCartOpen(true)}
                className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors rounded-full hover:bg-[#F8F5F0] relative"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0 -right-0 bg-[#FF3F54] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </button>

              {/* User */}
              <Link
                href="/login"
                className="p-[8px] text-[#333] hover:text-[#B39B7E] transition-colors rounded-full hover:bg-[#F8F5F0]"
              >
                <User size={20} />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-[8px] text-[#333] rounded-full hover:bg-[#F8F5F0]"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-[16px]"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索你想要的宠物用品..."
                    className="w-full px-[16px] py-[10px] pl-[40px] text-[14px] border border-[#E5E5E5] rounded-[8px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E] focus:ring-2 focus:ring-[#B39B7E]/20 transition-all"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = (e.target as HTMLInputElement).value;
                        if (val.trim()) {
                          window.location.href = `/products?search=${encodeURIComponent(val.trim())}`;
                        }
                      }
                    }}
                  />
                  <Search
                    size={16}
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#999]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-[#E5E5E5] bg-white overflow-hidden"
            >
              <div className="px-[20px] py-[12px] flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-[14px] text-[16px] text-[#333] hover:text-[#B39B7E] border-b border-[#F5F5F5] last:border-0 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
