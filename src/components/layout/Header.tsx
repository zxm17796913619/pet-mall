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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-stone-200">
        {/* Announcement bar */}
        <div className="bg-stone-100 text-stone-600 text-[12px] py-[6px] text-center overflow-hidden tracking-wide">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="whitespace-nowrap inline-block"
          >
            全场满 99 包邮 · 新用户注册享 9 折优惠 · 宠物用品一站式购齐
          </motion.div>
        </div>

        <div className="container-page">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <span
                className="text-brand text-[22px] sm:text-[26px] font-bold tracking-tight transition-opacity group-hover:opacity-80"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nonta
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[13px] text-stone-600 hover:text-stone-900 transition-colors rounded-md hover:bg-stone-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-ghost h-9 w-9 rounded-full"
                aria-label="搜索"
              >
                <Search size={18} />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="btn-ghost h-9 w-9 rounded-full relative"
                aria-label="购物车"
              >
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white text-[10px] font-medium min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href="/login"
                className="btn-ghost h-9 w-9 rounded-full"
                aria-label="账户"
              >
                <User size={18} />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden btn-ghost h-9 w-9 rounded-full"
                aria-label="菜单"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                className="overflow-hidden"
              >
                <div className="relative pb-5">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    placeholder="搜索商品…"
                    className="input-field pl-10"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          window.location.href = `/products?search=${encodeURIComponent(val)}`;
                        }
                      }
                    }}
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
              className="lg:hidden border-t border-stone-200 bg-white overflow-hidden"
            >
              <div className="container-page py-4 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-[15px] text-stone-700 hover:text-stone-900 border-b border-stone-100 last:border-0 transition-colors"
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

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
