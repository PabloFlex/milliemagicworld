"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { cart, isOpen, isPending, error, close, updateLine } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const lines = cart?.lines ?? [];

  return (
    <div
      className={`fixed inset-0 z-[100] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Panier"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#090113] text-white shadow-[0_0_60px_rgba(155,106,255,0.25)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em]">
            Panier {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
          </p>
          <button
            type="button"
            onClick={close}
            className="text-[0.6rem] uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
          >
            Fermer ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-sm text-white/60">
              Ton panier est encore vide.
            </p>
          ) : (
            <ul className="divide-y divide-white/10">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  <Link
                    href={`/products/${line.handle}`}
                    onClick={close}
                    className="relative h-24 w-20 shrink-0 overflow-hidden border border-white/10 bg-[#1b0f2d]"
                  >
                    <Image
                      src={line.image ?? "/assets/images/millie.png"}
                      alt={line.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold">{line.title}</p>
                      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-white/60">
                        Taille {line.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white/20 text-xs">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => updateLine(line.id, line.quantity - 1)}
                          className="px-3 py-1 transition hover:bg-white/10 disabled:opacity-40"
                          aria-label="Retirer un"
                        >
                          −
                        </button>
                        <span className="px-2">{line.quantity}</span>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          className="px-3 py-1 transition hover:bg-white/10 disabled:opacity-40"
                          aria-label="Ajouter un"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{line.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="space-y-4 border-t border-white/10 px-6 py-6">
          {error && <p className="text-xs text-[#ff8ac3]">{error}</p>}
          {cart && lines.length > 0 && (
            <>
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-white/70">
                <span>Sous-total</span>
                <span className="text-lg font-semibold tracking-tight text-white">
                  {cart.subtotal}
                </span>
              </div>
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-white/50">
                Livraison calculée au paiement
              </p>
              <a
                href={cart.checkoutUrl}
                className="group relative block overflow-hidden border border-white/10 px-6 py-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-[#0b0414]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#f5d1ff] via-[#9c68ff] to-[#51d1ff] opacity-90 transition group-hover:opacity-100" />
                <span className="relative">Passer au paiement</span>
              </a>
            </>
          )}
        </footer>
      </aside>
    </div>
  );
}
