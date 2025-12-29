"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

import {
  featuredProducts,
  type FeaturedProduct,
} from "@/content/products";
import SizeSelector from "@/components/interactive/SizeSelector";

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
  id,
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
  const gradientStops = aura.via
    ? `${aura.from}, ${aura.via}, ${aura.to}`
    : `${aura.from}, ${aura.to}`;
  const metaTags = [category, badge].filter(Boolean) as string[];

  return (
    <Link
      href={`/products/${id}`}
      className="group block no-underline"
      aria-label={`Voir ${title}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-900 shadow-[0_25px_70px_rgba(15,15,40,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_35px_90px_rgba(15,15,40,0.12)]">
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
          <SizeSelector
            sizes={sizes}
            className="mt-3"
            suppressNavigation
          />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight text-slate-900">
            {price}
          </div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Voir l&rsquo;histoire →
            </span>
        </div>
      </div>
      </article>
    </Link>
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
