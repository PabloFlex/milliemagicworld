"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import {
  featuredProducts,
  type FeaturedProduct,
} from "@/content/products";

function MetaTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-gradient-to-r from-[#311038] via-[#2c1535] to-[#1b0f26] px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white shadow-lg shadow-[#18051f]/30">
      {children}
    </span>
  );
}

function DetailTag({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-2 text-xs font-medium text-slate-600">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {children}
    </span>
  );
}

function ProductCard({
  title,
  category,
  description,
  price,
  badge,
  highlights,
  sizes,
  preview,
  aura,
}: FeaturedProduct) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const gradientStops = aura.via
    ? `${aura.from}, ${aura.via}, ${aura.to}`
    : `${aura.from}, ${aura.to}`;
  const metaTags = [category, badge].filter(Boolean) as string[];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-900 shadow-[0_25px_70px_rgba(15,15,40,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(15,15,40,0.12)]">
      <div className="relative aspect-[7/5] w-full overflow-hidden">
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes="(max-width: 1536px) 33vw, 480px"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `linear-gradient(135deg, ${gradientStops})`,
            mixBlendMode: "multiply",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {metaTags.map((tag) => (
            <MetaTag key={`${title}-${tag}`}>{tag}</MetaTag>
          ))}
        </div>
        <div className="relative z-10 flex h-full items-center justify-center" />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">
            Capsule
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
            Focus
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <DetailTag key={`${title}-${highlight}`} color={aura.to}>
                {highlight}
              </DetailTag>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
            Tailles
          </p>
          <div className="mt-3 grid grid-cols-6 justify-items-center gap-2 text-xs text-slate-700">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={`${title}-${size}`}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-3 py-2 text-center font-semibold tracking-[0.25em] transition ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-auto text-right text-2xl font-semibold tracking-tight text-slate-900">
          {price}
        </div>
      </div>
    </article>
  );
}

export default function ProductCards() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
