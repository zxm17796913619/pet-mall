"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PET_CATEGORIES, TRUST_BADGES } from "@/lib/constants";
import { products } from "@/lib/mock-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { BlurImage } from "@/components/ui/BlurImage";

function CountUp({ target }: { target: number }) {
  const [c, set] = useState(0); const [s, st] = useState(false); const r = useRef<HTMLSpanElement>(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) st(true); }, { threshold: 0.6 }); if (r.current) o.observe(r.current); return () => o.disconnect(); }, []);
  useEffect(() => { if (!s) return; let v = 0; const inc = target / 100; const t = setInterval(() => { v += inc; if (v >= target) { set(target); clearInterval(t); } else set(Math.floor(v)); }, 16); return () => clearInterval(t); }, [s, target]);
  return <span ref={r}>{c}</span>;
}

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured);
  const newest = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  return (
    <div>
      {/* ================================================================ */}
      {/* HERO — Mobile: compact | Desktop: full screen                   */}
      {/* ================================================================ */}
      <section className="relative flex items-center min-h-[70vh] sm:min-h-[85vh] lg:h-screen overflow-hidden bg-gradient-to-br from-[#EDE6DC] via-[#F3EFEA] to-[#E8DFD3]">
        <div className="absolute top-[-30%] right-[-20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#D4C4B0]/20 to-[#B8753E]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-[#C4B49A]/15 to-[#A08060]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1C1917 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />

        <div className="container-page relative z-10 w-full py-16 sm:py-24 lg:py-32">
          <div className="max-w-[520px] mx-auto lg:mx-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur rounded-full border border-[#E8E3DC] mb-6">
                <img src="/nonta-icon.png" alt="Nonta" className="w-4 h-4 rounded-full" />
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E]">Premium Pet Goods</span>
              </div>

              <h1 className="text-[36px] sm:text-[56px] lg:text-[80px] font-bold leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] text-[#1C1917] mb-5 sm:mb-8" style={{ fontFamily: "var(--font-display)" }}>
                与宠物一起<br />
                <span className="text-[#B8753E]">自由与温暖</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5C5752] leading-relaxed mb-8 sm:mb-10 max-w-[400px]">
                以水獭 Nonta 为灵感，将充满爱意的产品送到你手中。功能与美的融合，为爱宠带来最贴心的呵护。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/products" className="btn-primary text-[13px] sm:text-sm px-6 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                  探索产品 <ArrowRight size={15} />
                </Link>
                <Link href="/story" className="btn-outline text-[13px] sm:text-sm px-6 py-3.5 sm:py-4 w-full sm:w-auto justify-center">
                  品牌故事
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORIES — 2 col mobile, 5 col desktop                       */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container-page">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 sm:mb-14">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-2 block">Categories</span>
            <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#1C1917]" style={{ fontFamily: "var(--font-display)" }}>为爱宠选购</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4">
            {PET_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}>
                <Link href={`/products?pet=${cat.key}`} className="group flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 lg:p-10 bg-[#F3EFEA] hover:bg-[#B8753E] transition-colors duration-300 rounded-lg text-center h-full">
                  <cat.icon size={28} className="text-[#5C5752] group-hover:text-white transition-colors duration-300" />
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#1C1917] group-hover:text-white transition-colors duration-300">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED — 2 col mobile, 4 col desktop                         */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-2 block">Featured</span>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#1C1917]" style={{ fontFamily: "var(--font-display)" }}>热卖推荐</h2>
            </motion.div>
            <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-[#5C5752] hover:text-[#1C1917] uppercase tracking-wide">全部 <ArrowUpRight size={13} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="btn-outline text-[12px] px-5 py-2.5 w-full justify-center">查看全部商品</Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS — 2 col mobile                                           */}
      {/* ================================================================ */}
      <section className="bg-[#1C1917] py-14 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 text-center">
            {[{ t: 1280, l: "满意顾客", s: "+" }, { t: 368, l: "精选商品", s: "+" }, { t: 99, l: "好评率", s: "%" }, { t: 24, l: "小时发货", s: "h" }].map((item, i) => (
              <motion.div key={item.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="text-[32px] sm:text-[44px] lg:text-[56px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}><CountUp target={item.t} />{item.s}</div>
                <div className="text-[10px] sm:text-[11px] text-[#A09990] mt-1.5 uppercase tracking-[0.15em]">{item.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BRAND STORY — Stacked mobile, split desktop                    */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-3 block">Brand Story</span>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#1C1917] mb-6" style={{ fontFamily: "var(--font-display)" }}>品牌故事</h2>
              <div className="space-y-4 text-[14px] sm:text-[15px] text-[#5C5752] leading-relaxed">
                <p>Nonta 源自对宠物的深深热爱。品牌以水獭 Nonta 为灵感——聪慧、灵动、充满好奇心，正如我们身边的每一只毛孩子。</p>
                <p>我们相信，宠物不仅是生活伙伴，更是家庭中不可或缺的成员。每一件产品，都承载着我们对品质的坚持与对宠物的深情。</p>
              </div>
              <Link href="/story" className="inline-flex items-center gap-1.5 mt-6 text-[12px] sm:text-[13px] font-semibold text-[#B8753E] hover:text-[#9C6030] uppercase tracking-[0.1em] transition-colors">了解更多 <ArrowRight size={13} /></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="aspect-[4/5] sm:aspect-[4/5] rounded-lg overflow-hidden">
                <BlurImage src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=85" alt="Nonta 品牌" className="w-full h-full object-cover" aspectRatio="aspect-[4/5]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NEW ARRIVALS — 2 col mobile                                    */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-2 block">New Arrivals</span>
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#1C1917]" style={{ fontFamily: "var(--font-display)" }}>最新上架</h2>
            </motion.div>
            <Link href="/products?sort=newest" className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-[#5C5752] hover:text-[#1C1917] uppercase tracking-wide">全部 <ArrowUpRight size={13} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {newest.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TRUST — 2 col mobile                                           */}
      {/* ================================================================ */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E8E3DC]">
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_BADGES.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center text-center gap-2 sm:gap-3 py-4 sm:py-6">
                <item.icon size={24} className="text-[#B8753E]" />
                <div>
                  <h4 className="text-[13px] sm:text-sm font-semibold text-[#1C1917] mb-0.5">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-[#A09990]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
