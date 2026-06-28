"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[90vw] sm:max-w-[400px] bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-[20px] border-b border-[#EEE]">
              <div className="flex items-center gap-[10px]">
                <ShoppingCart size={20} className="text-[#B39B7E]" />
                <h3 className="text-[18px] font-bold text-[#333]">
                  购物车 ({items.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-[6px] text-[#999] hover:text-[#333] transition-colors rounded-full hover:bg-[#F5F5F5]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-[16px] text-[#999]">
                <ShoppingCart size={48} className="text-[#DDD]" />
                <p className="text-[14px]">购物车是空的</p>
                <button
                  onClick={onClose}
                  className="text-[#B39B7E] text-[14px] hover:underline"
                >
                  去逛逛吧
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-[20px] flex flex-col gap-[12px]">
                  {items.map((item) => {
                    const price = item.variant?.price ?? item.product.price;
                    const image =
                      item.product.images.find((img) => img.isPrimary) ??
                      item.product.images[0];

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, height: 0 }}
                        className="flex gap-[12px] bg-[#FEFAF5] p-[12px] rounded-[12px]"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={onClose}
                          className="w-[72px] h-[72px] flex-shrink-0 rounded-[8px] overflow-hidden bg-[#F0F0F0]"
                        >
                          {image && (
                            <img
                              src={image.url}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={onClose}
                            className="text-[13px] font-medium text-[#333] line-clamp-1 hover:text-[#B39B7E]"
                          >
                            {item.product.name}
                          </Link>
                          {item.variant && (
                            <p className="text-[11px] text-[#999] mt-[2px]">
                              {item.variant.name}
                            </p>
                          )}
                          <p className="text-[14px] font-bold text-[#FF3F54] mt-[4px]">
                            {formatPrice(price)}
                          </p>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-[8px]">
                            <div className="flex items-center gap-[3px]">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1,
                                    item.variantId
                                  )
                                }
                                className="w-[24px] h-[24px] flex items-center justify-center border border-[#E5E5E5] rounded-[4px] hover:bg-[#F8F5F0] text-[12px]"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-[28px] text-center text-[13px]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1,
                                    item.variantId
                                  )
                                }
                                className="w-[24px] h-[24px] flex items-center justify-center border border-[#E5E5E5] rounded-[4px] hover:bg-[#F8F5F0] text-[12px]"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(item.productId, item.variantId)
                              }
                              className="p-[4px] text-[#CCC] hover:text-[#FF3F54] transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-[#EEE] p-[20px] space-y-[12px] bg-white">
                  <div className="flex justify-between text-[16px] font-bold">
                    <span className="text-[#333]">合计</span>
                    <span
                      className="text-[#FF3F54]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#999]">
                    {total >= 99 ? "已满99元，免运费" : `再买${formatPrice(99 - total)}免运费`}
                  </p>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="btn-primary w-full text-[16px] py-[12px] text-center block"
                  >
                    去结算
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-[13px] text-[#999] hover:text-[#333] py-[8px]"
                  >
                    继续购物
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
