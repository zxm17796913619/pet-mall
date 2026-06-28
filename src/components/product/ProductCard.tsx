"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem(product);
    toast.success("已加入购物车", { style: { borderRadius: "6px", background: "#1C1917", color: "#fff", fontSize: "13px" } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="group block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Image */}
        <div className="relative aspect-[4/5] bg-[#F3EFEA] rounded-lg overflow-hidden mb-4">
          {primaryImage && (
            <motion.img
              src={primaryImage.url}
              alt={primaryImage.alt ?? product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.04 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.compareAtPrice && (
              <span className="badge bg-[#1C1917] text-white">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
            {new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
              <span className="badge bg-[#B8753E] text-white">NEW</span>
            )}
          </div>

          {/* Hover action */}
          <motion.div
            className="absolute bottom-3 right-3 flex gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={handleAddToCart} className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1C1917] hover:text-white transition-colors">
              <ShoppingCart size={16} />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] font-semibold text-[#A09990] uppercase tracking-[0.1em] mb-1.5">{product.category.name}</p>
          <h3 className="text-[14px] sm:text-[15px] font-medium text-[#1C1917] leading-snug mb-2 line-clamp-2 group-hover:text-[#B8753E] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[16px] font-bold text-[#1C1917]" style={{ fontFamily: "var(--font-display)" }}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[12px] text-[#A09990] line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-[#E8E3DC] rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-[12px] bg-[#E8E3DC] rounded w-1/3" />
        <div className="h-[16px] bg-[#E8E3DC] rounded w-3/4" />
        <div className="h-[18px] bg-[#E8E3DC] rounded w-1/4" />
      </div>
    </div>
  );
}
