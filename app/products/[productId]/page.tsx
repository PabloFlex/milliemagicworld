import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import OrbFollower from "@/components/interactive/OrbFollower";
import SizeSelector from "@/components/interactive/SizeSelector";
import CTAButton from "@/components/ui/CTAButton";
import {
  featuredProducts,
  getFeaturedProductById,
} from "@/content/products";

type ProductPageParams = {
  productId: string;
};

type ProductPageProps = {
  params: Promise<ProductPageParams>;
};

export function generateStaticParams() {
  return featuredProducts.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getFeaturedProductById(productId);
  if (!product) {
    return {
      title: "Pièce introuvable – Millie's Magic World",
    };
  }

  return {
    title: `${product.title} – Millie's Magic World`,
    description: product.description,
  };
}

function MetaTag({ label }: { label: string }) {
  return (
    <span className="border border-white/15 bg-white/5 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/75">
      {label}
    </span>
  );
}

function DetailChip({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white">
      <span
        className="h-2 w-2"
        style={{ backgroundColor: color }}
      />
      {children}
    </span>
  );
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { productId } = await params;
  const product = getFeaturedProductById(productId);
  if (!product) {
    notFound();
  }

  const sizeTag =
    product.sizes.length === 1
      ? "Pièce unique"
      : product.sizes.length >= 5
        ? "Tailles inclusives"
        : null;
  const metaTags = [product.badge, sizeTag].filter(
    (tag, index, arr): tag is string =>
      Boolean(tag) && arr.indexOf(tag) === index,
  );
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020009] text-white">
      <OrbFollower />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#010006,#070211_45%,#120425_90%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 32% 38%, rgba(155,106,255,0.35), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(circle at 78% 12%, rgba(89,124,255,0.25), transparent 45%)",
        }}
      />
      <main className="relative z-10 mx-auto w-[90%] max-w-[1600px] px-4 pb-10 pt-20 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70 transition hover:text-white"
        >
          <span aria-hidden>←</span> Retour à la sélection
        </Link>
        <div className="mt-8 grid gap-6 lg:h-[calc(100vh-220px)] lg:grid-cols-2">
          <div className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#13041f]">
            <div className="relative flex-1 bg-[#1b0f2d]">
              <Image
                src={product.preview.src}
                alt={product.preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="grid grid-cols-3 border-t border-white/10 px-5 py-4 text-[0.55rem] uppercase tracking-[0.35em] text-white/70">
              <div className="border-r border-white/10 pr-4">
                <p>Livraison</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {product.shipping}
                </p>
              </div>
              <div className="border-r border-white/10 px-4">
                <p>Disponibilité</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {product.badge ?? "Disponible"}
                </p>
              </div>
              <div className="pl-4">
                <p>Statut</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {sizeTag ?? "Sur-mesure"}
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {metaTags.map((tag) => (
                  <MetaTag key={`${product.id}-${tag}`} label={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#090113]/95">
            <div className="grid gap-6 border-b border-white/10 px-6 py-6 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] sm:px-8">
              <div className="space-y-3">
                <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/70">
                  {product.category}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  {product.title}
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-white/70">
                  {product.description}
                </p>
              </div>
              <div className="space-y-2 text-right">
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">
                  Prix affiché
                </p>
                <p className="text-4xl font-semibold tracking-tight text-white">
                  {product.price}
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/50">
                  Taxes et ajustements inclus
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 border-b border-white/10 px-6 py-5 text-[0.6rem] uppercase tracking-[0.35em] text-white/70 sm:px-8">
              <div>
                <p>Livraison</p>
                <p className="mt-2 text-base font-semibold tracking-tight text-white">
                  {product.shipping}
                </p>
              </div>
              <div>
                <p>Disponibilité</p>
                <p className="mt-2 text-base font-semibold tracking-tight text-white">
                  {product.badge ?? "Studio ouvert"}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-6 overflow-hidden px-6 py-6 sm:px-8">
              <section>
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">
                  Focus atelier
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.highlights.map((highlight) => (
                    <DetailChip
                      key={`${product.id}-${highlight}`}
                      color={product.aura.to}
                    >
                      {highlight}
                    </DetailChip>
                  ))}
                </div>
              </section>
              <section className="flex-1 overflow-auto">
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">
                  Histoire de la pièce
                </p>
                <div className="mt-4 grid gap-4 text-sm leading-relaxed text-white/80 lg:grid-cols-2 lg:gap-6">
                  {product.story.map((paragraph, index) => (
                    <p key={`${product.id}-story-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
              <section>
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">
                  Tailles
                </p>
                <SizeSelector
                  sizes={product.sizes}
                  columns={Math.min(product.sizes.length, 6)}
                  className="mt-4"
                  buttonShape="square"
                  tone="dark"
                />
                <p className="mt-3 text-[0.55rem] uppercase tracking-[0.4em] text-white/55">
                  Ajustements possibles sur rendez-vous.
                </p>
              </section>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-white/10 px-6 py-6 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white sm:px-8">
              <CTAButton
                label="Payer la pièce"
                price={product.price}
                className="flex-1 justify-center"
              />
              <button
                type="button"
                className="border border-white px-4 py-3 transition hover:bg-white hover:text-[#090113]"
              >
                Contact atelier
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
