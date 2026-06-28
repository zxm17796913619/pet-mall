"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PET_CATEGORIES } from "@/lib/constants";
import { products, banners } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const featuredProducts = products.filter((p) => p.isFeatured);

  // Auto rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ========== Banner ========== */}
      <section className="relative overflow-hidden">
        <div
          className={`transition-all duration-700 ${banners[currentBanner].bgClass}`}
        >
          <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[60px] sm:py-[90px] lg:py-[143px] text-center">
            <h1
              className="text-[30px] sm:text-[46px] lg:text-[56px] font-bold mb-[20px] tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className={banners[currentBanner].textColor}>
                {banners[currentBanner].title}
              </span>
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#666] mb-[30px] sm:mb-[40px] leading-[28px] sm:leading-[35px] whitespace-pre-line">
              {banners[currentBanner].subtitle}
            </p>
            <Link
              href="/products"
              className="inline-flex btn-brand px-[40px] py-[12px] text-[16px]"
            >
              立即选购
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        {/* Banner dots */}
        <div className="flex justify-center gap-[10px] mt-[-30px] pb-[30px]">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-[8px] h-[8px] rounded-full transition-all ${
                i === currentBanner ? "bg-[#B39B7E] w-[24px]" : "bg-[#DDD]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ========== 宠物分类入口 ========== */}
      <section className="pb-[40px] sm:pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <div className="text-center mb-[30px] sm:mb-[48px]">
            <h2
              className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[10px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              为爱宠选购
            </h2>
            <p className="text-[14px] text-[#999]">选择你的宠物类型，发现专属好物</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[12px] sm:gap-[20px]">
            {PET_CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/products?pet=${cat.key}`}
                className="flex flex-col items-center gap-[12px] p-[20px] sm:p-[30px] rounded-[20px] hover:shadow-md transition-all hover:-translate-y-1"
                style={{ backgroundColor: cat.color }}
              >
                <span className="text-[36px] sm:text-[46px]">{cat.icon}</span>
                <span className="text-[14px] sm:text-[16px] font-medium text-[#333]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 热卖商品 ========== */}
      <section className="pb-[40px] sm:pb-[60px] bg-white">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <div className="text-center mb-[30px] sm:mb-[48px] pt-[40px] sm:pt-[60px]">
            <h2
              className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[10px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              热卖推荐
            </h2>
            <p className="text-[14px] text-[#999]">精选好物，为爱宠带来最好的呵护</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px] sm:gap-[20px]">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-[30px] sm:mt-[48px]">
            <Link href="/products" className="btn-brand-outline">
              查看全部商品
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 品牌故事 ========== */}
      <section className="bg-[#F8F5F0] py-[60px] sm:py-[80px]">
        <div className="max-w-[760px] mx-auto px-[20px] sm:px-[40px] text-center">
          <h2
            className="text-[20px] sm:text-[28px] font-bold text-[#8C7355] mb-[20px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            品牌故事
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#666] leading-[28px] sm:leading-[35px] mb-[16px]">
            Nonta 源自对宠物的深深热爱。我们相信，宠物不仅是我们生活中的伙伴，更是家庭中的重要成员。
          </p>
          <p className="text-[14px] sm:text-[16px] text-[#666] leading-[28px] sm:leading-[35px] mb-[16px]">
            我们以水獭 Nonta 为灵感，致力于为每个养宠家庭提供兼具功能性与优雅设计的产品。
            每一件商品都经过严格筛选，确保为你的爱宠带来最贴心的呵护。
          </p>
          <p className="text-[14px] sm:text-[16px] text-[#666] leading-[28px] sm:leading-[35px] mb-[30px]">
            宠物是家人，是无可替代的伙伴。Nonta，与你一起守护这段温暖的陪伴。
          </p>
          <Link
            href="/story"
            className="inline-flex items-center gap-[8px] text-[#B39B7E] text-[14px] sm:text-[16px] font-medium hover:underline decorative-dot"
          >
            了解更多品牌故事
          </Link>
        </div>
      </section>

      {/* ========== 信任保证 ========== */}
      <section className="bg-white py-[40px] sm:py-[60px]">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[20px] text-center">
            {[
              { icon: "🚚", title: "满99包邮", desc: "全国快速配送" },
              { icon: "🔄", title: "7天退换", desc: "无忧退换货" },
              { icon: "🎖️", title: "正品保证", desc: "品质严选" },
              { icon: "💬", title: "在线客服", desc: "工作日9:00-18:00" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-[8px] py-[20px]">
                <span className="text-[32px]">{item.icon}</span>
                <h4 className="text-[16px] font-medium text-[#333]">{item.title}</h4>
                <p className="text-[12px] text-[#999]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
