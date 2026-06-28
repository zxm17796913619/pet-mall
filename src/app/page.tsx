"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PET_CATEGORIES, TRUST_BADGES } from "@/lib/constants";
import { products, banners } from "@/lib/mock-data";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let v = 0;
    const inc = target / 100;
    const t = setInterval(() => {
      v += inc;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [started, target]);

  return <span ref={ref}>{count}</span>;
}

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featured = products.filter((p) => p.isFeatured);

  useEffect(() => {
    const t = setInterval(() => setCurrentBanner((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* ================================================================ */}
      {/* HERO BANNER                                                    */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={banners[currentBanner].bgClass}
          >
            <div className="container-page py-20 sm:py-28 lg:py-40 text-center">
              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-[34px] sm:text-[52px] lg:text-[64px] font-bold mb-6 tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className={banners[currentBanner].textColor}>
                  {banners[currentBanner].title}
                </span>
              </motion.h1>
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm sm:text-base lg:text-lg text-stone-500 mb-10 sm:mb-12 leading-relaxed whitespace-pre-line max-w-lg mx-auto"
              >
                {banners[currentBanner].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <Link href="/products" className="btn-primary px-8 py-3 text-[15px] group">
                  立即选购
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2.5 pb-8 -mt-8">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentBanner ? "bg-brand w-8" : "bg-stone-300 w-2 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORY ENTRY                                                  */}
      {/* ================================================================ */}
      <section className="section-padding">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="badge bg-stone-100 text-stone-500 mb-3">Categories</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              为爱宠选购
            </h2>
            <p className="text-sm text-stone-500">选择你的宠物类型，发现专属好物</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {PET_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/products?pet=${cat.key}`}
                  className={`flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl transition-shadow hover:shadow-md ${cat.bgClass}`}
                >
                  <cat.icon size={32} className="text-stone-600" />
                  <span className="text-[13px] sm:text-sm font-medium text-stone-700">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED PRODUCTS                                               */}
      {/* ================================================================ */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="badge bg-stone-100 text-stone-500 mb-3">Hot Sale</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              热卖推荐
            </h2>
            <p className="text-sm text-stone-500">精选好物，为爱宠带来最好的呵护</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link href="/products" className="btn-outline group text-[14px] px-7 py-2.5">
              查看全部商品
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS BAR                                                       */}
      {/* ================================================================ */}
      <section className="bg-stone-900 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { t: 1280, l: "满意顾客", s: "+" },
              { t: 368, l: "精选商品", s: "+" },
              { t: 99, l: "好评率", s: "%" },
              { t: 24, l: "小时发货", s: "h" },
            ].map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  <CountUp target={item.t} />{item.s}
                </span>
                <span className="text-xs sm:text-sm text-stone-400 tracking-wide">{item.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BRAND STORY                                                     */}
      {/* ================================================================ */}
      <section className="section-padding bg-stone-100">
        <div className="container-page max-w-[720px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge bg-white text-stone-500 mb-4">Brand Story</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-8" style={{ fontFamily: "var(--font-display)" }}>
              品牌故事
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-5 text-[15px] sm:text-base text-stone-600 leading-relaxed"
          >
            <p>
              Nonta 源自对宠物的深深热爱。我们相信，宠物不仅是生活中的伙伴，更是家庭中不可或缺的成员。
            </p>
            <p>
              我们以水獭 Nonta 为灵感，致力于为每个养宠家庭提供兼具功能与美的产品。
              每一件 Nonta 出品，都经过严格甄选，只为给爱宠最贴心的守护。
            </p>
            <p>
              宠物是家人。Nonta，与你一起守护这份温暖。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-brand text-sm font-medium decorative-dot hover:opacity-80 transition-opacity"
            >
              了解更多
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TRUST BADGES                                                    */}
      {/* ================================================================ */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {TRUST_BADGES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 py-8 px-4 rounded-2xl hover:bg-stone-50 transition-colors cursor-default"
              >
                <item.icon size={28} className="text-stone-400" />
                <h4 className="text-[15px] font-medium text-stone-700">{item.title}</h4>
                <p className="text-xs text-stone-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
