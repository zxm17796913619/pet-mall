import Link from "next/link";
import { STORE } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3
              className="text-stone-300 text-xl font-bold mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nonta
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed max-w-[240px]">
              为爱宠提供优质生活用品
              <br />
              让每一次陪伴都充满温暖
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-5">快速链接</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "全部商品", href: "/products" },
                { label: "狗狗专区", href: "/products?pet=dog" },
                { label: "猫咪专区", href: "/products?pet=cat" },
                { label: "品牌故事", href: "/story" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-5">帮助中心</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "关于我们", href: "/about" },
                { label: "常见问题", href: "/about" },
                { label: "配送说明", href: "/about" },
                { label: "联系我们", href: "/about" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-5">联系方式</h4>
            <div className="flex flex-col gap-3 text-sm text-stone-400">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-stone-500 shrink-0" />
                <span>{STORE.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-stone-500 shrink-0" />
                <span>{STORE.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-stone-500 shrink-0" />
                <span>{STORE.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="container-page py-5 text-center text-xs text-stone-600">
          &copy; {new Date().getFullYear()} Nonta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
