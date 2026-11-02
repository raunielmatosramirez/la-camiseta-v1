"use client";

import { createContext, useContext, useMemo } from "react";
import type { CartItem } from "@/types/tienda";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "lacamiseta-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.talla === item.talla && p.dorsal === item.dorsal);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.talla === item.talla && p.dorsal === item.dorsal
            ? { ...p, cantidad: p.cantidad + item.cantidad }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, cantidad } : p)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(() => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.cantidad, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
