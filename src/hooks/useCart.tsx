"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductVariant } from "@/types";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, variant?: ProductVariant | null, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string | null) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback(
    (product: Product, variant?: ProductVariant | null, quantity = 1) => {
      setItems((prev) => {
        const key = variant ? `${product.id}-${variant.id}` : product.id;
        const existing = prev.find((item) => {
          const itemKey = item.variantId
            ? `${item.productId}-${item.variantId}`
            : item.productId;
          return itemKey === key;
        });

        if (existing) {
          return prev.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...prev,
          {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            productId: product.id,
            product,
            variantId: variant?.id ?? null,
            variant: variant ?? null,
            quantity,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, variantId?: string | null) => {
      setItems((prev) =>
        prev.filter((item) => {
          if (variantId) {
            return !(item.productId === productId && item.variantId === variantId);
          }
          return item.productId !== productId;
        })
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string | null) => {
      if (quantity <= 0) {
        removeItem(productId, variantId);
        return;
      }
      setItems((prev) =>
        prev.map((item) => {
          const match = variantId
            ? item.productId === productId && item.variantId === variantId
            : item.productId === productId && !item.variantId;
          return match ? { ...item, quantity } : item;
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    const price = item.variant?.price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
