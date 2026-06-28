"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ProductVariant } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[80px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-[18px] text-[#999] mb-[20px]">商品未找到</p>
          <Link href="/products" className="btn-outline">
            返回商品列表
          </Link>
        </motion.div>
      </div>
    );
  }

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  const currentPrice = selectedVariant?.price ?? product.price;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    toast.success("已加入购物车", {
      icon: "✓",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[20px] sm:py-[30px]">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-[13px] text-[#999] mb-[20px]"
      >
        <a href="/" className="hover:text-[#B39B7E] transition-colors">
          首页
        </a>
        <span className="mx-[8px]">/</span>
        <a href="/products" className="hover:text-[#B39B7E] transition-colors">
          全部商品
        </a>
        <span className="mx-[8px]">/</span>
        <span className="text-[#333]">{product.name}</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px]">
        {/* ========== Left: Image Gallery ========== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main image with zoom */}
          <div
            ref={imageRef}
            className="aspect-[1/1] bg-[#F8F5F0] rounded-[20px] overflow-hidden mb-[12px] cursor-crosshair relative group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onClick={() => setLightboxOpen(true)}
          >
            {product.images[mainImage] && (
              <img
                src={product.images[mainImage].url}
                alt={product.images[mainImage].alt ?? product.name}
                className="w-full h-full object-cover"
                style={
                  isZooming
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: "transform-origin 0.1s",
                      }
                    : { transition: "transform 0.3s" }
                }
              />
            )}
            {/* Zoom hint */}
            <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] px-[10px] py-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              点击放大
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-[10px] overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <motion.button
                  key={img.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMainImage(i)}
                  className={`w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] flex-shrink-0 rounded-[10px] overflow-hidden border-2 transition-colors ${
                    i === mainImage ? "border-[#B39B7E] shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt ?? ""}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ========== Right: Product Info ========== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="sticky top-[90px]">
            {/* Category + Brand */}
            <div className="flex items-center gap-[10px] mb-[8px]">
              <span className="text-[12px] text-[#B39B7E] bg-[#F8F5F0] px-[8px] py-[2px] rounded-[4px]">
                {product.category.name}
              </span>
              {product.brand && (
                <span className="text-[12px] text-[#999]">{product.brand}</span>
              )}
            </div>

            <h1 className="text-[22px] sm:text-[28px] font-bold text-[#333] mb-[10px] leading-[32px] sm:leading-[35px]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-[8px] mb-[16px]">
              {product.reviews.length > 0 ? (
                <>
                  <div className="flex items-center gap-[2px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        className={
                          star <= Math.round(avgRating)
                            ? "text-[#BF8947] fill-[#BF8947]"
                            : "text-[#DDD]"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#666] hover:text-[#B39B7E] cursor-pointer" onClick={() => setActiveTab("reviews")}>
                    {avgRating.toFixed(1)} ({product.reviews.length} 条评价)
                  </span>
                </>
              ) : (
                <span className="text-[13px] text-[#CCC]">暂无评价</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-[12px] mb-[20px] bg-[#FFF5F5] p-[16px] rounded-[12px]">
              <span className="text-[#FF3F54] text-[30px] sm:text-[38px] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {formatPrice(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-[#BBB] text-[15px] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="text-[#FF3F54] text-[12px] bg-[#FFEFF3] px-[8px] py-[3px] rounded-[4px] font-medium"
                  >
                    省{formatPrice(product.compareAtPrice - currentPrice)}
                  </motion.span>
                </>
              )}
            </div>

            {/* Short desc */}
            <p className="text-[14px] sm:text-[15px] text-[#666] leading-[26px] mb-[24px]">
              {product.shortDesc}
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-[24px]"
              >
                <h3 className="text-[14px] font-semibold text-[#333] mb-[10px]">
                  规格 <span className="text-[#999] font-normal text-[12px]">（请选择）</span>
                </h3>
                <div className="flex flex-wrap gap-[8px]">
                  {product.variants
                    .filter((v) => v.isActive)
                    .map((v) => (
                      <motion.button
                        key={v.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-[16px] py-[10px] text-[13px] rounded-[8px] border-2 transition-all ${
                          selectedVariant?.id === v.id
                            ? "border-[#B39B7E] bg-[#F8F5F0] text-[#B39B7E] font-medium shadow-sm"
                            : "border-[#EEE] text-[#666] hover:border-[#CCC]"
                        }`}
                      >
                        {v.name}
                        {v.price && v.price !== product.price && (
                          <span className="ml-[6px] text-[#FF3F54] font-medium">
                            {formatPrice(v.price)}
                          </span>
                        )}
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Quantity */}
            <div className="mb-[24px]">
              <h3 className="text-[14px] font-semibold text-[#333] mb-[10px]">数量</h3>
              <div className="flex items-center gap-[4px]">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-[38px] h-[38px] flex items-center justify-center border-2 border-[#EEE] rounded-[8px] hover:border-[#B39B7E] hover:bg-[#F8F5F0] transition-colors"
                >
                  <Minus size={14} />
                </motion.button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-[64px] h-[38px] text-center text-[15px] font-medium border-2 border-[#EEE] rounded-[8px] outline-none focus:border-[#B39B7E]"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[38px] h-[38px] flex items-center justify-center border-2 border-[#EEE] rounded-[8px] hover:border-[#B39B7E] hover:bg-[#F8F5F0] transition-colors"
                >
                  <Plus size={14} />
                </motion.button>
                <span className="text-[13px] text-[#999] ml-[16px]">
                  {product.stock > 0 ? (
                    <span className="text-[#4CAF50]">✓ 有货</span>
                  ) : (
                    <span className="text-[#FF3F54]">暂时缺货</span>
                  )}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-[10px] mb-[30px]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary flex-1 px-[30px] py-[13px] text-[16px] rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed gap-[8px]"
              >
                <ShoppingCart size={18} />
                加入购物车
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`w-[48px] h-[48px] flex items-center justify-center border-2 rounded-[10px] transition-all ${
                  isLiked ? "border-[#FF3F54] bg-[#FFEFF3]" : "border-[#EEE] hover:border-[#CCC]"
                }`}
              >
                <Heart size={20} className={isLiked ? "fill-[#FF3F54] text-[#FF3F54]" : "text-[#999]"} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="w-[48px] h-[48px] flex items-center justify-center border-2 border-[#EEE] rounded-[10px] hover:border-[#CCC] transition-colors"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("链接已复制");
                }}
              >
                <Share2 size={18} className="text-[#999]" />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-[16px] pt-[20px] border-t border-[#EEE]">
              {[
                { icon: <Truck size={14} />, text: "满99包邮" },
                { icon: <RotateCcw size={14} />, text: "7天退换" },
                { icon: <ShieldCheck size={14} />, text: "正品保证" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-[6px] text-[12px] text-[#999]">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========== Tabs: Description / Reviews ========== */}
      <div className="mt-[50px] sm:mt-[80px] max-w-[760px]">
        <div className="flex gap-[12px] border-b border-[#EEE] mb-[30px]">
          {[
            { key: "desc", label: "商品详情" },
            { key: "reviews", label: `用户评价 (${product.reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "desc" | "reviews")}
              className={`relative pb-[12px] text-[15px] sm:text-[16px] font-medium transition-colors ${
                activeTab === tab.key ? "text-[#333]" : "text-[#999] hover:text-[#666]"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B39B7E]"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "desc" ? (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[14px] sm:text-[16px] text-[#666] leading-[28px] sm:leading-[35px] whitespace-pre-line"
            >
              {product.description}
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {product.reviews.length === 0 ? (
                <p className="text-[15px] text-[#999] text-center py-[40px]">暂无评价</p>
              ) : (
                <div className="flex flex-col gap-[16px]">
                  {product.reviews.map((review, i) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-[20px] sm:p-[24px] rounded-[16px] border border-[#F0F0F0] hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-[12px] mb-[12px]">
                        <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#B39B7E] to-[#8C7355] flex items-center justify-center text-[14px] text-white font-bold">
                          {review.userId.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[#333]">
                            用户{review.userId.slice(0, 6)}
                          </p>
                          <div className="flex items-center gap-[2px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={12}
                                className={
                                  star <= review.rating
                                    ? "text-[#BF8947] fill-[#BF8947]"
                                    : "text-[#DDD]"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-[12px] text-[#BBB]">
                          {review.createdAt}
                        </span>
                      </div>
                      {review.title && (
                        <h4 className="text-[15px] font-medium text-[#333] mb-[6px]">
                          {review.title}
                        </h4>
                      )}
                      <p className="text-[14px] text-[#666] leading-[24px]">
                        {review.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========== Lightbox ========== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-[20px] right-[20px] text-white/70 hover:text-white p-[8px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMainImage((mainImage - 1 + product.images.length) % product.images.length);
              }}
              className="absolute left-[20px] sm:left-[40px] text-white/70 hover:text-white p-[12px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={mainImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={product.images[mainImage]?.url}
              alt={product.name}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-[12px]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMainImage((mainImage + 1) % product.images.length);
              }}
              className="absolute right-[20px] sm:right-[40px] text-white/70 hover:text-white p-[12px] rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 text-white/60 text-[13px]">
              {mainImage + 1} / {product.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
