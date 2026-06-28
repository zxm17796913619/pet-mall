"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const links = [
    { href: "/", label: "首页", icon: Home },
    { href: "/products", label: "商品", icon: Search },
    { href: "/cart", label: "购物车", icon: ShoppingCart, badge: itemCount },
    { href: "/mine", label: "我的", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#E8E3DC] safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative ${
                active ? "text-[#B8753E]" : "text-[#A09990]"
              }`}
            >
              <div className="relative">
                <link.icon size={20} strokeWidth={active ? 2 : 1.5} />
                {link.badge && link.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#B8753E] text-white text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center leading-none">
                    {link.badge > 99 ? "99+" : link.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
