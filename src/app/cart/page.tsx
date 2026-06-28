"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingCart, ChevronLeft } from "lucide-react";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[60px] sm:py-[80px] text-center">
        <div className="flex flex-col items-center gap-[20px]">
          <ShoppingCart size={48} className="text-[#DDD]" />
          <p className="text-[16px] text-[#999]">购物车是空的</p>
          <Link href="/products" className="btn-outline">
            去逛逛
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[30px] sm:py-[40px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-[20px]">
        <a href="/" className="hover:text-[#B39B7E]">首页</a>
        <span className="mx-[8px]">/</span>
        <span className="text-[#333]">购物车</span>
      </div>

      <h1
        className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[30px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        购物车 ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] lg:gap-[40px]">
        {/* Cart items */}
        <div className="lg:col-span-2 flex flex-col gap-[16px]">
          {items.map((item) => {
            const price = item.variant?.price ?? item.product.price;
            const image = item.product.images.find((img) => img.isPrimary) ?? item.product.images[0];
            const subtotal = price * item.quantity;

            return (
              <div
                key={item.id}
                className="flex gap-[16px] bg-white p-[16px] sm:p-[20px] rounded-[15px]"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex-shrink-0 bg-[#F8F5F0] rounded-[10px] overflow-hidden"
                >
                  {image && (
                    <img
                      src={image.url}
                      alt={image.alt ?? item.product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-[14px] sm:text-[16px] font-medium text-[#333] mb-[6px] leading-[22px] hover:text-[#B39B7E]"
                  >
                    {item.product.name}
                  </Link>
                  {item.variant && (
                    <p className="text-[12px] text-[#999] mb-[8px]">{item.variant.name}</p>
                  )}
                  <p
                    className="text-[16px] sm:text-[18px] font-bold text-[#FF3F54] mt-auto"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {formatPrice(price)}
                  </p>
                </div>

                {/* Quantity controls + Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="p-[6px] text-[#999] hover:text-[#FF3F54] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-[4px]">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="w-[30px] h-[30px] flex items-center justify-center border border-[#E5E5E5] rounded-[4px] hover:bg-[#F8F5F0]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-[36px] text-center text-[14px]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="w-[30px] h-[30px] flex items-center justify-center border border-[#E5E5E5] rounded-[4px] hover:bg-[#F8F5F0]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-[14px] text-[#999] mt-[8px]">小计 {formatPrice(subtotal)}</p>
                </div>
              </div>
            );
          })}

          <Link href="/products" className="flex items-center gap-[6px] text-[14px] text-[#B39B7E] hover:underline mt-[8px]">
            <ChevronLeft size={14} />
            继续购物
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px] sticky top-[90px]">
            <h3 className="text-[18px] font-bold text-[#333] mb-[20px]">订单摘要</h3>

            <div className="flex flex-col gap-[12px] pb-[20px] border-b border-[#EEE] mb-[20px]">
              {items.map((item) => {
                const price = item.variant?.price ?? item.product.price;
                return (
                  <div key={item.id} className="flex justify-between text-[14px]">
                    <span className="text-[#666] truncate flex-1 mr-[10px]">
                      {item.product.name}
                      {item.variant && <span className="text-[#999]"> ({item.variant.name})</span>}
                      <span className="text-[#999] ml-[4px]">×{item.quantity}</span>
                    </span>
                    <span className="text-[#333] flex-shrink-0">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[14px] mb-[12px]">
              <span className="text-[#666]">商品金额</span>
              <span className="text-[#333]">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-[14px] mb-[12px]">
              <span className="text-[#666]">运费</span>
              <span className="text-[#999]">{total >= 99 ? "免运费" : formatPrice(10)}</span>
            </div>
            <div className="flex justify-between text-[18px] font-bold pt-[16px] border-t border-[#EEE]">
              <span className="text-[#333]">合计</span>
              <span
                className="text-[#FF3F54]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(total >= 99 ? total : total + 10)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="btn-primary w-full mt-[20px] text-[16px] py-[12px] text-center"
            >
              去结算
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
