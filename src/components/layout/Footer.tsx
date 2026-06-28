import Link from "next/link";
import { STORE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#333] text-white">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[40px] sm:py-[60px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[30px]">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <h3
              className="text-[#B39B7E] text-[22px] font-bold mb-[16px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nonta
            </h3>
            <p className="text-[14px] text-[#999] leading-[24px]">
              宠物与人的温暖时光
              <br />
              为你的爱宠提供优质生活
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[16px]">快速链接</h4>
            <div className="flex flex-col gap-[10px]">
              <Link href="/products" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                全部商品
              </Link>
              <Link href="/products?pet=dog" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                狗狗专区
              </Link>
              <Link href="/products?pet=cat" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                猫咪专区
              </Link>
              <Link href="/story" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                品牌故事
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[16px]">帮助中心</h4>
            <div className="flex flex-col gap-[10px]">
              <Link href="/about" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                关于我们
              </Link>
              <Link href="/about" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                常见问题
              </Link>
              <Link href="/about" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                联系我们
              </Link>
              <Link href="/about" className="text-[14px] text-[#999] hover:text-[#B39B7E] transition-colors">
                配送说明
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[16px]">联系方式</h4>
            <div className="flex flex-col gap-[10px] text-[14px] text-[#999]">
              <p>电话：{STORE.phone}</p>
              <p>邮箱：{STORE.email}</p>
              <p>地址：{STORE.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#444]">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[20px] text-center text-[12px] text-[#666]">
          © {new Date().getFullYear()} Nonta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
