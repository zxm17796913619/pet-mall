"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PET_CATEGORIES } from "@/lib/constants";
import { products, banners } from "@/lib/mock-data";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.filter((p) => p.isFeatured);

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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={banners[currentBanner].bgClass}
          >
            <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[80px] sm:py-[110px] lg:py-[160px] text-center">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[48px] lg:text-[62px] font-bold mb-[20px] tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className={banners[currentBanner].textColor}>
                  {banners[currentBanner].title}
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#666] mb-[30px] sm:mb-[40px] leading-[28px] sm:leading-[35px] whitespace-pre-line"
              >
                {banners[currentBanner].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  href="/products"
                  className="inline-flex btn-brand px-[40px] py-[12px] sm:py-[14px] text-[16px] gap-[8px] group"
                >
                  立即选购
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Banner dots */}
        <div className="flex justify-center gap-[10px] mt-[-30px] pb-[30px]">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                i === currentBanner ? "bg-[#B39B7E] w-[28px]" : "bg-[#DDD] w-[8px] hover:bg-[#BBB]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ========== 宠物分类入口 ========== */}
      <section className="pb-[40px] sm:pb-[80px]">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-[30px] sm:mb-[48px]"
          >
            <h2
              className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[10px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              为爱宠选购
            </h2>
            <p className="text-[14px] text-[#999]">
              选择你的宠物类型，发现专属好物
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[12px] sm:gap-[20px]">
            {PET_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <Link
                  href={`/products?pet=${cat.key}`}
                  className="flex flex-col items-center gap-[12px] p-[24px] sm:p-[30px] rounded-[20px] transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: cat.color }}
                >
                  <motion.span
                    className="text-[40px] sm:text-[50px]"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {cat.icon}
                  </motion.span>
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#333]">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 热卖商品 ========== */}
      <section className="pb-[40px] sm:pb-[80px] bg-white">
        <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-[30px] sm:mb-[48px] pt-[40px] sm:pt-[80px]"
          >
            <span className="text-[#B39B7E] text-[13px] font-medium tracking-widest uppercase mb-[8px] block">
              Hot Sale
            </span>
            <h2
              className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[10px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              热卖推荐
            </h2>
            <p className="text-[14px] text-[#999]">
              精选好物，为爱宠带来最好的呵护
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px] sm:gap-[20px]">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-[40px] sm:mt-[60px]"
          >
            <Link
              href="/products"
              className="btn-brand-outline group text-[15px] px-[30px] py-[12px] gap-[6px]"
            >
              查看全部商品
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== 数据展示条 ========== */}
      <section className="bg-[#B39B7E] py-[40px] sm:py-[50px]">
        <div className="max-w-[1000px] mx-auto px-[20px] sm:px-[40px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[20px] text-center text-white">
            {[
              { target: 1280, label: "满意顾客", suffix: "+" },
              { target: 368, label: "精选商品", suffix: "+" },
              { target: 98, label: "好评率%", suffix: "%" },
              { target: 24, label: "小时发货", suffix: "h" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="flex flex-col items-center gap-[6px]"
              >
                <span
                  className="text-[28px] sm:text-[36px] font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <CountUp target={item.target} duration={2.5} />
                  {item.suffix}
                </span>
                <span className="text-[13px] sm:text-[14px] text-white/80">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 品牌故事 ========== */}
      <section className="bg-[#F8F5F0] py-[60px] sm:py-[100px] overflow-hidden">
        <div className="max-w-[760px] mx-auto px-[20px] sm:px-[40px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#B39B7E] text-[13px] tracking-widest uppercase mb-[12px] block">
              Brand Story
            </span>
            <h2
              className="text-[22px] sm:text-[32px] font-bold text-[#8C7355] mb-[24px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              品牌故事
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-[14px] sm:text-[16px] text-[#666] leading-[30px] sm:leading-[38px] mb-[16px]">
              Nonta 源自对宠物的深深热爱。我们相信，宠物不仅是我们生活中的伙伴，更是家庭中的重要成员。
            </p>
            <p className="text-[14px] sm:text-[16px] text-[#666] leading-[30px] sm:leading-[38px] mb-[16px]">
              我们以水獭 Nonta 为灵感，致力于为每个养宠家庭提供兼具功能性与优雅设计的产品。
              每一件商品都经过严格筛选，确保为你的爱宠带来最贴心的呵护。
            </p>
            <p className="text-[14px] sm:text-[16px] text-[#666] leading-[30px] sm:leading-[38px] mb-[30px]">
              宠物是家人，是无可替代的伙伴。Nonta，与你一起守护这段温暖的陪伴。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/story"
              className="inline-flex items-center gap-[8px] text-[#B39B7E] text-[14px] sm:text-[16px] font-medium hover:underline decorative-dot"
            >
              了解更多品牌故事
            </Link>
          </motion.div>
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
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center gap-[8px] py-[24px] px-[16px] rounded-[16px] hover:bg-[#FEFAF5] transition-colors cursor-default"
              >
                <span className="text-[36px]">{item.icon}</span>
                <h4 className="text-[16px] font-medium text-[#333]">{item.title}</h4>
                <p className="text-[12px] text-[#999]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
