"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import SizeSelector from "@/components/interactive/SizeSelector";
import CTAButton from "@/components/ui/CTAButton";
import type { FeaturedProduct } from "@/content/productTypes";

import { useCart } from "./CartProvider";

type PurchaseContextValue = {
  product: FeaturedProduct;
  size: string | null;
  setSize: (size: string) => void;
  hint: string | null;
  setHint: (hint: string | null) => void;
};

const PurchaseContext = createContext<PurchaseContextValue | null>(null);

function usePurchase() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase doit être utilisé dans <ProductPurchaseProvider>");
  }
  return context;
}

export function ProductPurchaseProvider({
  product,
  children,
}: {
  product: FeaturedProduct;
  children: ReactNode;
}) {
  // Taille unique : présélectionnée
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [hint, setHint] = useState<string | null>(null);

  return (
    <PurchaseContext.Provider value={{ product, size, setSize, hint, setHint }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function PurchaseSizes({ className = "" }: { className?: string }) {
  const { product, setSize, setHint } = usePurchase();
  const soldOut = new Set(
    product.variants?.filter((variant) => !variant.available).map((variant) => variant.size),
  );

  return (
    <SizeSelector
      sizes={product.sizes}
      columns={Math.min(product.sizes.length, 6)}
      className={className}
      buttonShape="square"
      tone="dark"
      unavailable={soldOut}
      onSelect={(size) => {
        setSize(size);
        setHint(null);
      }}
    />
  );
}

export function PurchaseButton({ className = "" }: { className?: string }) {
  const { product, size, hint, setHint } = usePurchase();
  const { addItem, isPending, error } = useCart();
  const variant = product.variants?.find((item) => item.size === size);
  const soldOut = product.variants?.every((item) => !item.available);

  const handleClick = async () => {
    if (!product.variants) {
      setHint("La boutique en ligne ouvre bientôt ✨");
      return;
    }
    if (!variant) {
      setHint("Choisis ta taille");
      return;
    }
    if (!variant.available) {
      setHint("Cette taille est épuisée");
      return;
    }
    setHint(null);
    await addItem(variant.id);
  };

  const message = hint ?? error;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <CTAButton
        label={soldOut ? "Épuisé" : isPending ? "Ajout…" : "Ajouter au panier"}
        price={variant?.price ?? product.price}
        className="w-full justify-center"
        disabled={isPending || soldOut}
        onClick={handleClick}
      />
      {message && (
        <p className="text-[0.55rem] uppercase tracking-[0.35em] text-[#ff8ac3]">
          {message}
        </p>
      )}
    </div>
  );
}
