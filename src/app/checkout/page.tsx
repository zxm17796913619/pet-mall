"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");

  // Mock address
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    province: "上海",
    city: "上海市",
    district: "浦东新区",
    street: "",
    zipCode: "",
  });

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const shippingFee = total >= 99 ? 0 : 10;
  const finalTotal = total + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-[760px] mx-auto px-[20px] py-[60px] text-center">
        <p className="text-[16px] text-[#999]">购物车是空的，请先添加商品</p>
        <Link href="/products" className="btn-brand-outline mt-[20px] inline-flex">
          去选购
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street) {
      toast.error("请填写完整的收货信息");
      return;
    }
    setLoading(true);

    // Simulate order creation
    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const order = {
        id: Date.now().toString(),
        orderNumber,
        status: "PENDING_PAYMENT",
        totalAmount: finalTotal,
        items,
        address,
        note,
        paymentMethod,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage for demo
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.unshift(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      clearCart();
      toast.success("下单成功！");
      setLoading(false);
      router.push(`/orders/${order.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-[20px] sm:px-[40px] py-[30px] sm:py-[40px]">
      {/* Breadcrumb */}
      <div className="text-[13px] text-[#999] mb-[20px]">
        <a href="/" className="hover:text-[#B39B7E]">首页</a>
        <span className="mx-[8px]">/</span>
        <a href="/cart" className="hover:text-[#B39B7E]">购物车</a>
        <span className="mx-[8px]">/</span>
        <span className="text-[#333]">结算</span>
      </div>

      <h1
        className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[30px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        确认订单
      </h1>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {/* Left: Address + Payment */}
          <div className="lg:col-span-2 flex flex-col gap-[20px]">
            {/* Shipping Address */}
            <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px]">
              <h3 className="text-[18px] font-bold text-[#333] mb-[20px]">收货信息</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div>
                  <label className="text-[13px] text-[#666] mb-[4px] block">
                    收件人姓名 *
                  </label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="请输入收件人姓名"
                    required
                    className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-[#666] mb-[4px] block">
                    手机号码 *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="请输入手机号码"
                    required
                    className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[13px] text-[#666] mb-[4px] block">
                    详细地址 *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="省/市/区后填写街道门牌号"
                    required
                    className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px]">
              <h3 className="text-[18px] font-bold text-[#333] mb-[20px]">支付方式</h3>
              <div className="flex flex-col gap-[12px]">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.key}
                    className={`flex items-center gap-[12px] p-[16px] border rounded-[10px] cursor-pointer transition-colors ${
                      paymentMethod === method.key
                        ? "border-[#B39B7E] bg-[#F8F5F0]"
                        : "border-[#E5E5E5] hover:border-[#B39B7E]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.key}
                      checked={paymentMethod === method.key}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#B39B7E]"
                    />
                    <span className="text-[20px]">{method.icon}</span>
                    <span className="text-[14px] text-[#333]">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px]">
              <h3 className="text-[18px] font-bold text-[#333] mb-[16px]">备注</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="如有特殊要求，请在此备注..."
                rows={3}
                className="w-full px-[14px] py-[10px] text-[14px] border border-[#E5E5E5] rounded-[6px] bg-[#F8F5F0] outline-none focus:border-[#B39B7E] resize-none"
              />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px] sticky top-[90px]">
              <h3 className="text-[18px] font-bold text-[#333] mb-[20px]">订单摘要</h3>

              {/* Items */}
              <div className="flex flex-col gap-[12px] pb-[20px] border-b border-[#EEE] mb-[20px]">
                {items.map((item) => {
                  const price = item.variant?.price ?? item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between text-[14px]">
                      <span className="text-[#666] truncate flex-1 mr-[10px]">
                        {item.product.name}
                        <span className="text-[#999] ml-[4px]">×{item.quantity}</span>
                      </span>
                      <span className="text-[#333]">{formatPrice(price * item.quantity)}</span>
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
                <span className="text-[#999]">
                  {shippingFee === 0 ? "免运费" : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-[18px] font-bold pt-[16px] border-t border-[#EEE] mb-[8px]">
                <span className="text-[#333]">应付金额</span>
                <span
                  className="text-[#FF3F54]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formatPrice(finalTotal)}
                </span>
              </div>
              {total < 99 && (
                <p className="text-[12px] text-[#BF8947] mb-[16px]">
                  再买 {formatPrice(99 - total)} 即可免运费
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-brand w-full mt-[16px] text-[16px] py-[12px] disabled:opacity-50"
              >
                {loading ? "提交中..." : `提交订单 ${formatPrice(finalTotal)}`}
              </button>

              <Link
                href="/cart"
                className="flex items-center justify-center gap-[6px] text-[13px] text-[#999] hover:text-[#B39B7E] mt-[16px]"
              >
                <ChevronLeft size={14} />
                返回购物车
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
