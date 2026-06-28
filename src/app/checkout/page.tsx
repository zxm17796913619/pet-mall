"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";
import toast from "react-hot-toast";
import { ChevronLeft, ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");
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
      <div className="container-page py-24 text-center">
        <ShoppingCart size={40} className="text-stone-300 mx-auto mb-4" />
        <p className="text-stone-500 mb-6">购物车是空的</p>
        <Link href="/products" className="btn-outline">去选购</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street) {
      toast.error("请填写完整的收货信息");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const order = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(),
        status: "PENDING_PAYMENT",
        totalAmount: finalTotal,
        items,
        address,
        note,
        paymentMethod,
        createdAt: new Date().toISOString(),
      };
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.unshift(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      clearCart();
      toast.success("下单成功");
      setLoading(false);
      router.push(`/orders/${order.id}`);
    }, 1200);
  };

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <div className="text-xs text-stone-400 mb-8">
        <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
        <span className="mx-2">/</span>
        <a href="/cart" className="hover:text-stone-600 transition-colors">购物车</a>
        <span className="mx-2">/</span>
        <span className="text-stone-700">结算</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-10" style={{ fontFamily: "var(--font-display)" }}>
        确认订单
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="card p-6 sm:p-8">
              <h3 className="text-base font-semibold text-stone-800 mb-6">收货信息</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-stone-500 mb-1.5 block">收件人姓名 *</label>
                  <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="请输入收件人姓名" required className="input-field" />
                </div>
                <div>
                  <label className="text-xs text-stone-500 mb-1.5 block">手机号码 *</label>
                  <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="请输入手机号码" required className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-stone-500 mb-1.5 block">详细地址 *</label>
                  <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="街道门牌号" required className="input-field" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-6 sm:p-8">
              <h3 className="text-base font-semibold text-stone-800 mb-6">支付方式</h3>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.key}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === method.key
                        ? "border-brand bg-stone-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.key}
                      checked={paymentMethod === method.key}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-brand w-4 h-4"
                    />
                    <method.icon size={20} className="text-stone-500" />
                    <span className="text-sm text-stone-700">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="card p-6 sm:p-8">
              <h3 className="text-base font-semibold text-stone-800 mb-4">备注</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="如有特殊要求请备注…"
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sm:p-8 sticky top-24">
              <h3 className="text-base font-semibold text-stone-800 mb-5">订单摘要</h3>

              <div className="space-y-3 pb-5">
                {items.map((item) => {
                  const p = item.variant?.price ?? item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-stone-500 truncate flex-1 mr-3">
                        {item.product.name}
                        <span className="text-stone-400 ml-1">×{item.quantity}</span>
                      </span>
                      <span className="text-stone-700 shrink-0">{formatPrice(p * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <hr className="divider mb-5" />

              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-500">商品金额</span>
                <span className="text-stone-700">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-stone-500">运费</span>
                <span className="text-stone-500">{shippingFee === 0 ? "免运费" : formatPrice(shippingFee)}</span>
              </div>

              <hr className="divider mb-4" />

              <div className="flex justify-between text-lg font-bold mb-2">
                <span className="text-stone-800">应付金额</span>
                <span className="text-stone-900" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(finalTotal)}</span>
              </div>

              {total < 99 && (
                <p className="text-xs text-stone-400 mb-5">再买 {formatPrice(99 - total)} 即可免运费</p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-[15px] mt-5">
                {loading ? "提交中…" : `提交订单 · ${formatPrice(finalTotal)}`}
              </button>

              <Link href="/cart" className="flex items-center justify-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 mt-5 transition-colors">
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
