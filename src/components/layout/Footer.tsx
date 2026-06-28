import Link from "next/link";
import { STORE } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white">
      <div className="container-page py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-[#A09990] text-lg font-bold mb-4 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              NONTA
            </h3>
            <p className="text-sm text-[#5C5752] leading-relaxed max-w-[280px] mb-6">
              宠物与人的温柔时光。为爱宠提供优质生活用品，让每一次陪伴都充满温暖。
            </p>
            <p className="text-[11px] text-[#5C5752] tracking-[0.15em] uppercase">
              Premium Pet Goods
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.15em] mb-6">导航</h4>
            <div className="flex flex-col gap-3">
              {[{ label: "全部商品", href: "/products" }, { label: "狗狗专区", href: "/products?pet=dog" }, { label: "猫咪专区", href: "/products?pet=cat" }, { label: "品牌故事", href: "/story" }].map((item) => (
                <Link key={item.href} href={item.href} className="text-[13px] text-[#5C5752] hover:text-white transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.15em] mb-6">帮助</h4>
            <div className="flex flex-col gap-3">
              {[{ label: "关于我们", href: "/about" }, { label: "常见问题", href: "/about" }, { label: "配送说明", href: "/about" }, { label: "联系我们", href: "/about" }].map((item) => (
                <Link key={item.href} href={item.href} className="text-[13px] text-[#5C5752] hover:text-white transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.15em] mb-6">联系</h4>
            <div className="flex flex-col gap-3 text-[13px] text-[#5C5752]">
              <div className="flex items-center gap-3"><Phone size={13} className="text-[#A09990]" />{STORE.phone}</div>
              <div className="flex items-center gap-3"><Mail size={13} className="text-[#A09990]" />{STORE.email}</div>
              <div className="flex items-center gap-3"><MapPin size={13} className="text-[#A09990]" />{STORE.address}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2D2926]">
        <div className="container-page py-5 text-center text-[11px] text-[#5C5752] tracking-wide">
          &copy; {new Date().getFullYear()} NONTA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
