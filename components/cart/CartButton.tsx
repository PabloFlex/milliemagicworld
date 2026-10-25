"use client";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { cart, open } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      onClick={open}
      className="relative rounded-full border border-white/40 px-3 py-2 transition hover:border-white hover:bg-white/10"
      aria-label={count ? `Panier (${count} articles)` : "Panier"}
    >
      <span className="text-base">🛒</span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff8ac3] px-1 text-[0.6rem] font-bold tracking-normal text-[#1b0f2a]">
          {count}
        </span>
      )}
    </button>
  );
}
