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
      <header className="sticky top-0 z-50 bg-[#FAF7F4]/90 backdrop-blur-md">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="shrink-0">
              <span
                className="text-[#1C1917] text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-display)" }}
              >
                NONTA
              </span>
            </Link>

            {/* Center: Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[#5C5752] hover:text-[#1C1917] transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#5C5752] hover:text-[#1C1917] transition-colors" aria-label="搜索">
                <Search size={18} />
              </button>
              <button onClick={() => setCartOpen(true)} className="p-2 text-[#5C5752] hover:text-[#1C1917] transition-colors relative" aria-label="购物车">
                <ShoppingCart size={18} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-[#B8753E] text-white text-[10px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link href="/login" className="p-2 text-[#5C5752] hover:text-[#1C1917] transition-colors" aria-label="账户">
                <User size={18} />
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#5C5752]" aria-label="菜单">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="relative pb-6">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09990]" />
                  <input
                    type="text" placeholder="搜索商品…" className="input-field pl-9" autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter") { const v = (e.target as HTMLInputElement).value.trim(); if (v) window.location.href = `/products?search=${encodeURIComponent(v)}`; } }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-[#E8E3DC] overflow-hidden">
              <div className="container-page py-6 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-[15px] text-[#5C5752] hover:text-[#1C1917] border-b border-[#F0EBE3] last:border-0">
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
