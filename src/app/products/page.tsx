"use client";

import { useState, useMemo } from "react";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PET_CATEGORIES } from "@/lib/constants";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDesc.toLowerCase().includes(term)
      );
    }

    // Pet type filter
    if (selectedPet) {
      result = result.filter((p) => p.petType === selectedPet);
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedPet, selectedCategory, sortBy]);

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[30px] sm:py-[48px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-[20px]">
        <a href="/" className="hover:text-[#B39B7E]">首页</a>
        <span className="mx-[8px]">/</span>
        <span className="text-[#333]">全部商品</span>
      </div>

      {/* Page title */}
      <h1
        className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[24px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        全部商品
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-[12px] mb-[24px]">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="搜索你想要的商品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-[16px] py-[10px] pl-[40px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-white outline-none focus:border-[#B39B7E]"
          />
          <Search
            size={16}
            className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#999]"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-[16px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-white outline-none focus:border-[#B39B7E] cursor-pointer"
        >
          <option value="default">默认排序</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="newest">最新上架</option>
        </select>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-[8px] px-[16px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-white"
        >
          <SlidersHorizontal size={16} />
          筛选
        </button>
      </div>

      <div className="flex gap-[30px]">
        {/* Sidebar filters */}
        <div className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-[200px] flex-shrink-0`}>
          {/* Pet type */}
          <div className="mb-[30px]">
            <h3 className="text-[14px] font-semibold text-[#333] mb-[12px]">宠物类型</h3>
            <div className="flex flex-col gap-[8px]">
              <button
                onClick={() => setSelectedPet("")}
                className={`text-left text-[13px] px-[10px] py-[6px] rounded-[6px] transition-colors ${
                  selectedPet === "" ? "bg-[#B39B7E] text-white" : "text-[#666] hover:bg-[#F8F5F0]"
                }`}
              >
                全部
              </button>
              {PET_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedPet(cat.key)}
                  className={`text-left text-[13px] px-[10px] py-[6px] rounded-[6px] transition-colors ${
                    selectedPet === cat.key ? "bg-[#B39B7E] text-white" : "text-[#666] hover:bg-[#F8F5F0]"
                  }`}
                >
                  <cat.icon size={14} /> {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-[30px]">
            <h3 className="text-[14px] font-semibold text-[#333] mb-[12px]">商品分类</h3>
            <div className="flex flex-col gap-[8px]">
              <button
                onClick={() => setSelectedCategory("")}
                className={`text-left text-[13px] px-[10px] py-[6px] rounded-[6px] transition-colors ${
                  selectedCategory === "" ? "bg-[#B39B7E] text-white" : "text-[#666] hover:bg-[#F8F5F0]"
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left text-[13px] px-[10px] py-[6px] rounded-[6px] transition-colors ${
                    selectedCategory === cat.id ? "bg-[#B39B7E] text-white" : "text-[#666] hover:bg-[#F8F5F0]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-[60px]">
              <p className="text-[16px] text-[#999] mb-[16px]">没有找到匹配的商品</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedPet("");
                  setSelectedCategory("");
                }}
                className="text-[#B39B7E] text-[14px] hover:underline"
              >
                清除筛选条件
              </button>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-[#999] mb-[16px]">
                共 {filteredProducts.length} 件商品
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[20px]">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
