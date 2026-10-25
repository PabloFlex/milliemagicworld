"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";

import {
  addToCartAction,
  fetchCartAction,
  updateLineAction,
  type CartResult,
} from "@/app/actions/cart";
import type { Cart } from "@/lib/shopify/cart";

import CartDrawer from "./CartDrawer";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  error: string | null;
  open: () => void;
  close: () => void;
  addItem: (variantId: string) => Promise<boolean>;
  updateLine: (lineId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans <CartProvider>");
  }
  return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const apply = useCallback((result: CartResult) => {
    setError(result.error ?? null);
    if (!result.error) setCart(result.cart);
    return !result.error;
  }, []);

  useEffect(() => {
    fetchCartAction().then(apply);
  }, [apply]);

  const addItem = useCallback(
    (variantId: string) =>
      new Promise<boolean>((resolve) => {
        startTransition(async () => {
          const ok = apply(await addToCartAction(variantId));
          if (ok) setIsOpen(true);
          resolve(ok);
        });
      }),
    [apply],
  );

  const updateLine = useCallback(
    (lineId: string, quantity: number) => {
      startTransition(async () => {
        apply(await updateLineAction(lineId, quantity));
      });
    },
    [apply],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isPending,
        error,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addItem,
        updateLine,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
