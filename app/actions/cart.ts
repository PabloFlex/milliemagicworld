"use server";

import { cookies } from "next/headers";

import { isShopifyConfigured } from "@/lib/shopify/client";
import {
  addCartLine,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  type Cart,
} from "@/lib/shopify/cart";

const CART_COOKIE = "mmw_cart";

export type CartResult = { cart: Cart | null; error?: string };

async function readCartId() {
  return (await cookies()).get(CART_COOKIE)?.value;
}

async function saveCartId(cartId: string) {
  (await cookies()).set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

async function run(action: () => Promise<Cart | null>): Promise<CartResult> {
  if (!isShopifyConfigured()) {
    return { cart: null, error: "La boutique en ligne ouvre bientôt ✨" };
  }
  try {
    return { cart: await action() };
  } catch (error) {
    console.error("[cart]", error);
    return {
      cart: null,
      error: "Oups, le panier n'a pas pu être mis à jour. Réessaie.",
    };
  }
}

export async function fetchCartAction(): Promise<CartResult> {
  if (!isShopifyConfigured()) return { cart: null };
  const cartId = await readCartId();
  if (!cartId) return { cart: null };
  return run(() => getCart(cartId));
}

export async function addToCartAction(
  variantId: string,
  quantity = 1,
): Promise<CartResult> {
  return run(async () => {
    const cartId = await readCartId();
    const existing = cartId ? await getCart(cartId) : null;
    // Panier expiré ou déjà payé : on en recrée un
    const cart = existing
      ? await addCartLine(existing.id, variantId, quantity)
      : await createCart(variantId, quantity);
    await saveCartId(cart.id);
    return cart;
  });
}

export async function updateLineAction(
  lineId: string,
  quantity: number,
): Promise<CartResult> {
  return run(async () => {
    const cartId = await readCartId();
    if (!cartId) return null;
    return quantity > 0
      ? updateCartLine(cartId, lineId, quantity)
      : removeCartLine(cartId, lineId);
  });
}
