import {
  Dog, Cat, Bird, Fish, Snail,
  Truck, RotateCcw, Shield, MessageCircle,
  Banknote, Smartphone, Building2,
} from "lucide-react";
import type { ComponentType } from "react";

// ── 店铺信息 ──
export const STORE = {
  name: "Nonta",
  phone: "400-123-4567",
  email: "hello@nonta.com",
  address: "上海市浦东新区",
};

// ── 导航 ──
export const NAV_LINKS = [
  { label: "首页", href: "/" },
  { label: "全部商品", href: "/products" },
  { label: "狗狗专区", href: "/products?pet=dog" },
  { label: "猫咪专区", href: "/products?pet=cat" },
  { label: "品牌故事", href: "/story" },
  { label: "关于我们", href: "/about" },
];

// ── 宠物分类 ──
export const PET_CATEGORIES: {
  key: string;
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  bgClass: string;
}[] = [
  { key: "dog", name: "狗狗专区", icon: Dog, bgClass: "bg-stone-100" },
  { key: "cat", name: "猫咪专区", icon: Cat, bgClass: "bg-stone-100" },
  { key: "bird", name: "鸟类专区", icon: Bird, bgClass: "bg-stone-100" },
  { key: "fish", name: "鱼类专区", icon: Fish, bgClass: "bg-stone-100" },
  { key: "small", name: "小宠专区", icon: Snail, bgClass: "bg-stone-100" },
];

// ── 信任保证 ──
export const TRUST_BADGES = [
  { icon: Truck, title: "满99包邮", desc: "全国配送" },
  { icon: RotateCcw, title: "7天退换", desc: "无忧售后" },
  { icon: Shield, title: "正品保证", desc: "品质严选" },
  { icon: MessageCircle, title: "在线客服", desc: "工作日 9:00–18:00" },
] as const;

// ── 支付方式 ──
export const PAYMENT_METHODS = [
  { key: "WECHAT", name: "微信支付", icon: Smartphone },
  { key: "ALIPAY", name: "支付宝", icon: Banknote },
  { key: "BANK_TRANSFER", name: "银行转账", icon: Building2 },
] as const;

// ── 订单状态 ──
export const ORDER_STATUS: Record<string, string> = {
  PENDING_PAYMENT: "待付款",
  PENDING_SHIPMENT: "待发货",
  SHIPPED: "已发货",
  DELIVERED: "已签收",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
  REFUNDING: "退款中",
  REFUNDED: "已退款",
};

// ── 支付状态 ──
export const PAYMENT_STATUS: Record<string, string> = {
  UNPAID: "未付款",
  PAID: "已付款",
  REFUNDING: "退款中",
  REFUNDED: "已退款",
};
