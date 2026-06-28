"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS } from "@/lib/constants";
import { ChevronLeft } from "lucide-react";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const found = orders.find((o: any) => o.id === orderId);
    setOrder(found || null);
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-[760px] mx-auto px-[20px] py-[60px] text-center">
        <p className="text-[16px] text-[#999] mb-[20px]">订单未找到</p>
        <Link href="/mine" className="btn-outline">返回我的订单</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[760px] mx-auto px-[20px] sm:px-[40px] py-[30px] sm:py-[40px]">
      <Link href="/mine" className="flex items-center gap-[6px] text-[14px] text-[#B39B7E] hover:underline mb-[20px]">
        <ChevronLeft size={16} />
        返回我的订单
      </Link>

      <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px] mb-[20px]">
        <div className="flex items-center justify-between mb-[20px]">
          <h1
            className="text-[20px] sm:text-[24px] font-bold text-[#333]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            订单详情
          </h1>
          <span className="text-[14px] px-[12px] py-[4px] rounded-[20px] bg-[#FFEFF3] text-[#FF3F54]">
            {ORDER_STATUS[order.status] || order.status}
          </span>
        </div>

        <div className="text-[13px] text-[#999] mb-[16px]">
          订单编号：{order.orderNumber}
        </div>
        <div className="text-[13px] text-[#999] mb-[20px]">
          下单时间：{new Date(order.createdAt).toLocaleString("zh-CN")}
        </div>

        {/* Items */}
        <div className="border-t border-[#EEE] pt-[20px]">
          {order.items.map((item: any, i: number) => {
            const price = item.variant?.price ?? item.product.price;
            return (
              <div key={i} className="flex gap-[12px] py-[12px] border-b border-[#F5F5F5] last:border-0">
                <div className="w-[64px] h-[64px] bg-[#F8F5F0] rounded-[8px] overflow-hidden flex-shrink-0">
                  {(item.product.images?.[0] || item.productImage) && (
                    <img
                      src={item.product.images?.[0]?.url || item.productImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#333]">{item.product.name}</p>
                  {item.variant && (
                    <p className="text-[12px] text-[#999]">{item.variant.name}</p>
                  )}
                  <div className="flex justify-between mt-[4px]">
                    <span className="text-[14px] text-[#FF3F54] font-bold">
                      {formatPrice(price)}
                    </span>
                    <span className="text-[13px] text-[#999]">×{item.quantity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="border-t border-[#EEE] mt-[20px] pt-[20px]">
          <div className="flex justify-between text-[14px] mb-[8px]">
            <span className="text-[#666]">商品金额</span>
            <span className="text-[#333]">{formatPrice(order.totalAmount - (order.totalAmount >= 99 ? 0 : 10))}</span>
          </div>
          <div className="flex justify-between text-[14px] mb-[8px]">
            <span className="text-[#666]">运费</span>
            <span className="text-[#333]">{order.totalAmount >= 99 ? "免运费" : formatPrice(10)}</span>
          </div>
          <div className="flex justify-between text-[18px] font-bold pt-[12px] border-t border-[#EEE]">
            <span className="text-[#333]">实付款</span>
            <span className="text-[#FF3F54]" style={{ fontFamily: "var(--font-display)" }}>
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping info */}
      <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px]">
        <h3 className="text-[16px] font-bold text-[#333] mb-[16px]">收货信息</h3>
        <div className="text-[14px] text-[#666] flex flex-col gap-[6px]">
          <p>收件人：{order.address?.name}</p>
          <p>电话：{order.address?.phone}</p>
          <p>地址：{order.address?.province} {order.address?.city} {order.address?.district} {order.address?.street}</p>
        </div>
        {order.note && (
          <div className="mt-[16px] pt-[16px] border-t border-[#EEE]">
            <p className="text-[13px] text-[#999]">备注：{order.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
