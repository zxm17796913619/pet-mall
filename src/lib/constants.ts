// 店铺信息
export const STORE = {
  name: "Nonta",
  slogan: "宠物与人的温暖时光",
  phone: "400-xxx-xxxx",
  email: "service@petmall.com",
  address: "上海市浦东新区xxx路xxx号",
};

// 导航链接
export const NAV_LINKS = [
  { label: "首页", href: "/" },
  { label: "全部商品", href: "/products" },
  { label: "狗狗专区", href: "/products?pet=dog" },
  { label: "猫咪专区", href: "/products?pet=cat" },
  { label: "品牌故事", href: "/story" },
  { label: "关于我们", href: "/about" },
];

// 宠物分类
export const PET_CATEGORIES = [
  { key: "dog", name: "狗狗专区", icon: "🐕", color: "#F2E9E2" },
  { key: "cat", name: "猫咪专区", icon: "🐱", color: "#EDE4F2" },
  { key: "bird", name: "鸟类专区", icon: "🐦", color: "#E2F0F2" },
  { key: "fish", name: "鱼类专区", icon: "🐟", color: "#E2EAF2" },
  { key: "small", name: "小宠专区", icon: "🐹", color: "#F2EEE2" },
];

// 订单状态
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

// 支付方式
export const PAYMENT_METHODS = [
  { key: "WECHAT", name: "微信支付", icon: "💬" },
  { key: "ALIPAY", name: "支付宝", icon: "🔵" },
  { key: "BANK_TRANSFER", name: "银行转账", icon: "🏦" },
];

// 支付状态
export const PAYMENT_STATUS: Record<string, string> = {
  UNPAID: "未付款",
  PAID: "已付款",
  REFUNDING: "退款中",
  REFUNDED: "已退款",
};
