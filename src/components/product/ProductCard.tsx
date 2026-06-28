"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("已加入购物车");
  };

  return (
    <Link href={`/products/${product.slug}`} className="card-warm group">
      {/* Image */}
      <div className="aspect-[1/1] bg-[#F8F5F0] relative overflow-hidden">
        {primaryImage && (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt ?? product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
        )}
        {/* Sale badge */}
        {product.compareAtPrice && (
          <span className="absolute top-[12px] left-[12px] bg-[#FF3F54] text-white text-[11px] px-[8px] py-[4px] rounded-[4px]">
            热卖
          </span>
        )}
        {/* Quick add to cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-[12px] right-[12px] w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#B39B7E] hover:text-white"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-[16px]">
        <h3 className="text-[14px] sm:text-[16px] font-medium text-[#333] mb-[6px] leading-[22px] line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.reviews.length > 0 && (
          <div className="flex items-center gap-[4px] mb-[8px]">
            <span className="text-[#BF8947] text-[13px]">★ {averageRating.toFixed(1)}</span>
            <span className="text-[#999] text-[12px]">({product.reviews.length}条评价)</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-[8px]">
          <span
            className="text-[#FF3F54] text-[18px] sm:text-[20px] font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[#999] text-[13px] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
