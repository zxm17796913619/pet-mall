"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS } from "@/lib/constants";
import { Package, User, MapPin } from "lucide-react";

export default function MinePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px] py-[30px] sm:py-[40px]">
      <h1
        className="text-[24px] sm:text-[32px] font-bold text-[#333] mb-[30px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        个人中心
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-[20px] sm:p-[30px] rounded-[20px]">
            <div className="flex items-center gap-[12px] mb-[24px]">
              <div className="w-[48px] h-[48px] rounded-full bg-[#F8F5F0] flex items-center justify-center text-[18px] text-[#B39B7E] font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="text-[16px] font-medium text-[#333]">
                  {user?.name || "未登录用户"}
                </p>
                <p className="text-[12px] text-[#999]">{user?.email || ""}</p>
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              {[
                { icon: <Package size={18} />, label: "我的订单", href: "/mine" },
                { icon: <MapPin size={18} />, label: "收货地址", href: "/mine" },
                { icon: <User size={18} />, label: "个人资料", href: "/mine" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-[10px] px-[12px] py-[10px] text-[14px] text-[#666] rounded-[6px] hover:bg-[#F8F5F0] hover:text-[#B39B7E] transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              {!user && (
                <Link
                  href="/login"
                  className="btn-brand text-center text-[14px] py-[10px] mt-[16px]"
                >
                  登录 / 注册
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {!user ? (
            <div className="bg-white p-[40px] rounded-[20px] text-center">
              <Package size={48} className="text-[#DDD] mx-auto mb-[16px]" />
              <p className="text-[16px] text-[#999] mb-[16px]">请先登录查看订单</p>
              <Link href="/login" className="btn-brand-outline">去登录</Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-[40px] rounded-[20px] text-center">
              <Package size={48} className="text-[#DDD] mx-auto mb-[16px]" />
              <p className="text-[16px] text-[#999] mb-[16px]">暂无订单</p>
              <Link href="/products" className="btn-brand-outline">去选购</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-[16px]">
              <h3 className="text-[18px] font-bold text-[#333]">我的订单</h3>
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="bg-white p-[20px] sm:p-[24px] rounded-[15px] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-[12px]">
                    <span className="text-[13px] text-[#999]">
                      订单号：{order.orderNumber}
                    </span>
                    <span className="text-[13px] px-[10px] py-[2px] rounded-[20px] bg-[#FFEFF3] text-[#FF3F54]">
                      {ORDER_STATUS[order.status] || order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[14px] text-[#666]">
                        {order.items?.map((item: any) => item.product.name).join("、")}
                      </p>
                      <p className="text-[12px] text-[#999] mt-[4px]">
                        {new Date(order.createdAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                    <span
                      className="text-[18px] font-bold text-[#FF3F54]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
