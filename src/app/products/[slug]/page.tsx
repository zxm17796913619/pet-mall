"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Star, ShoppingCart, Heart, ChevronLeft, Minus, Plus } from "lucide-react";
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

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[80px] text-center">
        <p className="text-[18px] text-[#999] mb-[20px]">商品未找到</p>
        <Link href="/products" className="btn-brand-outline">返回商品列表</Link>
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
    toast.success("已加入购物车");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[20px] sm:py-[30px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-[20px]">
        <a href="/" className="hover:text-[#B39B7E]">首页</a>
        <span className="mx-[8px]">/</span>
        <a href="/products" className="hover:text-[#B39B7E]">全部商品</a>
        <span className="mx-[8px]">/</span>
        <span className="text-[#333]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[40px]">
        {/* ========== Left: Image Gallery ========== */}
        <div>
          {/* Main image */}
          <div className="aspect-[1/1] bg-[#F8F5F0] rounded-[20px] overflow-hidden mb-[12px]">
            {product.images[mainImage] && (
              <img
                src={product.images[mainImage].url}
                alt={product.images[mainImage].alt ?? product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-[10px] overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setMainImage(i)}
                  className={`w-[70px] h-[70px] flex-shrink-0 rounded-[10px] overflow-hidden border-2 transition-colors ${
                    i === mainImage ? "border-[#B39B7E]" : "border-transparent"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt ?? ""}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========== Right: Product Info ========== */}
        <div>
          <h1
            className="text-[22px] sm:text-[28px] font-bold text-[#333] mb-[10px] leading-[35px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          {product.reviews.length > 0 && (
            <div className="flex items-center gap-[8px] mb-[16px]">
              <div className="flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(avgRating) ? "text-[#BF8947] fill-[#BF8947]" : "text-[#DDD]"}
                  />
                ))}
              </div>
              <span className="text-[14px] text-[#666]">
                {avgRating.toFixed(1)} ({product.reviews.length} 条评价)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-[12px] mb-[20px]">
            <span
              className="text-[#FF3F54] text-[28px] sm:text-[36px] font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatPrice(currentPrice)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[#999] text-[16px] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="text-[#FF3F54] text-[13px] bg-[#FFEFF3] px-[8px] py-[2px] rounded-[4px]">
                省{formatPrice(product.compareAtPrice - currentPrice)}
              </span>
            )}
          </div>

          {/* Short desc */}
          <p className="text-[14px] sm:text-[16px] text-[#666] leading-[26px] mb-[24px]">
            {product.shortDesc}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-[24px]">
              <h3 className="text-[14px] font-semibold text-[#333] mb-[10px]">规格</h3>
              <div className="flex flex-wrap gap-[8px]">
                {product.variants
                  .filter((v) => v.isActive)
                  .map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-[16px] py-[8px] text-[13px] rounded-[6px] border transition-all ${
                        selectedVariant?.id === v.id
                          ? "border-[#B39B7E] bg-[#F8F5F0] text-[#B39B7E]"
                          : "border-[#E5E5E5] text-[#666] hover:border-[#B39B7E]"
                      }`}
                    >
                      {v.name}
                      {v.price && v.price !== product.price && (
                        <span className="ml-[4px] text-[#FF3F54]">
                          {formatPrice(v.price)}
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-[24px]">
            <h3 className="text-[14px] font-semibold text-[#333] mb-[10px]">数量</h3>
            <div className="flex items-center gap-[4px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-[36px] h-[36px] flex items-center justify-center border border-[#E5E5E5] rounded-[6px] hover:bg-[#F8F5F0]"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-[60px] h-[36px] text-center text-[14px] border border-[#E5E5E5] rounded-[6px] outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-[36px] h-[36px] flex items-center justify-center border border-[#E5E5E5] rounded-[6px] hover:bg-[#F8F5F0]"
              >
                <Plus size={14} />
              </button>
              <span className="text-[13px] text-[#999] ml-[12px]">
                {product.stock > 0 ? `库存 ${product.stock} 件` : "暂时缺货"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-[12px] mb-[30px]">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-brand flex-1 px-[30px] py-[12px] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              加入购物车
            </button>
            <button className="w-[48px] h-[48px] flex items-center justify-center border border-[#E5E5E5] rounded-[6px] hover:bg-[#F8F5F0] transition-colors">
              <Heart size={20} className="text-[#999]" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-[16px] pt-[20px] border-t border-[#EEE]">
            {[
              { icon: "🚚", text: "满99包邮" },
              { icon: "🔄", text: "7天退换" },
              { icon: "🎖️", text: "正品保证" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-[6px] text-[12px] text-[#999]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Product Description ========== */}
      <div className="mt-[40px] sm:mt-[80px] max-w-[760px]">
        <h2
          className="text-[20px] sm:text-[24px] font-bold text-[#333] mb-[20px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          商品详情
        </h2>
        <div className="text-[14px] sm:text-[16px] text-[#666] leading-[28px] sm:leading-[35px] whitespace-pre-line">
          {product.description}
        </div>
      </div>

      {/* ========== Reviews ========== */}
      {product.reviews.length > 0 && (
        <div className="mt-[40px] sm:mt-[60px] max-w-[760px]">
          <h2
            className="text-[20px] sm:text-[24px] font-bold text-[#333] mb-[20px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            用户评价 ({product.reviews.length})
          </h2>
          <div className="flex flex-col gap-[20px]">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white p-[20px] rounded-[15px]">
                <div className="flex items-center gap-[10px] mb-[10px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#F8F5F0] flex items-center justify-center text-[14px] text-[#B39B7E] font-bold">
                    {review.userId.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#333]">用户{review.userId}</p>
                    <div className="flex items-center gap-[2px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.rating ? "text-[#BF8947] fill-[#BF8947]" : "text-[#DDD]"}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[12px] text-[#999]">{review.createdAt}</span>
                </div>
                {review.title && (
                  <h4 className="text-[14px] font-medium text-[#333] mb-[6px]">{review.title}</h4>
                )}
                <p className="text-[14px] text-[#666] leading-[24px]">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
