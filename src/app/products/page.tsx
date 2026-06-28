"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PET_CATEGORIES } from "@/lib/constants";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchTerm) { const t = searchTerm.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(t) || p.shortDesc.toLowerCase().includes(t)); }
    if (selectedPet) result = result.filter(p => p.petType === selectedPet);
    if (selectedCategory) result = result.filter(p => p.categoryId === selectedCategory);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [searchTerm, selectedPet, selectedCategory, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.15em] mb-3">宠物类型</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedPet("")} className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors ${selectedPet === "" ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white text-[#5C5752] border-[#E8E3DC] hover:border-[#B8753E]"}`}>全部</button>
          {PET_CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setSelectedPet(cat.key)} className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors ${selectedPet === cat.key ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white text-[#5C5752] border-[#E8E3DC] hover:border-[#B8753E]"}`}>{cat.name}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.15em] mb-3">商品分类</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedCategory("")} className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors ${selectedCategory === "" ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white text-[#5C5752] border-[#E8E3DC] hover:border-[#B8753E]"}`}>全部</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors ${selectedCategory === cat.id ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white text-[#5C5752] border-[#E8E3DC] hover:border-[#B8753E]"}`}>{cat.name}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-page py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[22px] sm:text-3xl font-bold text-[#1C1917] mb-4" style={{ fontFamily: "var(--font-display)" }}>全部商品</h1>
        {/* Search + Sort row */}
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09990]" />
            <input type="text" placeholder="搜索商品…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-9 text-[13px] sm:text-sm" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 text-[12px] sm:text-[13px] border border-[#E8E3DC] rounded-md bg-white text-[#5C5752] outline-none cursor-pointer appearance-none pr-7">
            <option value="default">默认</option>
            <option value="price-asc">价格↑</option>
            <option value="price-desc">价格↓</option>
            <option value="newest">最新</option>
          </select>
          <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-[12px] border border-[#E8E3DC] rounded-md bg-white text-[#5C5752]">
            <SlidersHorizontal size={14} /> 筛选
          </button>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[180px] shrink-0">
          <div className="sticky top-20">
            <FilterContent />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] sm:text-xs text-[#A09990] mb-3 sm:mb-4">{filtered.length} 件商品</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-[#A09990] mb-3">没有找到匹配的商品</p>
              <button onClick={() => { setSearchTerm(""); setSelectedPet(""); setSelectedCategory(""); }} className="text-[12px] text-[#B8753E] hover:underline">清除筛选</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/30 z-[80] lg:hidden" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 z-[90] bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto lg:hidden safe-area-bottom">
              <div className="sticky top-0 bg-white border-b border-[#E8E3DC] px-5 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-[15px] font-semibold text-[#1C1917]">筛选</h3>
                <button onClick={() => setShowFilters(false)} className="p-1.5 text-[#A09990] hover:text-[#1C1917]"><X size={18} /></button>
              </div>
              <div className="p-5 pb-8">
                <FilterContent />
                <button onClick={() => setShowFilters(false)} className="btn-primary w-full mt-6 py-3 text-[13px]">查看结果 ({filtered.length})</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
