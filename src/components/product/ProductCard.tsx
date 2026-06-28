"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Star, Eye } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 8;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("已加入购物车", {
      icon: "🛒",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.4s ease",
      }}
      className="relative"
    >
      <Link
        href={`/products/${product.slug}`}
        className="card-warm group block cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image container */}
        <div className="aspect-[1/1] bg-[#F8F5F0] relative overflow-hidden">
          {primaryImage && (
            <>
              <img
                src={primaryImage.url}
                alt={primaryImage.alt ?? product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Glare effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                }}
              />
            </>
          )}

          {/* Discount badge */}
          {discountPercent > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.2 + index * 0.08 }}
              className="absolute top-[10px] left-[10px] bg-[#FF3F54] text-white text-[11px] font-bold px-[8px] py-[3px] rounded-[4px] shadow-sm"
            >
              -{discountPercent}%
            </motion.span>
          )}

          {/* Stock badge */}
          {product.stock <= 10 && product.stock > 0 && (
            <span className="absolute top-[10px] right-[10px] bg-[#FF5E20] text-white text-[11px] px-[8px] py-[3px] rounded-[4px]">
              仅剩{product.stock}件
            </span>
          )}

          {/* Hover actions */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-[16px] gap-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#B39B7E] hover:text-white transition-colors"
            >
              <ShoppingCart size={17} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#B39B7E] hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Quick view
                window.location.href = `/products/${product.slug}`;
              }}
            >
              <Eye size={17} />
            </motion.div>
          </div>
        </div>

        {/* Info */}
        <div className="p-[16px]" style={{ transform: "translateZ(15px)" }}>
          {/* Category tag */}
          <span className="text-[11px] text-[#B39B7E] bg-[#F8F5F0] px-[6px] py-[2px] rounded-[3px] mb-[8px] inline-block">
            {product.category.name}
          </span>

          <h3 className="text-[14px] sm:text-[16px] font-medium text-[#333] mb-[6px] leading-[22px] line-clamp-2 group-hover:text-[#B39B7E] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-[4px] mb-[8px]">
            {averageRating > 0 ? (
              <>
                <div className="flex items-center gap-[1px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={11}
                      className={
                        star <= Math.round(averageRating)
                          ? "text-[#BF8947] fill-[#BF8947]"
                          : "text-[#DDD]"
                      }
                    />
                  ))}
                </div>
                <span className="text-[#999] text-[11px]">({product.reviews.length})</span>
              </>
            ) : (
              <span className="text-[#CCC] text-[11px]">暂无评价</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-[8px]">
            <span
              className="text-[#FF3F54] text-[18px] sm:text-[20px] font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[#BBB] text-[12px] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loading card
export function ProductCardSkeleton() {
  return (
    <div className="card-warm animate-pulse">
      <div className="aspect-[1/1] bg-[#EEE]" />
      <div className="p-[16px] space-y-[10px]">
        <div className="h-[16px] bg-[#EEE] rounded w-[60%]" />
        <div className="h-[20px] bg-[#EEE] rounded w-[90%]" />
        <div className="h-[14px] bg-[#EEE] rounded w-[40%]" />
        <div className="flex gap-[8px]">
          <div className="h-[22px] bg-[#EEE] rounded w-[60px]" />
          <div className="h-[16px] bg-[#EEE] rounded w-[40px]" />
        </div>
      </div>
    </div>
  );
}
