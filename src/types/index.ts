// ============================================================
// 类型定义 — 与数据库 schema 对应
// ============================================================

export type PetType = "dog" | "cat" | "bird" | "fish" | "small" | "other";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  category: Category;
  brand: string | null;
  petType: PetType;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  children: Category[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number | null;
  stock: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  content: string;
  images: string[];
  createdAt: string;
  user?: {
    name: string;
    avatarUrl: string | null;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string | null;
  variant: ProductVariant | null;
  quantity: number;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  street: string;
  zipCode: string | null;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  pointsUsed: number;
  pointsEarned: number;
  paymentMethod: string | null;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  note: string | null;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string | null;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PENDING_SHIPMENT"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDING"
  | "REFUNDED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDING" | "REFUNDED";

export type PaymentMethod = "WECHAT" | "ALIPAY" | "BANK_TRANSFER";
