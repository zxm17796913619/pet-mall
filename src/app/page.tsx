"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PET_CATEGORIES, TRUST_BADGES } from "@/lib/constants";
import { products } from "@/lib/mock-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { BlurImage } from "@/components/ui/BlurImage";
import { Magnetic } from "@/components/ui/Magnetic";

function CountUp({ target }: { target: number }) {
  const [c, set] = useState(0); const [s, st] = useState(false); const r = useRef<HTMLSpanElement>(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) st(true); }, { threshold: 0.6 }); if (r.current) o.observe(r.current); return () => o.disconnect(); }, []);
  useEffect(() => { if (!s) return; let v = 0; const inc = target / 100; const t = setInterval(() => { v += inc; if (v >= target) { set(target); clearInterval(t); } else set(Math.floor(v)); }, 16); return () => clearInterval(t); }, [s, target]);
  return <span ref={r}>{c}</span>;
}

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured);
  const newest = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <div>
      {/* ================================================================ */}
      {/* HERO — Rich layered visual design                                */}
      {/* ================================================================ */}
      <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#EDE6DC] via-[#F3EFEA] to-[#E8DFD3]">
        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#D4C4B0]/20 to-[#B8753E]/10 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-[#C4B49A]/20 to-[#A08060]/10 blur-3xl" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #1C1917 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />

        <motion.div className="container-page relative z-10 w-full" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                {/* Brand badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-[#E8E3DC] mb-8">
                  <img src="/nonta-icon.png" alt="Nonta" className="w-5 h-5 rounded-full" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E]">
                    Premium Pet Goods
                  </span>
                </div>
                <h1 className="text-[48px] sm:text-[76px] lg:text-[92px] font-bold leading-[0.9] tracking-[-0.03em] text-[#1C1917] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  与宠物一起<br />
                  <span className="text-[#B8753E]">自由与温暖</span>
                </h1>
                <p className="text-[15px] sm:text-[17px] text-[#5C5752] leading-relaxed mb-10 max-w-[480px]">
                  以水獭 Nonta 为灵感，将充满爱意的产品送到你手中。<br />
                  功能与美的融合，为爱宠带来最贴心的呵护。
                </p>
                <div className="flex flex-wrap gap-4">
                  <Magnetic>
                    <Link href="/products" className="btn-primary text-[14px] px-8 py-4">
                      探索产品 <ArrowRight size={15} />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link href="/story" className="btn-outline text-[14px] px-8 py-4">
                      品牌故事
                    </Link>
                  </Magnetic>
                </div>
              </motion.div>
            </div>

            {/* Right: Brand visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Large brand icon */}
                <div className="w-[280px] h-[280px] rounded-full bg-white shadow-2xl shadow-[#B8753E]/10 flex items-center justify-center border border-[#F0EBE3]">
                  <img src="/nonta-icon.png" alt="Nonta" className="w-[140px] h-[140px] rounded-full opacity-90" />
                </div>
                {/* Floating accent ring */}
                <div className="absolute -top-4 -right-4 w-[80px] h-[80px] rounded-full border-2 border-[#B8753E]/20" />
                <div className="absolute -bottom-6 -left-6 w-[60px] h-[60px] rounded-full bg-[#B8753E]/10" />
                {/* Small decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-[20px] right-[-30px] w-[12px] h-[12px] rounded-full bg-[#B8753E]/30"
                />
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-[40px] left-[-20px] w-[8px] h-[8px] rounded-full bg-[#B8753E]/40"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORIES — Oversized cards with hover reveal                  */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-page">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-16 md:mb-20">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-3 block">Categories</span>
            <h2 className="text-[28px] sm:text-[40px] font-bold text-[#1C1917] tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)" }}>
              为爱宠选购
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {PET_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/products?pet=${cat.key}`}
                  className="group flex flex-col items-center gap-5 p-8 md:p-10 bg-[#F3EFEA] hover:bg-[#B8753E] transition-colors duration-300 rounded-lg text-center h-full"
                >
                  <cat.icon size={36} className="text-[#5C5752] group-hover:text-white transition-colors duration-300" />
                  <span className="text-[13px] font-medium text-[#1C1917] group-hover:text-white transition-colors duration-300 tracking-wide">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED — Magazine grid with hero product                     */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-[#FAF7F4]">
        <div className="container-page">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-3 block">Featured</span>
              <h2 className="text-[28px] sm:text-[40px] font-bold text-[#1C1917] tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)" }}>
                热卖推荐
              </h2>
            </motion.div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-[13px] font-medium text-[#5C5752] hover:text-[#1C1917] transition-colors uppercase tracking-wide">
              查看全部 <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* STATS — Dark bar with count-up numbers                         */}
      {/* ================================================================ */}
      <section className="bg-[#1C1917] py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[{ t: 1280, l: "满意顾客", s: "+" }, { t: 368, l: "精选商品", s: "+" }, { t: 99, l: "好评率", s: "%" }, { t: 24, l: "小时发货", s: "h" }].map((item, i) => (
              <motion.div key={item.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="text-[40px] md:text-[56px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  <CountUp target={item.t} />{item.s}
                </div>
                <div className="text-[11px] text-[#A09990] mt-2 uppercase tracking-[0.15em]">{item.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BRAND STORY — Split layout                                     */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-4 block">Brand Story</span>
              <h2 className="text-[28px] sm:text-[40px] font-bold text-[#1C1917] mb-8 tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)" }}>
                品牌故事
              </h2>
              <div className="space-y-5 text-[15px] text-[#5C5752] leading-relaxed">
                <p>Nonta 源自对宠物的深深热爱。品牌以一只名叫 Nonta 的水獭为灵感——聪慧、灵动、充满好奇心，正如我们身边的每一只毛孩子。</p>
                <p>我们相信，宠物不仅是生活伙伴，更是家庭中不可或缺的成员。每一件 Nonta 产品，都承载着我们对品质的坚持与对宠物的深情。</p>
                <p>宠物是家人。Nonta，与你一起守护这份温暖。</p>
              </div>
              <Link href="/story" className="inline-flex items-center gap-2 mt-8 text-[13px] font-semibold text-[#B8753E] hover:text-[#9C6030] uppercase tracking-[0.1em] transition-colors">
                了解更多 <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <BlurImage src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=85" alt="Nonta 品牌" className="w-full h-full object-cover" aspectRatio="aspect-[4/5]" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-sm border border-[#F0EBE3] hidden md:block">
                <p className="text-[11px] font-semibold text-[#B8753E] uppercase tracking-[0.2em]">Since</p>
                <p className="text-[32px] font-bold text-[#1C1917] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>2020</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NEW ARRIVALS                                                   */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-[#FAF7F4]">
        <div className="container-page">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8753E] mb-3 block">New Arrivals</span>
              <h2 className="text-[28px] sm:text-[40px] font-bold text-[#1C1917] tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)" }}>
                最新上架
              </h2>
            </motion.div>
            <Link href="/products?sort=newest" className="hidden sm:flex items-center gap-2 text-[13px] font-medium text-[#5C5752] hover:text-[#1C1917] transition-colors uppercase tracking-wide">
              查看全部 <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {newest.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TRUST BADGES                                                   */}
      {/* ================================================================ */}
      <section className="py-20 md:py-24 bg-white border-t border-[#E8E3DC]">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_BADGES.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex flex-col items-center text-center gap-3 py-6">
                <item.icon size={28} className="text-[#B8753E]" />
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1C1917] mb-1">{item.title}</h4>
                  <p className="text-[12px] text-[#A09990]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
